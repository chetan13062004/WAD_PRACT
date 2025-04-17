const products = [
    { name: "Mobile Phone", price: "$299", image: "./images/mob.jpg" },
    { name: "Laptop", price: "$899", image: "./images/laptop.jpg" },
    { name: "Smartwatch", price: "$199", image: "./images/wat.jpg" },
    { name: "Headphones", price: "$99", image: "./images/head.jpg" },
    { name: "Tablet", price: "$399", image: "./images/tab.jpg" },
    { name: "Camera", price: "$549", image: "./images/cam.jpg" }
  ];
  
  const itemsPerPage = 4;
  let currentPage = 1;
  const tableBody = document.querySelector("#productTable tbody");
  const pagination = document.getElementById("pagination");
  
  // Show products for the current page
  function showProducts(page) {
    tableBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = products.slice(start, end);
  
    currentItems.forEach(p => {
      const image = p.image ? p.image : "https://via.placeholder.com/50x50.png?text=No+Image";
      const row = `<tr>
        <td><img src="${image}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>${p.price}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  // Setup page buttons
  function setupPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(products.length / itemsPerPage);
  
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.onclick = () => {
        currentPage = i;
        showProducts(currentPage);
      };
      pagination.appendChild(btn);
    }
  }
  
  // Initial load
  showProducts(currentPage);
  setupPagination();
  