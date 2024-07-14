<script>
    import { createEventDispatcher } from "svelte";

    export let show = false;
    export let title = "Are you sure?";
    export let message = "This action cannot be undone.";
    export let confirmText = "Confirm";
    export let cancelText = "Cancel";

    const dispatch = createEventDispatcher();

    function confirm() {
        dispatch("confirm");
    }

    function cancel() {
        dispatch("cancel");
    }
</script>

<div class={`modal ${show ? "is-active" : ""}`}>
    <button class="modal-background" on:click={cancel}></button>
    <div class="modal-card">
        <header class="modal-card-head">
            <p
                class="modal-card
            -title"
            >
                {title}
            </p>
            <button class="delete" aria-label="close" on:click={cancel}
            ></button>
        </header>
        <section class="modal-card-body">
            <p>{message}</p>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger mr-1" on:click={confirm}
                >{confirmText}</button
            >
            <button class="button" on:click={cancel}>{cancelText}</button>
        </footer>
    </div>
</div>
