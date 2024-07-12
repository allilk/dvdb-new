<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
</script>

<div class="container">
    <section class="hero is-primary">
        <div class="hero-body is-flex">
            <a class="is-clickable" href="/">
                <p class="title has-text-white">dvdb</p>
                <p class="subtitle ml-2 has-text-grey-lighter">
                    preserved for the future.
                </p>
            </a>
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
                    {#if !$page.data.session}
                        <a
                            class="navbar-item has-text-grey-lighter"
                            href="/login"
                        >
                            Login
                        </a>
                    {:else}
                        <button
                            class="navbar-item has-text-grey-lighter"
                            on:click={() => signOut()}
                        >
                            Logout
                        </button>
                    {/if}

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
