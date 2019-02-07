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
  const getDropNavHeight = () => {
    dropdownNav.classList.remove("hidden-nav")
    const hNav = getComputedStyle(dropdownNav).height
    dropdownNav.classList.add("hidden-nav")
    return hNav
  }
  const hNav = getDropNavHeight()

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

  const country = document.getElementById("country")
  const countries = "./assets/json/countries.json"
  fetch(countries)
    .then(res => res.json())
    .then(Object.values)
    .then(sort)
    .then(countries => countries.forEach(mkOption(country)))

  // This is the carousel gallery logic
  const gallery = document.querySelector(".gallery")
  const imgs = [...gallery.querySelectorAll("li")]
  console.log(imgs)

  // const runCarousel = imgs => (current, last) => {
  //   const length = imgs.length
  //   last !== undefined && (imgs[last].style.display = "none")
  //   imgs[current].style.display = "block"
  //   imgs[current].onclick = runCarousel(mod(current + 1, length), current)
  // }
  // const endCarousel = () => {
  //   imgs.forEach(img => {
  //     img.style.display = "block"
  //   })
  // }

  // window.addEventListener("resize", () => {
  //   // Detect if window is in tablet range (needs to stay in sync with CSS media queries ☹️)
  //   window.innerWidth >= 500 && window.innerWidth < 650
  //     ? runCarousel(0)
  //     : endCarousel()
  // })

  // runCarousel(0)

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
        id: "light-v10",
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
