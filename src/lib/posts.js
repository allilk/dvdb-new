export const selectNoAuthPostsProps = {
    title: true,
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
    title: true,
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
