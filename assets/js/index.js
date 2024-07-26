document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzN2MxMmYyNjBjYzAwMTVjYzBlNTYiLCJpYXQiOjE3MjE5OTAxNjIsImV4cCI6MTcyMzE5OTc2Mn0.5yPTZn0Qk7Yz1ZKLNKZpxyjK7BgMJpFaSJAZN0kD_Hg";

  function fetchProducts() {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((products) => {
        displayProducts(products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayProducts(products) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach((product) => {
      const productCard = `
        <div class="col-md-3 mb-4">
          <div class="card">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <a href="detail.html?id=${product._id}" class="btn btn-primary">View Details</a>
              <button class="btn btn-secondary mt-2" onclick="editProduct('${product._id}')">Edit</button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });
  }

  window.editProduct = function (productId) {
    window.location.href = `backoffice.html?edit=${productId}`;
  };

  fetchProducts();
});
