//Navbar
////////////////////////////////////////////////////////////////////////* SCRIPT TOMBOL SEARCH//////////////////////////////////////////////////////////////////////////
const products = [
    { 
        name: 'Dress Kids Lengan Panjang Amerta Laksmi', 
        brand: 'ADEN HIJAB',
        // Gunakan path dari root folder project Anda
        url: '/aden-hijab/products/amerta-laksmi-dress-kids-lengan-panjang=nature-black.html', 
        img: 'https://i.ibb.co.com/hx4CVM8G/nature-black-dress-kids1.jpg',
        colour: 'NatureBlack', 
        price: 'Rp 100.000 - Rp 480.000'
    },
    { 
        name: 'Dress Kids Lengan Panjang Amerta Laksmi', 
        brand: 'ADEN HIJAB',
        // Gunakan path dari root folder project Anda
        url: '/aden-hijab/products/amerta-laksmi-dress-kids-lengan-panjang=straw.html', 
        img: 'https://i.ibb.co.com/pj3VPwRC/straw-dress-kids.jpg',
        colour: 'Straw', 
        price: 'Rp 100.000 - Rp 480.000'
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const inputDT = document.getElementById('input-desktop');
    const inputMB = document.getElementById('input-mobile');
    const dropDT = document.getElementById('drop-suggestion');
    const overMB = document.getElementById('over-mobile');
    const backdrop = document.getElementById('search-backdrop');
    let scrollPos = 0;

    // FUNGSI RENDER (DIPERBAIKI: Menggunakan p.url langsung)
    function render(data, gridId, isTyping) {
    const targetGrid = document.getElementById(gridId);
    if (!targetGrid) return;

    if (!isTyping) {
        targetGrid.innerHTML = `
            <div class="col-span-full py-10 flex flex-col items-center justify-center text-stone-300">
                <svg class="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke-width="1.5"/>
                </svg>
                <p class="text-[10px] uppercase tracking-[0.2em]">Type product name to search...</p>
            </div>`;
        return;
    }

    if (data.length === 0) {
        targetGrid.innerHTML = `<p class="col-span-full py-10 text-center text-stone-300 text-[10px] uppercase tracking-widest">No results found</p>`;
        return;
    }

    targetGrid.innerHTML = data.map(p => `
        <div class="product-item h-auto bg-white overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex flex-col group animate-fade-up relative z-50">
            <a href="${p.url}" class="flex flex-col h-full cursor-pointer">
                <div class="relative bg-stone-200 overflow-hidden aspect-[3/4]">
                    <img src="${p.img}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
                </div>
                
                <div class="p-3 md:p-4">
                    <p class="text-stone-400 text-[8px] uppercase tracking-widest mb-1">${p.brand}</p>
                    <h4 class="text-[11px] md:text-sm font-medium text-stone-800 line-clamp-2 h-[2.8em] leading-tight">
                        ${p.name}
                    </h4>
                    <p class="text-stone-400 text-[9px] md:text-[11px] mt-1 italic">${p.colour}</p>
                    <p class="text-stone-800 text-[10px] md:text-sm font-medium mt-1 tracking-tight">
                        ${p.price}
                    </p>
                </div>
            </a>
        </div>
    `).join('');
}

    const handleSearchLogic = (e, gridId, labelId) => {
        const val = e.target.value.toLowerCase().trim();
        const labelStatus = document.getElementById(labelId);

        if (val === "") {
            labelStatus.innerText = "Cari Produk Kami";
            render([], gridId, false);
        } else {
            const filtered = products.filter(p => p.name.toLowerCase().includes(val));
            labelStatus.innerText = `Hasil untuk: "${val}"`;
            render(filtered, gridId, true);
        }
    };

    // FUNGSI HANDLE FORM (DIPERBAIKI: Mengarahkan ke list pencarian atau link spesifik)
    const handleForm = (e, inp, gridId) => {
    e.preventDefault();
    const query = inp.value.toLowerCase().trim();

    if (query) {
        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        if (filtered.length > 0) {
            // Jika user menekan ENTER dan hanya ada 1 hasil, langsung pindah
            if (filtered.length === 1) {
                window.location.href = filtered[0].url;
            } else {
                // Jika banyak hasil, arahkan ke halaman pencarian dengan query
                window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
            }
        }
    }
};

    // EVENT LISTENERS
    inputDT.addEventListener('input', (e) => handleSearchLogic(e, 'grid-suggestion', 'label-status'));
    inputMB.addEventListener('input', (e) => handleSearchLogic(e, 'grid-mobile', 'label-mobile'));

    document.getElementById('form-desktop').onsubmit = (e) => handleForm(e, inputDT, 'grid-suggestion');
    document.getElementById('form-mobile').onsubmit = (e) => handleForm(e, inputMB, 'grid-mobile');

    // LOGIKA OPEN/CLOSE
    inputDT.addEventListener('focus', () => {
        dropDT.classList.remove('hidden');
        backdrop.classList.remove('hidden');
        activateLock();
        render([], 'grid-suggestion', false);
    });

    document.getElementById('btn-trigger-mobile').addEventListener('click', () => {
        overMB.classList.remove('hidden');
        overMB.classList.add('flex');
        activateLock();
        render([], 'grid-mobile', false);
        setTimeout(() => inputMB.focus(), 300);
    });

    window.closeSearch = () => {
        dropDT.classList.add('hidden');
        overMB.classList.add('hidden');
        overMB.classList.remove('flex');
        backdrop.classList.add('hidden');
        deactivateLock();
        inputDT.value = '';
        inputMB.value = '';
    };

    backdrop.onclick = closeSearch;
    document.getElementById('btn-close-mobile').onclick = closeSearch;

    function activateLock() {
        scrollPos = window.pageYOffset;
        document.body.classList.add('overflow-hidden');
    }

    function deactivateLock() {
        document.body.classList.remove('overflow-hidden');
    }
});

