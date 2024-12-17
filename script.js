async function fetchCards(query = "") {
  const response = await fetch(`/api/cards?query=${query}`);
  const cards = await response.json();
  const cardList = document.getElementById("card-list");
  if (cardList) {
    cardList.innerHTML = cards.map(card => `
      <div class="card">
        <img src="${card.image}" alt="${card.name}">
        <h3>${card.name}</h3>
        <p>Prezzo: €${card.price}</p>
        <a href="product.html?id=${card.id}">Dettagli</a>
      </div>
    `).join('');
  }
}

async function fetchCardDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(`/api/cards/${id}`);
  const card = await response.json();
  const cardDetails = document.getElementById("card-details");
  if (cardDetails) {
    if (card.message) {
      cardDetails.innerHTML = `<p>${card.message}</p>`;
    } else {
      cardDetails.innerHTML = `
        <div class="card">
          <img src="${card.image}" alt="${card.name}">
          <h3>${card.name}</h3>
          <p>Set: ${card.set}</p>
          <p>Condizione: ${card.condition}</p>
          <p>Prezzo: €${card.price}</p>
        </div>
      `;
    }
  }
}

document.getElementById("search-bar")?.addEventListener("input", (e) => {
  fetchCards(e.target.value);
});

if (window.location.pathname.includes("product.html")) {
  fetchCardDetails();
} else {
  fetchCards();
}

