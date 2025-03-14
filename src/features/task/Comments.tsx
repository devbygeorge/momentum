import Button from "@/components/Button/Button";
import s from "./Comments.module.css";
import Image from "next/image";
import ReplyIcon from "@/assets/icons/reply.svg";
import db from "@/db.json";
import Textarea from "@/components/Textarea/Textarea";

export default function Comments() {
  const { comments } = db;

  return (
    <div className={s.wrapper}>
      <form className={s.commentForm} onSubmit={(e) => e.preventDefault()}>
        <Textarea placeholder="დაწერე კომენტარი" />
        <Button
          className={s.commentButton}
          variant="secondary"
          onClick={() => {}}
        >
          დააკომენტარე
        </Button>
      </form>

      <h3 className={s.subheading}>
        კომენტარები <span className={s.commentsCount}>3</span>
      </h3>

      <ul className={s.commentsList}>
        {comments.map((comment) => (
          <li key={comment.id} className={s.commentItem}>
            <article className={s.commentBody}>
              <div className={s.avatarWrapper}>
                <Image src={comment.author_avatar} alt="Comment Avatar" fill />
              </div>
              <strong className={s.author}>{comment.author_nickname}</strong>
              <p className={s.text}>{comment.text}</p>
              <button className={s.replyButton}>
                <ReplyIcon /> უპასუხე
              </button>
            </article>
            {comment.sub_comments?.length && (
              <ul className={s.repliesList}>
                {comment.sub_comments.map((subcomment) => (
                  <li key={subcomment.id} className={s.replyItem}>
                    <article className={s.commentBody}>
                      <div className={s.avatarWrapper}>
                        <Image
                          src={subcomment.author_avatar}
                          alt="Comment Avatar"
                          fill
                        />
                      </div>
                      <strong className={s.author}>
                        {subcomment.author_nickname}
                      </strong>
                      <p className={s.text}>{subcomment.text}</p>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
