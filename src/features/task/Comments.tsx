/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button/Button";
import s from "./Comments.module.css";
import ReplyIcon from "@/assets/icons/reply.svg";
import Textarea from "@/components/Textarea/Textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, fetchComments } from "@/services/api";
import { Comment } from "@/types";
import { useState } from "react";

type CommentTypes = {
  taskId: number;
};

export default function Comments({ taskId }: CommentTypes) {
  const [commentValue, setCommentValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  const { data: comments = [], refetch } = useQuery<Comment[]>({
    queryKey: ["comments", taskId],
    queryFn: () => fetchComments(taskId),
  });

  const { mutate: addComment, isPending: isCommentPending } = useMutation({
    mutationFn: () =>
      createComment(taskId, {
        text: commentValue,
        parent_id: null,
      }),
    onSuccess: () => {
      refetch();
      setCommentValue("");
    },
  });

  const { mutate: addReply, isPending: isReplyPending } = useMutation({
    mutationFn: () =>
      createComment(taskId, {
        text: replyValue,
        parent_id: parentId,
      }),
    onSuccess: () => {
      refetch();
      setReplyValue("");
    },
  });

  const focusOnComment = (commentId: number) => {
    setParentId((prev) => (prev === commentId ? null : commentId));
    setReplyValue("");
  };

  const submitComment = () => {
    if (commentValue.trim().length < 1) return;
    addComment();
  };

  const submitReply = () => {
    if (replyValue.trim().length < 1) return;
    addReply();
  };

  const commentsCount = comments.reduce(
    (total, comment) => total + 1 + (comment.sub_comments?.length || 0),
    0
  );

  return (
    <div className={s.wrapper}>
      <form className={s.commentForm} onSubmit={(e) => e.preventDefault()}>
        <Textarea
          placeholder="დაწერე კომენტარი"
          value={commentValue}
          onChange={setCommentValue}
          hasBottomSpace
        />
        <Button
          className={s.commentButton}
          variant="secondary"
          onClick={() => submitComment()}
          disabled={isCommentPending}
        >
          დააკომენტარე
        </Button>
      </form>

      <h3 className={s.subheading}>
        კომენტარები <span className={s.commentsCount}>{commentsCount}</span>
      </h3>

      <ul className={s.commentsList}>
        {comments.map((comment) => (
          <li key={comment.id} className={s.commentItem}>
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
            {parentId === comment.id ? (
              <form
                className={`${s.commentForm} ${s.replyCommentForm}`}
                onSubmit={(e) => e.preventDefault()}
              >
                <Textarea
                  placeholder="დაწერე კომენტარი"
                  value={replyValue}
                  onChange={setReplyValue}
                  hasBottomSpace
                />
                <Button
                  className={s.commentButton}
                  variant="secondary"
                  onClick={() => submitReply()}
                  disabled={isReplyPending}
                >
                  დააკომენტარე
                </Button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
