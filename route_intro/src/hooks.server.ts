import { authenticateUser } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */ export async function handle({
  event,
  resolve,
}) {
  if (event.url.pathname.startsWith("/custom")) {
    return new Response("custom response");
  }
  //   event.locals.some = { height: 10 };
  //   console.log(event.locals);

  const response = await resolve(event);

  // authenticate the user to determine the role.
  event.locals.user = authenticateUser(event);

  // redirect as needed
  console.log(event.url.pathname);

  if (event.url.pathname.startsWith("/protected")) {
    if (!event.locals.user) {
      throw redirect(303, "/");
    }
    if (event.url.pathname.startsWith("/protected/admin")) {
      console.log("jere");
      if (event.locals.user.role != "ADMIN") {
        console.log("cant access");
        throw redirect(303, "/protected");
      }
    }
  }

  console.log(event.locals.user?.role);
  return response;
}
