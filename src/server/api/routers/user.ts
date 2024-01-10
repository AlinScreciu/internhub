import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        university: z.string(),
        faculty: z.string(),
        dob: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { ...input, role: "student" },
      });
    }),
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.db.user.findUnique({ where: { id } });
  }),
  registerAsEmployer: protectedProcedure
    .input(
      z.object({
        companyId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { companyId: company_id } = input;
      return await ctx.db.user.update({
        where: { id },
        data: {
          company_id,
          role: "employer",
        },
      });
    }),
});
