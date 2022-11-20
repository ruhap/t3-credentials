import type { ILogin } from "@validationauth";
import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import Head from "next/head";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await signIn("credentials", { ...data });
      router.push("/dashboard");
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="align-center flex min-h-screen flex-col items-center justify-center gap-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {error ? (
            <p className="text-center text-red-600">Login failed, try again!</p>
          ) : null}
          <label>Email</label>
          <input
            className="rounded border py-1 px-4"
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <label>Password</label>
          <input
            className="rounded border py-1 px-4"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <input type="submit" className="rounded border py-1 px-4" />
        </form>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Login;
