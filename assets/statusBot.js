let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')
let tableStat = document.getElementById('table')
let billyChart = document.getElementById('billyChart')

window.onload = async function() {

  await fetch('https://v1.nocodeapi.com/yansaan/uptime/uyUyRwkEZeMkvirR?monitors=787418020').then(r => r.json()).then(async r => {
    const stat = r.monitors[0]
    const labels = []
    const data = []
    const backgroundColor = []

    switch (stat.status) {
      case 2:
        statusWeb.innerHTML = `I've been running something`
        break;
      case 0:
        statusWeb.innerHTML = `I'm on break`
        break;
      case 1:
        statusWeb.innerHTML = `I'm just wake up`
        break;

      default:
        statusWeb.innerHTML = `I'm have a poblem`
        break;
    }

    const uptime = stat.all_time_uptime_ratio
    
    labels.push(`uptime ${Math.round(uptime)}%`)
    labels.push(`downtime ${100 - (Math.round(uptime))}%`)
    
    data.push(uptime) 
    data.push(100 - uptime)
    
    backgroundColor.push('white')
    backgroundColor.push('gray')
    

    let getChart = new Chart(billyChart, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          //label: '# milisec',
          data,
          backgroundColor,
          borderColor: 'white',
          borderWidth: 1
        }]
      }

    })
    
    if (stat.status !== 2) return

    await fetch('https://billy-bot-1.yansaan.repl.co').then(r => r.json()).then(r => {
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
  })

  })

  /*await fetch('https://billy-bot-1.yansaan.repl.co').then(s => {
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
  })*/

}