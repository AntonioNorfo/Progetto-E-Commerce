document.addEventListener("DOMContentLoaded", () => {
  const addressBarParameters = new URLSearchParams(location.search);
  const productId = addressBarParameters.get("eventId");
  console.log("productId", productId);

  const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYTY1MmYyNjBjYzAwMTVjYzBmMzciLCJpYXQiOjE3MjIwMDA5ODAsImV4cCI6MTcyMzIxMDU4MH0.FSis9GljRwhgEYQjfo9xSL6SdE9LtIFjBG50mPzzrEI";

  fetch(apiUrl + productId, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE NELLA FETCH SINGOLA");
      }
    })
    .then((singleProduct) => {
      console.log(singleProduct);
      const detailRow = document.getElementById("detail-row");

      // Controlla se l'utente è un admin
      const isAdmin = true; // Sostituisci con il controllo reale per l'admin

      // Crea la sezione amministrativa se l'utente è un admin
      const adminSection = isAdmin
        ? `
        <div class="d-flex justify-content-between mt-2">
          <a href="./backoffice.html?productId=${singleProduct._id}" class="btn btn-warning">Modifica</a>
          <button class="btn btn-danger" onclick="deleteProduct('${singleProduct._id}')">Delete</button>
        </div>
      `
        : "";

      detailRow.innerHTML = `
        <div class="col-12 col-md-8 col-lg-6 text-center">
          <div class="card pb-4">
            <img src="${singleProduct.imageUrl}" class="card-img-top" alt="${singleProduct.name}">
            <div class="card-body">
              <h5 class="card-title">${singleProduct.name}</h5>
              <p class="card-text">${singleProduct.description}</p>
              <p class="card-text">${singleProduct.price}€</p>
              <a href="#" class="btn btn-primary">Buy</a>
              ${adminSection}
            </div>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.log(err);
    });

  window.deleteProduct = function (id) {
    fetch(apiUrl + id, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Prodotto eliminato");
          location.assign("./index.html");
        } else {
          throw new Error("Problema nell'eliminazione");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
});
