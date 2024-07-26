document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzN2MxMmYyNjBjYzAwMTVjYzBlNTYiLCJpYXQiOjE3MjE5OTAxNjIsImV4cCI6MTcyMzE5OTc2Mn0.5yPTZn0Qk7Yz1ZKLNKZpxyjK7BgMJpFaSJAZN0kD_Hg";

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  function fetchProductDetail() {
    fetch(`${API_URL}${productId}`, {
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
      .then((product) => {
        displayProductDetail(product);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayProductDetail(product) {
    const container = document.getElementById("productDetail");
    container.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Created At:</strong> ${product.createdAt}</p>
          <p class="card-text"><strong>Updated At:</strong> ${product.updatedAt}</p>
        </div>
      </div>
    `;
  }

  fetchProductDetail();
});
