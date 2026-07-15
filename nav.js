// nav.js
// Milestone 3 - mobile navigation behavior
// derek lawson - it 3203
//
// on small screens the nav list is hidden by default through the media
// query in style.css. this script toggles a class on the ul so it can
// slide open when the hamburger button is tapped, then closes again
// once a link is chosen so it does not stay open after navigating.

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("nav-toggle");
    const navList = document.querySelector("#main-nav ul");

    // bail out quietly if either piece is missing on a page
    if (!toggleBtn || !navList) return;

    toggleBtn.addEventListener("click", function () {
        const isOpen = navList.classList.toggle("nav-open");
        // keep aria-expanded in sync for screen readers
        toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // close the menu automatically once a link is tapped
    navList.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navList.classList.remove("nav-open");
            toggleBtn.setAttribute("aria-expanded", "false");
        });
    });
});
