const toggleButton = document.getElementById("mode-toggle");

// Đổi giao diện sáng / tối
toggleButton?.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");

    toggleButton.textContent = isLightMode ? "🌙" : "☀️";
    toggleButton.setAttribute(
        "aria-label",
        isLightMode
            ? "Chuyển sang giao diện tối"
            : "Chuyển sang giao diện sáng"
    );
});

// Hiện ảnh, chữ và các thẻ khi cuộn tới
const revealElements = document.querySelectorAll(".reveal-left, .reveal-up");

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
        { threshold: 0.14 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}

// Nút View More Projects mở danh mục phần mềm
const viewMoreButton = document.getElementById("view-more-button");
const projectCategories = document.getElementById("project-categories");
const categoryMessage = document.getElementById("category-message");
const categoryButtons = document.querySelectorAll(".category-buttons button");

viewMoreButton?.addEventListener("click", () => {
    const isExpanded = viewMoreButton.getAttribute("aria-expanded") === "true";

    viewMoreButton.setAttribute("aria-expanded", String(!isExpanded));
    projectCategories.hidden = isExpanded;

    if (!isExpanded) {
        categoryMessage.textContent = "Chọn một nhóm để xem.";
    }
});

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        categoryButtons.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const category = button.dataset.category;
        categoryMessage.textContent =
            `Bạn đã chọn ${category}. Thêm các project thuộc nhóm này vào portfolio của bạn.`;
    });
});

// Cuộn mượt bằng Lenis nếu thư viện tải được
if (window.Lenis) {
    const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.08
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            const target = document.querySelector(selector);

            if (target) {
                event.preventDefault();
                lenis.scrollTo(target);
            }
        });
    });
}