// ALL global variable declarations should be at the very top of your script.js file.
const CHARACTER_DATA = {
    "sung-jin-woo": {
        name: "SUNG JIN WOO",
        korean: "(성진우)",
        title: "Shadow Monarch A.K.A",
        description: "Sung Jin-Woo is the main character of Solo Leveling. He starts as the weakest hunter but gains a unique ability to level up after surviving a deadly dungeon. With his new powers, he becomes the Shadow Monarch, commanding an army of shadows. Jin-Woo transforms from a powerless fighter into the world’s strongest hunter, protecting his loved ones and battling powerful enemies.",
        image: "/static/img/sung-jin-woo-main.png",
        theme: "jinwoo"
    },
    "cha-hae-in": {
        name: "CHA HAE-IN",
        korean: "(차해인)",
        title: "Vice-Guild Master of Hunters",
        description: "Cha Hae In is the Vice-Guild Master of the Hunters Guild. Known for her incredible swordsmanship and strong sense of justice, she is one of Korea's top hunters. Her sense of smell makes her wary of most magic beasts and people—except for Sung Jin-Woo, who doesn't emit a foul aura. As the story progresses, she becomes closer to Jin-Woo and plays a key role in major battles.",
        image: "/static/img/cha-hae-in-main.png",
        theme: "haein"
    }
};

let currentCharacter = "sung-jin-woo";

function applyTheme(theme) {
    document.body.classList.remove("theme-jinwoo", "theme-haein");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("selectedTheme", theme);

    const bgOverlayElement = document.getElementById("character-background-overlay");
    if (bgOverlayElement) {
        bgOverlayElement.style.background = getComputedStyle(document.body).getPropertyValue("--bg-color-dark");
    }

    // Add smooth transition
    document.body.classList.add("theme-transition");
    setTimeout(() => {
        document.body.classList.remove("theme-transition");
    }, 600); // match this with your CSS transition duration
}

function updateCharacterInfo(characterKey) {
    const data = CHARACTER_DATA[characterKey];
    if (!data) return;

    setTimeout(() => {
        // Name
        const charNameElement = document.querySelector(".character-name");
        const koreanNameElement = document.querySelector(".korean-name");
        if (charNameElement && koreanNameElement) {
            charNameElement.childNodes[0].textContent = data.name + " ";
            koreanNameElement.textContent = data.korean;
        }

        // Title
        const charTitleElement = document.querySelector(".character-title");
        if (charTitleElement) charTitleElement.textContent = data.title;

        // Description
        const aboutPlaceholderElement = document.querySelector(".character-about-placeholder p");
        if (aboutPlaceholderElement) aboutPlaceholderElement.textContent = data.description;

        // Image
        const mainImageElement = document.getElementById("character-main-image");
        if (mainImageElement) {
            mainImageElement.style.opacity = 0;
            setTimeout(() => {
                mainImageElement.src = data.image;
                mainImageElement.onload = () => {
                    mainImageElement.style.opacity = 1;
                };
            }, 200);
        }

        applyTheme(data.theme);
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme") || "jinwoo";
    currentCharacter = savedTheme === "jinwoo" ? "sung-jin-woo" : "cha-hae-in";
    updateCharacterInfo(currentCharacter);

    // Theme toggle logic
    const rankToggle = document.getElementById("rank-toggle");
    const rankSymbol = document.getElementById("rank-symbol");
    if (rankToggle) {
        rankToggle.addEventListener("click", () => {
            currentCharacter = currentCharacter === "sung-jin-woo" ? "cha-hae-in" : "sung-jin-woo";
            updateCharacterInfo(currentCharacter);

            // Force redraw for smooth UI update
            rankSymbol.style.display = 'none';
            rankSymbol.offsetHeight;
            rankSymbol.style.display = 'inline-block';
        });
    }

    // ABOUT Dropdown (old logic, optional if not used)
    const aboutToggle = document.getElementById("about-toggle");
    const aboutDropdown = document.getElementById("about-dropdown");

    if (aboutToggle && aboutDropdown) {
        aboutToggle.addEventListener("click", () => {
            aboutDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!aboutToggle.contains(e.target) && !aboutDropdown.contains(e.target)) {
                aboutDropdown.classList.add("hidden");
            }
        });
    }

    // ABOUT Tab Toggle with Chevron
    const aboutContainer = document.getElementById("about-container");
    const aboutToggleTab = document.getElementById("about-toggle-tab");
    const chevronIcon = document.getElementById("chevron-icon");

    if (aboutContainer && aboutToggleTab && chevronIcon) {
        aboutToggleTab.addEventListener("click", () => {
            aboutContainer.classList.toggle("open");
            chevronIcon.classList.toggle("fa-chevron-left");
            chevronIcon.classList.toggle("fa-chevron-right");
        });
        aboutContainer.classList.remove("open"); // Start closed
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});



