
/* ========================================
   1. THEME TOGGLE
======================================== */

const toggleButton = document.getElementById("mode-toggle");

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        const isLightMode = document.body.classList.toggle("light-mode");

        toggleButton.innerHTML = isLightMode ? "◐" : "☀️";

        toggleButton.setAttribute(
            "aria-label",
            isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    });
}

/* ========================================
   2. SCROLL REVEAL
======================================== */
document.documentElement.classList.add("js-reveal");
const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-up"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}

/* ========================================
   3. PROJECT CATEGORIES
======================================== */

const viewMoreButton = document.getElementById("view-more-button");
const projectCategories = document.getElementById("project-categories");
const categoryMessage = document.getElementById("category-message");

const categoryButtons = document.querySelectorAll(
    ".category-buttons button"
);

if (viewMoreButton && projectCategories) {
    viewMoreButton.addEventListener("click", () => {
        const isExpanded =
            viewMoreButton.getAttribute("aria-expanded") === "true";

        viewMoreButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        projectCategories.hidden = isExpanded;

        if (!isExpanded && categoryMessage) {
            categoryMessage.textContent =
                "Select a category to explore.";
        }
    });
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        categoryButtons.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const category = button.dataset.category;

        if (categoryMessage) {
            categoryMessage.textContent =
                `${category} projects will be displayed here as they are added to the portfolio.`;
        }
    });
});

/* ========================================
   4. SMOOTH SCROLLING
======================================== */

if (window.Lenis) {
    const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");

            if (!selector || selector === "#") {
                return;
            }

            const target = document.querySelector(selector);

            if (target) {
                event.preventDefault();
                lenis.scrollTo(target);
            }
        });
    });
}
