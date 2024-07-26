document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const resetButton = document.getElementById("resetButton");
  const deleteButton = document.getElementById("deleteButton");

  const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzN2MxMmYyNjBjYzAwMTVjYzBlNTYiLCJpYXQiOjE3MjE5OTAxNjIsImV4cCI6MTcyMzE5OTc2Mn0.5yPTZn0Qk7Yz1ZKLNKZpxyjK7BgMJpFaSJAZN0kD_Hg";

  function sendRequest(method, url, data = {}) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: method === "POST" || method === "PUT" ? JSON.stringify(data) : null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        alert("Operation successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Operation failed!");
      });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const productId = document.getElementById("productId").value;

    const data = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
    };

    if (productId) {
      sendRequest("PUT", `${API_URL}${productId}`, data);
    } else {
      sendRequest("POST", API_URL, data);
    }
  });

  resetButton.addEventListener("click", () => {
    form.reset();
  });

  deleteButton.addEventListener("click", () => {
    const productId = document.getElementById("productId").value;
    if (productId) {
      sendRequest("DELETE", `${API_URL}${productId}`);
    } else {
      alert("Product ID is required to delete.");
    }
  });
});
