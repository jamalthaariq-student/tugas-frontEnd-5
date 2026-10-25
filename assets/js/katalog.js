const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;

function renderCards() {
    const data = localStorage.getItem('produkUMKM');
    const products = data ? JSON.parse(data) : [];
    const container = document.getElementById('cardContainer');
    
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>Tidak ada produk yang tersedia.</p>";
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="badge">${p.category}</span>
            <h3>${p.name}</h3>
            <div class="product-price">${formatRupiah(p.price)}</div>
            <div class="product-stock">Sisa Stok: <strong>${p.stock}</strong></div>
        `;
        container.appendChild(card);
    });
}

// Panggil fungsi saat halaman dimuat
renderCards();