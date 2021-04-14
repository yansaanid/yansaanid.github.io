let statusWeb = document.getElementById("status");
let tableStat = document.getElementById("table");
let billyChart = document.getElementById("billyChart");
let cardDetail = document.getElementById("card-detail");
const closeCard = document.getElementById("close-link");

window.onload = async function () {
  await fetch(
    "https://v1.nocodeapi.com/yansaan/uptime/uyUyRwkEZeMkvirR?monitors=787418020"
  )
    .then(r => r.json())
    .then(async r => {
      const stat = r.monitors[0];
      const labels = [];
      const data = [];
      const backgroundColor = [];

      switch (stat.status) {
        case 2:
          statusWeb.innerHTML = `I've been running something`;
          break;
        case 0:
          statusWeb.innerHTML = `I'm on break`;
          break;
        case 1:
          statusWeb.innerHTML = `I'm just wake up`;
          break;

        default:
          statusWeb.innerHTML = `I'm have a poblem`;
          break;
      }

      let uptime = Number(
        `${stat.all_time_uptime_ratio}`
          .split(".")
          .map((p, i) => (i === 1 ? (p = `${p.charAt(0)}${p.charAt(1)}`) : p))
          .join(".")
      );

      let downtime = Number(
        `${100 - stat.all_time_uptime_ratio}`
          .split(".")
          .map((p, i) => (i === 1 ? (p = `${p.charAt(0)}${p.charAt(1)}`) : p))
          .join(".")
      );

      labels.push(`uptime ${uptime}%`);
      labels.push(`downtime ${downtime}%`);

      data.push(uptime);
      data.push(downtime);

      backgroundColor.push("white");
      backgroundColor.push("gray");

      let getChart = new Chart(billyChart, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              //label: '# milisec',
              data,
              backgroundColor,
              borderColor: "white",
              borderWidth: 1,
            },
          ],
        },
      });

      if (stat.status !== 2) {
        tableStat.innerHTML = `<h3 class="text-white">bot is disabled!!!</h3>`;
        return;
      }

      await fetch("https://billy-bot-1.yansaan.repl.co")
        .then(r => r.json())
        .then(r => {
          let statusTable = "";
          r.detail.forEach(d => {
            statusTable += `<tr>
      <td><a id="detail" href="#name-function" data-desc="${
        d.description
      }" data-type="${d.type}" data-enable="${
              d.enable ? "enabled" : "disabled"
            }">${d.name}</a></td>
      <td>${d.type}</td>
      <td class="">${d.enable ? "✅" : "❌"}</td>
      </tr>`;
          });

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
    </table>`;
        });
    });
};

document.addEventListener("click", e => {
  if (e.target.id === "detail") {
    let fcnName = document.getElementById("name-function");
    let fcnStatus = document.getElementById("status-function");
    let fcnDesc = document.getElementById("desc-function");

    // e.preventDefault();
    fcnName.innerHTML = e.target.innerHTML;
    fcnStatus.innerHTML = `Type: ${e.target.dataset.type} | Status: ${e.target.dataset.enable}`;
    fcnDesc.innerHTML = e.target.dataset.desc;
    cardDetail.classList.remove("d-none");
  }
});

closeCard.addEventListener("click", e => {
  e.preventDefault();
  cardDetail.classList.add("d-none");
});
