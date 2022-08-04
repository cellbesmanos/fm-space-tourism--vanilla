const tabList = document.querySelector("ul[role='tablist']");
const items = tabList.querySelectorAll("li");
const tabs = tabList.querySelectorAll("li button[role='tab']");

tabs.forEach((tab) => {
  tab.addEventListener("keyup", hoverTabs);

  tab.addEventListener("click", selectTab);
});

function hoverTabs(e) {
  const keyCode = e.keyCode;
  const tabIndex = parseInt(e.target.dataset.tabIndex);

  let activeIndex;

  const arrowLeft = 37;
  const arrowRight = 39;
  const tabsLength = tabs.length;

  if (keyCode === arrowLeft || keyCode === arrowRight) {
    tabs.forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
    });

    switch (keyCode) {
      case arrowLeft:
        activeIndex = tabIndex - 1;

        if (activeIndex < 0) {
          activeIndex = tabsLength - 1;
        }

        break;

      case arrowRight:
        activeIndex = tabIndex + 1;

        if (activeIndex >= tabsLength) {
          activeIndex = 0;
        }

        break;

      default:
        throw new Error("Invalid key code for left and arrow keys");
    }

    const hoveredTab = tabList.querySelector(
      `li button[role='tab'][data-tab-index='${activeIndex}']`
    );

    hoveredTab.setAttribute("tabindex", "0");
    hoveredTab.focus();
  }
}

function selectTab(e) {
  const tabIndex = parseInt(e.target.dataset.tabIndex);

  items.forEach((item) => {
    item.classList.remove("active");
  });

  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
  });

  const activeTab = tabList.querySelector(
    `li button[role='tab'][data-tab-index='${tabIndex}']`
  );
  const activeItem = activeTab.parentElement;

  activeTab.setAttribute("aria-selected", "true");
  activeItem.classList.add("active");

  changeActivePanel(activeTab);
}

function changeActivePanel(activeTab) {
  const nextActivePanel = activeTab.getAttribute("aria-controls");
  const mainContainer = document.querySelector(
    "main.grid-container--destination"
  );
  const activePanel = mainContainer.querySelector(`article#${nextActivePanel}`);

  const panels = mainContainer.querySelectorAll("article[role='tabpanel']");

  panels.forEach((panel) => {
    panel.classList.add("hidden");
  });

  activePanel.classList.remove("hidden");

  changeActivePicture(nextActivePanel);
}

function changeActivePicture(nextActivePanel) {
  const planetPictures = document.querySelectorAll("picture.planet-image");
  const activePicture = document.querySelector(
    `picture.planet-image[data-image-for='${nextActivePanel}']`
  );

  planetPictures.forEach((picture) => {
    picture.classList.add("hidden");
  });

  activePicture.classList.remove("hidden");
}
