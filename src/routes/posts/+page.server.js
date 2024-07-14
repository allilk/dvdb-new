import { prisma } from "../../auth";

export async function load() {
    const posts = await prisma.blogPost.findMany({
        where: {
            published: false,
        },
        orderBy: {
            createdAt: "desc",
        },
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
        take: 8,
    });

    return {
        posts,
    };
}
