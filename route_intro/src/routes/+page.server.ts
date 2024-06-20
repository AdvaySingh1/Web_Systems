import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */
/** @type {import('./$types').Actions} */

// load function from pageserverload
export const load = async ({ locals }) => {
  //   console.log(cookies); only returns the functoins associated with cookies
  return {
    locals,
  };
};

// take just the cookies from the submit button
export const actions = {
  login: async ({ cookies }) => {
    cookies.set("auth", "regularusertoken", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    throw redirect(303, "/");
  },
};
