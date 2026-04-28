document.addEventListener("DOMContentLoaded", function () {

let cart = [];
let total = 0;

// =================
// TAMBAH CART
// =================
window.addToCart = function(nama, harga) {
    cart.push({ nama: nama, harga: harga });
    updateCartUI();
};

// =================
// UPDATE UI
// =================
function updateCartUI() {
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");
    let cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        total += item.harga;

        cartItems.innerHTML += `
            <div>
                ${item.nama} - Rp ${item.harga}
            </div>
        `;
    });

    cartTotal.innerText = "Total: Rp " + total;
    cartCount.innerText = cart.length;
}

// =================
// CHECKOUT
// =================
document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let alamat = document.getElementById("alamat").value;
    let metode = document.getElementById("metode").value;

    let totalText = document.getElementById("cartTotal").innerText;

    // 🔥 SIMPAN KE DATABASE
    fetch("checkout.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nama=${nama}&hp=${hp}&alamat=${alamat}&metode=${metode}&total=${total}`
    });

    // 🔥 KIRIM WA
    let pesan = `🛒 PESANAN BARU
-------------------------
Nama: ${nama}
No HP: ${hp}
Alamat: ${alamat}
Metode: ${metode}
${totalText}

Terima kasih 🙏`;

    let noAdmin = "628999154952";
    let url = `https://wa.me/${noAdmin}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");

    // reset
    cart = [];
    total = 0;
    updateCartUI();
});

// =================
// MODAL
// =================
window.openCheckout = function() {
    document.getElementById("checkoutModal").classList.add("active");
};

window.closeCheckout = function() {
    document.getElementById("checkoutModal").classList.remove("active");
};

window.toggleCart = function() {
    document.getElementById("cartModal").classList.toggle("active");
};

});