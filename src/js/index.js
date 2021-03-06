main = () => {
  const getHeaderHeight = () =>
    +getComputedStyle(document.querySelector("header")).height.slice(0, -2)
  const navBarContainer = document.querySelector(".nav-outer-container")

  const showNavBar = () => {
    const headerHeight = getHeaderHeight()
    window.scrollY > headerHeight
      ? navBarContainer.classList.add("nav-show")
      : navBarContainer.classList.remove("nav-show")
  }

  // If user resizes the height of window, the navbar will still
  // be activated below the fold for whatever window height
  document.addEventListener("resize", () => {
    document.onscroll = showNavBar
  })
  document.onscroll = showNavBar
}

window.onload = main
