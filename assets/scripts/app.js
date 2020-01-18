// the product object with object litral;

const productsList = {
  products: [
    {
      title: "Flex Cars",
      imageUrl: "assets/img/car6.JPG",
      price: 569.08,
      description: "new with 2020 software upgrades"
    },
    {
      title: "Moon Car",
      imageUrl: "assets/img/car1.JPG",
      price: 708.99,
      description: "fast and affordable for the new generation"
    },
    {
      title: "universal Car",
      imageUrl: "assets/img/car4.JPG",
      price: 204.97,
      description: "has a multidimentional compactibility with inbuilt meter"
    }
  ],

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.classList = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.classList = "product-item";
      prodEl.innerHTML = `
      <div>
         <img src ='${prod.imageUrl}' alt ='${prod.title}' >
         <div class ='product-item__content'>
         <h2>${prod.title}</h2>
         <h3>\$${prod.price}</h3>
         <p>${prod.description}</p>
         <button >Add to Cart</button>

         </div>
      </div>
      `;
      prodList.append(prodEl);
    }

    renderHook.append(prodList);
  }
};
productsList.render();
