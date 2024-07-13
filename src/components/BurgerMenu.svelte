<script>
    export let toggleMenu = () => {};
</script>

<div
    class="navbar-burger is-pulled-right is-clickable has-text-grey-lighter"
    data-target="homeNavbar"
    on:click={toggleMenu}
>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
