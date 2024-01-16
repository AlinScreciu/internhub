import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.experience.findUnique({ where: input });
    }),
  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.delete({ where: input });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.experience.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        company: z.string(),
        position: z.string(),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const experience = await ctx.db.experience.create({
        data: {
          ...input,
          userId: id,
        },
      });
      return experience;
    }),
});
