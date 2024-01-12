import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  getAllReviewFromCompany: protectedProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.review.findMany({
        where: input,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Company: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  post: protectedProcedure
    .input(
      z.object({
        companyId: z.string(),
        title: z.string(),
        position: z.string(),
        description: z.string(),
        stars: z.number(),
        startDate: z.date(),
        endDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.create({
        data: {
          ...input,
          companyId: undefined, // unset companyId from ...input to be able to use Company: {connect: {id}} :facepalm:
          Company: {
            connect: {
              id: input.companyId,
            },
          },
        },
        include: {
          Company: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
});
