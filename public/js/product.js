// Funciones auxiliares para manipular el DOM
const createElement = (tag, className, textContent, id) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    if (id) element.id = id;
    return element;
};

const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const resetSelection = (quantityInput) => {
    deselect(".color-circle");
    deselect(".size-label");
    quantityInput.value = 1;
    clearElement(document.getElementById('product-sizes'));
};

// Obtiene el ID del producto de la URL
const productSlug = window.location.pathname.split('/').pop();

// Funciones para deseleccionar colores y tallas
const deselect = (selector) => {
    document.querySelectorAll(selector).forEach(el => el.style.border = "none");
};

// Carga los detalles del producto
fetch(`/api/products/slug/${productSlug}`)
    .then(response => response.json())
    .then(product => {
        let selection = { price: product.price, name: product.name, slug: productSlug, size: "", color: "", quantity: 1, image: product.imageUrls[0] };

        // Carga el slider de imágenes
        const sliderDiv = document.querySelector('.image-silder-bottom');
        product.imageUrls.forEach(url => {
            const img = createElement('img');
            img.src = url;
            sliderDiv.appendChild(img);
        });

        // Carga el resto de la información del producto
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;

        // Configura el campo de cantidad y los botones
        const quantityDiv = document.getElementById('product-quantity');
        const decreaseButton = createElement('button', 'quantity-button', '-', 'decrease-button');
        const quantityInput = createElement('input', 'quantity-input', null, 'quantity-input');
        const increaseButton = createElement('button', 'quantity-button', '+', 'increase-button');
        const addToCartButton = createElement('button', null, 'Add to Cart', 'add-to-cart');

        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInput.value = 1;

        decreaseButton.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value--;
            }
        });

        increaseButton.addEventListener('click', () => {
            quantityInput.value++;
        });

        quantityDiv.appendChild(decreaseButton);
        quantityDiv.appendChild(quantityInput);
        quantityDiv.appendChild(increaseButton);
        quantityDiv.appendChild(addToCartButton);

        // Carga las opciones de color
        const colorsDiv = document.getElementById('product-colors');
        product.colors.forEach(color => {
            const colorCircle = createElement('div', 'color-circle');
            colorCircle.style.backgroundColor = color;
            colorsDiv.appendChild(colorCircle);

            colorCircle.addEventListener("click", () => {
                selection.size = "";
                selection.color = color;
                selection.quantity = 1; // Reinicia la cantidad
                quantityInput.value = 1; // Actualiza el campo de cantidad

                deselect(".color-circle");
                colorCircle.style.border = "2px solid black";

                const sizesDiv = document.getElementById('product-sizes');
                clearElement(sizesDiv);

                const colorStock = product.stock.filter(item => item.color === color);
                colorStock.forEach(obj => {
                    const sizeLabel = createElement('span', 'size-label', obj.size);
                    sizesDiv.appendChild(sizeLabel);

                    if (obj.quantity <= 0) {
                        sizeLabel.classList.add("size-label-out");
                    } else {
                        sizeLabel.addEventListener("click", () => {
                            deselect(".size-label");
                            sizeLabel.style.border = "2px solid black";
                            selection.size = obj.size;


                        });
                    }
                });
            });
        });

        addToCartButton.addEventListener("click", () => {
            selection.quantity = parseInt(quantityInput.value, 10);
            if (selection.size && selection.color && selection.quantity >= 1) {
                alert(`Added ${selection.quantity} item(s)`);
                const addItemEvent = new CustomEvent('addItem', { detail: selection });
                document.dispatchEvent(addItemEvent);
                resetSelection(quantityInput);
                selection = { price: product.price, name: product.name, slug: productSlug, size: "", color: "", quantity: 1, image: product.imageUrls[0] };
            } else {
                alert("Select a color, size, and enter a quantity of at least 1 to add product to your cart.");
            }
        });
    })
    .catch(error => {
        console.error("Error al cargar los detalles del producto:", error);
    });
