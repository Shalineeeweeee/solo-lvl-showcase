const CHARACTER_DATA = {
  "sung-jin-woo": { name: "Sung Jin-Woo" },
  "cha-hae-in": { name: "Cha Hae-In" },
  "baek-yoon-ho": { name: "Baek Yoon-Ho" },
  "go-gun-hee": { name: "Go Gun-Hee" },
  "jin-ho": { name: "Yoo Jin-Ho" }
  // Add more characters as needed
};

const characterBtn = document.getElementById("character-btn");
const selector = document.getElementById("character-selector");
const characterList = document.getElementById("character-list");

characterBtn.addEventListener("click", () => {
  selector.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!selector.contains(e.target) && e.target !== characterBtn) {
    selector.classList.remove("show");
  }
});

function populateCharacterList() {
  characterList.innerHTML = "";
  for (let key in CHARACTER_DATA) {
    const li = document.createElement("li");
    li.textContent = CHARACTER_DATA[key].name;
    li.dataset.key = key;
    li.addEventListener("click", () => {
      loadCharacterProfile(key);
      selector.classList.remove("show");
    });
    characterList.appendChild(li);
  }
}

function loadCharacterProfile(key) {
  // Replace this with your actual profile loading logic
  alert(`Loading profile for ${CHARACTER_DATA[key].name}`);
}

populateCharacterList();
