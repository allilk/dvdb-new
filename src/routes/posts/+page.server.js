import { prisma } from "../../auth";
import { selectNoAuthPostsProps } from "../../lib/posts";

export async function load() {
    const posts = await prisma.blogPost.findMany({
        where: {
            published: false,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: selectNoAuthPostsProps,
        take: 8,
    });

    return {
        posts,
    };
}
