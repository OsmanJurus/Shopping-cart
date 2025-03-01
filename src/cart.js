let label = document.getElementById("label");
let shopingCart = document.getElementById("shoping-cart");

// get the data from local storage!
let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);

// make total and show on the cart!
let getTotal = () => {
  let total = document.getElementById("total");
  total.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

getTotal();

// label.innerHTML = "Hello world!";
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shopingCart.innerHTML = basket.map((x) => {
      console.log(x);
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      let { img, name, price } = search;
      return `
   <div class="cart-item">
      <img width="100" src=${img} alt="">
      <div class="details">
        <div class="title-price-x">
        <h4 class="title-price">
        <p>${name}</p>
        <p class="cart-item-price">$ ${price}</p>
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
      </div>

      <div class="buttons">
        <i onclick="decrease(${id})" class="bi bi-dash-lg"></i>
        <div id=${id} class="quantity">${item}</div>
        <i onclick="increase(${id})" class="bi bi-plus-lg"></i>
      </div>

        <h3>$ ${item * search.price}</h3>
      </div>
   </div>
      `;
    }));
  } else {
    shopingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="homeBtn">Back Home</button>
    </a>
      `;
  }
};

generateCartItems();

// increment , decement and update functions!

let increase = (id) => {
  let selectedItem = id;
  // search if the item already exist or not!
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  //   console.log(basket);
  generateCartItems();
  update(selectedItem.id);
};

let decrease = (id) => {
  let selectedItem = id;
  // search if the item already exist or not!
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  //   console.log(basket);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  getTotal();
  totalAmount();
};

let removeItem = (id) => {
  let selectedId = id;
  // console.log(selectedId);
  basket = basket.filter((x) => x.id !== selectedId.id);

  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalAmount();
  getTotal();
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);

    label.innerHTML = `
    <h2>Total Bill: $${amount}</h2>
    <div class="btns">
    <button class="checkout">Check out</button>
    <button onclick="clearCart()" class="removeAll">Clear cart</button>
    </div>
    `;
  } else return;
};

totalAmount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  getTotal();
  localStorage.setItem("data", JSON.stringify(basket));
};
