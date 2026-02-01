const apiUrl = "http://localhost:3000/api/produk";
let editId = null;

// LOAD DATA
async function loadData() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const tabel = document.getElementById("tabelProduk");
    tabel.innerHTML = "";

    data.forEach(item => {
        tabel.innerHTML += `
            <tr>
                <td>${item.namaBarang}</td>
                <td>Rp ${item.harga}</td>
                <td>${item.stok} pcs</td>
                <td>
                    <button class="btn-edit" onclick="setEdit('${item._id}','${item.namaBarang}',${item.harga},${item.stok})">Edit</button>
                    <button class="btn-hapus" onclick="hapusProduk('${item._id}')">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// TAMBAH / UPDATE
async function simpanProduk() {
    const nama = document.getElementById("nama_produk").value;
    const kategori = document.getElementById("kategori_produk").value;
    const harga = document.getElementById("harga_produk").value;
    const stok = document.getElementById("stok_produk").value;
    
    if (!nama || !harga || !stok) return alert("Isi semua data!");

    const dataKirim = {
        namaBarang: nama,
        kategori: kategori,
        harga: Number(harga),
        stok: Number(stok)
    };

    if (editId) {
        await fetch(`${apiUrl}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataKirim)
        });
        alert("Produk berhasil diupdate!");
        editId = null;
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataKirim)
        });
        alert("Produk berhasil ditambahkan!");
    }

    document.getElementById("nama_produk").value = "";
    document.getElementById("kategori_produk").value = "";
    document.getElementById("harga_produk").value = "";
    document.getElementById("stok_produk").value = "";

    loadData();
}

// SET EDIT MODE
function setEdit(id, nama, harga, stok) {
    editId = id;
    document.getElementById("nama_produk").value = nama;
    document.getElementById("kategori_produk").value = kategori;
    document.getElementById("harga_produk").value = harga;
    document.getElementById("stok_produk").value = stok;
}

// HAPUS
async function hapusProduk(id) {
    if (!confirm("Hapus produk ini?")) return;
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadData();
}

loadData();
