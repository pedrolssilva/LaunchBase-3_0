const currentPage = location.pathname;
const menuItems = document.querySelectorAll("Header .links a");
for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstsAndLastPages =
      currentPage == 1 ||
      currentPage == 2 ||
      currentPage == totalPages ||
      currentPage == totalPages - 1;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (
      firstsAndLastPages ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }
  if (pages.length >= 7) {
    pages.splice(pages.indexOf(selectedPage - 2), 1);
    pages.splice(pages.indexOf(selectedPage + 2), 1);
  }
  return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = "";
  for (let pageIn of pages) {
    if (String(pageIn).includes("...")) {
      elements += `<span >${pageIn}</span>`;
    } else {
      let linkTag = "";
      console.log(page, pageIn);

      if (page == pageIn) {
        linkTag += '<a class="active" ';
        console.log(linkTag);
      } else {
        linkTag += "<a ";
        console.log(linkTag);
      }

      if (filter) {
        linkTag += `href="?page=${pageIn}&filter=${filter}">${pageIn}</a>`;
      } else {
        linkTag += `href="?page=${pageIn}">${pageIn}</a>`;
      }
      elements += linkTag;
    }
  }

  pagination.innerHTML = elements;
}

const pagination = document.querySelector(".pagination");

if (pagination) {
  createPagination(pagination);
}
