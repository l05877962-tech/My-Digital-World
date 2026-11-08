"use strict";

// عدّلي الرقم إلى رمز الدولة متبوعاً بالرقم، من دون + أو مسافات.
const WHATSAPP_PHONE = "966533705994";
const THEME_STORAGE_KEY = "my-digital-world-theme";

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const backToTop = document.querySelector(".back-to-top");
const printButton = document.querySelector(".print-button");
const whatsappLink = document.querySelector(".button-whatsapp");

function setTheme(theme) {
  const isDark = theme === "dark";
  body.dataset.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
  );
  document.querySelector('meta[name="theme-color"]').setAttribute(
    "content",
    isDark ? "#24211f" : "#fff9f4"
  );
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
} catch (error) {
  console.warn("تعذّر الوصول إلى إعداد حفظ المظهر.", error);
}

setTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    console.warn("تعذّر حفظ إعداد المظهر.", error);
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "فتح القائمة" : "إغلاق القائمة");
  menuToggle.querySelector(".menu-icon").textContent = isOpen ? "☰" : "×";
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
    menuToggle.querySelector(".menu-icon").textContent = "☰";
  }
});

whatsappLink.href = `https://wa.me/${WHATSAPP_PHONE}`;

printButton.addEventListener("click", () => {
  window.print();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > 420);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
