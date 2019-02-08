const listItem = ul => ({ name, avatar, handle, bio, role }) => {
  const li = document.createElement("li")
  const wrapper = document.createElement("div")
  const nameEl = document.createElement("h4")
  const avatarEl = document.createElement("img")
  const handleEl = document.createElement("h5")
  const roleEl = document.createElement("span")
  const bioEl = document.createElement("p")

  nameEl.innerText = name
  avatarEl.setAttribute("src", avatar)
  avatarEl.setAttribute("alt", name)
  handleEl.innerHTML = `<a href="https://twitter.com/${handle}">@${handle}</a>`
  roleEl.innerHTML = `<strong>${role}</strong>`
  bioEl.innerText = bio

  wrapper.append(nameEl, roleEl, handleEl, bioEl)
  li.append(avatarEl, wrapper)
  ul.append(li)
}

main = () => {
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

  const team = [
    {
      name: "Katie Fitzpatrick",
      avatar:
        "https://pbs.twimg.com/profile_images/1084467230883151872/bzSYXG33_400x400.jpg",
      handle: "helloKatieFizzy",
      bio:
        "Business Coach, Product Engineer, && Full Stack Developer { react | redux | node.js | sql } obviously magical unicorn 🦄🎉🍻 (chalk art credit: Luke Homitsky)",
      role: "Scrum Master"
    },
    {
      name: "Rachel Kolk",
      avatar:
        "https://pbs.twimg.com/profile_images/1093342006972243968/a6qPq9kg_400x400.jpg",
      handle: "RachelOKolk",
      bio:
        "Writer. Fermentation enthusiast. Gardener. Full Stack Web student @lambdaschool",
      role: "Frontend Engineer"
    },
    {
      name: "David Situ",
      avatar:
        "https://pbs.twimg.com/profile_images/1093184699495636993/M-r_XOvO_400x400.jpg",
      handle: "DavidSitu",
      bio: "Full-time Student",
      role: "Backend Engineer"
    },
    {
      name: "Peter Murphy",
      avatar: "https://avatars0.githubusercontent.com/u/26548438?s=460&v=4",
      handle: "ptrfrncsmrph",
      bio: "Enthusiastic about functional programming and web technologies",
      role: "UI Developer"
    }
  ]

  const ul = document.querySelector("main ul")

  team.forEach(listItem(ul))
}

window.onload = main