////////////////////////////////////////////////////////////////////////* SCRIPT SIDECART//////////////////////////////////////////////////////////////////////////
// Jalankan setiap kali halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
    renderCartFromStorage();
    updateCartBadge();
});

// FUNGSI UTAMA: Simpan UI Keranjang ke Memori
function saveCartToStorage() {
    const cartItems = [];
    const rows = document.querySelectorAll('.cart-item-row');
    
    rows.forEach(row => {
        cartItems.push({
            brand: row.querySelector('.item-brand-info').innerText, // Ambil Brand
            name: row.querySelector('.item-name-info').innerText,
            color: row.querySelector('.item-color-info').innerText.split(': ')[1] || row.querySelector('.item-color-info').innerText,
            size: row.querySelector('.item-size-info').innerText.split(': ')[1] || row.querySelector('.item-size-info').innerText,
            qty: parseInt(row.querySelector('.qty-value').innerText),
            price: parseInt(row.querySelector('.side-cart-price').getAttribute('data-unit-price')),
            image: row.querySelector('img').src,
            link: row.querySelector('a') ? row.querySelector('a').href : "#"
        });
    });
    localStorage.setItem('myCart', JSON.stringify(cartItems));
}

function renderCartFromStorage() {
    const savedCart = JSON.parse(localStorage.getItem('myCart')) || [];
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    // Bersihkan container sebelum render ulang
    container.innerHTML = ''; 

    if (savedCart.length > 0) {
        savedCart.forEach(item => {
            const itemHTML = createCartItemHTML(item.brand, item.name, item.color, item.size, item.qty, item.price, item.image, item.link);
            container.insertAdjacentHTML('beforeend', itemHTML);
        });
        updateSubtotal();
    } 

    // --- KUNCI UTAMA ---
    // Panggil checkEmptyCart() di sini agar setiap kali data di-render (tambah/hapus), 
    // tombol Check Out / Continue Shopping ikut diperbarui statusnya.
    checkEmptyCart(); 
    updateCartBadge();
}

// Template tampilan item di Sidecart
// Template tampilan item di Sidecart dengan tombol hapus di tengah
function createCartItemHTML(brand, name, color, size, qty, unitPrice, img, link = "") {
    return `
    <div class="flex gap-6 items-start border-b border-stone-50 pb-6 last:border-0 cart-item-row group">
        <a href="${link}" class="w-24 h-32 bg-stone-50 border border-stone-100 shrink-0 overflow-hidden group/img">
            <img src="${img}" class="w-full object-cover transition-transform duration-500 group-hover/img:scale-110">
        </a>
        <div class="flex flex-col justify-between h-32 flex-grow">
            <div>
                <p class="text-[12px] text-stone-400 tracking-[0.2em] uppercase mb-0.5 item-brand-info">${brand}</p>
                <a href="${link}" class="hover:text-[#514136] transition-colors">
                    <p class="text-[11px] text-stone-800 font-bold uppercase tracking-widest item-name-info">${name}</p>
                </a>
                <p class="text-[12px] text-stone-400 uppercase mt-1 item-color-info">${color}</p>
                <p class="text-[12px] text-stone-400 uppercase item-size-info">${size}</p>
            </div>

            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <div class="flex items-center border border-stone-200">
                        <button onclick="updateSideCartQty(this, -1)" class="px-2 py-1 border-r border-stone-200 hover:bg-stone-50">-</button>
                        <span class="px-3 py-1 text-[10px] font-bold qty-value">${qty}</span>
                        <button onclick="updateSideCartQty(this, 1)" class="px-2 py-1 border-l border-stone-200 hover:bg-stone-50">+</button>
                    </div>

                    <button onclick="removeFromCartDirectly(this)" 
                            class="p-2 bg-red-50 text-red-400 rounded-sm hover:bg-red-500 hover:text-white transition-all group/del">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.123a2.25 2.25 0 00-2.25-2.25h-4.5a2.25 2.25 0 00-2.25 2.25v1.123m14.102 0a48.242 48.242 0 00-5.366-.75" />
                        </svg>
                    </button>
                </div>

                <p class="text-[14px] font-bold text-[#514136] side-cart-price" data-unit-price="${unitPrice}">
                    Rp ${(unitPrice * qty).toLocaleString('id-ID')}
                </p>
            </div>
        </div>
    </div>`;
}

// Fungsi Update Quantity di Sidecart
function updateSideCartQty(btn, delta) {
    const row = btn.closest('.cart-item-row');
    const qtyElement = row.querySelector('.qty-value');
    const priceElement = row.querySelector('.side-cart-price');
    const unitPrice = parseInt(priceElement.getAttribute('data-unit-price'));

    let newQty = parseInt(qtyElement.innerText) + delta;

    if (newQty > 0) {
        qtyElement.innerText = newQty;
        priceElement.innerText = 'Rp ' + (unitPrice * newQty).toLocaleString('id-ID');
    } else {
        row.remove();
    }
    
    saveCartToStorage(); // SIMPAN PERUBAHAN KE MEMORI
    updateSubtotal();
    updateCartBadge();
    checkEmptyCart();
}

