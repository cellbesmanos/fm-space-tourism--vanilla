const mobileNavToggle = document.querySelector(".mobile-nav-toggle");

mobileNavToggle.addEventListener("click", () => {
  const primaryNavigation = document.querySelector(".primary-navigation");
  const isClose = mobileNavToggle.getAttribute("aria-expanded") === "false";

  if (isClose) {
    primaryNavigation.classList.add("primary-navigation--active");

    mobileNavToggle.setAttribute("aria-expanded", true);
    mobileNavToggle.style.backgroundImage =
      "url(./assets/shared/icon-close.svg)";
  } else {
    primaryNavigation.classList.remove("primary-navigation--active");

    mobileNavToggle.setAttribute("aria-expanded", false);
    mobileNavToggle.style.backgroundImage =
      "url(./assets/shared/icon-hamburger.svg)";
  }
});
