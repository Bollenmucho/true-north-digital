/* ======================================================
   TRUE NORTH DIGITAL
   Portfolio JavaScript
======================================================*/


/* ======================================================
   CURRENT YEAR
======================================================*/

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ======================================================
   PORTFOLIO PROJECTS
======================================================*/

const projects = [

    {
        category: "Hospitality",

        title: "Savannah Haven Lodge",

        description:
            "Boutique Hospitality Website",

        image:
            "assets/savnnahmockup.webp",

        link:
            "projects/savannah-haven-lodge/index.html"
    }

];


/* ======================================================
   ELEMENTS
======================================================*/

const category =
    document.getElementById("projectCategory");

const title =
    document.getElementById("projectName");

const description =
    document.getElementById("projectDescription");

const image =
    document.getElementById("projectImage");

const liveButton =
    document.getElementById("projectLink");

const previousButton =
    document.getElementById("previousProject");

const nextButton =
    document.getElementById("nextProject");

const counter =
    document.getElementById("projectCounter");

const indicators =
    document.getElementById("carouselIndicators");

const slide =
    document.getElementById("projectSlide");


let currentProject = 0;


/* ======================================================
   CREATE INDICATORS
======================================================*/

function createIndicators() {

    indicators.innerHTML = "";

    projects.forEach((project, index) => {

        const dot = document.createElement("button");

        dot.className = "carousel-indicator";

        dot.addEventListener("click", () => {

            showProject(index);

        });

        indicators.appendChild(dot);

    });

}


/* ======================================================
   SHOW PROJECT
======================================================*/

function showProject(index) {

    currentProject =
        (index + projects.length) %
        projects.length;

    slide.classList.add("is-changing");

    setTimeout(() => {

        const project =
            projects[currentProject];

        category.textContent =
            project.category;

        title.textContent =
            project.title;

        description.textContent =
            project.description;

        image.src =
            project.image;

       image.alt = `${project.title} website mockup`;

        liveButton.href =
            project.link;

        counter.textContent =
            `${String(currentProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        document
            .querySelectorAll(".carousel-indicator")
            .forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentProject
                );

            });

        previousButton.disabled =
            projects.length <= 1;

        nextButton.disabled =
            projects.length <= 1;

        slide.classList.remove("is-changing");

    }, 250);

}


/* ======================================================
   BUTTONS
======================================================*/

previousButton?.addEventListener(
    "click",
    () => {

        showProject(currentProject - 1);

    }
);

nextButton?.addEventListener(
    "click",
    () => {

        showProject(currentProject + 1);

    }
);


/* ======================================================
   KEYBOARD
======================================================*/

document.addEventListener(
    "keydown",
    (event) => {

        if (projects.length <= 1) return;

        if (event.key === "ArrowLeft") {

            showProject(currentProject - 1);

        }

        if (event.key === "ArrowRight") {

            showProject(currentProject + 1);

        }

    }
);


/* ======================================================
   INITIALISE CAROUSEL
======================================================*/

createIndicators();

showProject(0);


/* ======================================================
   MOBILE MENU
======================================================*/

/* ======================================================
   MOBILE NAVIGATION
====================================================== */
/* ======================================================
   MOBILE NAVIGATION
====================================================== */

const portfolioMenuButton =
    document.getElementById("portfolioMenuButton");

const portfolioMobileMenu =
    document.getElementById("portfolioMobileMenu");

const portfolioMenuIcon =
    document.getElementById("portfolioMenuIcon");

function setPortfolioMenu(open) {
    if (
        !portfolioMenuButton ||
        !portfolioMobileMenu ||
        !portfolioMenuIcon
    ) {
        return;
    }

    portfolioMobileMenu.classList.toggle("active", open);

    portfolioMenuButton.setAttribute(
        "aria-expanded",
        String(open)
    );

    portfolioMenuIcon.textContent =
        open ? "close" : "menu";

    document.body.classList.toggle(
        "menu-open",
        open
    );
}

if (
    portfolioMenuButton &&
    portfolioMobileMenu &&
    portfolioMenuIcon
) {
    portfolioMenuButton.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            const isOpen =
                portfolioMobileMenu.classList.contains(
                    "active"
                );

            setPortfolioMenu(!isOpen);
        }
    );

    portfolioMobileMenu
        .querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener("click", () => {
                setPortfolioMenu(false);
            });
        });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu =
            portfolioMobileMenu.contains(event.target);

        const clickedButton =
            portfolioMenuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
            setPortfolioMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setPortfolioMenu(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            setPortfolioMenu(false);
        }
    });
}
/* ======================================================
   ESC KEY
======================================================*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeMenu();

        }

    }
);


/* ======================================================
   RESIZE
======================================================*/

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850
        ) {

            closeMenu();

        }

    }
);