document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil Nama Tamu dari URL Parameter (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get('to') || "Tamu Undangan";

  // Tampilkan nama ke HTML
  document.getElementById("nama-tamu").textContent = namaTamu;
  document.getElementById("input-nama").value = namaTamu;

  // 2. Event Listener Form RSVP
  const formRSVP = document.getElementById("form-rsvp");
  formRSVP.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSubmit = document.getElementById("btn-submit");
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Mengirim...";

    const payload = {
      nama: document.getElementById("input-nama").value,
      konfirmasi: document.getElementById("input-konfirmasi").value,
      jumlah: document.getElementById("input-jumlah").value,
      ucapan: document.getElementById("input-ucapan").value
    };

    const res = await submitRSVPData(payload);

    if (res.status === "success") {
      alert("Terima kasih, konfirmasi & ucapan Anda telah tersimpan!");
      document.getElementById("input-ucapan").value = ""; // Reset ucapan
      loadDaftarUcapan(); // Refresh list ucapan
    } else {
      alert("Gagal mengirim RSVP. Silakan coba lagi.");
    }

    btnSubmit.disabled = false;
    btnSubmit.textContent = "Kirim RSVP";
  });

  // Load ucapan saat pertama kali buka
  loadDaftarUcapan();
});

// Fungsi Buka Undangan (Membuka Section Utama)
function bukaUndangan() {
  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("acara").scrollIntoView({ behavior: "smooth" });
}

// Fungsi Render Ucapan Tamu ke UI
async function loadDaftarUcapan() {
  const container = document.getElementById("list-ucapan-content");
  const res = await fetchUcapanData();

  if (res.status === "success" && res.data.length > 0) {
    container.innerHTML = "";
    // Urutkan ucapan terbaru di atas
    res.data.reverse().forEach(item => {
      const card = document.createElement("div");
      card.className = "card-ucapan";
      card.innerHTML = `
        <strong>${item.nama}</strong> <small>(${item.konfirmasi})</small>
        <p>${item.ucapan}</p>
      `;
      container.appendChild(card);
    });
  } else {
    container.innerHTML = "<p>Belum ada ucapan. Jadilah yang pertama!</p>";
  }
}
