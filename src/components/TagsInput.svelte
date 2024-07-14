<!-- Tags Input -->
<script>
    import { createEventDispatcher } from "svelte";

    export let tags = [];
    export let disabled = false;

    const dispatch = createEventDispatcher();

    function addTag(event) {
        if (event.key === "Enter") {
            const tag = event.target.value.trim();
            if (tag) {
                tags = createTags(tags, tag);
                dispatch("add", tags);
                event.target.value = "";
            }
        }
    }

    function removeTag(tag) {
        tags = tags.filter((t) => t !== tag);
        dispatch("remove", tags);
    }

    function createTags(tags, tag) {
        return [...new Set([...tags, tag])];
    }
</script>

<div class="tags">
    {#each tags as tag}
        <span class="tag is-primary has-text-white">
            {tag}
            <button
                class="delete is-small"
                on:click={() => removeTag(tag)}
                {disabled}
            ></button>
        </span>
    {/each}
</div>
<div class="field">
    <div class="control">
        <input
            class="input"
            type="text"
            placeholder="Add a tag"
            on:keydown={addTag}
            {disabled}
        />
    </div>
</div>
