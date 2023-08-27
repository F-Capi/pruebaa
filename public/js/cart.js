window.onload = () => {
    const wrapper = document.querySelector("#wrapper");
    const cartContainer = document.querySelector(".cart-container");
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    let cartbox = document.querySelector(".cart");
    let cartCount = document.querySelector("#cart-count");

    const cart = {
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],

        createAmountElement: function (element, item, index) {
            let addElement = document.createElement("span");
            addElement.classList.add("material-symbols-outlined");
            addElement.innerHTML = "add";

            let reElement = document.createElement("span");
            reElement.classList.add("material-symbols-outlined");
            reElement.innerHTML = "remove";

            let delElement = document.createElement("span");
            delElement.classList.add("material-symbols-outlined");
            delElement.innerHTML = "delete";

            let pri = document.createElement("span");
            pri.innerHTML = item.price + "$";

            element.querySelector(".flex-end").appendChild(delElement);
            element.querySelector(".flex-end").appendChild(pri);
            let q = document.createElement("span");
            q.innerHTML = item.quantity;

            addElement.addEventListener("click", () => {
                this.cartItems[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
                this.renderCart();
            });

            reElement.addEventListener("click", () => {
                if (this.cartItems[index].quantity - 1 <= 0) {
                    this.cartItems.splice(index, 1);
                } else {
                    this.cartItems[index].quantity -= 1;
                }
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
                this.renderCart();
            });

            delElement.addEventListener("click", () => {

                this.cartItems.splice(item.index, 1);
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
                this.renderCart();
            });


            let amountContainer = element.querySelector(".cart-item-amount-container");
            amountContainer.appendChild(reElement);
            amountContainer.appendChild(q);
            amountContainer.appendChild(addElement);
            return amountContainer;
        },

        createItem: function (item, index) {
            let element = document.createElement("div");
            element.classList.add("cart-item");
            element.innerHTML = `<div class="cart-image"><img src=${item.image} alt=""></div>
            <div class="cart-item-info">
                <h2 class="subtitle">${item.name}</h2>
                <div class="details">
                    <span class="color-cart" style="background:${item.color}"></span>
                    <span>${item.size}</span>
                </div>
                <div class="cart-item-amount-container">
                </div>
            </div>
            <div class="flex-end">
            </div>`;
            this.createAmountElement(element, item, index);
            return element;
        },

        setCount: function () {

        },
        renderCart: function () {
            cartbox.innerHTML = "";
            for (let i = 0; i < this.cartItems.length; i++) {
                const itemElement = this.createItem(this.cartItems[i], i);
                itemElement.setAttribute('data-index', i);
                cartCount.innerHTML = this.cartItems.length
                cartbox.appendChild(itemElement);
            }
        },

        showCart: function () {
            cartContainer.classList.add("activecart");
            wrapper.classList.add("wrapperactive");
        },

        closeCart: function () {
            cartContainer.classList.remove("activecart");
            wrapper.classList.remove("wrapperactive");
        },

        addData: function (event) {
            const newItem = event.detail;
            newItem.quantity = Number(newItem.quantity);

            let index = this.cartItems.findIndex(objeto => {
                return (
                    objeto.slug === newItem.slug &&
                    objeto.color === newItem.color &&
                    objeto.size === newItem.size
                );
            });

            if (index === -1) {
                this.cartItems.push(newItem);
            } else {
                this.cartItems[index].quantity += newItem.quantity;
            }

            localStorage.setItem('cart', JSON.stringify(this.cartItems));
            this.renderCart();
            this.showCart();
        },

        removeData: function (event) {
            const itemToRemove = event.detail;
            const index = this.cartItems.findIndex(item =>
                item.slug === itemToRemove.slug &&
                item.size === itemToRemove.size &&
                item.color === itemToRemove.color
            );

            if (index !== -1) {
                this.cartItems.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
            this.renderCart();
        },

        loadData: function () {
            this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            this.renderCart();
        }
    };

    document.addEventListener('addItem', cart.addData.bind(cart));
    document.addEventListener('removeItem', cart.removeData.bind(cart));
    openCartBtn.addEventListener('click', cart.showCart);
    closeCartBtn.addEventListener('click', cart.closeCart);

    cart.loadData();
};
