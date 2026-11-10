/* ========================================
   NGUYEN PHAN — PERSONAL PORTFOLIO
   JavaScript
======================================== */


/* ========================================
   1. THEME TOGGLE
======================================== */

const toggleButton = document.getElementById("mode-toggle");
const body = document.body;

/* Load saved theme safely */

function getSavedTheme() {
    try {
        return localStorage.getItem("portfolio-theme");
    } catch (error) {
        return null;
    }
}

/* Save theme safely */

function saveTheme(theme) {
    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        // Website still works if storage is unavailable.
    }
}

/* Set initial theme */

const savedTheme = getSavedTheme();

if (savedTheme === "dark") {
    body.classList.remove("light-mode");
} else {
    body.classList.add("light-mode");
}

/* Update accessible button label */

function updateThemeButton() {
    if (!toggleButton) return;

    const isLightMode = body.classList.contains("light-mode");

    toggleButton.setAttribute(
        "aria-label",
        isLightMode
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

updateThemeButton();

/* Theme switching with circular reveal */

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        const isLightMode = body.classList.contains("light-mode");
        const nextTheme = isLightMode ? "dark" : "light";

        const rect = toggleButton.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function changeTheme() {
            body.classList.toggle("light-mode", nextTheme === "light");

            saveTheme(nextTheme);
            updateThemeButton();
        }

        /*
         * Use View Transitions when supported.
         * Fallback: switch theme normally.
         */

        if (
            !reducedMotion &&
            typeof document.startViewTransition === "function"
        ) {
            document.documentElement.style.setProperty(
                "--theme-x",
                `${x}px`
            );

            document.documentElement.style.setProperty(
                "--theme-y",
                `${y}px`
            );

            const transition = document.startViewTransition(() => {
                changeTheme();
            });

            transition.finished.finally(() => {
                document.documentElement.style.removeProperty("--theme-x");
                document.documentElement.style.removeProperty("--theme-y");
            });

        } else {
            changeTheme();
        }
    });
}


/* ========================================
   2. SCROLL REVEAL
======================================== */

const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-up"
);

if ("IntersectionObserver" in window && revealElements.length > 0) {

    document.documentElement.classList.add("js-reveal");

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

/* Expand / collapse project categories */

if (viewMoreButton && projectCategories) {

    viewMoreButton.addEventListener("click", () => {

        const isExpanded =
            viewMoreButton.getAttribute("aria-expanded") === "true";

        const nextState = !isExpanded;

        viewMoreButton.setAttribute(
            "aria-expanded",
            String(nextState)
        );

        projectCategories.hidden = !nextState;

        if (nextState && categoryMessage) {
            categoryMessage.textContent =
                "Select a category to explore.";
        }
    });
}

/* Select a project category */

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        categoryButtons.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const category = button.dataset.category;

        if (categoryMessage && category) {
            categoryMessage.textContent =
                `${category} projects will be displayed here as they are added to the portfolio.`;
        }
    });
});


/* ========================================
   4. ACHIEVEMENTS
======================================== */

/*
 * Add real certificates or achievements here later.
 *
 * Example:
 *
 * certifications: [
 *     {
 *         title: "MATLAB Onramp",
 *         organization: "MathWorks",
 *         year: "2026",
 *         description: "Completed introductory MATLAB training."
 *     }
 * ]
 *
 * Keep the arrays empty until you want to display
 * actual achievements.
 */

const achievementData = {

    certifications: {
        label: "CERTIFICATIONS",
        title: "Certifications",
        items: []
    },

    awards: {
        label: "RECOGNITION",
        title: "Awards",
        items: []
    },

    academic: {
        label: "ACADEMIC",
        title: "Academic Milestones",
        items: []
    }

};

const achievementCards = document.querySelectorAll(
    ".achievement-card"
);

const achievementPanel = document.getElementById(
    "achievement-panel"
);

const achievementPanelLabel = document.getElementById(
    "achievement-panel-label"
);

const achievementPanelTitle = document.getElementById(
    "achievement-panel-title"
);

const achievementContent = document.getElementById(
    "achievement-content"
);

const achievementClose = document.getElementById(
    "achievement-close"
);

/* Display selected achievement category */

function showAchievementCategory(category) {

    const data = achievementData[category];

    if (
        !data ||
        !achievementPanel ||
        !achievementPanelLabel ||
        !achievementPanelTitle ||
        !achievementContent
    ) {
        return;
    }

    achievementPanelLabel.textContent = data.label;
    achievementPanelTitle.textContent = data.title;

    /* Clear previous content */

    achievementContent.replaceChildren();

    if (data.items.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "achievement-empty";
        emptyMessage.textContent =
            "No items have been added to this category yet. This section will be updated as new achievements are earned.";

        achievementContent.appendChild(emptyMessage);

    } else {

        const list = document.createElement("div");
        list.className = "achievement-entry-list";

        data.items.forEach((item) => {

            const entry = document.createElement("article");
            entry.className = "achievement-entry";

            const title = document.createElement("h4");
            title.textContent = item.title;

            const organization = document.createElement("p");
            organization.className = "achievement-organization";
            organization.textContent = item.organization || "";

            const year = document.createElement("span");
            year.className = "achievement-year";
            year.textContent = item.year || "";

            const description = document.createElement("p");
            description.className = "achievement-entry-description";
            description.textContent = item.description || "";

            entry.appendChild(title);

            if (organization.textContent) {
                entry.appendChild(organization);
            }

            if (year.textContent) {
                entry.appendChild(year);
            }

            if (description.textContent) {
                entry.appendChild(description);
            }

            list.appendChild(entry);
        });

        achievementContent.appendChild(list);
    }

    achievementPanel.hidden = false;
}

/* Category card interactions */

achievementCards.forEach((card) => {

    card.addEventListener("click", () => {

        const category = card.dataset.achievementCategory;

        const isAlreadyOpen =
            card.getAttribute("aria-expanded") === "true";

        achievementCards.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-expanded", "false");
        });

        if (isAlreadyOpen) {
            if (achievementPanel) {
                achievementPanel.hidden = true;
            }

            return;
        }

        card.classList.add("active");
        card.setAttribute("aria-expanded", "true");

        showAchievementCategory(category);
    });
});

/* Close achievement panel */

if (achievementClose) {

    achievementClose.addEventListener("click", () => {

        if (achievementPanel) {
            achievementPanel.hidden = true;
        }

        achievementCards.forEach((card) => {
            card.classList.remove("active");
            card.setAttribute("aria-expanded", "false");
        });
    });
}


/* ========================================
   5. SMOOTH SCROLLING
======================================== */

if (typeof window.Lenis !== "undefined") {

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


/* ========================================
   6. CURRENT YEAR
======================================== */

const footerYear = document.querySelector(".site-footer span");

if (footerYear) {
    footerYear.textContent =
        `© ${new Date().getFullYear()} NGUYEN PHAN`;
}