function removeFromCartDirectly(btn) {
    const row = btn.closest('.cart-item-row');
    if (row) {
        // Efek visual menghilang
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            row.remove();
            saveCartToStorage(); // Update LocalStorage
            updateSubtotal();    // Update total harga
            updateCartBadge();   // Update angka di icon tas
            checkEmptyCart();    // Cek jika keranjang jadi kosong
            
            // Sinkronisasi dengan Wishlist agar tombol kembali ke "Add to Cart"
            if (typeof renderWishlist === "function") renderWishlist(); 
        }, 300);
    }
}

// Fungsi Navigasi Open/Close Cart (Gunakan yang sudah Anda buat)
let scrollPosition = 0;
function openCart(event) {
    if(event) event.preventDefault();
    const cart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    
    cart.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    
    // Kunci scroll body untuk mencegah kebocoran visual
    document.body.style.overflow = 'hidden';
}

function closeCart(event) {
    if(event) event.preventDefault();
    const cart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    
    cart.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    
    // Kembalikan scroll body
    document.body.style.overflow = '';
}

// Fungsi Badge & Subtotal
function updateCartBadge() {
    const rows = document.querySelectorAll('.cart-item-row');
    const badge = document.getElementById('cart-badge');
    const label = document.getElementById('cart-total-label');
    
    let totalQuantity = 0;

    // Menghitung total quantity dari setiap baris produk
    rows.forEach(row => {
        const qtyValue = parseInt(row.querySelector('.qty-value').innerText);
        totalQuantity += qtyValue;
    });

    // Update angka pada badge merah/cokelat di icon tas
    if (badge) {
        badge.innerText = totalQuantity;
        
        // Opsional: Sembunyikan badge jika 0 agar lebih bersih
        badge.style.display = totalQuantity > 0 ? 'flex' : 'none';
    }

    // Update tulisan "Total X Item" di bagian atas sidecart
    if (label) {
        label.innerText = `Total ${totalQuantity} Item`;
    }
    
}

function updateSubtotal() {
    const prices = document.querySelectorAll('.side-cart-price');
    let total = 0;
    prices.forEach(p => { total += parseInt(p.innerText.replace(/[^0-9]/g, '')); });
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function checkEmptyCart() {
    const container = document.getElementById('cart-items-container');
    const checkoutBtn = document.getElementById('checkout-button');
    
    if (!container) return;

    // Cek jumlah item berdasarkan class row
    const rows = container.querySelectorAll('.cart-item-row');
    const hasItems = rows.length > 0;

    if (!hasItems) {
        // TAMPILAN KOSONG
        container.innerHTML = `
            <div id="empty-state" class="h-full flex flex-col items-center justify-center text-stone-400 opacity-60">
                <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p class="text-[10px] uppercase tracking-widest">Cart Is Empty</p>
            </div>`;

        if (checkoutBtn) {
            checkoutBtn.innerText = "Continue Shopping";
            checkoutBtn.setAttribute('onclick', 'closeCart(event)');
        }
    } else {
        // TAMPILAN ADA ISI
        // Hapus pesan empty-state jika ada agar tidak mengganggu item produk
        const emptyState = document.getElementById('empty-state');
        if (emptyState) emptyState.remove();

        checkoutBtn.innerText = "Check Out";
        checkoutBtn.onclick = function() {
            // Pastikan ini kembali ke halaman checkout
            window.location.href = '../../checkout.html';
        }
    }
}

function updateSideCartQty(btn, delta) {
    const row = btn.closest('.cart-item-row');
    const qtyElement = row.querySelector('.qty-value');
    const priceElement = row.querySelector('.side-cart-price');
    const unitPrice = parseInt(priceElement.getAttribute('data-unit-price'));

    let newQty = parseInt(qtyElement.innerText) + delta;

    if (newQty > 0) {
        qtyElement.innerText = newQty;
        priceElement.innerText = 'Rp ' + (unitPrice * newQty).toLocaleString('id-ID');
    } else {
        row.remove();
    }
    
    saveCartToStorage(); 
    updateSubtotal();
    updateCartBadge();
    checkEmptyCart();
    
    // --- TAMBAHAN: Update tampilan Wishlist jika item dihapus ---
    renderWishlist(); 
}

////////////////////////////////////////////////////////////////////////* SCRIPT SIDEMENU//////////////////////////////////////////////////////////////////////////
  document.addEventListener('DOMContentLoaded', function() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('menu-overlay');
        const menuIcon = document.getElementById('menu-icon');

        if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
        if(overlay) overlay.addEventListener('click', toggleMenu);
    });

    // Fungsi Dropdown Sub-Menu
    function toggleSubMenu(id) {
        const sub = document.getElementById(id);
        const icon = document.getElementById('icon-' + id) || document.querySelector(`[onclick="toggleSubMenu('${id}')"] svg`);
        
        if (sub) {
            sub.classList.toggle('hidden');
            sub.classList.toggle('flex');
            
            // Animasi Rotasi Icon
            if (icon) {
                const isHidden = sub.classList.contains('hidden');
                icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        }
    }

    

   ////////////////////////////////////////////////////////////////////////* SCRIPT TOMBOL WISHLIST////////////////////////////////////////////////////////////////////////// 
// --- INITIAL LOAD ---
window.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateWishlistBadge();
    syncWishlistIcons();
    updateDetailWishlistBtn();
});

