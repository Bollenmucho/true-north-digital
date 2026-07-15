AOS.init({
    duration: 900,
    once: true,
    offset: 90
});

const menuBtn = document.getElementById("menuBtn");
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && menuIcon && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("active");

        menuIcon.textContent = isOpen ? "close" : "menu";

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuIcon.textContent = "menu";
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
        });
    });
}
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");

        const answer = item.querySelector(".faq-answer");

        if (item.classList.contains("active")) {
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    });
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const formGroups = contactForm.querySelectorAll(".form-group");
    const formMessage = contactForm.querySelector(".form-message");
    const submitButton = contactForm.querySelector(".form-btn");

    const originalButtonText = submitButton.textContent.trim();

    function getErrorMessage(field) {
        if (field.validity.valueMissing) {
            return "This field is required.";
        }

        if (field.type === "email" && field.validity.typeMismatch) {
            return "Please enter a valid email address.";
        }

        return "Please check this field.";
    }

    function validateField(field) {
        const formGroup = field.closest(".form-group");
        const errorMessage = formGroup.querySelector(".error-message");

        field.classList.remove("field-error", "field-success");
        errorMessage.textContent = "";

        if (!field.checkValidity()) {
            field.classList.add("field-error");
            errorMessage.textContent = getErrorMessage(field);
            return false;
        }

        field.classList.add("field-success");
        return true;
    }

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let formIsValid = true;
        let firstInvalidField = null;

        formGroups.forEach((group) => {
            const field = group.querySelector("input, select, textarea");

            if (!validateField(field)) {
                formIsValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }
        });

        if (!formIsValid) {
            formMessage.textContent =
                "Please correct the highlighted fields before submitting.";

            formMessage.className = "form-message error";
            firstInvalidField?.focus();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formMessage.textContent = "";
        formMessage.className = "form-message";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Submission failed.");
            }

            formMessage.textContent =
                "Project request sent successfully! We will contact you soon.";

            formMessage.className = "form-message success";

            contactForm.reset();

            formGroups.forEach((group) => {
                const field = group.querySelector(
                    "input, select, textarea"
                );

                field.classList.remove("field-error", "field-success");

                const errorMessage =
                    group.querySelector(".error-message");

                errorMessage.textContent = "";
            });
        } catch (error) {
            formMessage.textContent =
                "We could not send your request. Please try again or contact us on WhatsApp.";

            formMessage.className = "form-message error";
            console.error("Form submission error:", error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    formGroups.forEach((group) => {
        const field = group.querySelector("input, select, textarea");

        field.addEventListener("input", () => {
            if (
                field.classList.contains("field-error") ||
                field.classList.contains("field-success")
            ) {
                validateField(field);
            }
        });

        field.addEventListener("change", () => {
            if (
                field.classList.contains("field-error") ||
                field.classList.contains("field-success")
            ) {
                validateField(field);
            }
        });
    });
}