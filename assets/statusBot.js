let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')
let tableStat = document.getElementById('table')

//statusWeb.innerHTML = `status`
window.onload = async function() {

  await fetch('https://billy-bot-1.yansaan.repl.co').then(s => {
    if (s.ok) {
      statusWeb.innerHTML = `I'm just wake up`
    } else {
      statusWeb.innerHTML = `I'm on break`
      return
    }
    return s.json()
  }).then(r => {
    let statusTable = ''
    r.detail.forEach(d => {
      statusTable += `<tr>
      <td>${d.name}</td>
      <td>${d.type}</td>
      <td class="">${(d.status)?'✅':'❌'}</td>
      </tr>`
    })

    tableStat.innerHTML = `<table class="table table-dark table-borderless">
    <thead>
    <tr>
    <th scope="col">Name</th>
    <th scope="col">Type</th>
    <th scope="col">Status</th>
    </tr>
    </thead>
    <tbody>
    ${statusTable}
    </tbody>
    </table>`
  }).catch(e => {
    errorText.textContent = e
    statusWeb.innerHTML = `I'm have a poblem`
  })

}