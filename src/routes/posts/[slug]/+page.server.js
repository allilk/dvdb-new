import { prisma } from "../../../auth";
import { selectNoAuthPostsProps } from "../../../lib/posts.js";

export async function load(ctx) {
    const post = await prisma.blogPost.findUnique({
        where: {
            shortId: ctx.params.slug,
        },
        select: selectNoAuthPostsProps,
    });

    return {
        post,
    };
}
