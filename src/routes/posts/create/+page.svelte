<script>
    import { goto } from "$app/navigation";
    import { toast } from "bulma-toast";

    let title = "";
    let content = "";

    const createPost = async () => {
        const res = await fetch("/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        if (res.ok) {
            toast({
                message: "Post created successfully!",
                type: "is-success",
            });
            goto("/posts");
        } else {
            toast({
                message: "Failed to create post.",
                type: "is-danger",
            });
        }
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
            />
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
            ></textarea>
        </div>
    </div>

    <div class="field">
        <div class="control">
            <button
                class="button is-primary has-text-white"
                type="submit"
                on:click={createPost}>Submit</button
            >
        </div>
    </div>
</div>
