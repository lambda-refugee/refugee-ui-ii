// Serializes form inputs so they can be used to construct
// URL query parameters
const serialize = inputs =>
  [...inputs].reduce(
    (acc, { name, value }) => `${acc}${acc ? "&" : "?"}${name}=${value}`,
    ""
  )

const REACT_APP_STORY_FORM_URL =
  "https://refugeestories.netlify.com/#/story-form/"

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

  document.onscroll = showNavBar

  const form = document.querySelector("form")
  const inputs = form.querySelectorAll("input")

  form.onsubmit = e => {
    e.preventDefault()
    window.location.href = `${REACT_APP_STORY_FORM_URL}${serialize(inputs)}`
  }
}

window.onload = main
