// --- Data Mobil ---
const cars = [
    {
        id: 1,
        brand: 'Toyota',
        name: 'Toyota Avanza',
        image: 'images/toyota_avanza.png',
        prices: {
            '12jam': 'Rp 350.000',
            '24jam': 'Rp 500.000',
            'mingguan': 'Rp 3.000.000'
        }
    },
    {
        id: 2,
        brand: 'Honda',
        name: 'Honda Brio',
        image: 'images/honda_brio.png',
        prices: {
            '12jam': 'Rp 300.000',
            '24jam': 'Rp 450.000',
            'mingguan': 'Rp 2.700.000'
        }
    },
    {
        id: 3,
        brand: 'Daihatsu',
        name: 'Daihatsu Xenia',
        image: 'images/daihatsu_xenia.png',
        prices: {
            '12jam': 'Rp 350.000',
            '24jam': 'Rp 500.000',
            'mingguan': 'Rp 3.000.000'
        }
    },
    {
        id: 4,
        brand: 'Suzuki',
        name: 'Suzuki Ertiga',
        image: 'images/suzuki_ertiga.png',
        prices: {
            '12jam': 'Rp 380.000',
            '24jam': 'Rp 550.000',
            'mingguan': 'Rp 3.200.000'
        }
    },
    {
        id: 5,
        brand: 'Suzuki',
        name: 'Suzuki XL7',
        image: 'images/suzuki_xl7.png',
        prices: {
            '12jam': 'Rp 400.000',
            '24jam': 'Rp 600.000',
            'mingguan': 'Rp 3.500.000'
        }
    }
];

// --- Render Katalog ---
const carGrid = document.getElementById('carGrid');
const carSelect = document.getElementById('carSelect');

function renderCars(filterBrand = 'All') {
    if (!carGrid) return;
    carGrid.innerHTML = '';
    let filteredCars = cars;
    
    if (filterBrand !== 'All') {
        filteredCars = cars.filter(car => car.brand === filterBrand);
    }

    filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div class="car-img-wrapper">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-info">
                <span class="car-brand">${car.brand}</span>
                <h3>${car.name}</h3>
                <div class="car-price-list">
                    <div class="price-item">
                        <span>12 Jam</span>
                        <span>${car.prices['12jam']}</span>
                    </div>
                    <div class="price-item">
                        <span>24 Jam</span>
                        <span>${car.prices['24jam']}</span>
                    </div>
                    <div class="price-item">
                        <span>Mingguan</span>
                        <span>${car.prices['mingguan']}</span>
                    </div>
                </div>
                <button class="btn-book-card" onclick="selectCar('${car.name}')">Pesan Sekarang</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

function initFormSelect() {
    if (!carSelect) return;
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.name;
        option.textContent = car.name;
        carSelect.appendChild(option);
    });
}

