const triggerArea = document.querySelector("#triggerArea");
const drop = document.querySelector("#drop");
const none = document.querySelector("#none");
triggerArea.addEventListener("click", () => {
  if (drop.classList.contains("disp") == false) {
    drop.classList.add("disp");
  } else {
    drop.classList.remove("disp");
  }
  if (none.classList.contains("none") == true) {
    none.classList.remove("none");
  } else {
    none.classList.add("none");
  }
});

const dropSideButtons = document.querySelectorAll(".drop_side");
const dropSideFilter = document.querySelectorAll(".drop_filter");
dropSideButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const dropFilter = this.nextElementSibling;
    dropFilter.classList.toggle("none");
  });
});

dropSideFilter.forEach((button) => {
  button.addEventListener("click", function () {
    const dropFilter = this.nextElementSibling;
    dropFilter.classList.toggle("none");
  });
});
let cart = document.querySelector(".cart");
let width = window.innerWidth;
let height = window.innerHeight;
let alertos = document.getElementById("alertos");
let redactor = document.getElementById("redactor");
let polosa = document.querySelector(".polosa");
let k = 0;
redactor.style.display = "none";
let buttonchik = document.getElementById("buttonchik");

let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.marginRight = -4 - 1000 / 1001 + "px";
alertos.style.display = "none";
buttonchik.onclick = function () {
  document.body.style.marginRight = scrollbarWidth + "px";
  let scrollX = document.documentElement.scrollLeft;
  let scrollY = document.documentElement.scrollTop;
  alertos.style.top = (height - 500) / 2 + scrollY + "px";
  alertos.style.left = (width - 500) / 2 + scrollX + "px";
  alertos.style.position = "absolute";
  alertos.style.display = "block";
  document.body.style.overflowY = "hidden";
};

let cancel = document.getElementById("cancel");

cancel.onclick = function () {
  alertos.style.display = "none";
  alertos.style.position = "relative";
  document.body.style.marginRight = null;
  document.body.style.overflowY = "visible ";
  document.querySelector("input[type=text]").value = "";
};
cancelred.onclick = function () {
  redactor.style.display = "none";
  redactor.style.position = "relative";
  document.body.style.marginRight = null;
  document.body.style.overflowY = "visible ";
  document.querySelector("input[type=text]").value = "";
};
let contentArea = document.getElementsByClassName("content_area")[0];
let okey = document.getElementById("okey");
let ok = document.getElementById("ok");
ok.onclick = function () {
  let name = document.querySelector("input[type=text]");
  let fileInput = document.querySelector("input[type=file]");
  let date = document.querySelector("input[type=date]");
  let star = "/img/star.svg";
  let gal = "/img/square.svg";

  if (fileInput.files.length === 0) {
    alert("Выберите изображение!");
    return;
  }
  let file = fileInput.files[0];

  let reader = new FileReader();
  reader.onload = function (e) {
    let image = URL.createObjectURL(file);

    let id = Date.now() + "_" + Math.floor(Math.random() * 100000);

    let film = document.createElement("div");
    console.log("ok", image);
    film.innerHTML = `
      <div class="cart" data-id="${id}" style="padding-inline: 10px;"> 
        <img id="cartimg" style="max-width: 100px;" src="${image}" alt="">
        <div style="display: grid; flex-direction: row; text-align: center; height: 50px;">
            <p style="color: #757575; text-align: center;">
                <strong style="font-size: 20px; color: black;">Название:</strong>
            </p>
            <p id="cartname" style="color: gray">${name.value}</p>
        </div>
        <div style="display: grid; flex-direction: row; text-align: center; height: 50px;">
            <p style="color: rgb(112, 112, 112); text-align: center;">
                <strong style="color: black; font-size: 20px;">Дата: </strong>
            </p>
            <p id="cartdata" style="color: gray">${date.value}</p>
        </div>
        <button class="redact"><img src="/img/pencil.svg" alt=""></button>
        <button class="cross" style="width: 30px; height: 30px; border: none; background: none; cursor: pointer;">
            <img src="/img/cross.svg" style="width: 20px;">
        </button>
        <button style="width: 30px; height: 30px;"><img class="star" style="width: 30px; height: 30px;" src="${star}" alt=""></button>
        <button style="width: 30px; height: 30px;"><img class="square" style="width: 30px; height: 30px;" src="${gal}" alt=""></button>
      </div>
    `;

    let contentArea = document.querySelector(".content_area");
    if (contentArea) {
      contentArea.appendChild(film);
    } else {
      console.error("Не найден элемент contentArea");
    }

    alertos.style.display = "none";
    alertos.style.position = "relative";
    document.body.style.marginRight = null;
    document.body.style.overflowY = "visible";

    name.value = "";
    fileInput.value = "";
    date.value = "";
  };

  reader.readAsDataURL(file);
  save();
};

