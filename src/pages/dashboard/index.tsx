import styles from "@/src/pages/dashboard/styles.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { getSession } from "next-auth/react";
import { TextArea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firebase-connection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";

interface HomeProps {
  user: {
    name: string;
    email: string;
  };
}

interface TaskProps {
  id: string;
  task: string;
  created: Date;
  user: string;
  public: boolean;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    if (user?.email) {
      async function loadTask() {
        try {
          setLoading(true);
          const tasksRef = collection(db, "tasks");
          const q = query(
            tasksRef,
            orderBy("created", "desc"),
            where("user", "==", user.email)
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let list: TaskProps[] = [];
            querySnapshot.forEach((doc) => {
              list.push({
                id: doc.id,
                task: doc.data().task,
                created: doc.data().created.toDate(),
                user: doc.data().user,
                public: doc.data().public,
              });
            });

            setTasks(list);
            setLoading(false);
          });

          return () => unsubscribe(); // Cleanup subscription
        } catch (error) {
          console.error("Error loading tasks", error);
          setLoading(false);
        }
      }

      loadTask();
    }
  }, [user?.email]);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: user.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao registrar tarefa", error);
    }
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );

    alert("Link copiado para a área de transferência");
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }

  return (
    <div className={styles.container}>
      <Head>Meu painel de tarefas</Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="Digite qual sua tarefa"
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa pública?</label>
              </div>
              {loading ? (
                <button className={styles.button} type="submit" disabled>
                  Registrando...
                </button>
              ) : (
                <button className={styles.button} type="submit">
                  Registrar
                </button>
              )}
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>
          {loading && <p className={styles.infoMessage}>Carregando...</p>}
          {!loading && tasks.length === 0 && (
            <p className={styles.infoMessage}>Nenhuma tarefa encontrada!</p>
          )}
          {tasks.map((task) => (
            <article className={styles.task}>
              {task.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLICO</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(task.id)}
                  >
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                {task.public ? (
                  <Link href={`/task/${task.id}`}>
                    <p>{task.task}</p>
                  </Link>
                ) : (
                  <p>{task.task}</p>
                )}

                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: session.user?.name,
        email: session.user?.email,
      },
    },
  };
};
