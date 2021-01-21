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

// DELETE CONFIRMATION BLOCK
const deleteButton = document.querySelector(".delete-button");
const form = document.querySelector(".create-edit-form");
const deleteId = document.querySelector("#delete-id").value;

deleteButton.addEventListener("click", function (event) {
  const confirmation = confirm("Deseja Deletar?");

  if (!confirmation) {
    event.preventDefault();
  }

  form.action = `/admin/recipes/${deleteId}?_method=DELETE`;
  form.submit();
});
