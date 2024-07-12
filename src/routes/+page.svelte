<script>
    const blogPosts = [
        {
            id: 1,
            title: "Welcome to dvdb!",
            content:
                "Welcome to dvdb! We are a new website dedicated to preserving the past for the future. We hope you enjoy your stay!",
            postedBy: "dvdb Team",
            postedAt: new Date().getTime(),
        },
        // {
        //     id: 2,
        //     title: "New Additions",
        //     content:
        //         "We have no new additions at this time. Check back later for more updates!",
        // },
        // {
        //     id: 3,
        //     title: "Recent Blog Posts",
        //     content:
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, ultricies nunc nec, tincidunt nunc. Nullam auctor, nunc nec ultricies ultricies, nunc nunc. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
        // },
    ];
</script>

<div class="container">
    <h3 class="title is-3">Recent Blog Posts</h3>
    {#each blogPosts as post}
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong class="is-size-5 has-text-weight-bold"
                                >{post.title}</strong
                            >
                            <small
                                ><u>
                                    {post.postedBy}
                                </u></small
                            >
                            <small
                                >{new Date(
                                    post.postedAt
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
