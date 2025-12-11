// Тёмная тема
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// --- Автозагрузка GitHub проектов ---
const username = "ViktoriaLoiko";
const projectGrid = document.getElementById("projectGrid");
const allowedRepos = [
    "todo-ts",
    "TS_2",
    "Snake",
    "ArtSchool",
    "PhoneStore"
];

async function loadProjects() {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    projectGrid.innerHTML = "";

    repos
        .filter(r => allowedRepos.includes(r.name))
        .forEach(repo => {
            projectGrid.innerHTML += `
                <div class="card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Проект без описания"}</p>
                    <a href="${repo.html_url}" target="_blank">Открыть репозиторий</a>
                </div>
            `;
        });
}

loadProjects();
