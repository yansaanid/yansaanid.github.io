const navBar = document.getElementById("navbar")
const menu = document.getElementById("navbarNavAltMarkup")
scroll()

window.onscroll = function () {
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

  if (calc >= 1) {
    navBar.style.backgroundColor = `rgba(255, 255, 255, 1)`
    navBar.style.boxShadow = `0 .125rem 1rem rgba(0, 0, 0, .15)`
  } else if (calc <= 0) {
    navBar.style.backgroundColor = `rgba(255, 255, 255, 0)`
    navBar.style.boxShadow = `0 -1rem 1rem rgba(0, 0, 0, .15)`
  } else {
    navBar.style.backgroundColor = `rgba(255, 255, 255, ${calc})`
    navBar.style.boxShadow = `0 ${calc - 0.875}rem 1rem rgba(0, 0, 0, .15)`
  }
}

menu.addEventListener("show.bs.collapse", function () {
  navBar.style.backgroundColor = `rgba(255, 255, 255, 1)`
  navBar.style.boxShadow = `0 .125rem 1rem rgba(0, 0, 0, .15)`
})
menu.addEventListener("hidden.bs.collapse", function () {
  scroll()
})
