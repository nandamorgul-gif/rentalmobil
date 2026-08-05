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
    carGrid.innerHTML = '';
    let filteredCars = cars;
    
    if (filterBrand !== 'All') {
        filteredCars = cars.filter(car => car.brand === filterBrand);
    }

    filteredCars.forEach(car => {
        // Create Car Card
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

// Initialize options in booking form
function initFormSelect() {
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.name;
        option.textContent = car.name;
        carSelect.appendChild(option);
    });
}

// Function triggered when "Pesan Sekarang" on card is clicked
function selectCar(carName) {
    document.getElementById('carSelect').value = carName;
    document.getElementById('pemesanan').scrollIntoView({ behavior: 'smooth' });
}

// --- Filter Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        renderCars(filter);
    });
});

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Form Submission Logic ---
function submitForm(platform) {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const car = document.getElementById('carSelect').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const serviceType = document.getElementById('serviceType').value;

    if (!name || !phone || !car || !date || !time) {
        alert('Harap lengkapi semua field di formulir!');
        return;
    }

    const message = `Halo Admin AutoRent, saya ingin menyewa mobil dengan detail berikut:%0A%0A`
        + `*Nama:* ${name}%0A`
        + `*No HP:* ${phone}%0A`
        + `*Mobil:* ${car}%0A`
        + `*Durasi:* ${duration}%0A`
        + `*Tipe Layanan:* ${serviceType}%0A`
        + `*Waktu:* ${date} pukul ${time}%0A%0A`
        + `Mohon konfirmasinya. Terima kasih.`;

    // Dummy Contact Numbers
    const waNumber = '6281234567890'; // Use dummy number or the one provided by user
    const tgUsername = 'autorent_admin'; // Dummy username

    if (platform === 'whatsapp') {
        const waUrl = `https://wa.me/${waNumber}?text=${message}`;
        window.open(waUrl, '_blank');
    } else if (platform === 'telegram') {
        const tgUrl = `https://t.me/${tgUsername}?text=${message}`;
        window.open(tgUrl, '_blank');
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderCars();
    initFormSelect();
    
    // set min date for date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
});
