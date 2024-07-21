<script>
    import { onNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { sineInOut } from "svelte/easing";
    import { scale } from "svelte/transition";

    const currentUser = $page.data.session.user;
    export let mobileMenuLinks = [];
    export let dropdownClass = "";
    let showDropdown = false;

    const toggleUserDropdown = () => {
        showDropdown = !showDropdown;
    };

    onNavigate(() => {
        // close the dropdown when navigating
        showDropdown = false;
    });
</script>

<div class={`dropdown is-active is-right px-3 ${dropdownClass}`}>
    <div class="dropdown-trigger">
        <button
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            class="is-flex has-text-grey-lighter"
            on:click={() => toggleUserDropdown()}
        >
            <figure
                class={`image is-${mobileMenuLinks.length > 0 ? "48x48" : "32x32"} mt-2`}
            >
                <img src={currentUser.image} class="profile-image" alt="USER" />
            </figure>
        </button>
    </div>
    {#if showDropdown}
        <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu"
            transition:scale={{
                duration: 200,
                delay: 0,
                easing: sineInOut,
            }}
        >
            <div class="dropdown-content">
                {#if mobileMenuLinks.length > 0}
                    {#each mobileMenuLinks as link}
                        <a class="dropdown-item" href={link.href}>{link.name}</a
                        >
                    {/each}
                    <hr class="dropdown-divider" />
                {/if}
                <a href="/profile" class="dropdown-item"> My Profile </a>
                {#if currentUser?.roles.includes("Blogger") || currentUser?.roles.includes("Admin")}
                    <a href="/my-posts" class="dropdown-item"> My Posts </a>
                {/if}
                <hr class="dropdown-divider" />
                <button class="dropdown-item" on:click={signOut}>
                    Logout</button
                >
            </div>
        </div>
    {/if}
</div>
