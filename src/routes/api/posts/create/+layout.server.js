import { redirect } from "@sveltejs/kit";
import { canUserBlogPost } from "../../lib/roles.js";

export const load = async (event) => {
    const session = await event.locals.auth();

    // If user is not logged in or does not have the required roles, redirect to home page
    if (!session?.user?.id || !canUserBlogPost(session.user?.roles || [])) {
        return redirect(307, "/");
    }

    return {
        session,
    };
};
