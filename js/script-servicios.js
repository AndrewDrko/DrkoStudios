const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".main-header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Check if the link is an internal anchor link
    if (href && (href.startsWith("#") || href === "#")) {
      e.preventDefault();

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll to other anchor links
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Close mobile navigation
      const headerEl = document.querySelector("header");
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
  });
});
