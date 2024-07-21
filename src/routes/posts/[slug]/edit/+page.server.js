import { redirect } from "@sveltejs/kit";
import { canUserBlogPost } from "$lib/roles";
import { prisma } from "../../../../auth.js";
import { selectOwnUserPostsProps } from "../../../../lib/posts.js";

export const load = async (event) => {
    const session = await event.locals.auth();

    // If user is not logged in or does not have the required roles, redirect to home page
    if (!session?.user?.id || !canUserBlogPost(session.user?.roles || [])) {
        return redirect(307, "/");
    }

    // Get the blog post ID from the URL
    const { slug } = event.params;
    const post = await prisma.blogPost.findUnique({
        where: {
            shortId: slug,
        },
        select: selectOwnUserPostsProps,
    });

    return {
        post,
    };
};
