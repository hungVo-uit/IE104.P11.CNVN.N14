const sortSelector = document.getElementById("sortOptions");
sortSelector.addEventListener("change", () => {
  const selectedOption = sortSelector.options[sortSelector.selectedIndex];
  const sortByValue = selectedOption.getAttribute("sortBy");
  const orderValue = selectedOption.getAttribute("order");
  const url = new URL(window.location.href);
  url.searchParams.set("sortBy", sortByValue);
  url.searchParams.set("order", orderValue);
  window.location.href = url;
});
window.addEventListener("load", () => {
  const sortByValue = sessionStorage.getItem("sortBy");
  const orderValue = sessionStorage.getItem("order");

  if (sortByValue && orderValue) {
    Array.from(sortSelector.options).forEach((option) => {
      if (
        option.getAttribute("sortBy") === sortByValue &&
        option.getAttribute("order") === orderValue
      ) {
        option.selected = true;
      }
    });
  }
});
