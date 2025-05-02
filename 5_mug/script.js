// Filtering Function
const checkboxes = document.querySelectorAll('.filter-checkbox');
const products = document.querySelectorAll('.product-card');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    filterProducts();
  });
});

function filterProducts() {
  const activeFilters = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  products.forEach(product => {
    const market = product.getAttribute('data-market');
    const print = product.getAttribute('data-print');
    const provider = product.getAttribute('data-provider');

    if (activeFilters.length === 0) {
      product.style.display = 'block'; // Show all if no filter
    } else {
      const matchesFilter = activeFilters.some(filter =>
        [market, print, provider].includes(filter)
      );
      product.style.display = matchesFilter ? 'block' : 'none';
    }
  });
}
