import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { env } from "$env/dynamic/private";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import credentials from "@auth/sveltekit/providers/credentials";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (
                    user &&
                    bcrypt.compareSync(credentials.password, user.password)
                )
                    return user;

                return null;
            },
        }),
        Discord({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.provider == "credentials") {
                token.id = user.dataValues.id;
            }

            if (account) {
                console.log(user);
                token.roles = user?.roles || [];
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.roles = token.roles;
            session.user.id = token.id;

            return session;
        },
    },
});
