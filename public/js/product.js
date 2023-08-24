// Obtiene el ID del producto de la URL
const productSlug = window.location.pathname.split('/').pop();
// Carga los detalles del producto
fetch(`/api/products/slug/${productSlug}`)
    .then(response => response.json())
    .then(product => {
        // Carga el slider de imágenes
        const sliderDiv = document.querySelector('.image-silder-bottom');
        product.imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            sliderDiv.appendChild(img);
        });

        // Carga el resto de la información del producto
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;

        // Carga las opciones de color
        const colorsDiv = document.getElementById('product-colors');
        product.colors.forEach(color => {
            const colorCircle = document.createElement('div');
            colorCircle.className = 'color-circle';
            colorCircle.style.backgroundColor = color;
            colorsDiv.appendChild(colorCircle);
        });

        // Carga las tallas disponibles
        const sizesDiv = document.getElementById('product-sizes');
        product.sizes.forEach(size => {
            const sizeLabel = document.createElement('span');
            sizeLabel.className = 'size-label';
            sizeLabel.textContent = size;
            sizesDiv.appendChild(sizeLabel);
        });
    })
    .catch(error => {
        console.error("Error al cargar los detalles del producto:", error);
    });
