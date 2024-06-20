import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').RequestHandler} */
import type { RequestHandler } from "@sveltejs/kit";

// delete cookies in home directory via Post

export const POST: RequestHandler = async ({ cookies }) => {
  console.log("logging out");
  // cookies.delete("auth")
  cookies.delete("auth", { path: "/" }); //delete the cookie from the home directory
  throw redirect(303, "/");
};
