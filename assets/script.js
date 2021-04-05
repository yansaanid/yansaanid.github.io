const navBar = document.getElementById("navbar")
const menu = document.getElementById("navbarNavAltMarkup")
const themes = document.getElementById("themes")
const body = document.body
let navbarOpen = false

const bgWhite = '255, 255, 255'
const bgDark = '33, 33, 33'
let navBg

let theme = localStorage.getItem('theme')
if (!theme) {
  localStorage.setItem('theme', 'default')
   navBg = bgWhite
} else {
  if (theme === 'darker')
    body.classList.replace('default', 'darker')
  navBg = theme === 'darker' ? bgDark : bgWhite
}

scroll()

themes.onclick = () => {
  if (body.classList.contains('darker')) {
    body.classList.replace('darker', 'default')
    localStorage.setItem('theme', 'default')
    navBg = bgWhite
  } else {
    body.classList.replace('default', 'darker')
    localStorage.setItem('theme', 'darker')
    navBg = bgDark
  }
  scroll()
}

window.onscroll = () => {
  scroll()
}

function scroll() {
  let top = window.scrollY,
    calc = top / 200
  let n = parseFloat(
    calc
      .toString()
      .split(".")
      .map((s, i) =>
        i === 1 ? (s = `${s.charAt(0)}${s.charAt(1)}${s.charAt(2)}`) : s
      )
      .join(".")
  )

if (!navbarOpen) {
  if (calc >= 1) {
    navBar.style.backgroundColor = `rgba(${navBg}, 1)`
    navBar.style.boxShadow = `0 .125rem 1rem rgba(0, 0, 0, .15)`
  } else if (calc <= 0) {
    navBar.style.backgroundColor = `rgba(${navBg}, 0)`
    navBar.style.boxShadow = `0 -1rem 1rem rgba(0, 0, 0, .15)`
  } else {
    navBar.style.backgroundColor = `rgba(${navBg}, ${calc})`
    navBar.style.boxShadow = `0 ${calc - 0.875}rem 1rem rgba(0, 0, 0, .15)`
  }
} else {
  navBar.style.backgroundColor = `rgba(${navBg}, 1)`
  navBar.style.boxShadow = `0 .125rem 1rem rgba(0, 0, 0, .15)`
}
}

menu.addEventListener("show.bs.collapse", function () {
  navbarOpen = true
  navBar.style.backgroundColor = `rgba(${navBg}, 1)`
  navBar.style.boxShadow = `0 .125rem 1rem rgba(0, 0, 0, .15)`
})
menu.addEventListener("hidden.bs.collapse", function () {
  navbarOpen = false
  scroll()
})
