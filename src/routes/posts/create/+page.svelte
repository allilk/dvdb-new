<script>
    import { goto } from "$app/navigation";
    import { toast } from "bulma-toast";
    import TagsInput from "../../../components/TagsInput.svelte";

    let title = "";
    let content = "";
    let tags = [];

    let requestLoading = false;

    const createPost = async () => {
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
        const res = await fetch("/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                tags,
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

<!-- create blog post form -->

<div class="container is-max-desktop">
    <div class="field">
        <label class="label" for="title">Title</label>
        <div class="control">
            <input
                class="input"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                bind:value={title}
                disabled={requestLoading}
            />
        </div>
    </div>
    <div class="field">
        <label class="label" for="tags">Tags</label>
        <div class="control">
            <TagsInput bind:tags disabled={requestLoading} />
        </div>
    </div>

    <div class="field">
        <label class="label" for="content">Content</label>
        <div class="control">
            <textarea
                class="textarea"
                id="content"
                name="content"
                placeholder="Content"
                bind:value={content}
                disabled={requestLoading}
            ></textarea>
        </div>
    </div>

    <div class="field">
        <div class="control">
            <button
                class={`button is-primary has-text-white ${
                    requestLoading ? "is-loading" : ""
                }`}
                type="submit"
                on:click={createPost}>Submit</button
            >
        </div>
    </div>
</div>
