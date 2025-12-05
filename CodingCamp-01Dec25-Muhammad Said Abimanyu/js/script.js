document.addEventListener('DOMContentLoaded', function() {
    // Memastikan kita hanya menjalankan logika di sini sekali

    // --- 1. TUGAS NO. 4: Mengisi "Name" pada Welcoming Speech ---
    const greetingElement = document.getElementById('greeting-text');
    let userName = prompt("Masukkan Nama Anda:") || "guest"; 
    
    // Trim untuk membersihkan spasi di awal/akhir jika ada
    userName = userName.trim();

    if (greetingElement) {
        greetingElement.textContent = `Hi ${userName}, Welcome to Website`;
    }

    // --- 2. TUGAS NO. 5: Validasi Formulir dan Menampilkan Nilai ---
    const contactForm = document.getElementById('contactForm');
    const submissionResult = document.getElementById('submissionResult');

    function validateAndDisplayForm(event) {
        // Mencegah form melakukan submit default (reload halaman)
        event.preventDefault(); 

        // 1. Ambil nilai dari input form (sesuai HTML terbaru)
        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value; // format YYYY-MM-DD
        const subject = document.getElementById('subject').value.trim(); // Subject/Pesan Singkat
        const message = document.getElementById('message').value.trim(); // Textarea
        
        // Ambil nilai radio button yang terpilih
        const gender = document.querySelector('input[name="gender"]:checked');

        // --- Validasi Sederhana ---
        if (name === "" || birthdate === "" || !gender || subject === "") {
            alert("Semua kolom (Nama, Tanggal Lahir, Jenis Kelamin, Pesan Singkat) harus diisi!");
            return; // Menghentikan proses jika validasi gagal
        }
        
        // Validasi tambahan untuk textarea, meskipun di mockup Pesan singkat yang lebih ditekankan
        if (message === "") {
            alert("Kolom Pesan (Textarea) harus diisi!");
            return;
        }

        // --- Jika Validasi Berhasil, Tampilkan Nilai ---
        
        // Format Tanggal dan Waktu Submission (meniru format dari mockup)
        const now = new Date();
        // Contoh format: Fri Jun 17 2022 11:27:28 GMT+0100
        const resultTime = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + 
                            ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + 
                            ' GMT' + (now.getTimezoneOffset() > 0 ? '-' : '+') + String(Math.abs(now.getTimezoneOffset() / 60)).padStart(2, '0') + '00';

        // Format Tanggal Lahir (YYYY-MM-DD menjadi DD/MM/YYYY)
        const [year, month, day] = birthdate.split('-');
        const resultBirthdate = `${day}/${month}/${year}`;

        // Memperbarui hasil submission
        submissionResult.querySelector('h3').textContent = `Current time : ${resultTime}`;
        
        document.getElementById('result-name').textContent = `Nama: ${name}`;
        document.getElementById('result-birthdate').textContent = `Tanggal Lahir: ${resultBirthdate}`;
        document.getElementById('result-gender').textContent = `Jenis Kelamin: ${gender.value}`;
        document.getElementById('result-message').textContent = `Pesan : ${subject}`; 
        
        // Tampilkan pesan sukses
        alert("Pesan berhasil dikirim!");
        // Opsi: Reset form setelah berhasil submit
        // contactForm.reset();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', validateAndDisplayForm);
    }
    
    // --- 3. Fungsi untuk mengaktifkan Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
        
        // Pasang Event Listener untuk tombol Hamburger
        hamburger.addEventListener('click', toggleMenu);
        
        // Opsional: Tutup menu saat link diklik (di mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu(); 
                }
            });
        });
    }
});