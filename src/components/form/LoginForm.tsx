import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import type { ILogin } from "@/validation/auth";

const LoginForm = () => {
  const router = useRouter();
  const { error } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  };

  return (
    <div className="radius flex flex-col items-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">Login failed, try again!</p>
        )}
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
    </div>
  );
};

export default LoginForm;
