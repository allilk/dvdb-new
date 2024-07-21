<script>
    import BlogPost from "../components/blog/BlogPost.svelte";

    export let data = {
        posts: [],
    };
</script>

<div class="container">
    <h3 class="title is-3">Recent Blog Posts</h3>
    <div class="columns is-tablet is-flex-wrap-wrap">
        {#each data.posts as post}
            <div class="column is-one-third">
                <BlogPost {post} />
            </div>
        {/each}
    </div>
</div>
