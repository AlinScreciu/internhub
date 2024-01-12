import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const companyRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.company.findUnique({ where: input });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.company.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        country: z.string(),
        headquarters: z.string(),
        description: z.string(),
        domain: z.string(),
        employees: z.number().min(1, "Must have at least one employee"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const company = await ctx.db.company.create({
        data: input,
      });
      await ctx.db.user.update({
        where: {
          id,
        },
        data: {
          company_id: company.id,
          role: "employer",
        },
      });
      return company;
    }),
});
