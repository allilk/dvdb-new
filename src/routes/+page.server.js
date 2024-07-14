import { prisma } from "../auth";
import { selectNoAuthPostsProps } from "../lib/posts";

// Return 3 most recent blog posts
export async function load() {
    const posts = await prisma.blogPost.findMany({
        where: {
            published: false,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
        select: selectNoAuthPostsProps,
    });

    return {
        posts,
    };
}
