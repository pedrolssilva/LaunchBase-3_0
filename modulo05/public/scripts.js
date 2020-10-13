const currentPage = location.pathname;
const menuItems = document.querySelectorAll("Header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

console.log(currentPage);
