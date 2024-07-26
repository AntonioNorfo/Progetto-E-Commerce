fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYTY1MmYyNjBjYzAwMTVjYzBmMzciLCJpYXQiOjE3MjIwMDA5ODAsImV4cCI6MTcyMzIxMDU4MH0.FSis9GljRwhgEYQjfo9xSL6SdE9LtIFjBG50mPzzrEI",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch products");
    }
  })
  .then((products) => {
    const productsRow = document.getElementById("products-row");

    products.forEach((product) => {
      const productHTML = `
        <div class="col-12 col-md-6 col-lg-2 mb-4">
          <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Price: $${product.price}</p>
              <a href="details.html?eventId=${product._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      `;
      productsRow.innerHTML += productHTML;
    });
  })
  .catch((err) => {
    console.error(err);
  });
