function addIngredient() {
  const ingredients = document.querySelector(".ingredient");
  const fieldContainer = document.querySelectorAll(".ingredient");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") {
    return false;
  }
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addPrepareMode() {
  const preparesMode = document.querySelector(".prepareMode");
  const fieldContainer = document.querySelectorAll(".prepareMode");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") {
    return false;
  }

  newField.children[0].value = "";
  preparesMode.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".add-prepareMode")
  .addEventListener("click", addPrepareMode);
