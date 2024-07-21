export const selectNoAuthPostsProps = {
    shortId: true,
    title: true,
    image: true,
    description: true,
    content: true,
    createdAt: true,
    tags: true,
    author: {
        select: {
            name: true,
            image: true,
        },
    },
};

export const selectOwnUserPostsProps = {
    ...selectNoAuthPostsProps,
    published: true,
    id: true,
};
