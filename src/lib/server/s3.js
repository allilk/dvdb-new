import { env } from "$env/dynamic/private";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: env.S3_UPLOAD_REGION,
    credentials: {
        accessKeyId: env.S3_UPLOAD_KEY,
        secretAccessKey: env.S3_UPLOAD_SECRET,
    },
});

export const listObjectsByPrefix = async ({ userId }) => {
    // i/{key}/* is the key prefix for all images
    const objects = await s3.send(
        new ListObjectsV2Command({
            Bucket: "i.dvdb.video",
            Prefix: `i/${userId}/`,
            Delimiter: "/",
        })
    );

    return objects.Contents.map((object) => {
        return {
            key: object.Key,
            url: `https://i.dvdb.video/${object.Key}`,
        };
    });
};
