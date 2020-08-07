const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modal");

for (let card of cards) {
  card.addEventListener("click", function () {
    const imgSrc = card.querySelector("#card-image").getAttribute("src");
    const foodPlate = card.querySelector("#food-plate").textContent;
    const chefName = card.querySelector("#chef").textContent;

    console.log(imgSrc, foodPlate, chefName);
    modalOverlay.classList.add("active");
    modal.querySelector("img").src = imgSrc;
    modal.querySelector("h1").textContent = foodPlate;
    modal.querySelector("h2").textContent = chefName;
  });
}

document.querySelector(".close-modal").addEventListener("click", function () {
  modalOverlay.classList.remove("active");
});
