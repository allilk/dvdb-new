import { listObjectsByPrefix } from "$lib/server/s3";

export async function GET({ url }) {
    const userId = url.searchParams.get("userId");

    const images = await listObjectsByPrefix({ userId });
    return new Response(JSON.stringify(images), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
