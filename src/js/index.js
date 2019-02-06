// Serializes form inputs so they can be used to construct URL query parameters
const serialize = inputs =>
  [...inputs].reduce(
    (acc, { name, value }) => `${acc}${acc ? "&" : "?"}${name}=${value}`,
    ""
  )

const REACT_APP_STORY_FORM_URL =
  "https://refugeestories.netlify.com/#/story-form/"

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGZtcnBoIiwiYSI6ImNqZmZ5djYxdjJiNG4zM3BhYmIxaXljankifQ.TE8Lyd1bl6nie61qGl5QWw"

// Need to add tests for this, but can only test in the browser since it requires the DOM
const isDescendant = parent => child =>
  child == null
    ? false
    : child.parentNode == parent || isDescendant(parent)(child.parentNode)

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

  const dropdownNav = document.querySelector(".nav-dropdown")
  dropdownNav.classList.remove("hidden")
  const hNav = getComputedStyle(dropdownNav).height
  dropdownNav.classList.add("hidden")

  const navSVG = document.querySelector(".nav-container svg")
  navSVG.addEventListener("click", () => {
    dropdownNav.classList.toggle("hidden")
    !dropdownNav.classList.contains("hidden")
      ? (dropdownNav.style.height = hNav)
      : (dropdownNav.style.height = 0)
  })

  const form = document.querySelector("form")
  const h = getComputedStyle(form).height

  form.style.height = 0
  form.style.opacity = 0

  const h2 = document.querySelector("header .container div")
  h2.addEventListener("mouseover", () => {
    form.style.height = h
    form.style.opacity = 1
  })

  h2.addEventListener("mouseout", () => {
    // Only collapse on mouseout _if_ the activeElement is not in here
    if (!isDescendant(form)(document.activeElement)) {
      form.style.height = 0
      form.style.opacity = 0
    }
  })

  const inputs = form.querySelectorAll("input")

  form.onsubmit = e => {
    e.preventDefault()
    window.location.href = `${REACT_APP_STORY_FORM_URL}${serialize(inputs)}`
  }

  const countries = "./assets/json/countries.json"
  fetch(countries)
    .then(res => res.json())
    .then(Object.values)
    .then(console.log)

  const mymap = L.map("mapid").setView([51.505, -0.09], 13)
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: MAPBOX_TOKEN
    }
  ).addTo(mymap)
  const marker = L.marker([51.5, -0.09]).addTo(mymap)
}

window.onload = main
