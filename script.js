const container = document.getElementById("product-container");
const search = document.getElementById("search");
const categories = document.querySelectorAll("nav ul li");

let products = [];

// Fetch API data
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  products = await res.json();
  displayProducts(products);
}


function displayProducts(items) {
  container.innerHTML = "";
  items.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title.substring(0, 20)}...</h3>
        <p><b>$${product.price}</b></p>
        <p>${product.category}</p>
      </div>
    `;
  });
}


search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});


categories.forEach(cat => {
  cat.addEventListener("click", () => {
    const category = cat.getAttribute("data-category");
    if (category === "all") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      displayProducts(filtered);
    }
  });
});

fetchProducts();