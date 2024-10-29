let shop = document.getElementById("shop");

// create an array for the shop.
// let shopItemsData = [
//   {
//     id: "dfjdkldl",
//     name: "Casual shirt",
//     price: "$45",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//     img: "images/shirt1.jpg",
//   },
//   {
//     id: "djkldfldfjk",
//     name: "Office shirt",
//     price: "$55",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//     img: "images/summer-2.jpg",
//   },
//   {
//     id: "eiotiuoeuio",
//     name: "Capule shirt",
//     price: "$65",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//     img: "images/shirt1.jpg",
//   },
//   {
//     id: "euiowdjkl",
//     name: "Casual shirt",
//     price: "$40",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//     img: "images/summer-2.jpg",
//   },
// ];

// let basket = []
let basket = JSON.parse(localStorage.getItem("data")) || [];

// make a function for generating items
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map(({ id, name, price, desc, img }) => {
      //   let { id, name, price, desc, img } = x; /**for destructuring array!, also we made it above */
      let search = basket.find((x) => x.id === id) || [];
      return `
     <div id=product-id-${id} class="item-1">
        <img class="image" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price">
            <h2>${price}</h2>
            <div class="buttons">
              <i onclick="decrease(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increase(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("")); //join() method terminates the ,
};

generateShop();

// incremend and decrement functions!

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
  localStorage.setItem("data", JSON.stringify(basket));
};

// update function goes here!
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  getTotal();
};

// make total and show on the cart!
let getTotal = () => {
  let total = document.getElementById("total");
  total.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

getTotal();
