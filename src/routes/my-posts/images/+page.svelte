<script>
    import { toast } from "bulma-toast";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let image = null;
    let imageUploadLoading = false;
    let imageURL = "";

    let myImages = [];

    const currentUser = $page.data.session.user;

    const uploadImageToS3 = async (file) => {
        if (imageUploadLoading) return;
        imageUploadLoading = true;

        const response = await fetch("/api/images/getPresignedURL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
            }),
        });

        const data = await response.json();

        const uploadResponse = await fetch(data.url, {
            method: "PUT",
            body: file,
            headers: {},
        });

        if (uploadResponse.ok) {
            toast({
                message: "Image uploaded successfully!",
                type: "is-success",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });

            image = null;
            imageUploadLoading = false;
            imageURL = `https://i.dvdb.video/i/${currentUser.id}/${file.name}`;
        } else {
            toast({
                message: "Failed to upload image.",
                type: "is-danger",
                animate: { in: "slideInRight", out: "slideOutRight" },
            });
        }
    };

    onMount(async () => {
        const response = await fetch(`/api/images?userId=${currentUser.id}`);
        const data = await response.json();

        myImages = data;
    });
</script>

<div class="columns is-centered">
    {#if image}
        <div class="is-half has-text-centered">
            <button
                class={`button is-success has-text-white mb-2 ${imageUploadLoading ? "is-loading" : ""}`}
                on:click={() => uploadImageToS3(image)}
                disabled={imageUploadLoading}
            >
                Upload
            </button>
            <figure class="image">
                <img src={URL.createObjectURL(image)} alt={image.name} />
            </figure>
        </div>
    {:else if imageURL}
        <div class="is-half has-text-centered">
            <a href={imageURL} target="_blank">
                {imageURL}
            </a>
        </div>
    {:else}
        <div class="file is-boxed">
            <label class="file-label">
                <input
                    class="file-input"
                    type="file"
                    name="image"
                    accept="image/*"
                    on:change={(e) => {
                        image = e.target.files[0];
                    }}
                />
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a image </span>
                </span>
            </label>
        </div>
    {/if}
</div>

<h4 class="title is-4 has-text-centered">Your Images</h4>
{#if myImages.length === 0}
    <p>No images found.</p>
{:else}
    <div class="columns is-multiline">
        {#each myImages || [] as image}
            <div class="column is-one-quarter">
                <figure class="image is-1by1">
                    <img src={image.url} alt={image.key} />
                </figure>
            </div>
        {/each}
    </div>
{/if}
