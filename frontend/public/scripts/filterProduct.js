const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const filterValue = item.getAttribute("brand");
    const url = new URL(window.location.href);

    url.searchParams.set("brand", filterValue);

      window.history.pushState({}, "", url);
      window.location.reload();
  });
});
