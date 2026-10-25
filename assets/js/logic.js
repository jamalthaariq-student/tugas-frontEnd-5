// Helper Format Rupiah
const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;


function showNotification(message, type) {
    const notif = document.getElementById("notification");
    notif.textContent = message;
    notif.className = ""; // Reset kelas CSS sebelumnya
    
    // Tambahkan kelas berdasarkan tipe (sukses atau error)
    if (type === "success") {
        notif.classList.add("alert-success");
    } else {
        notif.classList.add("alert-error");
    }

    // Tampilkan elemen
    notif.style.display = "block";

    // Sembunyikan otomatis setelah 3 detik
    setTimeout(() => {
        notif.style.display = "none";
    }, 3000);
}


function getProducts() {
    const data = localStorage.getItem('produkUMKM');
    if (data) {
        const parsedData = JSON.parse(data);
        console.log("[DATA LOADED] Berhasil memuat data dari LocalStorage:", parsedData);
        return parsedData;
    }
    
    // Dataset Default jika LocalStorage masih kosong
    const defaultData = [
        { id: 1, name: "Keripik Pisang", category: "Camilan", price: 15000, stock: 10 },
        { id: 2, name: "Nasi Goreng", category: "Makanan", price: 20000, stock: 20 }
    ];
    localStorage.setItem('produkUMKM', JSON.stringify(defaultData));
    console.log("[DATA DEFAULT] Memasang dataset awal:", defaultData);
    return defaultData;
}

function saveProducts(products) {
    localStorage.setItem('produkUMKM', JSON.stringify(products));
}


function renderTable(searchQuery = '') {
    const products = getProducts();
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = ""; 

    // Filter berdasarkan pencarian
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    let totalNilaiStok = 0; // Variabel penampung total keseluruhan

    filteredProducts.forEach((p) => {
        // Hitung nilai stok per item (harga * stok) dan tambahkan ke total
        const nilaiStokProduk = p.price * p.stock;
        totalNilaiStok += nilaiStokProduk; 

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${formatRupiah(p.price)}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Tampilkan hasil perhitungan ke kotak summary di bawah tabel
    const totalBox = document.getElementById("totalNilaiStokBox");
    if (totalBox) {
        totalBox.textContent = `Total Nilai Stok Keseluruhan: ${formatRupiah(totalNilaiStok)}`;
    }
}

// Event Pencarian Live (Otomatis saat mengetik)
document.getElementById('searchInput').addEventListener('input', function(e) {
    renderTable(e.target.value);
});



document.getElementById("productForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    let products = getProducts();
    const editId = document.getElementById("editId").value;
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    // Validasi input minus (Ditampilkan di Console dan Custom Notif)
    if (price < 0 || stock < 0) {
        console.warn("[VALIDASI ERROR] Harga atau stok minus!");
        showNotification("Error: Harga dan stok tidak boleh minus!", "error");
        return;
    }

    if (editId) {
        // PROSES EDIT
        const index = products.findIndex(p => p.id == editId);
        products[index] = { id: parseInt(editId), name, category, price, stock };
        
        console.log(`[EDIT SUCCESS] Produk ID ${editId} diperbarui:`, products[index]);
        showNotification(`Sukses: Data "${name}" berhasil diperbarui!`, "success");
    } else {
        // PROSES TAMBAH BARU
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, name, category, price, stock };
        products.push(newProduct);
        
        console.log("[ADD SUCCESS] Produk baru ditambahkan:", newProduct);
        showNotification(`Sukses: Produk "${name}" berhasil ditambahkan!`, "success");
    }

    saveProducts(products);
    resetForm();
    renderTable(document.getElementById('searchInput').value);
});



function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    // Masukkan data ke dalam form
    document.getElementById("editId").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;

    // Ubah tampilan form untuk mode Edit
    document.getElementById("formTitle").textContent = "Edit Produk";
    document.getElementById("submitBtn").textContent = "Update Produk";
    document.getElementById("cancelBtn").style.display = "inline-block";
    
    console.log(`🔍 [EDIT MODE] Form disiapkan untuk mengedit produk ID ${id}:`, product);
}

document.getElementById("cancelBtn").addEventListener("click", resetForm);

function resetForm() {
    document.getElementById("productForm").reset();
    document.getElementById("editId").value = "";
    document.getElementById("formTitle").textContent = "Tambah Produk Baru";
    document.getElementById("submitBtn").textContent = "Tambah Produk";
    document.getElementById("cancelBtn").style.display = "none";
}



function deleteProduct(id) {
    
    if(confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        let products = getProducts();
        const productToDelete = products.find(p => p.id === id);
        
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderTable(document.getElementById('searchInput').value);
        
        console.log(`[DELETE SUCCESS] Produk ID ${id} (${productToDelete.name}) telah dihapus.`);
        showNotification(`Info: Produk "${productToDelete.name}" telah dihapus.`, "success");
    } else {
        console.log("[DELETE CANCELED] Penghapusan produk dibatalkan.");
    }
}


renderTable();