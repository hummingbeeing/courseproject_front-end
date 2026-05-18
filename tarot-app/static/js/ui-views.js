console.log("ui-views.js running");

let isMenuCollapsed = false;


function renderNavbar() {
    console.log("renderNavbar() called");

    const nav = document.querySelector("#navbar");
    if (!nav) {
        console.warn("Navbar element not found");
        return;
    }

    nav.innerHTML = "";


    const menuButton = document.createElement("button");
    menuButton.className = "Navbar-menuToggle";
    menuButton.setAttribute("aria-label", "Toggle navigation menu");
    menuButton.innerHTML = "☰ MENU";

    menuButton.addEventListener("click", toggleHamburger);


    menuButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleHamburger();
        }
    });

    nav.appendChild(menuButton);


    const linksWrapper = document.createElement("div");
    linksWrapper.className = "Navbar-links";


    const links = [
        { label: "Home", href: "index.html" },
        { label: "Tarot Reading", href: "reading.html" },
        { label: "Flash Cards", href: "flashcards.html" }
    ];

    links.forEach(link => {
        const a = document.createElement("a");
        a.className = "Navbar-button";
        a.href = link.href;
        a.textContent = link.label;
        linksWrapper.appendChild(a);
    });

    nav.appendChild(linksWrapper);


    isMenuCollapsed = false;
    linksWrapper.classList.remove("collapsed");

    console.log("Navbar rendered successfully");
}


function toggleHamburger() {
    const nav = document.querySelector("#navbar");
    if (!nav) return;

    const linksWrapper = nav.querySelector(".Navbar-links");
    if (!linksWrapper) {
        console.warn("Navbar links not found");
        return;
    }

    isMenuCollapsed = !isMenuCollapsed;

    linksWrapper.classList.toggle("collapsed", isMenuCollapsed);

    console.log("Menu toggled:", isMenuCollapsed ? "collapsed" : "expanded");
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
} else {
    renderNavbar();
}