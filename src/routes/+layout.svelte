<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { afterNavigate } from "$app/navigation";
    import BurgerMenu from "../components/BurgerMenu.svelte";
    import { onMount } from "svelte";

    const normalUserMenuLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Blog",
            href: "/posts",
        },
    ];
    const unloggedInMenuLinks = [
        {
            name: "Login",
            href: "/login",
        },
    ];
    const loggedInMenuLinks = [
        {
            name: "Logout",
            href: "/",
        },
    ];
    let menuLinks = normalUserMenuLinks;

    $: menuLinks = normalUserMenuLinks.concat(
        $page.data.session ? loggedInMenuLinks : unloggedInMenuLinks
    );

    const toggleMenu = () => {
        const menu = document.querySelector(".mobile-menu");
        menu.classList.toggle("show");

        const main = document.querySelector(".main");
        main.classList.toggle("disable-scrolling");
    };

    afterNavigate(() => {
        // close the mobile menu when navigating to a new page
        if (document.querySelector(".mobile-menu").classList.contains("show")) {
            toggleMenu();
        }
    });

    onMount(() => {
        // listen for changes and close the mobile menu when screen size is greater than 1024px
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        mediaQuery.addEventListener("change", (e) => {
            if (
                e.matches &&
                document
                    .querySelector(".mobile-menu")
                    .classList.contains("show")
            ) {
                toggleMenu();
            }
        });
    });
</script>

<div class="container mobile-menu">
    <BurgerMenu {toggleMenu} />

    <aside class="menu p-4">
        <a class="menu-label" href="/">dvdb</a>
        <ul class="menu-list">
            {#each menuLinks as link}
                <a
                    class="navbar-item has-text-grey-lighter"
                    href={link.href}
                    on:click={() => link.name === "Logout" && signOut()}
                >
                    {link.name}
                </a>
            {/each}
        </ul>
    </aside>
</div>

<div class="container main">
    <section class="hero is-primary">
        <div class="hero-body is-flex">
            <a class="is-clickable" href="/">
                <p class="title has-text-white">dvdb</p>
                <p class="subtitle ml-2 has-text-grey-lighter">
                    preserved for the future.
                </p>
            </a>
            <BurgerMenu {toggleMenu} />
        </div>

        <div class="hero-foot">
            <div id="homeNavbar" class="navbar-menu px-2 py-1">
                <div class="navbar-end">
                    {#each menuLinks as link}
                        <a
                            class="navbar-item has-text-grey-lighter"
                            href={link.href}
                            on:click={() => link.name === "Logout" && signOut()}
                        >
                            {link.name}
                        </a>
                    {/each}

                    <a class="navbar-item has-text-grey-lighter" href="/">
                        <span class="icon mt-1">
                            <i class="fab fa-discord"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section class="section has-background-white pb-6">
        <slot />
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
