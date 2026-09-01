// Ganti URL di bawah dengan URL Deploy Web App Apps Script kamu
const GAS_URL = "https://script.google.com/macros/s/AKfycbxyqq3ts-Q2jMVnJCnNGCzWf2DRvZoYs63vMRqUFsvTwaBq8an6V4kR1lOEOw48HyZu/exec";

// 1. Fungsi Kirim RSVP ke Google Sheets
async function submitRSVPData(payload) {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    console.error("Error kirim RSVP:", error);
    return { status: "error", message: error.toString() };
  }
}

// 2. Fungsi Ambil Daftar Ucapan dari Google Sheets
async function fetchUcapanData() {
  try {
    const response = await fetch(`${GAS_URL}?action=getUcapan`);
    return await response.json();
  } catch (error) {
    console.error("Error fetch ucapan:", error);
    return { status: "error", data: [] };
  }
}
