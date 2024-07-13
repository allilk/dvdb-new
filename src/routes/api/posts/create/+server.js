import { prisma } from "../../../../auth";

export async function POST(ev) {
    const currentUser = await ev.locals.auth();
    const { title, content } = await ev.request.json();

    if (!title || !content) {
        return new Response("Title and content are required.", {
            status: 400,
        });
    }

    const post = await prisma.blogPost.create({
        data: {
            title,
            content,
            published: false,
            author: {
                connect: {
                    id: currentUser.user.id,
                },
            },
        },
    });

    return new Response(JSON.stringify(post), {
        status: 201,
    });
}