// --- FUNGSI UTAMA: ADD TO WISHLIST ---
function addToWishlist() {
    if (!activeSize) {
        alert("Silakan pilih ukuran terlebih dahulu.");
        return;
    }
    if (maxAvailableStock <= 0) {
        showStockModal("Out of Stocks");
        return;
    }
    const btn = document.getElementById('detail-wishlist-btn');
    const productName = document.getElementById('main-product-name').innerText.trim();
    const coverImg = productImages[0];
    const brand = document.getElementById('product-brand').innerText;
    const price = document.getElementById('total-price-display').innerText;
    const color = document.getElementById('color-label').innerText;
    
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const existingIndex = wishlist.findIndex(item => 
        item.name === productName && 
        item.color === color && 
        item.size === activeSize
    );
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        updateDetailWishlistBtn();
        renderWishlist();
        updateWishlistBadge();
        syncWishlistIcons();
    } else {
        // JIKA TIDAK ADA: TAMBAH
        btn.disabled = true;
        btn.innerHTML = `<span class="loading-spinner"></span>`;

        setTimeout(() => {
            const productData = {
                id: Date.now() + Math.random(),
                brand: brand,
                name: productName,
                price: price,
                color: color,
                size: activeSize,
                image: coverImg, // Menggunakan foto utama
                link: window.location.href
            };

            wishlist.unshift(productData);
            localStorage.setItem('myWishlist', JSON.stringify(wishlist));

            btn.disabled = false;
            updateDetailWishlistBtn();
            renderWishlist();
            updateWishlistBadge();
            syncWishlistIcons();
            openWishlist(); 
        }, 600);
    }
}

function renderWishlist() {
    const container = document.getElementById('wishlist-items-container');
    // Ambil data terbaru dari localStorage
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-stone-400 opacity-60">
                <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p class="text-[10px] uppercase tracking-widest">Wishlist Is Empty</p>
            </div>`;
        return;
    }

    container.innerHTML = wishlist.map((item) => {
        // LOGIKA KUNCI: Cek apakah item ini sudah ada di Cart
        // Kita cek berdasarkan kombinasi Nama + Warna + Size
        const isInCart = cart.some(cartItem => 
            cartItem.name === item.name && 
            cartItem.color === item.color && 
            cartItem.size === item.size
        );
        
        const productLink = item.link || '#';

        return `
        <div class="flex gap-4 border-b border-stone-100 pb-6 relative group">
            <a href="${productLink}" class="w-20 h-28 bg-stone-50 overflow-hidden shrink-0 block">
                <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </a>

            <div class="flex-grow flex flex-col justify-between py-0.5">
                <div>
                    <p class="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-1">${item.brand}</p>
                    <a href="${productLink}" class="hover:text-[#514136] transition-colors">
                        <h4 class="text-[12px] font-bold uppercase text-stone-800 leading-tight tracking-wide">${item.name}</h4>
                    </a>
                    <p class="text-[12px] text-stone-400 uppercase mt-1 item-color-info">${item.color}</p>
                <p class="text-[12px] text-stone-400 uppercase item-size-info">${item.size}</p>
                    <p class="text-[13px] font-bold text-[#514136] leading-tight tracking-wide">${item.price}</p>
                </div>

                <div class="flex items-center gap-2 mt-3">
                    ${isInCart ? `
                        <button onclick="openCart(event); closeWishlist();" 
                                class="flex-grow bg-stone-100 text-stone-600 py-2.5 px-3 text-[9px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all hover:bg-stone-200 border border-stone-200">
                            View on Cart
                        </button>
                    ` : `
                        <button onclick="moveWishlistToCart(${item.id})" 
                                class="flex-grow bg-[#514136] text-white py-2.5 px-3 text-[9px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all hover:bg-[#3d3129] hover:shadow-lg active:scale-95">
                            Add to Cart
                        </button>
                    `}
                    
                    <button onclick="removeFromWishlist(${item.id})" 
                            class="p-2.5 bg-red-50 text-red-400 rounded-sm hover:bg-red-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.123a2.25 2.25 0 00-2.25-2.25h-4.5a2.25 2.25 0 00-2.25 2.25v1.123m14.102 0a48.242 48.242 0 00-5.366-.75" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// --- FUNGSI UPDATE BADGE ---
function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const badge = document.getElementById('wishlist-badge');
    const label = document.getElementById('wishlist-total-label');
    
    if (badge) badge.innerText = wishlist.length;
    if (label) label.innerText = `${wishlist.length} Item Selected`;
}

// --- FUNGSI HAPUS ITEM ---
function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    
    renderWishlist();
    updateWishlistBadge();
    syncWishlistIcons(); // Update love icon di card
    updateDetailWishlistBtn(); // Update tombol Save/Remove di halaman detail
}

   function openWishlist() {
    const sidebar = document.getElementById('side-wishlist');
    const overlay = document.getElementById('wishlist-overlay');
    
    sidebar.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    
    // Mencegah body scroll saat wishlist buka
    document.body.style.overflow = 'hidden';
}

