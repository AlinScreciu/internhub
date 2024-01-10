import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const internshipRouter = createTRPCRouter({
  post: protectedProcedure
    .input(
      z.object({
        position: z.string(),
        location: z.string(), // city
        workingPlace: z.string(), // on-site, hybrid, remote
        fullTime: z.boolean(), // if false => part time
        description: z.string(),
        paid: z.boolean(),
        payRangeStart: z.number().optional().nullish(),
        payRangeEnd: z.number().optional().nullish(),
        openPositions: z.number(),
        deadline: z.date(),
        hireRate: z.number().optional().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      console.log("🚀 ~ .mutation ~ user:", user);

      if (user.role != "employer") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only employers can post internships",
        });
      }

      return await ctx.db.internship.create({
        data: {
          ...input,
          companyId: ctx.session.user.company_id,
        },
      });
    }),
  getAllFromCompany: protectedProcedure.query(async ({ ctx }) => {
    const companyId = ctx.session.user.company_id;

    return (
      await ctx.db.internship.findMany({
        where: { companyId },
        include: { Company: true },
      })
    ).filter((internship) => {
      const today = new Date();
      return internship.deadline > today;
    });
  }),
});
