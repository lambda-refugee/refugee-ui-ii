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

const mkOption = select => option => {
  const optEl = document.createElement("option")
  optEl.innerText = option
  optEl.value = option

  select.appendChild(optEl)
}

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
    const [a, b, c] = [...navSVG.querySelectorAll("path")]
    dropdownNav.classList.toggle("hidden")
    if (dropdownNav.classList.contains("hidden")) {
      dropdownNav.style.height = 0
      a.classList.remove("rotate")
      b.classList.remove("hidden")
      c.classList.remove("rotate-ccw")
    } else {
      dropdownNav.style.height = hNav
      a.classList.add("rotate")
      b.classList.add("hidden")
      c.classList.add("rotate-ccw")
    }
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

  // This is somewhat hacky, just so I can select the `select` component as well as `input`
  const inputs = form.querySelectorAll("label > *")

  form.onsubmit = e => {
    e.preventDefault()
    window.location.href = `${REACT_APP_STORY_FORM_URL}${serialize(inputs)}`
  }

  const select = document.getElementById("country")
  const countries = "./assets/json/countries.json"
  fetch(countries)
    .then(res => res.json())
    .then(Object.values)
    .then(countries => countries.forEach(mkOption(country)))

  const mymap = L.map("mapid").setView([51.505, -0.09], 9)
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
  L.marker([51.5, -0.09]).addTo(mymap)
  L.marker([51.56, -0.19]).addTo(mymap)
  L.marker([51.469, -0.08]).addTo(mymap)
}

window.onload = main
