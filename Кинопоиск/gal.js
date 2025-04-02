function load() {
  let objects = JSON.parse(localStorage.getItem("object")) || [];
  const contentArea = document.getElementsByClassName("content_areas")[0];
  if (Array.isArray(objects)) {
    let galObjects = objects.filter((obj) => obj.gal === true);
    galObjects.forEach((obj) => {
      let div = document.createElement("div");

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
            <button class="gal-btn" style="width: 30px; height: 30px;">
                <img class="square" style="width: 30px; height: 30px;" src="/img/gal.svg" alt="">
            </button>
          </div>
        `;

      contentArea.appendChild(div);
    });

    const starButtons = document.querySelectorAll(".gal-btn");
    starButtons.forEach((button) => {
      button.addEventListener("click", function () {
        let id = this.closest(".cart").getAttribute("data-id");
        let objects = JSON.parse(localStorage.getItem("object")) || [];
        let obj = objects.find((o) => o.id == id);
        if (obj && obj.gal === true) {
          obj.gal = false;

          localStorage.setItem("object", JSON.stringify(objects));
          location.reload();
          load();
        }
      });
    });
  } else {
    console.error("Данные в localStorage не являются массивом!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  load();
});
