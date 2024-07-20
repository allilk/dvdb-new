export const canUserBlogPost = (roles) =>
    roles.includes("Blogger") || roles.includes("Admin");
