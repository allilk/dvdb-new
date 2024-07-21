import { prisma } from "../../../../auth";

const generateShortId = () => {
    return Math.random().toString(36).substring(2, 9);
};

export async function POST(ev) {
    const currentUser = await ev.locals.auth();
    const { title, content, tags, image } = await ev.request.json();

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
            image,
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

export async function PUT(ev) {
    const { shortId, title, content, tags, image } = await ev.request.json();

    if (!title || !content) {
        return new Response("Title and content are required.", {
            status: 400,
        });
    }

    const post = await prisma.blogPost.update({
        where: {
            shortId,
        },
        data: {
            title,
            content,
            tags,
            image,
        },
    });

    return new Response(JSON.stringify(post), {
        status: 200,
    });
}
