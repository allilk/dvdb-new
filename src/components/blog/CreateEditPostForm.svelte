<script>
    import { Carta, MarkdownEditor } from "carta-md";
    import DOMPurify from "isomorphic-dompurify";
    import { emoji } from "@cartamd/plugin-emoji";
    import TagsInput from "./TagsInput.svelte";

    export let image;
    export let title;
    export let tags = [];
    export let content;
    export let description;
    export let isPublished = false;

    export let requestLoading = false;

    export let postFunction;

    const carta = new Carta({
        sanitizer: DOMPurify.sanitize,
        extensions: [emoji()],
    });
</script>

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
            <small class="has-text-grey-light"
                >Use a URL to an image for the post. This image will show to the
                right of your post on desktop, and at the top on mobile.</small
            >
        </div>
    </div>

    <div class="field">
        <label class="label" for="tags">Tags</label>
        <div class="control">
            <TagsInput bind:tags disabled={requestLoading} />
            <small class="has-text-grey-light"
                >Add tags to help categorize your post. You can not input more
                than 5 different tags. Press enter to add the tag.</small
            >
        </div>
    </div>
    <div class="field">
        <label class="label" for="description">Description</label>
        <div class="control">
            <textarea
                class="textarea"
                id="description"
                name="description"
                placeholder="Description"
                length="1000"
                bind:value={description}
                disabled={requestLoading}
            ></textarea>
            <small class="has-text-grey-light"
                >A short description of your post. This will show to the left of
                your primary image on desktop, and below it on mobile.
                Description length is limited to <b>1000</b> characters.</small
            >
        </div>
    </div>
    <div class="field">
        <label class="label" for="content">Content</label>

        <div class="control">
            <MarkdownEditor
                {carta}
                bind:value={content}
                disabled={requestLoading}
            />
            <small class="has-text-grey-light"
                >Use Markdown to format your content.</small
            >
        </div>
    </div>

    <div class="is-flex is-pulled-right">
        <div class="field is-flex mt-2">
            <label class="label" for="isPublished">Publish?</label>
            <div class="pl-3 control">
                <input
                    class="checkbox"
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    bind:checked={isPublished}
                    disabled={requestLoading}
                />
            </div>
        </div>
        <div class="field ml-4">
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
</div>
