const shopingEl = document.querySelector(".icon"),
  countEl = document.querySelector(".count"),
  productList = document.querySelector(".list_products"),
  productCard = document.querySelector(".cards"),
  closeBtn = document.querySelector(".close"),
  totalPriceEl = document.querySelector(".tota_price");

let cardsArr = JSON.parse(localStorage.getItem("cards") || "[]");

// console.log(cardsArr);

shopingEl.addEventListener("click", () => {
  document.body.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  document.body.classList.remove("active");
});

function initProduct() {
  productList.innerHTML = "";
  if (products.length) {
    products.forEach((item, key) => {
      const { image, title, price } = item;
      let liTag = document.createElement("li");
      liTag.classList.add("item");
      liTag.innerHTML = `<img src="imgs/${image}" alt="Image">
             <div class="title">${title}</div>
             <div class="price">$${price}</div>
             <button class="add_btn" onclick="addToCard(${key})">Add To Card</button>`;

      productList.appendChild(liTag);
    });
  }
}

initProduct();

function addToCard(key) {
  if (cardsArr[key] == undefined) {
    cardsArr[key] = products[key];
    cardsArr[key].quantity = 1;
  } else if (cardsArr[key].id == key) {
    cardsArr[key].quantity += 1;
  } else {
    cardsArr.push(products[key]);
  }

  addTOMemory();
  showProductcard();
}

showProductcard();

function addTOMemory() {
  localStorage.setItem("cards", JSON.stringify(cardsArr));
}

function showProductcard() {
  productCard.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;
  if (cardsArr.length) {
    cardsArr.forEach((item, key) => {
      const { image, price, quantity } = item;
      let liTag = document.createElement("li");
      liTag.classList.add("card");
      liTag.innerHTML = `<div class="product_info">
           <img src="imgs/${image}" alt="Image">
           <div class="desc">
           <p>Product</p>
           <p class="proucst_name">NAME ${key + 1}</p>
           <p>1/${price}</p>
           </div>
           </div>
           <div class="card_price">$${price * quantity}</div>
           <div class="change_quantity">
           <span class="minus" onclick="changeQuantity(${key}, 'minus')">-</span>
            <span class="total_quantity">${quantity}</span>
            <span class="plus" onclick="changeQuantity(${key}, 'plus')">+</span>
            </div>`;

      totalQuantity += quantity;
      totalPrice += price * quantity;
      totalPriceEl.innerText = "$" + totalPrice;
      productCard.appendChild(liTag);
    });

    countEl.innerText = totalQuantity;
  }
}

function changeQuantity(key, type) {
  let infoQuantity;
  if (type == "plus") {
    cardsArr[key].quantity += 1;
  }

  if (type == "minus") {
    infoQuantity = cardsArr[key].quantity - 1;
    cardsArr[key].quantity = infoQuantity;
    if (infoQuantity == 0) {
      cardsArr.splice(key, 1);
      countEl.innerText = 0;
      totalPriceEl.innerText = "$" + 0;
    }
  }

  addTOMemory();
  showProductcard();
}