function selectCar(carName) {
    if (document.getElementById('carSelect')) {
        document.getElementById('carSelect').value = carName;
    }
    const pemesananSec = document.getElementById('pemesanan');
    if (pemesananSec) {
        pemesananSec.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderCars(filter);
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// --- Utility Functions ---
function parsePriceString(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}

function formatRupiah(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

// --- Order Data Storage & Seed ---
const STORAGE_KEY_ORDERS = 'morgul_rent_orders_v1';
const STORAGE_KEY_AUTH = 'morgul_admin_logged_in';

function getOrders() {
    const data = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!data) {
        const initialMock = seedMockData();
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(initialMock));
        return initialMock;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
}

function seedMockData() {
    return [
        { id: 'MGL-891021', date: '2026-08-28', customerName: 'Budi Santoso', phone: '081298765432', carName: 'Toyota Avanza', duration: '24 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 500000, status: 'Selesai' },
        { id: 'MGL-891022', date: '2026-08-25', customerName: 'Siti Rahma', phone: '085711223344', carName: 'Honda Brio', duration: '12 Jam', serviceType: 'Ambil Sendiri di Pool', totalPrice: 300000, status: 'Selesai' },
        { id: 'MGL-891023', date: '2026-08-20', customerName: 'Ahmad Fauzi', phone: '081344556677', carName: 'Suzuki XL7', duration: 'Mingguan', serviceType: 'Diantar ke Lokasi', totalPrice: 3500000, status: 'Selesai' },
        { id: 'MGL-891024', date: '2026-08-15', customerName: 'Deni Kurniawan', phone: '087811992288', carName: 'Daihatsu Xenia', duration: '24 Jam', serviceType: 'Ambil Sendiri di Pool', totalPrice: 500000, status: 'Selesai' },
        { id: 'MGL-891025', date: '2026-08-02', customerName: 'Rina Wijaya', phone: '082199887766', carName: 'Suzuki Ertiga', duration: '24 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 550000, status: 'Selesai' },
        { id: 'MGL-891026', date: '2026-08-29', customerName: 'Kevin Pratama', phone: '081233445566', carName: 'Toyota Avanza', duration: '12 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 350000, status: 'Pending' },

        // July 2026
        { id: 'MGL-771011', date: '2026-07-28', customerName: 'Hendra Gunawan', phone: '081255443322', carName: 'Toyota Avanza', duration: 'Mingguan', serviceType: 'Ambil Sendiri di Pool', totalPrice: 3000000, status: 'Selesai' },
        { id: 'MGL-771012', date: '2026-07-20', customerName: 'Nadia Putri', phone: '085699887711', carName: 'Honda Brio', duration: '24 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 450000, status: 'Selesai' },
        { id: 'MGL-771013', date: '2026-07-14', customerName: 'Eko Prasetyo', phone: '087733221100', carName: 'Suzuki XL7', duration: '24 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 600000, status: 'Selesai' },
        { id: 'MGL-771014', date: '2026-07-05', customerName: 'Maya Indah', phone: '081900112233', carName: 'Daihatsu Xenia', duration: '12 Jam', serviceType: 'Ambil Sendiri di Pool', totalPrice: 350000, status: 'Selesai' },

        // June 2026
        { id: 'MGL-661001', date: '2026-06-25', customerName: 'Rizky Ramadhan', phone: '081388776655', carName: 'Suzuki Ertiga', duration: 'Mingguan', serviceType: 'Diantar ke Lokasi', totalPrice: 3200000, status: 'Selesai' },
        { id: 'MGL-661002', date: '2026-06-18', customerName: 'Fajar Nugraha', phone: '085211447788', carName: 'Toyota Avanza', duration: '24 Jam', serviceType: 'Ambil Sendiri di Pool', totalPrice: 500000, status: 'Selesai' },
        { id: 'MGL-661003', date: '2026-06-10', customerName: 'Dewi Lestari', phone: '081822334455', carName: 'Honda Brio', duration: '12 Jam', serviceType: 'Diantar ke Lokasi', totalPrice: 300000, status: 'Selesai' },

        // May 2026
        { id: 'MGL-551001', date: '2026-05-22', customerName: 'Agus Setiawan', phone: '081277665544', carName: 'Suzuki XL7', duration: 'Mingguan', serviceType: 'Diantar ke Lokasi', totalPrice: 3500000, status: 'Selesai' },
        { id: 'MGL-551002', date: '2026-05-12', customerName: 'Lestari Anggraini', phone: '085644332211', carName: 'Toyota Avanza', duration: '24 Jam', serviceType: 'Ambil Sendiri di Pool', totalPrice: 500000, status: 'Selesai' }
    ];
}

// Toast notification launcher
function showToast(title, message) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');

    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

// --- Public Form Submission (Auto-Records Order to Admin Panel) ---
function submitForm(platform) {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const car = document.getElementById('carSelect').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const serviceType = document.getElementById('serviceType').value;

    if (!name || !phone || !car || !date || !time) {
        alert('Harap lengkapi semua field di formulir!');
        return;
    }

    // Determine numeric price
    const carObj = cars.find(c => c.name === car);
    let numericPrice = 500000;
    if (carObj) {
        if (duration === '12 Jam') numericPrice = parsePriceString(carObj.prices['12jam']);
        else if (duration === '24 Jam') numericPrice = parsePriceString(carObj.prices['24jam']);
        else if (duration === 'Mingguan') numericPrice = parsePriceString(carObj.prices['mingguan']);
    }

    // Record order in localStorage automatically for Admin Panel
    const newOrder = {
        id: 'MGL-' + Math.floor(100000 + Math.random() * 900000),
        date: date,
        time: time,
        customerName: name,
        phone: phone,
        carName: car,
        duration: duration,
        serviceType: serviceType,
        totalPrice: numericPrice,
        status: 'Pending'
    };

    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    // Show instant toast feedback
    showToast(
        '✅ Pesanan Berhasil Dicatat!',
        `Kode Booking ${newOrder.id} (${car}) telah otomatis tercatat ke Panel Rekap Admin & diteruskan ke ${platform.toUpperCase()}.`
    );

    const message = `Halo Admin MORGUL RENT CAR, saya ingin menyewa mobil dengan detail berikut:%0A%0A`
        + `*Kode Booking:* ${newOrder.id}%0A`
        + `*Nama:* ${name}%0A`
        + `*No HP:* ${phone}%0A`
        + `*Mobil:* ${car}%0A`
        + `*Durasi:* ${duration}%0A`
        + `*Tipe Layanan:* ${serviceType}%0A`
        + `*Waktu:* ${date} pukul ${time}%0A`
        + `*Est. Total:* ${formatRupiah(numericPrice)}%0A%0A`
        + `Mohon konfirmasinya. Terima kasih.`;

    const waNumber = '6281234567890';
    const tgUsername = 'autorent_admin';

    if (platform === 'whatsapp') {
        window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
    } else if (platform === 'telegram') {
        window.open(`https://t.me/${tgUsername}?text=${message}`, '_blank');
    }

    // If dashboard is open, update view immediately
    if (!document.getElementById('dashboardModal').classList.contains('hidden')) {
        updateDashboardView();
    }
}

// --- Admin Auth & Modals ---
function checkAdminAuth() {
    return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
}

function updateNavAdminBtn() {
    const btnContainer = document.getElementById('navAdminBtnContainer');
    if (!btnContainer) return;
    if (checkAdminAuth()) {
        btnContainer.innerHTML = `<button class="btn-admin-nav" onclick="openDashboardModal()">👤 Login</button>`;
    } else {
        btnContainer.innerHTML = `<button class="btn-admin-nav" onclick="openLoginModal()">👤 Login</button>`;
    }
}

function toggleAdminNavAction() {
    if (checkAdminAuth()) {
        openDashboardModal();
    } else {
        openLoginModal();
    }
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('hidden');
    document.getElementById('loginError').classList.add('hidden');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('hidden');
}

function togglePasswordVisibility() {
    const input = document.getElementById('adminPassword');
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

function quickFillDemo() {
    const userInp = document.getElementById('adminUsername');
    const passInp = document.getElementById('adminPassword');
    if (userInp) userInp.value = 'admin';
    if (passInp) passInp.value = 'admin123';
    const err = document.getElementById('loginError');
    if (err) err.classList.add('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('adminUsername').value.trim();
    const pass = document.getElementById('adminPassword').value.trim();

    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem(STORAGE_KEY_AUTH, 'true');
        closeLoginModal();
        updateNavAdminBtn();
        openDashboardModal();
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function handleLogout() {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    closeDashboardModal();
    updateNavAdminBtn();
}

function openDashboardModal() {
    if (!checkAdminAuth()) {
        openLoginModal();
        return;
    }
    const dashModal = document.getElementById('dashboardModal');
    if (dashModal) dashModal.classList.remove('hidden');

    // Set current month in filter by default
    const now = new Date();
    const curMonth = now.getMonth().toString(); // 0-11
    const filterM = document.getElementById('filterMonth');
    if (filterM && filterM.value === 'all') {
        filterM.value = curMonth;
    }

    updateDashboardView();
}

function closeDashboardModal() {
    const dashModal = document.getElementById('dashboardModal');
    if (dashModal) dashModal.classList.add('hidden');
}

// --- Dashboard View & Rekapitulasi Logic ---
let revenueChartInstance = null;
let carDistChartInstance = null;

function updateDashboardView() {
    const orders = getOrders();
    const selectedMonth = document.getElementById('filterMonth').value; // 'all' or '0'-'11'
    const selectedYear = document.getElementById('filterYear').value;

    // Filter orders by year & month
    const filteredOrders = orders.filter(ord => {
        if (!ord.date) return true;
        const d = new Date(ord.date);
        const y = d.getFullYear().toString();
        const m = d.getMonth().toString();

        if (y !== selectedYear) return false;
        if (selectedMonth !== 'all' && m !== selectedMonth) return false;
        return true;
    });

    // Compute KPIs
    const validOrders = filteredOrders.filter(o => o.status !== 'Dibatalkan');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const totalCount = filteredOrders.length;
    const avgValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

    // Top Car Model
    const carCounts = {};
    validOrders.forEach(o => {
        carCounts[o.carName] = (carCounts[o.carName] || 0) + 1;
    });
    let topCarName = '-';
    let topCarCount = 0;
    Object.keys(carCounts).forEach(cName => {
        if (carCounts[cName] > topCarCount) {
            topCarCount = carCounts[cName];
            topCarName = cName;
        }
    });

    // Update KPI Elements
    document.getElementById('kpiTotalRevenue').textContent = formatRupiah(totalRevenue);
    document.getElementById('kpiTotalOrders').textContent = `${totalCount} Transaksi`;
    document.getElementById('kpiAvgValue').textContent = formatRupiah(avgValue);
    document.getElementById('kpiTopCar').textContent = topCarName;
    document.getElementById('kpiTopCarCount').textContent = `${topCarCount}x disewa`;

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const periodText = selectedMonth === 'all' ? `Tahun ${selectedYear}` : `${monthNames[parseInt(selectedMonth)]} ${selectedYear}`;
    document.getElementById('kpiRevenuePeriod').textContent = periodText;
    document.getElementById('tableSubhead').textContent = `Rekapitulasi Pemesanan Periode: ${periodText}`;

    // Render Table
    filterTableData(filteredOrders);

    // Update Charts
    renderCharts(orders, selectedYear);
}

function filterTableData(currentFilteredOrders = null) {
    const orders = currentFilteredOrders || getOrders();
    const selectedMonth = document.getElementById('filterMonth').value;
    const selectedYear = document.getElementById('filterYear').value;
    const searchVal = (document.getElementById('searchOrderInput').value || '').toLowerCase();
    const statusVal = document.getElementById('filterStatus').value;

    const baseList = orders.filter(ord => {
        if (!ord.date) return true;
        const d = new Date(ord.date);
        const y = d.getFullYear().toString();
        const m = d.getMonth().toString();
        if (y !== selectedYear) return false;
        if (selectedMonth !== 'all' && m !== selectedMonth) return false;
        return true;
    });

    const displayOrders = baseList.filter(o => {
        const matchesSearch = (o.customerName || '').toLowerCase().includes(searchVal)
            || (o.carName || '').toLowerCase().includes(searchVal)
            || (o.id || '').toLowerCase().includes(searchVal);
        const matchesStatus = statusVal === 'all' || o.status === statusVal;
        return matchesSearch && matchesStatus;
    });

    renderTableBody(displayOrders);
}

function getInitials(name) {
    if (!name) return 'CS';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}

function renderTableBody(ordersList) {
    const tbody = document.getElementById('orderTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (ordersList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 2.5rem; color: var(--text-secondary);">Tidak ada data pemesanan customer yang sesuai.</td></tr>`;
        return;
    }

    ordersList.forEach((ord, idx) => {
        const tr = document.createElement('tr');
        
        let badgeClass = 'badge-pending';
        if (ord.status === 'Selesai') badgeClass = 'badge-selesai';
        if (ord.status === 'Dibatalkan') badgeClass = 'badge-dibatalkan';

        const initials = getInitials(ord.customerName);
        const cleanPhone = (ord.phone || '').replace(/[^0-9]/g, '');
        const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><strong style="color:var(--accent-cyan);">${ord.id}</strong></td>
            <td><small style="color:var(--text-secondary);">${ord.date || '-'}</small></td>
            <td>
                <div class="customer-cell">
                    <div class="customer-avatar">${initials}</div>
                    <div>
                        <div style="font-weight:700;">${ord.customerName}</div>
                        <small style="color:var(--text-secondary);">${ord.phone || '-'}</small><br>
                        ${waPhone ? `<a href="https://wa.me/${waPhone}" target="_blank" class="btn-wa-row">💬 Chat WA</a>` : ''}
                    </div>
                </div>
            </td>
            <td><strong>${ord.carName}</strong></td>
            <td>${ord.duration}</td>
            <td><small style="color:var(--text-secondary);">${ord.serviceType || 'Pool'}</small></td>
            <td><strong style="color:#a7f3d0;">${formatRupiah(ord.totalPrice)}</strong></td>
            <td><span class="badge ${badgeClass}">${ord.status}</span></td>
            <td>
                <div style="display:flex; gap:0.4rem; align-items:center;">
                    <select onchange="updateOrderStatus('${ord.id}', this.value)" class="btn-tbl-action">
                        <option value="Selesai" ${ord.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                        <option value="Pending" ${ord.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Dibatalkan" ${ord.status === 'Dibatalkan' ? 'selected' : ''}>Batal</option>
                    </select>
                    <button onclick="deleteOrder('${ord.id}')" class="btn-tbl-action btn-tbl-delete" title="Hapus Transaksi">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = newStatus;
        saveOrders(orders);
        updateDashboardView();
    }
}

function deleteOrder(orderId) {
    if (confirm(`Apakah Anda yakin ingin menghapus pesanan ${orderId}?`)) {
        let orders = getOrders();
        orders = orders.filter(o => o.id !== orderId);
        saveOrders(orders);
        updateDashboardView();
    }
}

// --- Chart.js Rendering ---
function renderCharts(allOrders, year) {
    if (typeof Chart === 'undefined') return;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    const monthlyTotals = new Array(12).fill(0);
    const carCounts = {};

    cars.forEach(c => carCounts[c.name] = 0);

    allOrders.forEach(ord => {
        if (!ord.date) return;
        const d = new Date(ord.date);
        if (d.getFullYear().toString() === year) {
            const m = d.getMonth();
            if (ord.status !== 'Dibatalkan') {
                monthlyTotals[m] += (ord.totalPrice || 0);
                if (carCounts[ord.carName] !== undefined) {
                    carCounts[ord.carName] += 1;
                } else {
                    carCounts[ord.carName] = 1;
                }
            }
        }
    });

    // 1. Revenue Chart (Bar)
    const revCtx = document.getElementById('monthlyRevenueChart');
    if (revCtx) {
        if (revenueChartInstance) revenueChartInstance.destroy();
        revenueChartInstance = new Chart(revCtx, {
            type: 'bar',
            data: {
                labels: monthNames,
                datasets: [{
                    label: `Pendapatan ${year} (Rp)`,
                    data: monthlyTotals,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: '#3b82f6',
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94a3b8' } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' ' + formatRupiah(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: {
                        ticks: {
                            color: '#94a3b8',
                            callback: function(val) {
                                return (val / 1000000) + ' Jt';
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
    }

    // 2. Car Distribution Chart (Doughnut)
    const distCtx = document.getElementById('carDistributionChart');
    if (distCtx) {
        if (carDistChartInstance) carDistChartInstance.destroy();
        const carLabels = Object.keys(carCounts);
        const carDataValues = Object.values(carCounts);

        carDistChartInstance = new Chart(distCtx, {
            type: 'doughnut',
            data: {
                labels: carLabels,
                datasets: [{
                    data: carDataValues,
                    backgroundColor: [
                        '#3b82f6',
                        '#06b6d4',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } }
                }
            }
        });
    }
}

// --- Manual Order Modal Logic ---
function openAddOrderModal() {
    const modal = document.getElementById('addOrderModal');
    if (modal) modal.classList.remove('hidden');

    initManualCarSelect();
    
    // Default values
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('manualDate').value = today;
    calculateManualPrice();
}

function closeAddOrderModal() {
    const modal = document.getElementById('addOrderModal');
    if (modal) modal.classList.add('hidden');
}

function initManualCarSelect() {
    const select = document.getElementById('manualCarSelect');
    if (!select || select.options.length > 1) return;
    cars.forEach(car => {
        const opt = document.createElement('option');
        opt.value = car.name;
        opt.textContent = car.name;
        select.appendChild(opt);
    });
}

function calculateManualPrice() {
    const carName = document.getElementById('manualCarSelect').value;
    const duration = document.getElementById('manualDuration').value;
    const carObj = cars.find(c => c.name === carName);

    if (carObj) {
        let price = 500000;
        if (duration === '12 Jam') price = parsePriceString(carObj.prices['12jam']);
        else if (duration === '24 Jam') price = parsePriceString(carObj.prices['24jam']);
        else if (duration === 'Mingguan') price = parsePriceString(carObj.prices['mingguan']);
        document.getElementById('manualPrice').value = price;
    }
}

function handleSaveManualOrder(e) {
    e.preventDefault();
    const name = document.getElementById('manualName').value.trim();
    const phone = document.getElementById('manualPhone').value.trim();
    const carName = document.getElementById('manualCarSelect').value;
    const duration = document.getElementById('manualDuration').value;
    const date = document.getElementById('manualDate').value;
    const serviceType = document.getElementById('manualService').value;
    const price = parseInt(document.getElementById('manualPrice').value) || 0;
    const status = document.getElementById('manualStatus').value;

    const newOrder = {
        id: 'MGL-' + Math.floor(100000 + Math.random() * 900000),
        date: date,
        customerName: name,
        phone: phone,
        carName: carName,
        duration: duration,
        serviceType: serviceType,
        totalPrice: price,
        status: status
    };

    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    closeAddOrderModal();
    updateDashboardView();
    alert('Transaksi manual berhasil ditambahkan!');
}

// --- Export & Print ---
function exportDataCSV() {
    const orders = getOrders();
    if (orders.length === 0) {
        alert('Tidak ada data transaksi untuk diekspor.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Transaksi,Tanggal,Nama Pelanggan,No HP,Mobil,Durasi,Tipe Layanan,Total Harga (Rp),Status\n";

    orders.forEach(o => {
        const row = [
            `"${o.id}"`,
            `"${o.date || ''}"`,
            `"${o.customerName || ''}"`,
            `"${o.phone || ''}"`,
            `"${o.carName || ''}"`,
            `"${o.duration || ''}"`,
            `"${o.serviceType || ''}"`,
            `"${o.totalPrice || 0}"`,
            `"${o.status || ''}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Pemesanan_MORGUL_RENT_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printReport() {
    window.print();
}

// --- Initialize Application ---
document.addEventListener('DOMContentLoaded', () => {
    renderCars();
    initFormSelect();
    
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) dateInput.setAttribute('min', today);

    // Initial check for orders in localStorage
    getOrders();

    // Check nav admin state
    updateNavAdminBtn();
});

