const apiUrl = "http://localhost:3000/api/produk";

async function loadData() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Gagal ambil data"); // Cek error
        const data = await res.json();
        
        const tabel = document.getElementById("tabelProduk");
        tabel.innerHTML = ""; 

        data.forEach(item => {
            tabel.innerHTML += `
                <tr>
                    <td>${item.namaBarang}</td>
                    <td>Rp ${item.harga}</td>
                    <td>${item.stok} pcs</td>
                    <td><button onclick="hapusProduk('${item._id}')" style="background:red; color:white;">Hapus</button></td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
    }
}

async function simpanProduk() {
    const nama = document.getElementById("nama_barang").value;
    const harga = document.getElementById("harga_barang").value;
    const stok = document.getElementById("stok_barang").value;

    if (!nama || !harga || !stok) return alert("Isi semua data!");

    const dataKirim = {
        namaBarang: nama,
        harga: Number(harga),
        stok: Number(stok)
    };

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataKirim)
        });

        if (res.ok) {
            alert("✅ Barang BERHASIL masuk database!"); // Notif ini cuma muncul kalau server OK (status 200)
            document.getElementById("nama_barang").value = "";
            document.getElementById("harga_barang").value = "";
            document.getElementById("stok_barang").value = "";
            loadData();
        } else {
            alert("❌ Gagal Simpan! Cek Server.");
        }
    } catch (err) {
        alert("❌ Error Koneksi: " + err.message);
    }
}

async function hapusProduk(id) {
    if(!confirm("Hapus?")) return;
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadData();
}

loadData();