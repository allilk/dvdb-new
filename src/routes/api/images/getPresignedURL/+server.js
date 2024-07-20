// Get pre-signed S3 URL for image upload on client side

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../../../lib/s3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const POST = async ({ request, locals }) => {
    const { fileName, fileType } = await request.json();
    const currentUser = await locals.auth();

    if (!currentUser) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    const params = {
        Bucket: "i.dvdb.video",
        Key: `i/${currentUser.user.id}/${fileName}`,
        ContentType: fileType,
        ACL: "public-read",
    };

    try {
        const command = new PutObjectCommand(params);
        const presignedUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
        });
        return new Response(JSON.stringify({ url: presignedUrl }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response("Error creating presigned URL", {
            status: 500,
        });
    }
};
