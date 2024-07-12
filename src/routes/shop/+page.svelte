<script>
    let cart = [];
    let products = [
        {
            id: 1,
            name: "Milk",
            price: 1.99,
        },
        {
            id: 2,
            name: "Cheese",
            price: 2.99,
        },
        {
            id: 3,
            name: "Yogurt",
            price: 0.99,
        },
        {
            id: 4,
            name: "Butter",
            price: 1.49,
        },
        {
            id: 5,
            name: "Cream",
            price: 1.99,
        },
        {
            id: 6,
            name: "Ice Cream",
            price: 3.99,
        },
        {
            id: 7,
            name: "Cottage Cheese",
            price: 2.49,
        },
    ];

    function addToCart(product) {
        cart = [...cart, product];
    }

    function removeFromCart(product) {
        cart = cart.filter((p) => p.id !== product.id);
    }

    function getTotal(cart) {
        return cart.reduce((acc, product) => acc + product.price, 0);
    }

    function openModal() {
        const modal = document.getElementById("cart-modal");
        modal.classList.add("is-active");
    }

    function closeModal() {
        const modal = document.getElementById("cart-modal");
        modal.classList.remove("is-active");
    }
</script>

<div class="container">
    <section class="hero is-medium is-link">
        <div class="hero-body">
            <p class="title">milk shop</p>
            <p class="subtitle">owo?</p>
        </div>
    </section>

    <!-- Cart navbar -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <button
                        class="button pl-3 pr-2 shopping-cart-button"
                        on:click={openModal}
                    >
                        <span class="icon">
                            <i class="fas fa-shopping-cart"></i>
                        </span>
                        <span class="">Cart</span>
                        <span class="tag">{cart.length}</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    <!-- Cart modal -->
    <div class="modal" id="cart-modal">
        <div class="modal-background" on:click={closeModal}></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Your cart</p>
                <button class="delete" aria-label="close" on:click={closeModal}
                ></button>
            </header>
            <section class="modal-card-body">
                <ul>
                    {#each cart as product}
                        <li>{product.name} - ${product.price}</li>
                    {/each}
                </ul>
            </section>
            <footer class="modal-card-foot">
                <p>Total: ${getTotal(cart)}</p>
            </footer>
        </div>
    </div>

    <section class="grid is-col-min-12">
        {#each products as product}
            <div class="card mb-1">
                <div class="card-content">
                    <div class="content">
                        <p>{product.name}</p>
                        <p>${product.price}</p>
                    </div>
                </div>
                <footer class="card-footer">
                    <div class="card-footer-item">
                        <button
                            class="button is-primary"
                            on:click={() => addToCart(product)}
                            >Add to cart</button
                        >
                    </div>
                </footer>
            </div>
        {/each}
    </section>
</div>
