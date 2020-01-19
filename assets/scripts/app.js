//using classes to create products

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Components {
  constructor(renderHookId, delayedRender = true) {
    this.hookId = renderHookId;
    if (delayedRender) {
      this.render();
    }
  }
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

//to inherite from Component class use extends
class ShoppingCart extends Components {
  constructor(renderHookId) {
    super(renderHookId);
  }
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
  orderProduct = () => {
    console.log("ordering now");
    console.log(this.items);
  };

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button> Order Now! </button>
        `;
    this.totalOutput = cartEl.querySelector("h2");
    const orderBtn = document.querySelector("button");
    orderBtn.addEventListener("click", () => this.orderProduct());
  }
}

class ProductItem extends Components {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    console.log("adding product to cart....");
    console.log(this.product);
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");

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
  }
}

class ProductsList extends Components {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }
  fetchProducts() {
    this.products = [
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
    this.renderProdducts();
  }
  renderProdducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list")
    ]);

    if (this.products && this.Products.length > 0) {
      this.renderProdducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart("app"); //make it a property of shop to be able to use static on it

    new ProductsList("app");
  }
}

//this static class is good for communicating or sharing methods,properties,data/states or functionalities across classes
class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
