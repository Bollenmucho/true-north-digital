/* =====================================================
   GONZALES REAL ESTATE
   Website Interactions
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const menuIcon = document.getElementById("menuIcon");
const mobileNavigation = document.getElementById(
    "mobileNavigation"
);

const propertySearch = document.getElementById(
    "propertySearch"
);

const locationFilter = document.getElementById(
    "locationFilter"
);

const typeFilter = document.getElementById(
    "typeFilter"
);

const priceFilter = document.getElementById(
    "priceFilter"
);

const propertyCards = Array.from(
    document.querySelectorAll(".property-card")
);

const propertyCount = document.getElementById(
    "propertyCount"
);

const emptyResults = document.getElementById(
    "emptyResults"
);

const resetFilters = document.getElementById(
    "resetFilters"
);

const locationCards = document.querySelectorAll(
    "[data-filter-location]"
);

const favouriteButtons = document.querySelectorAll(
    ".favourite-button"
);

const propertyButtons = document.querySelectorAll(
    ".view-property-button"
);

const propertyModal = document.getElementById(
    "propertyModal"
);

const modalClose = document.getElementById(
    "modalClose"
);

const modalPropertyTitle = document.getElementById(
    "modalPropertyTitle"
);

const modalWhatsappButton = document.getElementById(
    "modalWhatsappButton"
);

const contactForm = document.getElementById(
    "contactForm"
);

const formStatus = document.getElementById(
    "formStatus"
);

const currentYear = document.getElementById(
    "currentYear"
);


/* =====================================================
   SETTINGS
===================================================== */

const whatsappNumber = "264000000000";


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =====================================================
   HEADER SCROLL STATE
===================================================== */

let headerTicking = false;

function updateHeaderState() {
    siteHeader?.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );
}

window.addEventListener(
    "scroll",
    () => {
        if (headerTicking) {
            return;
        }

        headerTicking = true;

        window.requestAnimationFrame(() => {
            updateHeaderState();
            headerTicking = false;
        });
    },
    { passive: true }
);

updateHeaderState();


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function setMobileNavigation(open) {
    if (
        !menuToggle ||
        !menuIcon ||
        !mobileNavigation
    ) {
        return;
    }

    mobileNavigation.classList.toggle(
        "active",
        open
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuIcon.textContent = open
        ? "close"
        : "menu";

    document.body.classList.toggle(
        "menu-open",
        open
    );
}

if (
    menuToggle &&
    menuIcon &&
    mobileNavigation
) {
    menuToggle.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            const menuIsOpen =
                mobileNavigation.classList.contains(
                    "active"
                );

            setMobileNavigation(!menuIsOpen);
        }
    );

    mobileNavigation
        .querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener(
                "click",
                () => {
                    setMobileNavigation(false);
                }
            );
        });

    document.addEventListener(
        "click",
        (event) => {
            const clickedInsideMenu =
                mobileNavigation.contains(
                    event.target
                );

            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {
                setMobileNavigation(false);
            }
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                setMobileNavigation(false);
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 920) {
                setMobileNavigation(false);
            }
        }
    );
}


/* =====================================================
   PROPERTY FILTERING
===================================================== */

function getSelectedPrice() {
    if (!priceFilter) {
        return Infinity;
    }

    if (priceFilter.value === "all") {
        return Infinity;
    }

    return Number(priceFilter.value);
}

function updatePropertyCount(total) {
    if (!propertyCount) {
        return;
    }

    const label =
        total === 1
            ? "property"
            : "properties";

    propertyCount.textContent =
        `Showing ${total} ${label}`;
}

function filterProperties() {
    const selectedLocation =
        locationFilter?.value || "all";

    const selectedType =
        typeFilter?.value || "all";

    const selectedMaximumPrice =
        getSelectedPrice();

    let visibleProperties = 0;

    propertyCards.forEach((card) => {
        const cardLocation =
            card.dataset.location;

        const cardType =
            card.dataset.type;

        const cardPrice =
            Number(card.dataset.price);

        const matchesLocation =
            selectedLocation === "all" ||
            cardLocation === selectedLocation;

        const matchesType =
            selectedType === "all" ||
            cardType === selectedType;

        const matchesPrice =
            cardPrice <= selectedMaximumPrice;

        const shouldShow =
            matchesLocation &&
            matchesType &&
            matchesPrice;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleProperties += 1;
        }
    });

    updatePropertyCount(visibleProperties);

    if (emptyResults) {
        emptyResults.hidden =
            visibleProperties !== 0;
    }
}

propertySearch?.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        filterProperties();

        document
            .getElementById("properties")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }
);

