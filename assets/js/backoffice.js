const productId = new URLSearchParams(location.search).get("productId");
console.log("PRODUCTID", productId);

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYTY1MmYyNjBjYzAwMTVjYzBmMzciLCJpYXQiOjE3MjIwMDA5ODAsImV4cCI6MTcyMzIxMDU4MH0.FSis9GljRwhgEYQjfo9xSL6SdE9LtIFjBG50mPzzrEI";

if (productId) {
  fetch(apiUrl + productId, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero del singolo prodotto");
      }
    })
    .then((singleProduct) => {
      console.log("SINGLEPRODUCT", singleProduct);
      document.getElementById("name").value = singleProduct.name;
      document.getElementById("description").value = singleProduct.description;
      document.getElementById("price").value = singleProduct.price;
      document.getElementById("brand").value = singleProduct.brand;
      document.getElementById("imageUrl").value = singleProduct.imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
}

class Product {
  constructor(_name, _description, _price, _brand, _imageUrl) {
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
  }
}

const productForm = document.getElementById("product-form");
const saveChangesButton = document.getElementById("save-changes");

function handleSubmit(e, method, url) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  const priceValue = priceInput.value;
  const brandValue = brandInput.value;
  const imageUrlValue = imageUrlInput.value;

  const newProduct = new Product(nameValue, descriptionValue, priceValue, brandValue, imageUrlValue);

  fetch(url, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO SALVATO!");
      } else {
        alert("ERRORE NEL SALVATAGGIO!");
        throw new Error("Errore nel salvataggio del prodotto");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
}

productForm.addEventListener("submit", function (e) {
  const method = productId ? "PUT" : "POST";
  const url = productId ? apiUrl + productId : apiUrl;
  handleSubmit(e, method, url);
});

saveChangesButton.addEventListener("click", function (e) {
  const method = "PUT";
  const url = apiUrl + productId;
  handleSubmit(e, method, url);
});
