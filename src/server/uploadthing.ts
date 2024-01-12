import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { getServerAuthSession } from "./auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  cv: f({ pdf: { maxFileSize: "4MB" }, image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      //   const user = await auth(req, res);
      const session = await getServerAuthSession({ req, res });

      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      const res = { uploadedBy: metadata.userId };
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      console.log("🚀 ~ .onUploadComplete ~ res:", res);

      return res;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
