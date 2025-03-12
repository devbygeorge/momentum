import styles from "./Button.module.css";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  // If `href` is provided, render a `Link` instead of a `button`
  if (href) {
    return (
      <Link href={href} className={`${styles.button} ${styles[variant]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
