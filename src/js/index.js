// Serializes form inputs so they can be used to construct URL query parameters
const serialize = inputs =>
  [...inputs].reduce(
    (acc, { name, value }) => `${acc}${acc ? "&" : "?"}${name}=${value}`,
    ""
  )

// This is a modulo division function for use with the gallery carousel
const mod = (x, y) => x - y * Math.floor(x / y)

const randomInRange = (min, max) => Math.random() * (max - min) + min

// My try at implementing an insertion sort, not tested
const insertAtIndex = ix => xs => x =>
  ix === -1 ? [...xs, x] : [...xs.slice(0, ix), x, ...xs.slice(ix)]
const sort = xs =>
  xs.reduce((acc, x) => insertAtIndex(acc.findIndex(y => y > x))(acc)(x), [])

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
  const inlineNav = document.querySelector(".nav-inline")
  const getDropNavHeight = () => {
    dropdownNav.classList.remove("hidden-nav")
    const hNav = getComputedStyle(dropdownNav).height
    dropdownNav.classList.add("hidden-nav")
    return hNav
  }
  const hNav = getDropNavHeight()

  // Clone all dropdown-nav links into inline nav
  const anchors = dropdownNav.querySelectorAll("a")
  anchors.forEach(a => {
    a_ = a.cloneNode(true)
    inlineNav.appendChild(a_)
  })

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      })
    })
  })

  const navSVG = document.querySelector(".nav-container svg")
  const [a, b, c] = [...navSVG.querySelectorAll("path")]

  navSVG.onclick = () => {
    dropdownNav.classList.toggle("hidden-nav")
    if (dropdownNav.classList.contains("hidden-nav")) {
      dropdownNav.style.height = 0
      a.classList.remove("rotate")
      b.classList.remove("hidden")
      c.classList.remove("rotate-ccw")
    } else {
      dropdownNav.style.height = hNav
      dropdownNav.classList.remove("hidden-nav")
      a.classList.add("rotate")
      b.classList.add("hidden")
      c.classList.add("rotate-ccw")
    }
  }

  const form = document.querySelector("form")
  const h = getComputedStyle(form).height

  form.style.height = 0
  form.style.opacity = 0

  const h2 = document.querySelector("header .container div")

  const openForm = () => {
    form.style.height = h
    form.style.opacity = 1
  }

  const closeForm = () => {
    // Only collapse on mouseout _if_ the activeElement is not in here
    if (!isDescendant(form)(document.activeElement)) {
      form.style.height = 0
      form.style.opacity = 0
    }
  }

  h2.addEventListener("mouseover", openForm)
  h2.addEventListener("mouseout", closeForm)
  h2.addEventListener("focus", openForm)

  // This is somewhat hacky, just so I can select the `select` component as well as `input`
  const inputs = form.querySelectorAll("label > *")
  const submitButton = form.querySelector("button")
  ;[...inputs, submitButton].forEach(input => {
    input.addEventListener("focus", openForm)
    input.addEventListener("blur", closeForm)
  })

  form.onsubmit = e => {
    e.preventDefault()
    window.location.href = `${REACT_APP_STORY_FORM_URL}${serialize(inputs)}`
  }

  const country = document.getElementById("country")
  const countries = "./assets/json/countries.json"
  fetch(countries)
    .then(res => res.json())
    .then(Object.values)
    .then(sort)
    .then(countries => countries.forEach(mkOption(country)))

  // This is the carousel gallery logic
  const gallery = document.querySelector(".gallery")
  const carousel = document.getElementById("carousel")
  const imgs = gallery.querySelectorAll("li")

  imgs.forEach(img => {
    const clone = img.cloneNode(true)
    clone.style.display = "none"
    carousel.appendChild(clone)
  })

  const carouselImgs = carousel.querySelectorAll("li")

  console.log(carouselImgs)
  ;(function runCarousel(current = 0, last) {
    const length = carouselImgs.length
    last !== undefined && (carouselImgs[last].style.display = "none")
    carouselImgs[current].style.display = "block"
    carousel.onclick = () => runCarousel(mod(current + 1, length), current)
  })()

  // This is centered around London, but we could get geolocation from the browser
  // const mymap = L.map("mapid").setView([51.505, -0.09], 9)

  const mkMap = ([lat, long]) => mymap => {
    const pt1 = [
      lat + randomInRange(-0.3, 0.3),
      long + randomInRange(-0.3, 0.3)
    ]
    const pt2 = [
      lat + randomInRange(-0.3, 0.3),
      long + randomInRange(-0.3, 0.3)
    ]
    const pt3 = [
      lat + randomInRange(-0.3, 0.3),
      long + randomInRange(-0.3, 0.3)
    ]
    const pt4 = [
      lat + randomInRange(-0.3, 0.3),
      long + randomInRange(-0.3, 0.3)
    ]
    const pt5 = [
      lat + randomInRange(-0.3, 0.3),
      long + randomInRange(-0.3, 0.3)
    ]

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "streets-v11",
        accessToken: MAPBOX_TOKEN
      }
    ).addTo(mymap)
    // These are random, but could be generated by JSON of local volunteer centers
    L.marker(pt1).addTo(mymap)
    L.marker(pt2).addTo(mymap)
    L.marker(pt3).addTo(mymap)
    L.marker(pt4).addTo(mymap)
    L.marker(pt5).addTo(mymap)
  }

  // This actually does more than just get geolocation
  // It will center the map on the geolocation of the browser if available
  // otherwise, default to London (why not?)
  getGeolocation = navigator =>
    "geolocation" in navigator
      ? navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const mymap = L.map("mapid").setView(
              [coords.latitude, coords.longitude],
              9
            )
            mkMap([coords.latitude, coords.longitude])(mymap)
          },
          () => {
            const coords = [51.5, -0.09]
            const mymap = L.map("mapid").setView(coords, 9)
            mkMap(coords)(mymap)
          }
        )
      : (() => {
          const coords = [51.5, -0.09]
          const mymap = L.map("mapid").setView(coords, 9)
          mkMap(coords)(mymap)
        })()

  getGeolocation(navigator)
}

window.onload = main
