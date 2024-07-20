// Update user api page

import { prisma } from "../../../../auth.js";

export const PUT = async ({ locals }) => {
    const currentUser = await locals.auth();
    const { id } = currentUser.user;

    if (!id) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            // username,
            // email,
            // roles,
            // disabled,
        },
    });

    return new Response(JSON.stringify(user), {
        status: 200,
    });
};
