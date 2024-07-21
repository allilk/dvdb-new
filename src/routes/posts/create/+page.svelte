<script>
    import { goto } from "$app/navigation";
    import { toast } from "bulma-toast";
    import CreateEditPostForm from "../../../components/blog/CreateEditPostForm.svelte";

    let title = "";
    let image = "";
    let content = "";
    let tags = [];
    let description = "";

    let requestLoading = false;

    const createPost = async () => {
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
        const res = await fetch("/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                tags,
                image,
                description,
            }),
        });

        if (res.ok) {
            toast({
                message: "Post created successfully!",
                type: "is-success",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
            goto("/posts");
        } else {
            toast({
                message: "Failed to create post.",
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
    postFunction={createPost}
/>
