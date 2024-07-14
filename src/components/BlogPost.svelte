<script>
    import moment from "moment";

    export let post;
    export let openDeleteModal = (id) => {};

    const toggleDropdown = () => {
        const dropdown = document.querySelector(`.post-dropdown-${post.id}`);
        dropdown.classList.toggle("is-active");
    };
</script>

<div class="card blog-post">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src={post.author.image} alt="Placeholder" />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-3 mb-1">{post.title}</p>
                <p class="subtitle is-6 is-clickable">
                    posted by{" "}
                    <u>
                        {post.author.name}
                    </u>
                </p>
            </div>

            <div class={`dropdown post-dropdown-${post.id} is-right`}>
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
            </div>
        </div>
        <div class="content">
            <p>
                {post.content.substring(0, 300)}
                {#if post.content.length > 300}
                    ...
                    <a href={`/posts/${post.shortId}`}>Continue Reading -></a>
                {/if}
            </p>
            <br />
            <small>{moment(post.createdAt).format("MMMM DD, YYYY ")} </small>
            <div class="is-pulled-right">
                <small>
                    {#each post.tags as tag}
                        <span class="tag is-primary has-text-white mr-1"
                            >{tag}</span
                        >
                    {/each}</small
                >
            </div>
        </div>
    </div>
</div>
