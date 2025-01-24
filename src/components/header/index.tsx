import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.css";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();

  const getButtonMessage = () => {
    if (status === "loading") {
      return "Carregando";
    }

    if (status === "authenticated") {
      return `Olá, ${session?.user?.name}`;
    }

    return "Acessar";
  };

  const getButtonFunction = () => {
    if (status === "loading") {
      return () => {};
    }

    if (status === "authenticated") {
      return signOut();
    }

    return signIn("google");
  };

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href={"/"}>
            <h1 className={styles.logo}>
              Tarefas<span>+</span>
            </h1>
          </Link>

          {session?.user && (
            <Link href={"/dashboard"} className={styles.link}>
              Meu Painel
            </Link>
          )}
        </nav>

        <button className={styles.loginButton} onClick={getButtonFunction}>
          {getButtonMessage()}
        </button>
      </section>
    </header>
  );
}
