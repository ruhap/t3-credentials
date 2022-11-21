import { registerSchema } from "@/validation/auth";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hash = bcrypt.hashSync(password, salt);

      const result = await ctx.prisma.user.create({
        data: { username, email, password: hash },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
