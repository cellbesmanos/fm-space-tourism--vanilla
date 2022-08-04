const tabList = document.querySelector("ul[role='tablist']");
const items = tabList.querySelectorAll("li");
const tabs = tabList.querySelectorAll("li button[role='tab']");

tabs.forEach((tab) => {
  tab.addEventListener("keyup", hoverTabs);
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