document.addEventListener("click", function (event) {
  if (event.target.closest(".redact")) {
    let cart = event.target.closest(".cart");
    let id = cart.getAttribute("data-id");

    redactor.style.display = "block";
    document.body.style.marginRight = scrollbarWidth + "px";
    let scrollX = document.documentElement.scrollLeft;
    let scrollY = document.documentElement.scrollTop;
    redactor.style.top = (height - 500) / 2 + scrollY + "px";
    redactor.style.left = (width - 500) / 2 + scrollX + "px";
    redactor.style.position = "absolute";

    let nameInput = redactor.querySelector("input[type=text]");
    let dateInput = redactor.querySelector("input[type=date]");
    let fileInput = redactor.querySelector("input[type=file]");
    let previewImg = redactor.querySelector("#previewImage");

    nameInput.value = cart.querySelector("#cartname").innerText.trim();
    dateInput.value = cart.querySelector("#cartdata").innerText.trim();
    previewImg.src = cart.querySelector("#cartimg").src;

    fileInput.addEventListener("change", function () {
      let file = fileInput.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    let okeyButton = redactor.querySelector("#okey");
    if (okeyButton) {
      okeyButton.onclick = function () {
        let updatedName = nameInput.value;
        let updatedDate = dateInput.value;
        let updatedImage = previewImg.src;

        edit(id, updatedName, updatedImage, updatedDate);

        redactor.style.display = "none";
      };
    }
  }
});

function save() {
  let name = document.querySelector("input[type=text]").value;
  let fileInput = document.querySelector("input[type=file]");
  let date = document.querySelector("input[type=date]").value;
  let star = false;
  let gal = false;

  if (!fileInput.files.length) {
    alert("Выберите изображение!");
    return;
  }

  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let image = e.target.result;
    let id = Date.now() + "_" + Math.floor(Math.random() * 100000);
    let object = {
      id,
      name,
      image,
      date,
      star,
      gal,
    };

    let objects = JSON.parse(localStorage.getItem("object")) || [];
    objects.push(object);
    localStorage.setItem("object", JSON.stringify(objects));

    console.log("Объект сохранен:", object);
    console.log("Image data:", image);
  };

  reader.readAsDataURL(file);
}

function load() {
  let objects = JSON.parse(localStorage.getItem("object")) || [];
  if (Array.isArray(objects)) {
    objects.forEach((obj) => {
      let div = document.createElement("div");
      let starSrc = obj.star ? "/img/gold_star.svg" : "/img/star.svg";
      let gals = obj.gal ? "/img/gal.svg" : "/img/square.svg";
      console.log("Loaded image URL:", obj.image);
      div.innerHTML = `
        <div class="cart" data-id="${obj.id}" style="padding-inline: 10px;"> 
          <img id="cartimg" style="max-width: 100px;" src="${obj.image}" alt="">
          <div style="display: grid; flex-direction: row; text-align: center; height: 50px;">
              <p style="color: #757575; text-align: center;">
                  <strong style="font-size: 20px; color: black;">Название:</strong>
              </p>
              <p id="cartname" style="color: gray">${obj.name}</p>
          </div>
          <div style="display: grid; flex-direction: row; text-align: center; height: 50px;">
              <p style="color: rgb(112, 112, 112); text-align: center;">
                  <strong style="color: black; font-size: 20px;">Дата: </strong>
              </p>
              <p id="cartdata" style="color: gray">${obj.date}</p>
          </div>
          <button class="redact"><img src="/img/pencil.svg" alt=""></button>
          <button class="cross" style="width: 30px; height: 30px; border: none; background: none; cursor: pointer;">
              <img src="/img/cross.svg" style="width: 20px;">
          </button>
          <button style="width: 30px; height: 30px;"><img class="star" style="width: 30px; height: 30px;" src="${starSrc}" alt=""></button>
          <button style="width: 30px; height: 30px;"><img class="square" style="width: 30px; height: 30px;" src="${gals}" alt=""></button>
        </div>
      `;
      contentArea.append(div);
      div.querySelector(".redact").addEventListener("click", function () {
        let nameInput = document.querySelector("input[type=text]");
        let dateInput = document.querySelector("input[type=date]");
        let fileInput = document.querySelector("input[type=file]");
        console.log("load", obj.image);

        nameInput.value = obj.name;
        dateInput.value = obj.date;
        document
          .querySelector(".button_ok")
          .addEventListener("click", function () {
            edit(obj.id, nameInput.value, obj.image, dateInput.value);
          });
      });
    });
  } else {
    console.error("Данные в localStorage не являются массивом!");
  }
  console.log(objects);
}

function remove(id) {
  let objects = JSON.parse(localStorage.getItem("object")) || [];
  if (Array.isArray(objects)) {
    objects = objects.filter((obj) => obj.id !== id);
    localStorage.setItem("object", JSON.stringify(objects));
  }
}

document.addEventListener("click", function (event) {
  if (event.target.closest(".cross")) {
    let cartRemove = event.target.closest(".cart");
    console.log("cartRemove:", cartRemove);
    let id = cartRemove ? cartRemove.getAttribute("data-id") : null;
    console.log("ID:", id);
    if (cartRemove) {
      cartRemove.remove();
      remove(id);
    }
  }
});

function edit(id, updatedName, updatedImage, updatedDate) {
  let objects = JSON.parse(localStorage.getItem("object")) || [];

  let objectIndex = objects.findIndex((obj) => obj.id === id);
  if (objectIndex !== -1) {
    if (updatedImage) {
      objects[objectIndex].image = updatedImage;
    }

    objects[objectIndex].name = updatedName;
    objects[objectIndex].date = updatedDate;

    console.log("image edit", objects[objectIndex].image);

    localStorage.setItem("object", JSON.stringify(objects));

    let cart = document.querySelector(`.cart[data-id="${id}"]`);
    if (cart) {
      cart.querySelector("#cartname").textContent = updatedName;
      cart.querySelector("#cartdata").textContent = updatedDate;

      if (updatedImage) {
        cart.querySelector("#cartimg").src = updatedImage;
      }
    }
  }
}

document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("star")) {
    let star = event.target;
    let cart = star.closest(".cart");
    let id = cart.dataset.id;

    let objects = JSON.parse(localStorage.getItem("object")) || [];
    let obj = objects.find((o) => o.id === id);

    if (obj) {
      obj.star = !obj.star; // Переключаем состояние true/false
      star.src = obj.star ? "/img/gold_star.svg" : "/img/star.svg";
      localStorage.setItem("object", JSON.stringify(objects)); // Сохраняем
    }
  }
});

document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("square")) {
    let gal = event.target;
    let cart = gal.closest(".cart");
    let id = cart.dataset.id;

    let objects = JSON.parse(localStorage.getItem("object")) || [];
    let obj = objects.find((o) => o.id === id);

    if (obj) {
      obj.gal = !obj.gal; // Переключаем состояние true/false
      gal.src = obj.gal ? "/img/gal.svg" : "/img/square.svg";
      localStorage.setItem("object", JSON.stringify(objects)); // Сохраняем
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  load();
});
