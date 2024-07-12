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
    <section class="hero is-primary">
        <div class="hero-body is-flex">
            <div>
                <p class="title has-text-white">dvdb</p>
                <p class="subtitle ml-2 has-text-grey-lighter">
                    preserved for the future.
                </p>
            </div>
            <div class="navbar-burger is-pulled-right" data-target="homeNavbar">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="hero-foot">
            <div id="homeNavbar" class="navbar-menu px-2 py-1">
                <div class="navbar-end">
                    <a class="navbar-item has-text-grey-lighter"> Login </a>
                    <a class="navbar-item has-text-grey-lighter">
                        <span class="icon mt-1">
                            <i class="fab fa-discord"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section class="section has-background-white pb-6">
        <!-- <div class="container">
            <h3 class="title is-3">New Additions</h3>
            <p>No new additions!</p>
        </div> -->
        <br />
        <br />
        <div class="container">
            <h3 class="title is-3">Recent Blog Posts</h3>
            {#each blogPosts as post}
                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong
                                        class="is-size-5 has-text-weight-bold"
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
        <div class="py-6" />
        <div class="py-6" />
        <div class="py-6" />
        <div class="py-6" />
    </section>

    <footer class="footer has-background-primary has-text-grey-lighter">
        <div class="content has-text-centered">
            <p>
                © 2024 <strong class="has-text-white">dvdb</strong>, All rights
                reserved.
            </p>
        </div>
    </footer>
</div>
