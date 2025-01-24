import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <p>
            © {new Date().getFullYear()} | Tarefas<span>+</span>
          </p>
          <p>Made by @marcusvramos</p>
        </div>
      </div>
    </footer>
  );
}