function closeWishlist() {
    const sidebar = document.getElementById('side-wishlist');
    const overlay = document.getElementById('wishlist-overlay');
    
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    
    // Mengembalikan scroll body
    document.body.style.overflow = '';
}

// Menutup wishlist jika menekan tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeWishlist();
});

// 1. JALANKAN SAAT REFRESH
window.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateWishlistBadge();
    syncWishlistIcons();
    updateDetailWishlistBtn(); // Tambahkan ini
});

// 2. FUNGSI CEK STATUS (Agar tetap merah setelah refresh)
function syncWishlistIcons() {
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const allBtns = document.querySelectorAll('.wishlist-btn');

    allBtns.forEach(btn => {
        const card = btn.closest('.product-item');
        const productName = card.getAttribute('data-name');
        const productColor = card.getAttribute('data-colour'); // Tambahkan ini
        
        // Cek apakah produk dengan NAMA dan WARNA spesifik ini ada di wishlist
        const isExist = wishlist.some(item => 
            item.name === productName && item.color === productColor
        );
        
        const svg = btn.querySelector('svg');

        if (isExist) {
            svg.setAttribute('fill', 'currentColor');
            btn.classList.add('text-red-500');
            btn.classList.remove('text-stone-400');
        } else {
            svg.setAttribute('fill', 'none');
            btn.classList.remove('text-red-500');
            btn.classList.add('text-stone-400');
        }
    });
}

// 3. FUNGSI TOGGLE (Klik tambah, klik lagi hapus)
function addToWishlistFromCard(btn, event) {
    event.preventDefault();
    event.stopPropagation();

    const card = btn.closest('.product-item');
    const productName = card.getAttribute('data-name');
    const productBrand = card.getAttribute('data-brand') || "Aden Hijab";
    const productColor = card.getAttribute('data-colour') || "Default Color";
    const productSize = card.getAttribute('data-size') || "XXS"; // Default sesuai card
    const productImg = card.querySelector('.product-img-main').src;
    const productPrice = card.getAttribute('data-price') || "0"; 
    const productLink = card.querySelector('a')?.href || window.location.href;
    
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    const existingIndex = wishlist.findIndex(item => 
        item.name === productName && 
        item.color === productColor && 
        item.size === productSize
    );

    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        const productData = {
            id: Date.now() + Math.random(),
            name: productName,
            brand: productBrand,
            image: productImg,
            color: productColor,
            size: productSize,
            price: productPrice,
            link: productLink
        };
        wishlist.unshift(productData);
    }

    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    
    // UPDATE SEMUA UI
    syncWishlistIcons();
    renderWishlist(); // Ini yang memastikan tombol "View on Cart" muncul jika sudah ada di keranjang
    updateWishlistBadge();
    openWishlist(); 
}

function moveWishlistToCart(id) {
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    const item = wishlist.find(i => i.id === id);
    if (!item) return;

    // Cek duplikat di keranjang berdasarkan Nama + Warna + Size
    const existingInCart = cart.find(c => 
        c.name === item.name && 
        c.color === item.color && 
        c.size === item.size
    );

    if (existingInCart) {
        // Jika sudah ada, buka keranjang
        closeWishlist();
        openCart();
    } else {
        // Tambahkan ke Cart
        const newCartItem = {
            id: Date.now(), // Berikan ID unik untuk cart
            brand: item.brand,
            name: item.name,
            color: item.color,
            size: item.size,
            qty: 1,
            price: parseInt(item.price.replace(/[^0-9]/g, '')),
            image: item.image,
            link: window.location.href
        };

        cart.unshift(newCartItem);
        localStorage.setItem('myCart', JSON.stringify(cart));

        // --- UPDATE SEMUA TAMPILAN ---
        if (typeof renderCartFromStorage === "function") renderCartFromStorage();
        updateCartBadge();
        renderWishlist(); // Render ulang agar tombol berubah jadi "View on Cart"
        
        // Opsional: Langsung buka cart setelah klik add
        // setTimeout(() => { closeWishlist(); openCart(); }, 300);
    }
}

