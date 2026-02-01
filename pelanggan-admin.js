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
        <td> <button onclick="hapusPelanggan('${item._id}')" style="background:#f44336;color:white;border:none;padding:5px 10px;border-radius:5px;">
                hapus
             </button>
        </td>
      </tr>
    `;
  });
}


loadData();
