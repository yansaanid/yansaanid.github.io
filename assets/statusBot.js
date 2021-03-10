let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')

//statusWeb.innerHTML = `status`
window.onload = async function() {

  return await fetch('https://billy-bot-1.yansaan.repl.co').then(s => s.json()).then(r => {}).catch(e => {
      errorText.textContent = e
      statusWeb.innerHTML = `I'm have a poblem`
    })

}