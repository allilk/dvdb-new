import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { env } from "$env/dynamic/private";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Discord({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;

            return session;
        },
    },
});