locationFilter?.addEventListener(
    "change",
    filterProperties
);

typeFilter?.addEventListener(
    "change",
    filterProperties
);

priceFilter?.addEventListener(
    "change",
    filterProperties
);


/* =====================================================
   RESET FILTERS
===================================================== */

function resetPropertyFilters() {
    if (locationFilter) {
        locationFilter.value = "all";
    }

    if (typeFilter) {
        typeFilter.value = "all";
    }

    if (priceFilter) {
        priceFilter.value = "all";
    }

    filterProperties();
}

resetFilters?.addEventListener(
    "click",
    resetPropertyFilters
);


/* =====================================================
   LOCATION CARDS
===================================================== */

locationCards.forEach((card) => {
    card.addEventListener("click", () => {
        const selectedLocation =
            card.dataset.filterLocation;

        if (locationFilter) {
            locationFilter.value =
                selectedLocation;
        }

        filterProperties();

        document
            .getElementById("properties")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });
});


/* =====================================================
   FAVOURITE BUTTONS
===================================================== */

favouriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const isActive =
            button.classList.toggle("active");

        button.setAttribute(
            "aria-label",
            isActive
                ? "Remove this property from saved properties"
                : "Save this property"
        );
    });
});


/* =====================================================
   WHATSAPP MESSAGE
===================================================== */

function createWhatsappUrl(message) {
    return (
        `https://wa.me/${whatsappNumber}` +
        `?text=${encodeURIComponent(message)}`
    );
}


/* =====================================================
   PROPERTY MODAL
===================================================== */

function openPropertyModal(propertyName) {
    if (
        !propertyModal ||
        !modalPropertyTitle ||
        !modalWhatsappButton
    ) {
        return;
    }

    modalPropertyTitle.textContent =
        propertyName;

    modalWhatsappButton.href =
        createWhatsappUrl(
            `Hello Gonzales Real Estate, I am interested in ${propertyName}. Please send me more information and let me know if it is still available.`
        );

    propertyModal.classList.add("active");

    propertyModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    window.setTimeout(() => {
        modalClose?.focus();
    }, 100);
}

function closePropertyModal() {
    if (!propertyModal) {
        return;
    }

    propertyModal.classList.remove(
        "active"
    );

    propertyModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}

propertyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const propertyName =
            button.dataset.property ||
            "this property";

        openPropertyModal(propertyName);
    });
});

modalClose?.addEventListener(
    "click",
    closePropertyModal
);

propertyModal?.addEventListener(
    "click",
    (event) => {
        if (event.target === propertyModal) {
            closePropertyModal();
        }
    }
);

document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "Escape" &&
            propertyModal?.classList.contains(
                "active"
            )
        ) {
            closePropertyModal();
        }
    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

function setFormStatus(type, message) {
    if (!formStatus) {
        return;
    }

    formStatus.className =
        `form-status ${type}`;

    formStatus.textContent =
        message;
}

function clearFormStatus() {
    if (!formStatus) {
        return;
    }

    formStatus.className =
        "form-status";

    formStatus.textContent = "";
}

contactForm?.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        clearFormStatus();

        if (!contactForm.checkValidity()) {
            setFormStatus(
                "error",
                "Please complete all required fields before sending your enquiry."
            );

            contactForm.reportValidity();
            return;
        }

        const formData =
            new FormData(contactForm);

        const name =
            formData.get("name");

        const phone =
            formData.get("phone");

        const propertyType =
            formData.get("property_type");

        const location =
            formData.get("location");

        const budget =
            formData.get("budget");

        const message =
            formData.get("message");

        const whatsappMessage = `
Hello Gonzales Real Estate,

My name is ${name}.

I am looking for:
Property type: ${propertyType}
Preferred location: ${location}
Budget: ${budget}
Phone number: ${phone}

Additional details:
${message || "No additional details provided."}

Please contact me with suitable property options.
        `.trim();

        setFormStatus(
            "success",
            "Your enquiry is ready. WhatsApp will open so you can send it directly to the agent."
        );

        window.open(
            createWhatsappUrl(whatsappMessage),
            "_blank",
            "noopener,noreferrer"
        );
    }
);


/* =====================================================
   INITIALISE
===================================================== */

filterProperties();
/* =====================================================
   AVAILABLE PROPERTIES
===================================================== */

const availablePropertiesSection =
    document.getElementById("availableProperties");

const listingTrack =
    document.getElementById("listingTrack");

const originalListingCards = Array.from(
    document.querySelectorAll(".listing-card")
);

const listingModal =
    document.getElementById("listingModal");

