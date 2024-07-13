<script>
    import moment from "moment";

    export let post;

    console.log(post);
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
        </div>
        <div class="content">
            <p>
                {post.content.substring(0, 300)}
                {#if post.content.length > 300}
                    ...
                    <a href={`/posts/${post.id}`}>Continue Reading -></a>
                {/if}
            </p>
            <br />
            <small>{moment(post.createdAt).format("MMMM DD, YYYY ")}</small>
        </div>
    </div>
    <!-- <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
    </footer> -->
</div>
