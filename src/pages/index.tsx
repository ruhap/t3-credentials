import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const session = useSession();
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="align-center flex min-h-screen flex-col items-center justify-center gap-1">
        <h1 className="text-lg">Home - Not protected</h1>
        <p>{session ? "You are authenticated" : "You are not authenticated"}</p>

        {!session ? (
          <div className="flex flex-row gap-4">
            <Link href={"/login"} className="rounded border py-1 px-4">
              Login
            </Link>
            <Link href={"/register"} className="rounded border py-1 px-4">
              Register
            </Link>
          </div>
        ) : (
          <>
            <button
              onClick={() => signOut()}
              className="rounded border py-1 px-4"
            >
              Logout
            </button>
            <Link href={"/dashboard"} className="">
              Dashboard
            </Link>
          </>
        )}
        <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
      </main>
    </>
  );
};

export default Home;
