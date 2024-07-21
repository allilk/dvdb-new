// GET request for /api/posts

import { prisma } from "../../../auth.js";
import { selectNoAuthPostsProps } from "$lib/posts.js";

export async function GET(ev) {
    // Return a list of post based on the query parameters
    const authorId = ev.url.searchParams.get("authorId");
    const published = ev.url.searchParams.get("published");
    const page = parseInt(ev.url.searchParams.get("page"));

    const [count, posts] = await prisma.$transaction([
        prisma.blogPost.count({
            where: {
                published:
                    typeof published === "string"
                        ? published === "true"
                        : undefined,
                authorId,
            },
        }),
        prisma.blogPost.findMany({
            where: {
                published:
                    typeof published === "string"
                        ? published === "true"
                        : undefined,
                authorId,
            },
            orderBy: {
                // Sort by most recent
                createdAt: "desc",
            },
            skip: page > 1 ? (page - 1) * 9 : 0,
            take: 9,
            select: selectNoAuthPostsProps,
        }),
    ]);

    return new Response(
        JSON.stringify({
            posts,
            pages: Math.ceil(count / 9),
            page: page || 1,
        }),
        {
            status: 200,
        }
    );
}
