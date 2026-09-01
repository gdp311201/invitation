let isPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Tangkap Nama Tamu dari Query String (?to=...)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get('to') || "Tamu Undangan";

  document.getElementById("nama-tamu").textContent = namaTamu;
  document.getElementById("input-nama").value = namaTamu;

  // 2. Initial Fetch Ucapan dari Apps Script
  if (typeof loadDaftarUcapan === "function") {
    loadDaftarUcapan();
  }
});

// Fungsi Membuka Undangan & Memulai Musik
function bukaUndangan() {
  const cover = document.getElementById("cover-overlay");
  const mainContent = document.getElementById("main-content");
  const audio = document.getElementById("bg-music");

  // Transisi animasi slide up / fade out cover
  cover.classList.add("fade-out");
  setTimeout(() => {
    cover.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 500);

  // Play audio
  if (audio) {
    audio.play().then(() => {
      isPlaying = true;
    }).catch(err => console.log("Autoplay ditolak browser:", err));
  }
}

// Play / Pause Toggle Musik Floating
function toggleAudio() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("btn-music");

  if (isPlaying) {
    audio.pause();
    btn.textContent = "🔇";
  } else {
    audio.play();
    btn.textContent = "🎵";
  }
  isPlaying = !isPlaying;
}

// Fungsi Salin Rekening
function copyRekening(nomor) {
  navigator.clipboard.writeText(nomor).then(() => {
    alert("Nomor rekening berhasil disalin!");
  });
}
