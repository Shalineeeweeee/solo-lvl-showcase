    function toggleTheme() {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-theme");
        }

        // Bind toggle to the "S" Rank
        document.getElementById("rank-toggle").addEventListener("click", toggleTheme);
    });