document.addEventListener("DOMContentLoaded", () => {
  // ✅ Footer year and last modified
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
  lastModifiedSpan.textContent = document.lastModified;

  // ✅ Hamburger menu toggle
  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");

  menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    // Toggle between ☰ and ✖
    menuButton.textContent = mainNav.classList.contains("show") ? "✖" : "☰";
  });

  console.log("Temple Album page ready with responsive menu and footer updates!");
});
