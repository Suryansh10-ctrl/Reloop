document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');
    const API_BASE_URL = 'http://localhost:5000';

    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Could not fetch products.');
        }

        const products = data.products;
        productGrid.innerHTML = ''; 

        if (products.length === 0) {
            productGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'role-card'; 
            productCard.style.maxWidth = '300px';
            productCard.innerHTML = `
                <img src="${product.images[0] || 'https://via.placeholder.com/150'}" alt="${product.title}" style="width:100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <div style="font-weight: bold; margin-top: 1rem; font-size: 1.2rem;">$${product.price}</div>
                <p style="font-size: 0.9rem; color: #777;">Maker: ${product.maker.name}</p>
            `;
            productGrid.appendChild(productCard);
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<p>Error loading products. Please try again.</p>';
    }
});