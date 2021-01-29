const currentPage = location.pathname;
const menuItems = document.querySelectorAll("Header .links.admin a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// DELETE CONFIRMATION BLOCK
const deleteButton = document.querySelector(".delete-button");
if (deleteButton) {
  const form = document.querySelector(".create-edit-form");
  const deleteId = document.querySelector("#delete-id").value;

  deleteButton.addEventListener("click", function (event) {
    const confirmation = confirm("Deseja Deletar?");
    if (!confirmation) {
      event.preventDefault();
      return;
    }

    const pathByLocation = currentPage.includes("chefs") ? "chefs" : "recipes";
    form.action = `/admin/${pathByLocation}/${deleteId}?_method=DELETE`;
    form.submit();
  });
}
