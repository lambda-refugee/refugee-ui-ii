const listItem = ul => ({ name, avatar, handle, bio, role }) => {
  const li = document.createElement("li")
  const wrapper = document.createElement("div")
  const nameEl = document.createElement("h4")
  const avatarEl = document.createElement("img")
  const handleEl = document.createElement("h5")
  const roleEl = document.createElement("p")
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
      name: "Katie Fitzpatrick",
      avatar:
        "https://pbs.twimg.com/profile_images/1084467230883151872/bzSYXG33_400x400.jpg",
      handle: "helloKatieFizzy",
      bio:
        "Business Coach, Product Engineer, && Full Stack Developer { react | redux | node.js | sql } obviously magical unicorn 🦄🎉🍻 (chalk art credit: Luke Homitsky)",
      role: "Scrum Master"
    }
  ]

  const ul = document.querySelector("main ul")

  team.forEach(listItem(ul))
}

window.onload = main