const listingModalClose =
    document.getElementById("listingModalClose");

const listingModalTitle =
    document.getElementById("listingModalTitle");

const listingModalImage =
    document.getElementById("listingModalImage");

const listingModalWhatsapp =
    document.getElementById("listingModalWhatsapp");

    const listingShowcase =
    document.querySelector(".listing-showcase");

let previousWindowScroll = window.scrollY;
let desktopCarouselPrepared = false;
let originalTrackWidth = 0;


/* =====================================================
   PREPARE DESKTOP LOOP
===================================================== */

function prepareDesktopListingCarousel() {
    if (!listingTrack) {
        return;
    }

    const isDesktop = window.innerWidth > 800;

    if (isDesktop && !desktopCarouselPrepared) {
        originalListingCards.forEach((card) => {
            const clone = card.cloneNode(true);

            clone.classList.add("listing-clone");
            clone.setAttribute("aria-hidden", "true");
            clone.tabIndex = -1;

            listingTrack.appendChild(clone);
        });

        desktopCarouselPrepared = true;

        window.requestAnimationFrame(() => {
            originalTrackWidth =
                listingTrack.scrollWidth / 2;
        });
    }

    if (!isDesktop && desktopCarouselPrepared) {
        listingTrack
            .querySelectorAll(".listing-clone")
            .forEach((clone) => clone.remove());

        listingTrack.style.transform = "";

        desktopCarouselPrepared = false;
        originalTrackWidth = 0;
    }
}

/* =====================================================
   MOVE LISTINGS WHILE PAGE SCROLLS
===================================================== */

let previousWindowScroll = window.scrollY;
let listingScrollTicking = false;

function isListingSectionVisible() {
    if (!availablePropertiesSection) {
        return false;
    }

    const sectionRect =
        availablePropertiesSection.getBoundingClientRect();

    return (
        sectionRect.top < window.innerHeight &&
        sectionRect.bottom > 0
    );
}

function moveListingsWithPageScroll() {
    if (
        window.innerWidth <= 800 ||
        !listingShowcase ||
        !isListingSectionVisible()
    ) {
        previousWindowScroll = window.scrollY;
        return;
    }

    const currentWindowScroll = window.scrollY;
    const scrollDifference =
        currentWindowScroll - previousWindowScroll;

    previousWindowScroll = currentWindowScroll;

    listingShowcase.scrollLeft +=
        scrollDifference * 0.55;
}

window.addEventListener(
    "scroll",
    () => {
        if (listingScrollTicking) {
            return;
        }

        listingScrollTicking = true;

        window.requestAnimationFrame(() => {
            moveListingsWithPageScroll();
            listingScrollTicking = false;
        });
    },
    { passive: true }
);
/* =====================================================
   OPEN LISTING MODAL
===================================================== */

function createListingWhatsappUrl(title) {
    const message =
        `Hello Gonzales Real Estate, I would like more information about ${title}. Please let me know if it is still available.`;

    return (
        `https://wa.me/${whatsappNumber}` +
        `?text=${encodeURIComponent(message)}`
    );
}

function openListingModal(card) {
    if (
        !listingModal ||
        !listingModalTitle ||
        !listingModalImage ||
        !listingModalWhatsapp
    ) {
        return;
    }

    const imagePath =
        card.dataset.image;

    const title =
        card.dataset.title || "Available Property";

    listingModalTitle.textContent = title;

    listingModalImage.src = imagePath;
    listingModalImage.alt =
        `${title} listing from Gonzales Real Estate`;

    listingModalWhatsapp.href =
        createListingWhatsappUrl(title);

    listingModal.classList.add("active");

    listingModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

    window.setTimeout(() => {
        listingModalClose?.focus();
    }, 100);
}

function closeListingModal() {
    if (!listingModal) {
        return;
    }

    listingModal.classList.remove("active");

    listingModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");
}


/* Use event delegation so cloned desktop cards also work */

listingTrack?.addEventListener("click", (event) => {
    const selectedCard =
        event.target.closest(".listing-card");

    if (!selectedCard) {
        return;
    }

    openListingModal(selectedCard);
});

listingModalClose?.addEventListener(
    "click",
    closeListingModal
);

listingModal?.addEventListener("click", (event) => {
    if (event.target === listingModal) {
        closeListingModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        listingModal?.classList.contains("active")
    ) {
        closeListingModal();
    }
});


/* =====================================================
   RESPONSIVE INITIALISATION
===================================================== */

prepareDesktopListingCarousel();

window.addEventListener("resize", () => {
    prepareDesktopListingCarousel();

    previousWindowScroll = window.scrollY;
});