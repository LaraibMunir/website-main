// Function to get the product ID from the URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch product details by ID and display them
function fetchProductDetails(productId) {
    fetchProductById(productId).then(product => {
        if (product) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `Price: ${product.price}`;
            document.getElementById('product-description').textContent = product.description;

            // Check if the product image URL is valid
            const img = document.getElementById('product-image');
            const testImage = new Image();
            testImage.src = product.image;

            testImage.onload = function() {
                img.src = product.image;
                img.alt = product.name;
            };

            testImage.onerror = function() {
                img.src = 'assets/default_image.jpg'; // Fallback image
                img.alt = 'Image not available';
            };




            // Update the Add to Cart button to use the correct product details
            const addToCartBtn = document.getElementById('add-to-cart-btn');
            addToCartBtn.addEventListener('click', function () {
                const quantity = document.getElementById('quantity').value;
                addToCart(product.id, product.name, product.price); // Call addToCart with product details
            });



        } else {
            document.querySelector('.product-details-container').innerHTML = '<p>Product not found.</p>';
        }
    });
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display product details
    const productId = getProductIdFromURL();
    fetchProductDetails(productId);
});
