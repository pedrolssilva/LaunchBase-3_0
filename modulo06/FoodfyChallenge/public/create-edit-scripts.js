function addIngredient() {
  const ingredients = document.querySelector(".ingredient");
  const fieldContainer = ingredients.children;

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.value == "") {
    return false;
  }
  newField.value = "";
  ingredients.appendChild(newField);
}

function addPrepareMode() {
  const preparesMode = document.querySelector(".prepareMode");
  const fieldContainer = preparesMode.children;

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.value == "") {
    return false;
  }

  newField.value = "";
  preparesMode.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".add-prepareMode")
  .addEventListener("click", addPrepareMode);
