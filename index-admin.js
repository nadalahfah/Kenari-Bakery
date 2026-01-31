const editId = localStorage.getItem("editId");

// Load Data Produk saat halaman dibuka
async function loadPilihanProduk() {
    const res = await fetch("http://localhost:3000/api/produk");
    const products = await res.json();
    
    const select = document.getElementById("nama_barang_select");
    
    products.forEach(p => {
        // Simpan harga di atribut data-harga biar gampang diambil
        const option = document.createElement("option");
        option.value = p.namaBarang;
        option.text = `${p.namaBarang} (Stok: ${p.stok})`;
        option.setAttribute("data-harga", p.harga);
        select.appendChild(option);
    });
}

function hitungTotalBarang() {
    let harga = document.getElementById("harga").value;
    let jumlah = document.getElementById("jumlah").value;

    // Ubah ke angka
    harga = parseFloat(harga) || 0;
    jumlah = parseFloat(jumlah) || 0;

    let total = harga * jumlah;

    document.getElementById("total").value = total;
}

async function simpanData() {
    let data = {
        nama: document.getElementById("id_nama").value,
        alamat: document.getElementById("id_alamat").value,
        produk: document.getElementById("produk").value,
        jumlah: Number(document.getElementById("jumlah").value),
        harga: Number(document.getElementById("harga").value),
        total: Number(document.getElementById("total").value)
    };

    const response = await fetch("http://localhost:3000/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
        alert("Transaksi Sukses!");
        window.location.href = "transaksi.html";
    } else {
        alert("Gagal: " + result.message);
    }
}


// Panggil fungsi load produk
loadPilihanProduk();