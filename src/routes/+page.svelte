<script>
    import BlogPost from "../components/BlogPost.svelte";

    export let data = {
        posts: [],
    };
</script>

<div class="container">
    <h3 class="title is-3">Recent Blog Posts</h3>
    {#each data.posts as post}
        <BlogPost {post} />
    {/each}
</div>
