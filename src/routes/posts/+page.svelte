<script>
    import { goto } from "$app/navigation";
    import BlogPost from "../../components/BlogPost.svelte";

    export let data;
</script>

<div class="container">
    <div class="is-flex is-justify-content-space-between">
        <h3 class="title is-3">All Blog Posts</h3>
        <div>
            <button
                class="button is-primary has-text-white"
                on:click={() => goto("/posts/create")}>Create</button
            >
        </div>
    </div>
    {#each data.posts as post}
        <BlogPost {post} />
    {/each}
</div>
