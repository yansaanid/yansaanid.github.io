let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')
let tableStat = document.getElementById('table')
let billyChart = document.getElementById('billyChart')

//statusWeb.innerHTML = `status`
window.onload = async function() {

  await fetch('https://v1.nocodeapi.com/yansaan/uptime/uyUyRwkEZeMkvirR?monitors=787418020').then(r => r.json()).then(async r => {
    const stat = r.monitors[0]
    let labels = []
    let data = []
    let borderColor = []

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
        // code
      }
      
      stat.response_times.forEach(c => {
        const dates = new Date(c.datetime)
        label.push(`${dates.toLocaleString("en-US", {month: "short"})} ${dates.toLocaleString("en-US", {day: "numeric"})}`)
        
        data.push(c.value)
      })

      let getChart = new Chart(billyChart, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: '# milisec',
            data: data,
            backgroundColor: 
              'rgba(255, 99, 132, 0.2)',
            borderColor: 
              'rgba(255, 99, 132, 1)'
              /*'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'*/
            ,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
        
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