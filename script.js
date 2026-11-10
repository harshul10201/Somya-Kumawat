(function () {
  const config = window.SITE_CONFIG || {};
  const placeholderEmail = !config.email || config.email.includes("YOUR_EMAIL");
  const placeholderLinkedin = !config.linkedin || config.linkedin === "https://www.linkedin.com/" || config.linkedin === "https://www.linkedin.com";

  document.querySelectorAll("[data-email]").forEach(function (node) {
    if (placeholderEmail) return;
    node.setAttribute("href", "mailto:" + config.email);
    if (node.hasAttribute("data-email-text")) node.textContent = config.email;
  });

  document.querySelectorAll("[data-linkedin]").forEach(function (node) {
    if (placeholderLinkedin) return;
    node.setAttribute("href", config.linkedin);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const photo = document.getElementById("profile-photo");
  const fallback = document.getElementById("portrait-fallback");
  if (photo && config.photo) {
    photo.addEventListener("load", function () {
      photo.hidden = false;
      if (fallback) fallback.hidden = true;
      photo.closest(".portrait").classList.add("has-photo");
    });
    photo.src = config.photo;
  }

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
