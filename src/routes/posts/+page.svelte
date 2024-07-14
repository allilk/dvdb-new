<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import AreYouSureModal from "../../components/AreYouSureModal.svelte";
    import BlogPost from "../../components/BlogPost.svelte";

    export let data = {
        posts: [],
    };

    let postToDelete = null;
    let openDeleteModal = false;
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
    <AreYouSureModal
        bind:show={openDeleteModal}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        on:confirm={(e) => console.log(postToDelete)}
        on:cancel={() => (openDeleteModal = false)}
    />
    <div class="columns is-flex-wrap-wrap">
        {#each data.posts as post}
            <div class="column is-one-third">
                <BlogPost
                    {post}
                    openDeleteModal={(id) => {
                        console.log(postToDelete, openDeleteModal);
                        postToDelete = id;
                        openDeleteModal = true;
                    }}
                />
            </div>
        {/each}
    </div>
</div>
