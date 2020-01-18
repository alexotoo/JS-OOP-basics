//using classes to create products

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(values) {
    this.items = values;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (preValue, currItem) => preValue + currItem.price,
      0
    );
    return sum.toFixed(2);
  }
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button> Order Now! </button>
        `;
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    console.log("adding product to cart....");
    console.log(this.product);
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.classList = "product-item";
    prodEl.innerHTML = `
      <div>
         <img src ='${this.product.imageUrl}' alt ='${this.product.title}' >
         <div class ='product-item__content'>
         <h2>${this.product.title}</h2>
         <h3>\$${this.product.price}</h3>
         <p>${this.product.description}</p>
         <button >Add to Cart</button>

         </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductsList {
  products = [
    new Product(
      "Flex Cars",
      "assets/img/car6.JPG",
      569.08,
      "new with 2020 software upgrades"
    ),
    new Product(
      "Moon Car",
      "assets/img/car1.JPG",
      708.99,
      "fast and affordable for the new generation"
    ),
    new Product(
      "universal Car",
      "assets/img/car4.JPG",
      204.97,
      "has a multidimentional compactibility with inbuilt meter"
    )
  ];

  render() {
    const prodList = document.createElement("ul");
    prodList.classList = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();

      prodList.append(prodEl);
    }

    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart(); //make it a property of shop to be able to use static on it
    const cartEl = this.cart.render();
    const productsList = new ProductsList();
    const prodListEl = productsList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

//this static class is good for communicating or sharing methods,properties,data/states or functionalities across classes
class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
