<script>
    import { toast } from "bulma-toast";
    import CreateEditPostForm from "../../../../components/blog/CreateEditPostForm.svelte";
    import { goto } from "$app/navigation";

    export let data = {
        post: [],
    };

    let title = data.post.title || "";
    let image = data.post.image || "";
    let content = data.post.content || "";
    let tags = data.post.tags || [];
    let description = data.post.description || "";
    let requestLoading = false;

    export const editPost = async () => {
        if (requestLoading) return;
        if (description.length > 1000) {
            toast({
                message: "Description is too long.",
                type: "is-danger",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
            return;
        }
        if (!title || !content || !description || tags.length === 0) {
            toast({
                message: "Please fill in all fields.",
                type: "is-danger",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
            return;
        }

        requestLoading = true;
        const res = await fetch(`/api/posts/create`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                tags,
                image,
                description,
                shortId: data.post.shortId,
            }),
        });

        if (res.ok) {
            toast({
                message: "Post updated successfully!",
                type: "is-success",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
            goto(`/posts/${data.post.shortId}`);
        } else {
            toast({
                message: "Failed to update post.",
                type: "is-danger",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
        }

        requestLoading = false;
    };
</script>

<CreateEditPostForm
    bind:title
    bind:image
    bind:tags
    bind:content
    bind:description
    {requestLoading}
    postFunction={editPost}
/>
