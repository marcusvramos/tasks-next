import { HTMLProps } from "react";
import styles from "./styles.module.css";

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      placeholder="Digite sua tarefa"
      className={styles.textarea}
      {...rest}
    />
  );
}
