import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        role: z.enum(["student", "admin", "company"]),
        university: z.string().optional(),
        faculty: z.string().optional(),
        dob: z.date().optional(),
        domain: z.string().optional(),
        country: z.string().optional(),
        employees: z.number().optional(),
        headquarters: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: input,
      });
    }),
});
