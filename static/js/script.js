// ALL global variable declarations should be at the very top of your script.js file.
// Character data
const CHARACTER_DATA = {
    "sung-jin-woo": {
        name: "SUNG JIN WOO",
        korean: "(성진우)",
        title: "Shadow Monarch A.K.A",
        description: "Sung Jin-Woo is the main character of Solo Leveling. He starts as the weakest hunter but gains a unique ability to level up after surviving a deadly dungeon. With his new powers, he becomes the Shadow Monarch, commanding an army of shadows. Jin-Woo transforms from a powerless fighter into the world’s strongest hunter, protecting his loved ones and battling powerful enemies.",
        image: "static/img/sung-jin-woo-main.png",// Use Flask's url_for for robustness
        theme: "jinwoo"
    },
    "cha-hae-in": {
        name: "CHA HAE-IN",
        korean: "(차해인)",
        title: "Vice-Guild Master of Hunters",
        description: "Cha Hae In is the Vice-Guild Master of the Hunters Guild. Known for her incredible swordsmanship and strong sense of justice, she is one of Korea's top hunters. Her sense of smell makes her wary of most magic beasts and people—except for Sung Jin-Woo, who doesn't emit a foul aura. As the story progresses, she becomes closer to Jin-Woo and plays a key role in major battles.",
        image: "static/img/cha-hae-in-main.png", // Use Flask's url_for for robustness
        theme: "haein"
    }
};

// Default character - this also needs to be defined globally and early
let currentCharacter = "sung-jin-woo";

// Function to update the theme and content
function updateCharacterInfo(characterKey) {
    console.log(`[updateCharacterInfo] Called for: ${characterKey}`);
    const data = CHARACTER_DATA[characterKey];
    if (!data) {
        console.error(`[updateCharacterInfo] Character data not found for key: ${characterKey}`);
        return;
    }

    // Wrap the problematic line (and related DOM manipulations) in a small delay
    // This gives the browser a tiny bit more time to ensure the DOM is fully ready.
    // We added this based on the "highlights p" but still "null" error
    setTimeout(() => {
        console.log(`[setTimeout] Attempting to update DOM for ${characterKey}`);

        const charNameElement = document.querySelector(".character-name");
        if (charNameElement) {
            charNameElement.textContent = data.name;
            console.log(`[setTimeout] Updated .character-name to: ${data.name}`);
        } else {
            console.error("[setTimeout] Element .character-name not found!");
        }

        const koreanNameElement = document.querySelector(".korean-name");
        if (koreanNameElement) {
            koreanNameElement.textContent = data.korean;
            console.log(`[setTimeout] Updated .korean-name to: ${data.korean}`);
        } else {
            console.error("[setTimeout] Element .korean-name not found!");
        }

        const charTitleElement = document.querySelector(".character-title");
        if (charTitleElement) {
            charTitleElement.textContent = data.title;
            console.log(`[setTimeout] Updated .character-title to: ${data.title}`);
        } else {
            console.error("[setTimeout] Element .character-title not found!");
        }

        // THIS IS THE LINE THAT WAS CAUSING THE TypeError (script.js:36:56 in previous consoles)
        const aboutPlaceholderElement = document.querySelector(".character-about-placeholder p");
        if (aboutPlaceholderElement) { // Always check for null before setting properties
            aboutPlaceholderElement.textContent = data.description;
            console.log("[setTimeout] Successfully updated .character-about-placeholder p");
        } else {
            console.error("CRITICAL ERROR: [setTimeout] '.character-about-placeholder p' element was NULL!");
        }

        const mainImageElement = document.getElementById("character-main-image");
        if (mainImageElement) {
            mainImageElement.src = data.image;
            console.log(`[setTimeout] Updated #character-main-image src to: ${data.image}`);
        } else {
            console.error("[setTimeout] Element #character-main-image not found!");
        }

        // Update theme
        document.body.classList.remove("theme-jinwoo", "theme-haein");
        document.body.classList.add(`theme-${data.theme}`);
        console.log(`[setTimeout] Body classes updated to: ${document.body.classList.value}`);

        // Optional: Update overlay too, if needed
        const bgOverlayElement = document.getElementById("character-background-overlay");
        if (bgOverlayElement) {
            // Note: getComputedStyle must be called *after* class is added for correct theme variable
            bgOverlayElement.style.background = getComputedStyle(document.body).getPropertyValue("--bg-color-dark");
            console.log(`[setTimeout] Updated #character-background-overlay background.`);
        } else {
            console.error("[setTimeout] Element #character-background-overlay not found!");
        }

    }, 100); // Increased delay slightly to 100 milliseconds
}

// Ensure all DOM interactions happen AFTER the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    console.log("------------------------------------------");
    console.log("[DOMContentLoaded] DOM fully loaded and parsed. Initializing script.");

    // Initial render
    updateCharacterInfo(currentCharacter); // This should run immediately on page load

    // Theme switcher logic
    const rankToggle = document.getElementById("rank-toggle");

    if (rankToggle) {
        console.log("[DOMContentLoaded] #rank-toggle element found:", rankToggle); // Confirm element is found
        // Add a temporary inline style to make it visually obvious it's clickable
        // rankToggle.style.border = "2px solid lime"; // Optional: Add for visual debug
        rankToggle.addEventListener("click", () => {
            console.log("------------------------------------------");
            console.log("[Click Event] #rank-toggle clicked!"); // Confirm click event fires
            currentCharacter = currentCharacter === "sung-jin-woo" ? "cha-hae-in" : "sung-jin-woo";
            console.log("[Click Event] New currentCharacter:", currentCharacter);
            updateCharacterInfo(currentCharacter);
        });
    } else {
        console.error("[DOMContentLoaded] Element #rank-toggle NOT found! Click event won't work.");
    }
    console.log("------------------------------------------");
});
