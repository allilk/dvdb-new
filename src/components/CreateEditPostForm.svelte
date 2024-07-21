<script>
    import TagsInput from "./TagsInput.svelte";

    export let image;
    export let title;
    export let tags = [];
    export let content;
    export let requestLoading = false;

    export let postFunction;
</script>

<div class="container is-max-desktop">
    <div class="field">
        <label class="label" for="image">Image URL</label>
        <div class="control">
            <input
                class="input"
                type="text"
                id="image"
                name="image"
                placeholder="Image URL"
                bind:value={image}
                disabled={requestLoading}
            />
        </div>
    </div>
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
                on:click={postFunction}>Submit</button
            >
        </div>
    </div>
</div>
