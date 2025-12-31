/* script.js
   Minimal JavaScript: nav toggle, smooth scroll behavior for older browsers,
   and setup for WhatsApp CTA. Replace PHONE_NUMBER with your full number in
   international format without + or spaces for WhatsApp links (e.g. 919876543210).
*/

/* =========================
   CONFIG - update this value
   ========================= */
const PHONE_NUMBER = "XXXXXXXXXXX"; // Replace with your digits, e.g. 919876543210

/* Helper to format WhatsApp link */
function waLink(phone, text = "Hello%20KP%20Mango%20team,%20I%20would%20like%20to%20order%20Kesar%20mangoes.") {
  // Use wa.me quick link
  return `https://wa.me/${phone}?text=${text}`;
}

/* DOM Ready */
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
      siteNav.style.display = expanded ? "none" : "block";
    });
  }

  // Smooth scroll for anchor links (for browsers without native smooth behavior)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash.length > 1 && document.querySelector(hash)) {
        e.preventDefault();
        document.querySelector(hash).scrollIntoView({ behavior: "smooth", block: "start" });
        // Close mobile nav after click
        if (siteNav && window.innerWidth < 720) siteNav.style.display = "none";
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Setup WhatsApp CTAs
  const waUrl = (PHONE_NUMBER && PHONE_NUMBER !== "XXXXXXXXXXX") ? waLink(PHONE_NUMBER) : "#";
  const waButtons = document.querySelectorAll("#whatsappCta, #whatsappBtn, .order-btn");
  waButtons.forEach(btn => {
    btn.setAttribute("href", waUrl);
    // If phone not set, ensure user notices by leaving link inactive
    if (waUrl === "#") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("WhatsApp phone number not configured. Please update PHONE_NUMBER in script.js with your number.");
      });
    } else {
      // open in new tab for wa links
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    }
  });
});