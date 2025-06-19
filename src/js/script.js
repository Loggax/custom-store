document.addEventListener("DOMContentLoaded", () => {
  let shoppers = [];

  fetch("shoppers.json")
    .then(res => res.json())
    .then(data => {
      shoppers = data;
      renderItems(shoppers); // показати всі товари при завантаженні
    })
    .catch(err => console.error("Помилка завантаження JSON!", err));

  const input = document.querySelector(".search");
  const button = document.querySelector(".btn-search");
  const container = document.querySelector(".catalog");

  function performSearch() {
    const query = input.value.trim().toLowerCase();
    container.innerHTML = ""; // очистити каталог перед новим результатом

    const filtered = shoppers.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.price.toString().includes(query)
    );

    renderItems(filtered);
  }

  function renderItems(data) {
    container.innerHTML = ""; // 🧹 очищення контейнера перед відображенням
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "grid-item card-holder";
      card.innerHTML = `
        <img src="${item.image}" alt="">
        <p>${item.name}</p>
        <p>${item.desc}</p>
        <p>${item.price}$</p>
      `;
      container.appendChild(card);
    });
  }

  // 🔎 Пошук при натисканні Enter
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") performSearch();
  });

  // 🔍 Пошук при натисканні кнопки
  button.addEventListener("click", performSearch);

  // 🟡 Живий пошук під час введення
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    if (query === "") {
      renderItems(shoppers); // показати всі товари
    } else {
      const filtered = shoppers.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.price.toString().includes(query)
      );

      renderItems(filtered);
    }
  });
});
