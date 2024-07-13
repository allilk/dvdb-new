<script>
    import { goto } from "$app/navigation";

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
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong class="is-size-5 has-text-weight-bold"
                                >{post.title}</strong
                            >
                            <small><u>{post.author.name}</u></small>
                            <small
                                >{new Date(
                                    post.createdAt
                                ).toLocaleDateString()}</small
                            >
                            <br />
                            {post.content}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    {/each}
</div>
