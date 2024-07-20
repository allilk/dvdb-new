<script>
    import { page } from "$app/stores";
    import BlogPost from "../../components/BlogPost.svelte";
    import { goto } from "$app/navigation";
    import { afterNavigate } from "$app/navigation";

    let myPosts = [];
    let currentPage = 1;
    let pages = 1;

    const currentUser = $page.data.session.user;

    afterNavigate(() => {
        const urlParams = new URLSearchParams(window.location.search);
        currentPage = parseInt(urlParams.get("page")) || 1;

        myPosts = [];

        promise = getNextPage(currentPage);
    });

    const getNextPage = (page) =>
        fetch(`/api/posts?authorId=${currentUser.id}&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                pages = data.pages;

                return (myPosts = data.posts);
            });
</script>

<div class="container">
    <h3 class="title is-3">My Blog Posts</h3>
    <button
        class="button is-primary has-text-white mb-1"
        on:click={() => goto("/my-posts/images")}
    >
        Upload images
    </button>
    {#await myPosts}
        <p>Loading...</p>
    {:then posts}
        {#if posts.length === 0}
            <p>No posts found.</p>
        {:else}
            <div class="columns is-tablet is-flex-wrap-wrap">
                {#each posts as post}
                    <div class="column is-one-third">
                        <BlogPost {post} />
                    </div>
                {/each}
            </div>
            <nav class="pagination" aria-label="pagination">
                <button
                    class="pagination-previous"
                    on:click={() => goto(`/my-posts?page=${currentPage - 1}`)}
                    disabled={currentPage === 1}>Previous</button
                >
                <button
                    on:click={() => goto(`/my-posts?page=${currentPage + 1}`)}
                    class="pagination-next"
                    disabled={pages === currentPage}>Next page</button
                >
                <ul class="pagination-list">
                    {#each Array.from({ length: pages }, (_, i) => i + 1) as page}
                        <li>
                            <a
                                href={`/my-posts?page=${page}`}
                                class="pagination-link"
                                aria-label={`Goto page ${page}`}>{page}</a
                            >
                        </li>
                    {/each}
                </ul>
            </nav>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>
