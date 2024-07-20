const apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';
const searchInput = document.getElementById('searchInput');
const productsContainer = document.getElementById('productsList');

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = ''; // Clear previous results
  
  products.forEach(product => {
    // Create card element
    const card = document.createElement('div');
    card.classList.add('card');
        // Product name and brand
        const title = document.createElement('h2');
        title.innerHTML = `${product.brand} - ${product.name}`;
        card.appendChild(title);

    // Product image
    const img = document.createElement('img');
    img.src = product.image_link;
    img.alt = product.name;
    card.appendChild(img);



    // Product price
    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;
    card.appendChild(price);

    // Product link
    const button = document.createElement('button');
    button.textContent = 'Explore more';
    button.classList.add('product-link-btn');
    button.addEventListener('click', function() {
      window.open(product.product_link, '_blank');
    });
    card.appendChild(button);
 

    // Product description
    const description = document.createElement('p');
    description.textContent = product.description;
    card.appendChild(description);

    productsContainer.appendChild(card);
  });
}

function highlightText(text, query) {
  const regex = new RegExp(query.trim(), 'gi');
  return text.replace(regex, `<span class="highlight">${query}</span>`);
}

async function main() {
  const products = await fetchProducts();

  displayProducts(products);

  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    productsContainer.innerHTML = ''; // Clear previous results
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Highlight matching text in product name
      const productName = `${product.brand} - ${product.name}`;
      const highlightedName = highlightText(productName, query);

      // Display product details
      card.innerHTML = `
       <div class ="col-md-4 "> 
         
        <div class="card border-primary mb-3"  style="width: 18rem;"> 
 
        <div class="card text-center bg-info-subtle text-emphasis-danger"> 
        <img src="${product.image_link}" alt="${product.name}">
        <h2>${highlightedName}</h2>
        <p>Price: ${product.price}</p>
        <a href="${product.product_link}" target="_blank">Product Link</a>
        <p>${product.description}</p>
        /div> 
      </div> 
 
  </div> 
      `;

      productsContainer.appendChild(card);
    });
  });
}

main();
