let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')

//statusWeb.innerHTML = `status`
window.onload = async function() {

  await fetch('https://billy-bot-1.yansaan.repl.co').then(s => {
    if (s.ok) {
      statusWeb.innerHTML = `I'm just wake up`
    } else {
      statusWeb.innerHTML = `I'm on break`
    }
    return s.json()
  }).then(r => {
    
  }).catch(e => {
    errorText.textContent = e
    statusWeb.innerHTML = `I'm have a poblem`
  })
  
}