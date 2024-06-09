/*Note: Kod do scrolla, highlite-a i darkmode został "zainspirowany" z internetu */
function openNav() {
  const sidebar = document.getElementById("sidebar");
  const openSidebarBtn = document.getElementById("openSidebarBtn");

  sidebar.style.left = "0";
  openSidebarBtn.style.left = "250px";

  openSidebarBtn.style.transition = "left 0.5s ease";
  sidebar.style.transition = "left 0.5s ease";
}

function closeNav() {
  const sidebar = document.getElementById("sidebar");
  const openSidebarBtn = document.getElementById("openSidebarBtn");

  sidebar.style.left = "-250px";
  openSidebarBtn.style.left = "15px";

  openSidebarBtn.style.transition = "left 0.5s ease";
  sidebar.style.transition = "left 0.5s ease";
}

function toggleNav() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar.style.left === "0px") {
    closeNav();
  } else {
    openNav();
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const rect = section.getBoundingClientRect();
    const inView =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    const partiallyInView =
      (rect.top < window.innerHeight && rect.bottom >= 0) ||
      (rect.left < window.innerWidth && rect.right >= 0);

    if (!inView || !partiallyInView) {
      const topOffset =
        window.pageYOffset || document.documentElement.scrollTop;
      const elementOffset = rect.top + topOffset;
      window.scrollTo({
        top: elementOffset,
        behavior: "smooth",
      });
    }
  }
}

function highlightSection(targetId) {
  const section = document.getElementById(targetId);

  if (section) {
    document.querySelectorAll("section").forEach((sec) => {
      sec.classList.remove("highlight");
    });
    section.classList.add("highlight");
  }
}

// Czarna magia XD
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    scrollToSection(this.getAttribute("href").substring(1));
    highlightSection(event);
  });
});

// Toggle dark mode
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Toggle the button text
    if (document.body.classList.contains("dark-mode")) {
      this.textContent = "Light Mode";
      this.classList.add("dark");
    } else {
      this.textContent = "Dark Mode";
      this.classList.remove("dark");
    }
  });

function adjustLayout() {
  const container = document.querySelector(".container");
  const contentContainer = document.querySelector(".content-container");
  const leftSide = document.querySelector(".left-side");
  const mainContent = document.querySelector(".main-content");
  const name = document.querySelector(".name");
  const name2 = document.querySelector(".name2");

  if (container.offsetWidth < 586) {
    container.classList.add("smaller");
    contentContainer.classList.add("smaller");
    leftSide.classList.add("fade-in");
    mainContent.classList.add("fade-in");
    name.style.display = "none";
    name2.style.display = "grid";
  } else {
    container.classList.remove("smaller");
    contentContainer.classList.remove("smaller");
    leftSide.classList.remove("fade-in");
    mainContent.classList.remove("fade-in");
    name.style.display = "inline";
    name2.style.display = "none";
  }
}

window.addEventListener("resize", adjustLayout);
adjustLayout(); // Call on initial load
