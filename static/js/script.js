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

// Load saved character before anything else
let currentCharacter = localStorage.getItem("selectedCharacterKey") || "sung-jin-woo";

// Apply theme and character info ASAP to prevent flicker
applyTheme(CHARACTER_DATA[currentCharacter].theme);
updateCharacterInfo(currentCharacter);

function applyTheme(theme) {
    document.body.classList.remove("theme-jinwoo", "theme-haein");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("selectedTheme", theme);

    const bgOverlayElement = document.getElementById("character-background-overlay");
    if (bgOverlayElement) {
        bgOverlayElement.style.background = getComputedStyle(document.body).getPropertyValue("--bg-color-dark");
    }

    document.body.classList.add("theme-transition");
    setTimeout(() => {
        document.body.classList.remove("theme-transition");
    }, 600);
}

function updateCharacterInfo(characterKey) {
    const data = CHARACTER_DATA[characterKey];
    if (!data) return;

    const nameEl = document.querySelector(".character-name");
    const koreanEl = document.querySelector(".korean-name");
    const titleEl = document.querySelector(".character-title");
    const descEl = document.querySelector(".character-about-placeholder p");
    const imageEl = document.getElementById("character-main-image");

    if (nameEl) nameEl.childNodes[0].textContent = data.name + " ";
    if (koreanEl) koreanEl.textContent = data.korean;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;

    if (imageEl) {
        imageEl.style.opacity = 0;
        setTimeout(() => {
            imageEl.src = data.image;
            imageEl.onload = () => {
                imageEl.style.opacity = 1;
            };
        }, 200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Toggle Rank
    const rankToggle = document.getElementById("rank-toggle");
    const rankSymbol = document.getElementById("rank-symbol");
    if (rankToggle && rankSymbol) {
        rankToggle.addEventListener("click", () => {
            currentCharacter = currentCharacter === "sung-jin-woo" ? "cha-hae-in" : "sung-jin-woo";
            localStorage.setItem("selectedCharacterKey", currentCharacter);
            localStorage.setItem("selectedTheme", CHARACTER_DATA[currentCharacter].theme);
            updateCharacterInfo(currentCharacter);
            applyTheme(CHARACTER_DATA[currentCharacter].theme);

            rankSymbol.style.display = "none";
            rankSymbol.offsetHeight;
            rankSymbol.style.display = "inline-block";
        });
    }

    // About Dropdown
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

    // About Sidebar Toggle
    const aboutContainer = document.getElementById("about-container");
    const aboutToggleTab = document.getElementById("about-toggle-tab");
    const chevronIcon = document.getElementById("chevron-icon");
    if (aboutContainer && aboutToggleTab && chevronIcon) {
        aboutToggleTab.addEventListener("click", () => {
            aboutContainer.classList.toggle("open");
            chevronIcon.classList.toggle("fa-chevron-left");
            chevronIcon.classList.toggle("fa-chevron-right");
        });
        aboutContainer.classList.remove("open");
    }

    // Smooth scroll
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

// Profile dropdown menu toggle
function toggleProfileMenu() {
    const menu = document.getElementById("profile-menu");
    if (menu) {
        menu.classList.toggle("show");
    }
}

// Close the profile menu if user clicks outside
window.addEventListener("click", function (e) {
    const menu = document.getElementById("profile-menu");
    const icon = document.querySelector(".profile-icon");
    if (menu && icon && !menu.contains(e.target) && !icon.contains(e.target)) {
        menu.classList.remove("show");
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const savedKey = localStorage.getItem("selectedCharacterKey") || "sung-jin-woo";

  // Check if data exists for the key
  if (CHARACTER_DATA[savedKey]) {
    updateCharacterInfo(savedKey);
    applyTheme(CHARACTER_DATA[savedKey].theme);
  } else {
    console.warn("No data for key:", savedKey);
  }
});





