fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        const productsDiv = document.getElementById('products');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = product.imageUrls[0];
            img.addEventListener('click', () => {
                window.location.href = `/product/${product._id}`;
            });
            productDiv.appendChild(img);
            productsDiv.appendChild(productDiv);
        });
    });