// --- 1. FUNGSI UNTUK UPDATE TAMPILAN TOMBOL DI HALAMAN DETAIL ---
function updateDetailWishlistBtn() {
    const btn = document.getElementById('detail-wishlist-btn');
    const productNameElem = document.getElementById('main-product-name');
    const colorLabelElem = document.getElementById('color-label'); 
    
    if (!btn || !productNameElem) return;

    const productName = productNameElem.innerText.trim();
    const productColor = colorLabelElem ? colorLabelElem.innerText.trim() : "";
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    
    // --- STEP 1: Update Tanda Love di Tombol-Tombol Size ---
    document.querySelectorAll('.size-btn').forEach(sBtn => {
        const sizeValue = sBtn.innerText.trim();
        
        // Hapus indikator love lama (agar tidak duplikat atau salah render)
        const existingLove = sBtn.querySelector('.size-love-indicator');
        if (existingLove) existingLove.remove();
        sBtn.classList.remove('relative');

        // Cek apakah kombinasi Nama + Warna + Size ini ada di wishlist
        const isThisSizeInWishlist = wishlist.some(item => 
            item.name === productName && 
            item.color === productColor && 
            item.size === sizeValue
        );

        if (isThisSizeInWishlist) {
    sBtn.classList.add('relative');
    const loveIcon = `
        <span class="size-love-indicator absolute -top-1 -right-1 text-red-500 bg-white rounded-full leading-none z-10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.74 0 3.285.834 4.312 2.133C13.027 3.834 14.572 3 16.312 3c2.974 0 5.438 2.322 5.438 5.25 0 3.924-2.438 7.11-4.744 9.272a25.542 25.542 0 01-4.627 3.388l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
        </span>`; // HAPUS CLASS 'animate-pulse' DI ATAS
    sBtn.insertAdjacentHTML('beforeend', loveIcon);
}
    });

    // 2. Update Teks Tombol Utama berdasarkan activeSize
    const isCurrentActiveInWishlist = wishlist.some(item => 
        item.name === productName && 
        item.color === productColor && 
        item.size === activeSize
    );

    if (isCurrentActiveInWishlist) {
        btn.innerText = "Remove From Wishlist";
        btn.classList.add('bg-stone-800', 'text-white');
        btn.classList.remove('text-stone-800');
    } else {
        btn.innerText = "Save To Wishlist";
        btn.classList.remove('bg-stone-800', 'text-white');
        btn.classList.add('text-stone-800');
    }
}

window.addEventListener('storage', (e) => {
    if (e.key === 'myWishlist' || e.key === 'myCart') {
        renderWishlist();
        updateWishlistBadge();
        syncWishlistIcons();
        if (typeof renderCartFromStorage === "function") renderCartFromStorage();
    }
});
 

    ////////////////////////////////////////////////////////////////////////* SCRIPT LINK DETAIL PRODUK////////////////////////////////////////////////////////////////////////// 

 // script untuk Side Cart di Detail Produk   
// --- INITIALIZE ---
window.addEventListener('DOMContentLoaded', () => {
    if (typeof productImages !== 'undefined') renderThumbnails();
    updateWishlistBadge();
    // Default active size styling
    const firstSizeBtn = document.querySelector('.size-btn');
    if (firstSizeBtn) firstSizeBtn.click();add('border-2', 'border-stone-800', 'font-bold');
    updateDetailWishlistBtn();
});
// --- INIT: Thumbnail Render ---
function renderThumbnails() {
    const container = document.getElementById('thumb-gallery');
    if(!container || !productImages) return;
    container.innerHTML = productImages.map((src, idx) => `
        <img onclick="jumpToSlide(${idx})" src="${src}" 
             class="thumb-item object-cover cursor-pointer border-b-2 transition-all duration-300 h-20 w-full
             ${idx === 0 ? 'border-stone-800 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}">
    `).join('');
}

// --- SLIDER LOGIC ---
function updateMainImage(index) {
    const mainImg = document.getElementById('main-product-image');
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
        mainImg.src = productImages[index];
        mainImg.style.opacity = '1';
        // Update thumbnail borders
        document.querySelectorAll('.thumb-item').forEach((thumb, i) => {
            thumb.className = `thumb-item object-cover cursor-pointer border-b-2 transition-all duration-300 h-20 w-full ${i === index ? 'border-stone-800 opacity-100' : 'border-transparent opacity-50'}`;
        });
    }, 150);
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % productImages.length;
    updateMainImage(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + productImages.length) % productImages.length;
    updateMainImage(currentSlideIndex);
}

function jumpToSlide(index) {
    currentSlideIndex = index;
    updateMainImage(index);
}

// --- COLOR LOGIC (SYNC TO IMAGE) ---
function selectColor(colorName, imageSrc, btn) {
    activeColor = colorName;
    document.getElementById('color-label').innerText = colorName;
    document.getElementById('main-product-image').src = imageSrc;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.replace('border-stone-800', 'border-transparent'));
    btn.classList.replace('border-transparent', 'border-stone-800');
}

// --- PRICE & QUANTITY LOGIC ---
function updatePriceDisplay() {
    const priceDisplay = document.getElementById('total-price-display');
    if (!priceDisplay) return;
    const displayPrice = baseUnitPrice;
    priceDisplay.innerText = 'Rp ' + displayPrice.toLocaleString('id-ID');
}

function updatePriceSize(price, size, btn) {
    baseUnitPrice = price;
    activeSize = size;
    
    // 1. Ambil nilai stok dari atribut data-stock tombol yang diklik
    const selectedStock = parseInt(btn.getAttribute('data-stock')) || 0;
    maxAvailableStock = selectedStock;

    // 2. Update tampilan teks stok di UI
    const stockDisplay = document.getElementById('current-stock-text');
    if (stockDisplay) {
        stockDisplay.innerText = selectedStock;
        
        // Opsional: Beri warna merah jika stok habis
        if (selectedStock === 0) {
            stockDisplay.parentElement.classList.add('text-red-500');
            stockDisplay.innerText = "Out of"; 
        } else {
            stockDisplay.parentElement.classList.remove('text-red-500');
        }
    }

    maxAvailableStock = parseInt(btn.getAttribute('data-stock')) || 0;
    
    const addToCartBtn = document.querySelector('button[onclick="confirmAddToCart()"]');

    if (maxAvailableStock <= 0) {
        // Jika stok habis: Ubah tampilan tombol Add To Cart
        addToCartBtn.innerText = "OUT OF STOCKS";
        addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addToCartBtn.disabled = true; // Benar-benar tidak bisa diklik
    } else {
        // Jika stok ada: Kembalikan tombol ke normal
        addToCartBtn.innerText = "ADD TO CART";
        addToCartBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addToCartBtn.disabled = false;
    }

    // 3. Reset jumlah beli ke 1 (atau 0 jika stok habis)
    buyQty = selectedStock > 0 ? 1 : 0;
    document.getElementById('qty-count').innerText = buyQty;

    // 4. Logika styling tombol (sudah ada di kode Anda)
    document.querySelectorAll('.size-btn').forEach(b => {
        b.classList.remove('border-2', 'border-stone-800', 'font-bold');
        b.classList.add('border-stone-200');
    });
    btn.classList.add('border-2', 'border-stone-800', 'font-bold');
    btn.classList.remove('border-stone-200');

    if (typeof updatePriceDisplay === "function") updatePriceDisplay();
    updateDetailWishlistBtn();
}

