<script>
    import { goto } from "$app/navigation";

    export let data;
</script>

<div class="container">
    <div class="is-flex is-justify-content-space-between">
        <h3 class="title is-3">{data.post.title}</h3>
        <div>
            <button
                class="button is-primary has-text-white"
                on:click={() => goto("/posts")}>Back</button
            >
        </div>
    </div>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p>
                        <small
                            ><u>
                                {data.post.author.name}
                            </u></small
                        >
                        <small
                            >{new Date(
                                data.post.createdAt
                            ).toLocaleDateString()}</small
                        >
                        <br />
                        {data.post.content}
                    </p>
                </div>
            </div>
        </article>
    </div>
</div>
