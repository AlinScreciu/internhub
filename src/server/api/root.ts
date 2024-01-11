import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { companyRouter } from "./routers/company";
import { experienceRouter } from "./routers/experience";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  company: companyRouter,
  experience: experienceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