function changeQty(delta) {
    const qtyDisplay = document.getElementById('qty-count');
    const btnPlus = document.getElementById('btn-plus');
    const nextQty = buyQty + delta;

    // Reset warna tombol plus ke default setiap ada perubahan
    btnPlus.classList.remove('text-red-600', 'scale-125', 'font-bold');
    btnPlus.classList.add('text-stone-500');

    if (nextQty >= 1) {
        if (nextQty <= maxAvailableStock) {
            buyQty = nextQty;
            qtyDisplay.innerText = buyQty;
        } else {
            // JIKA MELEBIHI STOK          
            // 2. Munculkan Modal Custom
            showStockModal(`Stock Available ${maxAvailableStock} unit.`);
        }
    }
}

function showStockModal(message) {
    const modal = document.getElementById('stock-warning-modal');
    document.getElementById('modal-msg').innerText = message;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Kunci scroll
}

function closeStockModal() {
    const modal = document.getElementById('stock-warning-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Aktifkan scroll
}

// --- FINAL ADD TO CART ---
function confirmAddToCart() {
    if (!activeSize) { alert("Silakan pilih ukuran."); return; }
    if (maxAvailableStock <= 0) {
        showStockModal("Out of Stocks.");
        return; }
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    const mainImg = document.getElementById('main-product-image');
    const cartIcon = document.querySelector('a[onclick="openCart(event)"]'); // Mengambil icon tas



        // Ambil data produk
        const productBrand = document.getElementById('product-brand').innerText;
    const productName = document.getElementById('main-product-name').innerText;
    const productPrice = baseUnitPrice; 
    const productImage = productImages[0];
    
    const container = document.getElementById('cart-items-container');
    
    // Cek duplikat (Opsional tapi disarankan)
    const existingItems = container.querySelectorAll('.cart-item-row');
    let isDuplicate = false;

    existingItems.forEach(row => {
        const rowName = row.querySelector('.item-name-info').innerText;
        const rowColor = row.querySelector('.item-color-info').innerText;
        const rowSize = row.querySelector('.item-size-info').innerText;

        if(rowName === productName && rowColor.includes(activeColor) && rowSize.includes(activeSize)) {
            // Jika sama, tinggal tambah quantity di UI
            const qtySpan = row.querySelector('.qty-value');
            qtySpan.innerText = parseInt(qtySpan.innerText) + buyQty;
            isDuplicate = true;
        }
    });

    if (!isDuplicate) {
        const itemHTML = createCartItemHTML(productBrand, productName, activeColor, activeSize, buyQty, productPrice, productImage, window.location.href);
        
        const emptyMsg = container.querySelector('.h-full.flex-col');
        if (emptyMsg) container.innerHTML = '';

        container.insertAdjacentHTML('afterbegin', itemHTML);

        
    }
    
    saveCartToStorage();
    renderCartFromStorage();
    updateSubtotal();

    if (typeof renderWishlist === "function") {
        renderWishlist();
    }
    
 runCartAnimation(btn, originalText, mainImg);
 
}

function runCartAnimation(btn, originalText, mainImg) {
    const cartIcon = document.querySelector('a[onclick="openCart(event)"]');
    btn.disabled = true;
    btn.innerHTML = `<span class="loading-spinner"></span>`;

    const imgClone = mainImg.cloneNode();
    const imgRect = mainImg.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    document.body.appendChild(imgClone);
    Object.assign(imgClone.style, {
        position: 'fixed', zIndex: '9999', 
        top: imgRect.top + 'px', left: imgRect.left + 'px',
        width: imgRect.width + 'px', height: imgRect.height + 'px', 
        transition: 'all 0.8s cubic-bezier(0.42, 0, 0.58, 1)', // Animasi lebih halus
        pointerEvents: 'none', objectFit: 'cover', borderRadius: '8px'
    });

    setTimeout(() => {
        Object.assign(imgClone.style, {
            width: '15px', height: '15px', 
            top: (cartRect.top + 5) + 'px', left: (cartRect.left + 10) + 'px', 
            opacity: '0.2', transform: 'rotate(20deg)'
        });
    }, 50);

    // --- BAGIAN PENENTU ---
    setTimeout(() => {
        imgClone.remove();
        btn.disabled = false;
        btn.innerHTML = originalText;

        // UPDATE UI HANYA SETELAH GAMBAR MASUK
        updateCartBadge(); // Angka badge bertambah di sini
        updateSubtotal();  // Total harga update di sini
        
        // Efek getar ikon keranjang
        cartIcon.classList.add('cart-shake');
        setTimeout(() => cartIcon.classList.remove('cart-shake'), 400);

        // Reset quantity ke 1 setelah berhasil
        buyQty = 1;
        const qtyDisplay = document.getElementById('qty-count');
        if(qtyDisplay) qtyDisplay.innerText = "1";

    }, 800); // Durasi ini harus sama dengan durasi transition di atas (0.8s)
    
}

// Pindahkan logika penambahan HTML ke fungsi terpisah agar rapi
function executeCartLogic() {
    const cartContainer = document.getElementById('cart-items-container');
    const productImg = document.getElementById('main-product-image').src;
    
    // AMBIL NAMA DINAMIS DARI HALAMAN
    const productName = document.querySelector('h4').innerText.trim(); 

    const existingRows = cartContainer.querySelectorAll('.cart-item-row');
    let duplicateRow = null;
    
    existingRows.forEach(row => {
        // Cek Nama, Warna, dan Ukuran sekaligus agar tidak tertukar dengan produk lain
        const rowName = row.querySelector('.item-name-info').innerText; // Pastikan ada class ini
        const rowColor = row.querySelector('.item-color-info').innerText.replace('Warna: ', '');
        const rowSize = row.querySelector('.item-size-info').innerText.replace('Ukuran: ', '');
        
        if (rowName === productName && rowColor === activeColor && rowSize === activeSize) {
            duplicateRow = row;
        }
    });

    if (duplicateRow) {
        const qtyEl = duplicateRow.querySelector('.qty-value');
        const priceEl = duplicateRow.querySelector('.side-cart-price');
        let newQty = parseInt(qtyEl.innerText) + buyQty;
        qtyEl.innerText = newQty;
        priceEl.innerText = 'Rp ' + (baseUnitPrice * newQty).toLocaleString('id-ID');
    } else {
        if (cartContainer.querySelector('svg')) cartContainer.innerHTML = '';
        
        // KIRIM productName KE FUNGSI PEMBUAT HTML
        const itemHTML = createCartItemHTML(productName, activeColor, activeSize, buyQty, baseUnitPrice, productImg);
        cartContainer.insertAdjacentHTML('afterbegin', itemHTML);
    }

    saveCartToStorage(); 
    updateSubtotal();
    updateCartBadge();
    
    buyQty = 1;
    document.getElementById('qty-count').innerText = "1";
    updatePriceDisplay();
}


// Fungsi tambahan untuk update angka jumlah item di icon tas keranjang
function updateCartCount() {
    const itemCount = document.querySelectorAll('#side-cart .flex.gap-6').length;
    const badge = document.querySelector('a[onclick="openCart(event)"] span');
    const label = document.querySelector('#side-cart p.text-stone-400');
    
    if (badge) badge.innerText = itemCount;
    if (label) label.innerText = `Total ${itemCount} Item`;
}

// Fungsi Membuka Modal
function openSizeModal() {
    const modal = document.getElementById('sizeModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Mencegah scroll pada body saat modal buka
    document.body.style.overflow = 'hidden';
}

// Fungsi Menutup Modal
function closeSizeModal() {
    const modal = document.getElementById('sizeModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    // Mengaktifkan kembali scroll
    document.body.style.overflow = 'auto';
}

// Tutup modal jika user mengklik area di luar gambar
window.onclick = function(event) {
    const modal = document.getElementById('sizeModal');
    if (event.target == modal) {
        closeSizeModal();
    }
}
// Jalankan render pertama kali
renderThumbnails();

// Jalankan saat halaman dimuat untuk update angka badge
window.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateWishlistBadge();
    syncWishlistIcons();
    updateDetailWishlistBtn();
});

function markOutOfStockSizes() {
    const allSizeButtons = document.querySelectorAll('.size-btn');
    
    allSizeButtons.forEach(btn => {
        const stock = parseInt(btn.getAttribute('data-stock')) || 0;
        
        if (stock <= 0) {
            // Tambahkan class garis merah
            btn.classList.add('size-out-of-stock');
            // Opsional: nonaktifkan fungsi klik pada tombol tersebut
            btn.onclick = (e) => {
                e.preventDefault();
                showStockModal("Out of Stocks");
            };
        }
    });
}

// Panggil fungsi di dalam inisialisasi
window.addEventListener('DOMContentLoaded', () => {
    // ... kode inisialisasi Anda yang lain ...
    markOutOfStockSizes(); 
    
    // Pastikan tombol default yang diklik otomatis bukan yang stoknya 0
    const firstAvailableBtn = Array.from(document.querySelectorAll('.size-btn'))
                                   .find(btn => parseInt(btn.getAttribute('data-stock')) > 0);
    if (firstAvailableBtn) firstAvailableBtn.click();
});



    document.addEventListener("DOMContentLoaded", function() {
        const elementsToAnimate = document.querySelectorAll('.fade-up-element');
        
        elementsToAnimate.forEach((element, index) => {
            // Berikan delay bertingkat berdasarkan index elemen (misal kelipatan 100ms)
            setTimeout(() => {
                element.classList.add('animate-in');
            }, 100 + (index * 100)); 
        });
    });

    
    


    