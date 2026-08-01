/* ===============================
   GALLERY TABS
================================ */

const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryGroups = document.querySelectorAll(".gallery-group");

galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedGallery = tab.dataset.gallery;

        galleryTabs.forEach((item) => {
            item.classList.remove("active");
        });

        galleryGroups.forEach((group) => {
            group.classList.remove("active");
        });

        tab.classList.add("active");

        const selectedGroup = document.querySelector(
            `[data-gallery-group="${selectedGallery}"]`
        );

        selectedGroup?.classList.add("active");
    });
});


/* ===============================
   GALLERY LIGHTBOX
================================ */

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
    galleryLightbox?.classList.remove("active");
    galleryLightbox?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        const imagePath = item.dataset.image;

        if (!galleryLightbox || !lightboxImage || !imagePath) {
            return;
        }

        lightboxImage.src = imagePath;
        galleryLightbox.classList.add("active");
        galleryLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

lightboxClose?.addEventListener("click", closeLightbox);

galleryLightbox?.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuToggle && mobileMenu && menuIcon) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("active");

        menuIcon.textContent = isOpen ? "close" : "menu";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuIcon.textContent = "menu";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
/* =========================================
   BOOKING FORM AND DATE VALIDATION
========================================= */

const bookingForm = document.getElementById("bookingRequestForm");
const bookingCheckIn = document.getElementById("bookingCheckIn");
const bookingCheckOut = document.getElementById("bookingCheckOut");
const bookingFormStatus = document.getElementById("bookingFormStatus");
const currentYear = document.getElementById("currentYear");

const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (bookingCheckIn && bookingCheckOut) {
    const today = new Date();
    const todayValue = formatDateForInput(today);

    bookingCheckIn.min = todayValue;
    bookingCheckOut.min = todayValue;

    bookingCheckIn.addEventListener("change", () => {
        if (!bookingCheckIn.value) {
            return;
        }

        const selectedCheckIn = new Date(
            `${bookingCheckIn.value}T00:00:00`
        );

        selectedCheckIn.setDate(selectedCheckIn.getDate() + 1);

        const earliestCheckOut = formatDateForInput(selectedCheckIn);

        bookingCheckOut.min = earliestCheckOut;

        if (
            bookingCheckOut.value &&
            bookingCheckOut.value < earliestCheckOut
        ) {
            bookingCheckOut.value = "";
        }
    });
}

if (bookingForm && bookingFormStatus) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        bookingFormStatus.className = "form-status";
        bookingFormStatus.textContent = "";

        if (!bookingForm.checkValidity()) {
            bookingFormStatus.classList.add("error");
            bookingFormStatus.textContent =
                "Please complete all required fields correctly.";

            bookingForm.reportValidity();
            return;
        }

        if (
            bookingCheckIn &&
            bookingCheckOut &&
            bookingCheckOut.value <= bookingCheckIn.value
        ) {
            bookingFormStatus.classList.add("error");
            bookingFormStatus.textContent =
                "Your check-out date must be after your check-in date.";

            bookingCheckOut.focus();
            return;
        }

        bookingFormStatus.classList.add("success");
        bookingFormStatus.textContent =
            "Your booking request is ready. Connect this form to Formspree to receive submissions.";

        bookingForm.reset();

        const todayValue = formatDateForInput(new Date());

        if (bookingCheckIn && bookingCheckOut) {
            bookingCheckIn.min = todayValue;
            bookingCheckOut.min = todayValue;
        }
    });
}
const siteHeader = document.querySelector(".site-header");

let scrollTicking = false;

window.addEventListener(
    "scroll",
    () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                siteHeader?.classList.toggle(
                    "scrolled",
                    window.scrollY > 40
                );

                scrollTicking = false;
            });

            scrollTicking = true;
        }
    },
    { passive: true }
);
