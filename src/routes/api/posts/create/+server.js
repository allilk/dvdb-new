import { prisma } from "../../../../auth";

const generateShortId = () => {
    return Math.random().toString(36).substring(2, 9);
};

export async function POST(ev) {
    const currentUser = await ev.locals.auth();
    const { title, content, tags } = await ev.request.json();

    if (!title || !content) {
        return new Response("Title and content are required.", {
            status: 400,
        });
    }

    const post = await prisma.blogPost.create({
        data: {
            title,
            content,
            tags,
            shortId: generateShortId(),
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
