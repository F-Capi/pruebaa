window.onload = () => {
    const wrapper = document.querySelector("#wrapper");

    const cartContainer = document.querySelector(".cart-container");
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');

    const cart = {

        showCart: () => {
            cartContainer.classList.add("activecart");
            wrapper.classList.add("wrapperactive");

        },
        closeCart: () => {
            cartContainer.classList.remove("activecart");
            wrapper.classList.remove("wrapperactive");
        }
    }

    // Vincula los métodos del objeto cart a los botones
    openCartBtn.addEventListener('click', cart.showCart);
    closeCartBtn.addEventListener('click', cart.closeCart);
}
