import { prisma } from "../../../../auth";

const generateShortId = () => {
    return Math.random().toString(36).substring(2, 9);
};

export async function POST(ev) {
    const currentUser = await ev.locals.auth();
    const { title, content, tags, image, description } =
        await ev.request.json();

    if (
        !title ||
        !content ||
        !description ||
        !tags ||
        !image ||
        description.length > 1000
    ) {
        return new Response(
            "Title, content, description, tags, and image are required. Description must be less than 1000 characters.",
            { status: 400 }
        );
    }

    const post = await prisma.blogPost.create({
        data: {
            title,
            content,
            description,
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
    const { shortId, title, content, tags, image, description } =
        await ev.request.json();

    if (
        !title ||
        !content ||
        !description ||
        !tags ||
        !image ||
        description.length > 1000
    ) {
        return new Response(
            "Title, content, description, tags, and image are required. Description must be less than 1000 characters.",
            { status: 400 }
        );
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
            description,
        },
    });

    return new Response(JSON.stringify(post), {
        status: 200,
    });
}
