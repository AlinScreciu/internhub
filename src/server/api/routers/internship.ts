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
  getAllFromCompany: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const companyId = ctx.session.user.company_id;
      const { query } = input;
      return (
        await ctx.db.internship.findMany({
          where: {
            companyId,
            deadline: { gte: new Date() },
            OR: [
              { position: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
              { workingPlace: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              {
                Company: {
                  name: { contains: query, mode: "insensitive" },
                },
              },
              {
                Company: {
                  domain: { contains: query, mode: "insensitive" },
                },
              },
            ],
          },
          include: { Company: true },
        })
      ).filter((internship) => {
        const today = new Date();
        return internship.deadline > today;
      });
    }),
  getAll: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input;
      return await ctx.db.internship.findMany({
        where: {
          OR: [
            { position: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { workingPlace: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            {
              Company: {
                name: { contains: query, mode: "insensitive" },
              },
            },
            {
              Company: {
                domain: { contains: query, mode: "insensitive" },
              },
            },
          ],
          deadline: { gte: new Date() }, // Filter out internships with deadlines in the past
        },
        include: { Company: true },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.internship.findFirst({ where: input });
    }),
  getAppliedForCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    if (user.role !== "student") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only students can apply to internships",
      });
    }
    const jobs = await ctx.db.internship.findMany({
      where: {
        applicants: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        Company: true,
        applicants: true,
      },
    });
    console.log(
      "🚀 ~ getAppliedForCurrentUser:protectedProcedure.query ~ user:",
      user,
    );

    for (const job of jobs) {
      console.log(
        "🚀 ~ getAppliedForCurrentUser:protectedProcedure.query ~ job:",
        job,
      );
    }
    return jobs;
  }),
});
