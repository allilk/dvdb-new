import { prisma } from "../auth";

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
        select: {
            shortId: true,
            title: true,
            content: true,
            createdAt: true,
            tags: true,
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    return {
        posts,
    };
}
