const baseUrl = "http://localhost:3000/api/transaksi";

async function loadData() {
  const res = await fetch(baseUrl);
  const data = await res.json();

  const table = document.getElementById("dataTable");
  table.innerHTML = "";

  data.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.username}</td>
        <td>${t.phonenumber}</td>
        <td>${t.email}</td>
        <td>${t.address}</td>
      </tr>
    `;
  });
}

loadData();