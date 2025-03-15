/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button/Button";
import s from "./Comments.module.css";
import ReplyIcon from "@/assets/icons/reply.svg";
import Textarea from "@/components/Textarea/Textarea";
import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "@/services/api";
import { Comment } from "@/types";

type CommentTypes = {
  taskId: string | string[] | undefined;
};

export default function Comments({ taskId }: CommentTypes) {
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["comments", taskId],
    queryFn: () => fetchComments(taskId),
  });

  return (
    <div className={s.wrapper}>
      <form className={s.commentForm} onSubmit={(e) => e.preventDefault()}>
        <Textarea placeholder="დაწერე კომენტარი" value="" onChange={() => {}} />
        <Button
          className={s.commentButton}
          variant="secondary"
          onClick={() => {}}
        >
          დააკომენტარე
        </Button>
      </form>

      <h3 className={s.subheading}>
        კომენტარები <span className={s.commentsCount}>{comments.length}</span>
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
              <button className={s.replyButton}>
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
