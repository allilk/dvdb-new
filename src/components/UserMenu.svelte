<script>
    import { onNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";

    const currentUser = $page.data.session.user;
    export let mobileMenuLinks = [];
    export let dropdownClass = "layout-dropdown";

    const toggleUserDropdown = () => {
        const dropdown = document.querySelector(`.${dropdownClass}`);
        dropdown.classList.toggle("is-active");
    };

    onNavigate(() => {
        // close the dropdown when navigating
        const dropdown = document.querySelector(`.${dropdownClass}`);
        dropdown.classList.remove("is-active");
    });
</script>

<div class={`dropdown ${dropdownClass} is-right px-3`}>
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
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
            {#if mobileMenuLinks.length > 0}
                {#each mobileMenuLinks as link}
                    <a class="dropdown-item" href={link.href}>{link.name}</a>
                {/each}
                <hr class="dropdown-divider" />
            {/if}
            <a href="/profile" class="dropdown-item"> My Profile </a>
            {#if currentUser?.roles.includes("Blogger") || currentUser?.roles.includes("Admin")}
                <a href="/my-posts" class="dropdown-item"> My Posts </a>
            {/if}
            <hr class="dropdown-divider" />
            <button class="dropdown-item" on:click={signOut}> Logout</button>
        </div>
    </div>
</div>
