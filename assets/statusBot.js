let statusWeb = document.getElementById('status')
let errorText = document.getElementById('error')
let tableStat = document.getElementById('table')
let billyChart = document.getElementById('billyChart')

const labels = []
const data = []
const borderColor = []

window.onload = async function() {

  await fetch('https://v1.nocodeapi.com/yansaan/uptime/uyUyRwkEZeMkvirR?monitors=787418020').then(r => r.json()).then(async r => {
    const stat = r.monitors[0]

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

      stat.response_times.forEach(c => {
        const dates = new Date(c.datetime * 1000)
        labels.push(`${dates.toLocaleString("en-US", {
          timeStyle: "short"
        })}`)

        data.push(c.value)
        borderColor.push('rgba(255, 99, 132, 1)')
      })

      let getChart = new Chart(billyChart, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: '# milisec',
            data,
            backgroundColor:
            'rgba(255, 99, 132, 0.2)',
            borderColor,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                suggestedMax: 5000
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