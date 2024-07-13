import { prisma } from "../../../auth";

export async function load(ctx) {
    const post = await prisma.blogPost.findUnique({
        where: {
            id: ctx.params.slug,
        },
        select: {
            id: true,
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
        post,
    };
}
