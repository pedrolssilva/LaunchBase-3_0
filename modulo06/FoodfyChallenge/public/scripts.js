const currentPage = location.pathname;
const menuItems = document.querySelectorAll("Header .links.admin a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}
