<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import BlogPost from "../../components/BlogPost.svelte";

    export let data;
</script>

<div class="container">
    <div class="is-flex is-justify-content-space-between">
        <h3 class="title is-3">All Blog Posts</h3>
        <div>
            {#if $page.data.session}
                <button
                    class="button is-primary has-text-white"
                    on:click={() => goto("/posts/create")}>Create</button
                >
            {/if}
        </div>
    </div>
    {#each data.posts as post}
        <BlogPost {post} />
    {/each}
</div>
