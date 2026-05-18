console.log("ui-views.js loaded");

/* =========================
   NAVBAR STATE
========================= */

let isMenuCollapsed = false;

/* =========================
   NAVBAR RENDER
========================= */

function renderNavbar() {
    const nav = document.querySelector("#navbar");
    if (!nav) return;

    nav.innerHTML = "";

    // MENU BUTTON
    const menuButton = document.createElement("button");
    menuButton.className = "Navbar-menuToggle";
    menuButton.innerHTML = "☰ MENU";
    menuButton.setAttribute("aria-label", "Toggle navigation menu");

    menuButton.addEventListener("click", toggleHamburger);

    menuButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            toggleHamburger();
        }
    });

    nav.append(menuButton);

    // LINKS CONTAINER (NEW FIX)
    const linksWrapper = document.createElement("div");
    linksWrapper.className = "Navbar-links";

    const links = [
        { label: "🔮 Home", href: "index.html" },
        { label: "🃏 Tarot Reading", href: "reading.html" },
        { label: "📚 Flash Cards", href: "flashcards.html" }
    ];

    links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.label;
        a.className = "Navbar-button";
        linksWrapper.appendChild(a);
    });

    nav.appendChild(linksWrapper);

    // RESET STATE
    isMenuCollapsed = false;
    linksWrapper.classList.remove("collapsed");
}

/* =========================
   MOBILE MENU TOGGLE
========================= */

function toggleHamburger() {
    const nav = document.querySelector("#navbar");
    if (!nav) return;

    const linksWrapper = nav.querySelector(".Navbar-links");
    if (!linksWrapper) return;

    isMenuCollapsed = !isMenuCollapsed;

    linksWrapper.classList.toggle("collapsed", isMenuCollapsed);
}

/* =========================
   AUTO INIT
========================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
} else {
    renderNavbar();
}

