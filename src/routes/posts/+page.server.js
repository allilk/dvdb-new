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
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    return {
        posts,
    };
}
