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
        "https://pbs.twimg.com/profile_images/2695156041/340455f254da4150fc2b0589b01a3b75_400x400.png",
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
