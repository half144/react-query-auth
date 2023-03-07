import Head from "next/head";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ProtectedRoute from "@/template/ProtectedRoute";
import useMe from "@/hooks/useMe";
import { useAuth } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { logout } = useAuth();
  const { data } = useMe();

  console.log(data);
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1>Dashboard</h1>
          {data && <h2>{data.name}</h2>}
          <button onClick={logout}>Logout</button>
        </main>
      </ProtectedRoute>
    </>
  );
}