<script>
    import moment from "moment";
    import { Carta, Markdown } from "carta-md";

    export let data = {
        post: {},
    };

    const carta = new Carta();
</script>

<div class="container blog-post-page is-flex is-flex-direction-column">
    <div class="columns">
        <div class="column">
            <h1 class="title">{data.post?.title}</h1>
            <p>{data.post?.description}</p>
        </div>
        <div class="column is-two-fifths">
            <figure class="image is-16by9">
                <img
                    src={data.post?.image ||
                        "https://placehold.co/1280x720/png"}
                    alt="Placeholder"
                />
            </figure>
            <div class="columns pt-1">
                <div class="column is-half">
                    <p class="is-size-7 has-text-grey-light">
                        {moment(data.post?.createdAt).format("MMMM Do, YYYY")}
                    </p>
                </div>
                <div
                    class="column is-flex is-justify-content-end is-flex-wrap-wrap pb-0"
                >
                    {#each data.post?.tags as tag}
                        <span class="tag is-primary has-text-white mr-1 mb-1"
                            >#{tag}</span
                        >
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <Markdown {carta} value={data.post?.content} />
    </div>
</div>
