<script>
    import { toast } from "bulma-toast";
    import CreateEditPostForm from "../../../../components/CreateEditPostForm.svelte";
    import { goto } from "$app/navigation";

    export let data = {
        post: [],
    };

    let title = data.post.title || "";
    let image = data.post.image || "";
    let content = data.post.content || "";
    let tags = data.post.tags || [];
    let requestLoading = false;

    export const editPost = async () => {
        if (requestLoading) return;
        if (!title || !content || tags.length === 0) {
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

    $: console.log(image);
</script>

<CreateEditPostForm
    bind:title
    bind:image
    bind:tags
    bind:content
    {requestLoading}
    postFunction={editPost}
/>
