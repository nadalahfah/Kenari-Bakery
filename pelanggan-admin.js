const baseUrl = "http://localhost:3000/api/transaksi";

async function loadData() {
  const res = await fetch(baseUrl);
  const data = await res.json();

  const table = document.getElementById("dataTable");
  table.innerHTML = "";

  data.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.namaPembeli}</td>
        <td>${t.pesanan}</td>
        <td>${t.totalHarga}</td>
        <td>${t.keterangan}</td>
        <td>${new Date(t.waktuPemesanan).toLocaleString()}</td>
      </tr>
    `;
  });
}

loadData();