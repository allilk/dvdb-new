import { prisma } from "../../../auth";

export async function load(ctx) {
    const post = await prisma.blogPost.findUnique({
        where: {
            shortId: ctx.params.slug,
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
    });

    return {
        post,
    };
}
