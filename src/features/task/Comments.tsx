/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button/Button";
import s from "./Comments.module.css";
import ReplyIcon from "@/assets/icons/reply.svg";
import Textarea from "@/components/Textarea/Textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, fetchComments } from "@/services/api";
import { Comment } from "@/types";
import { useRef, useState } from "react";

type CommentTypes = {
  taskId: number;
};

export default function Comments({ taskId }: CommentTypes) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  const { data: comments = [], refetch } = useQuery<Comment[]>({
    queryKey: ["comments", taskId],
    queryFn: () => fetchComments(taskId),
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      createComment(taskId, {
        text: textareaValue,
        parent_id: parentId,
      }),
    onSuccess: () => {
      setTextareaValue("");
      setParentId(null);
      refetch();
    },
  });

  const focusOnComment = (commentId: number) => {
    setParentId((prev) => (prev === commentId ? null : commentId));
    textareaRef.current?.focus();
  };

  return (
    <div className={s.wrapper}>
      <form className={s.commentForm} onSubmit={(e) => e.preventDefault()}>
        <Textarea
          placeholder="დაწერე კომენტარი"
          value={textareaValue}
          onChange={setTextareaValue}
          ref={textareaRef}
        />
        <Button
          className={s.commentButton}
          variant="secondary"
          onClick={() => mutate()}
        >
          დააკომენტარე
        </Button>
      </form>

      <h3 className={s.subheading}>
        კომენტარები <span className={s.commentsCount}>{comments.length}</span>
      </h3>

      <ul className={s.commentsList}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className={`${s.commentItem} ${
              comment.id === parentId ? s.activeComment : ""
            }`}
          >
            <article className={s.commentBody}>
              <img
                className={s.avatar}
                src={comment.author_avatar}
                alt="Comment Avatar"
                width={38}
                height={38}
              />
              <strong className={s.author}>{comment.author_nickname}</strong>
              <p className={s.text}>{comment.text}</p>
              <button
                className={s.replyButton}
                onClick={() => focusOnComment(comment.id)}
              >
                <ReplyIcon /> უპასუხე
              </button>
            </article>
            {comment.sub_comments?.length ? (
              <ul className={s.repliesList}>
                {comment.sub_comments.map((subcomment) => (
                  <li key={subcomment.id} className={s.replyItem}>
                    <article className={s.commentBody}>
                      <img
                        className={s.avatar}
                        src={subcomment.author_avatar}
                        alt="Comment Avatar"
                        width={38}
                        height={38}
                      />
                      <strong className={s.author}>
                        {subcomment.author_nickname}
                      </strong>
                      <p className={s.text}>{subcomment.text}</p>
                    </article>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
