<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { signIn } from "@auth/sveltekit/client";
    import { onMount } from "svelte";

    onMount(() => {
        if ($page.data.session) {
            goto("/");
        }
    });
</script>

<!-- <nav>
    <p>
        These actions are all using the methods exported from
        <code>@auth/sveltekit/client</code>
    </p>
    <div class="actions">
        <div class="wrapper-form">
            <button on:click={() => signIn("discord")}
                >Sign In with Discord</button
            >
        </div>
        <div class="wrapper-form">
            <div class="input-wrapper">
                <label for="password">Password</label>
                <input
                    bind:value={password}
                    type="password"
                    id="password"
                    name="password"
                    required
                />
            </div>
            <button on:click={() => signIn("credentials", { password })}>
                Sign In with Credentials
            </button>
            <button on:click={() => signOut()}> Sign Out </button>
        </div>
    </div>
</nav> -->

<div class="container login-fields">
    <div class="field">
        <label class="label" for="username">Username</label>
        <div class="control has-icons-left has-icons-right">
            <input
                class="input is-primary"
                type="text"
                placeholder="Username"
                value=""
                id="username"
            />
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
            <!-- <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
            </span> -->
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
    </div>
    <div class="field">
        <label class="label" for="password">Password</label>
        <p class="control has-icons-left">
            <input
                class="input is-primary"
                type="password"
                placeholder="Password"
                value=""
                id="password"
            />
            <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
            </span>
        </p>
    </div>
    <div class="field has-text-centered mb-1">
        <button class="button is-primary has-text-white login-button"
            >Login</button
        >
    </div>
    <hr class="login-hr" />
    <div class="field has-text-centered mt-1">
        <button class="button login-button" on:click={() => signIn("discord")}
            >Login With Discord</button
        >
    </div>
</div>
