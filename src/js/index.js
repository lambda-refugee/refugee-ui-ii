// Serializes form inputs so they can be used to construct
// URL query parameters
const serialize = inputs =>
  [...inputs].reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  )

const toParamString = obj => {
  let params = new URLSearchParams()
  Object.entries(obj).forEach(([k, v]) => {
    params.append(k, v)
  })
  return params.toString()
}

const REACT_APP_STORY_FORM = "https://refugeestories.netlify.com/#/story-form/"

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

  const form = document.querySelector("form")
  const inputs = form.querySelectorAll("input")

  form.onsubmit = e => {
    e.preventDefault()
    window.location.href = `${REACT_APP_STORY_FORM}?${toParamString(
      serialize(inputs)
    )}`
  }
}

window.onload = main
