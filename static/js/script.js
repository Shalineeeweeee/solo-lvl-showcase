const CHARACTER_DATA = {
    "sung-jin-woo": {
        name: "SUNG JIN WOO",
        korean: "(성진우)",
        title: "Shadow Monarch A.K.A",
        description: "Sung Jin-Woo is the main character of Solo Leveling. He starts as the weakest hunter but gains a unique ability to level up after surviving a deadly dungeon. With his new powers, he becomes the Shadow Monarch, commanding an army of shadows. Jin-Woo transforms from a powerless fighter into the world’s strongest hunter, protecting his loved ones and battling powerful enemies.",
        image: "static/img/sung-jin-woo-main.png",
        theme: "theme-jinwoo",
        rank: "S",
        glowClass: "glow-s"
    },
    "cha-hae-in": {
        name: "CHA HAE IN",
        korean: "(차해인)",
        title: "The Dancer A.K.A",
        description: "Cha Hae In is the Vice-Guild Master of the Hunters Guild. Known for her incredible swordsmanship and strong sense of justice, she is one of Korea's top hunters. Her sense of smell makes her wary of most magic beasts and people—except for Sung Jin-Woo, who doesn't emit a foul aura. As the story progresses, she becomes closer to Jin-Woo and plays a key role in major battles.",
        image: "static/img/cha-hae-in-main.png",
        theme: "theme-haein",
        rank: "A",
        glowClass: "glow-a"
    }
};

function switchCharacter(id) {
    const data = CHARACTER_DATA[id];

    // Update texts
    document.querySelector('.character-name').innerHTML = `${data.name} <span class="korean-name">${data.korean}</span>`;
    document.querySelector('.character-title').textContent = data.title;
    document.querySelector('.character-about-placeholder p').textContent = data.description;

    // Update image
    document.getElementById('character-main-image').src = data.image;

    // Update background theme
    const bg = document.getElementById('character-background-overlay');
    bg.className = ''; // Clear previous theme
    bg.classList.add(data.theme);

    // Update rank symbol
    const rankSymbol = document.getElementById('rank-symbol');
    const rankText = document.querySelector('.rank-text');

    rankSymbol.textContent = data.rank;
    rankText.textContent = data.rank ? " RANK" : "";

    // Remove existing glow classes
    rankSymbol.className = '';
    if (data.glowClass) {
        rankSymbol.classList.add(data.glowClass);
    }
}

// Optional: Add button event listeners if needed
// Example:
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sign").addEventListener("click", () => {
        alert("Signup button clicked!");
    });

    // Example character buttons (you'll need to add actual buttons in HTML with IDs or data attributes)
    const characterButtons = document.querySelectorAll("[data-character-id]");
    characterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const characterId = button.getAttribute("data-character-id");
            switchCharacter(characterId);
        });
    });
});






