<script>
    import { goto } from "$app/navigation";
    import moment from "moment";

    export let post;
    export let openDeleteModal = (id) => {};

    const toggleDropdown = () => {
        const dropdown = document.querySelector(`.post-dropdown-${post.id}`);
        dropdown.classList.toggle("is-active");
    };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="card blog-post is-clickable"
    on:click={goto(`/posts/${post.shortId}`)}
>
    <figure class="image is-16by9">
        <img
            src={post?.image || "https://placehold.co/1280x720/png"}
            alt="Placeholder"
        />
    </figure>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="subtitle is-4 mb-1 has-text-weight-semibold">
                    {post.title}
                </p>
            </div>

            <!-- <div class={`dropdown post-dropdown-${post.id} is-right`}>
                <div class="dropdown-trigger">
                    <button
                        class="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        on:click={() => toggleDropdown()}
                    >
                        <span class="icon is-small">
                            <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a href="#" class="dropdown-item"> Edit </a>
                        <a class="dropdown-item"> Share </a>
                        <hr class="dropdown-divider" />
                        <button
                            class="dropdown-item has-text-danger-50"
                            on:click={() => openDeleteModal(post.id)}
                        >
                            Delete</button
                        >
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <div class="card-footer">
        <!-- <p>
            {post.content.substring(0, 300)}
            {#if post.content.length > 300}
                ...
                <a href={`/posts/${post.shortId}`}>Continue Reading -></a>
            {/if}
        </p>
        <br /> -->
        <!-- <p class="subtitle is-6 is-clickable is-flex mt-2">
            <figure class="image is-24x24 mr-2">
                <img src={post.author.image} alt="Placeholder" />
            </figure>
            <u>
                {post.author.name}
            </u>
        </p> -->
        <div class="card-footer-item">
            <small>{moment(post.createdAt).format("MMMM DD, YYYY ")} </small>
        </div>
        <div class="card-footer-item tags">
            <small>
                {#each post.tags as tag}
                    <span class="tag is-primary has-text-white mr-1 mb-1"
                        >#{tag}</span
                    >
                {/each}</small
            >
        </div>
    </div>
</div>
