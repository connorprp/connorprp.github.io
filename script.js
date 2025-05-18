const contactLink = document.getElementById("contact-nav-link");
const contactBar = document.getElementById("contact-bar");
const myName = document.getElementById("myName");
const welcome = document.getElementById("welcome");
const description = document.getElementById("description");
const home = document.getElementById("hero");
const continueBtn1 = document.getElementById("continue1");
const continueBtn2 = document.getElementById("continue2");
const skills = document.getElementById("skills");
const languages = document.getElementById("languages");
const continueBtn3 = document.getElementById("continue3");
const projectBtn = document.getElementsByClassName("projectBtn");
const projects = document.getElementById("projects");
const projectContainer = document.getElementById("projectsContainer");
const projectBtn1 = document.getElementById("projectBtn1");
const projectBtn2 = document.getElementById("projectBtn2");
const projectBtn3 = document.getElementById("projectBtn3");
const sites = document.getElementById("sites");
const sitesContainer = document.getElementById("sitesContainer");

let clicked = false;
contactBar.style.display = "none";
contactLink.onclick = () => {
    if (clicked) {
        contactBar.style.display = "none";
    } else {
        contactBar.style.display = "inline-flex";
    }
    clicked = !clicked;
}

document.addEventListener('DOMContentLoaded', function () {
    const welcomeMsg = `Connor_Poindexter`;
    for (let i = 0; i < welcomeMsg.length; i++) {
        setTimeout(() => {
            myName.innerHTML += welcomeMsg[i];
        }, 75 * i);
    }
});

setTimeout(() => {
    const descriptionMsg = `I'm a software engineer with a passion for creating innovative solutions. I love coding, problem-solving, and learning new technologies.`;
    for (let i = 0; i < descriptionMsg.length; i++) {
        setTimeout(() => {
            description.innerHTML += descriptionMsg[i];
        }, 10 * i);
    }
}, 1000);

setTimeout(() => {
    skills.style.display = "inline-block";
    const skillsMsg = "JavaScript - CSS - HTML - Java - C++ - Python";
    for (let i = 0; i < skillsMsg.length; i++) {
        setTimeout(() => {
            skills.innerHTML += skillsMsg[i];
        }, 10 * i);
    }
}, 2500);

setTimeout(() => {
    projects.style.display = "block";
    projectContainer.style.display = "block";
}, 3000);

setTimeout(() => {
    sites.style.display = "block";
    sitesContainer.style.display = "block";
}, 3500);

projectBtn1.onclick = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}