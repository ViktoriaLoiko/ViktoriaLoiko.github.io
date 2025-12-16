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
    "TS_Draw",
    "Snake",
    "Chatts",
    "PhoneStore"
];

async function repoHasPages(repoName) {
    // URL GitHub Pages
    const url = `https://${username}.github.io/${repoName}/`;

    try {
        const res = await fetch(url, { method: "HEAD" });

        // Если статус не 404 → страница существует
        return res.ok;
    } catch {
        return false;
    }
}

async function loadProjects() {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    projectGrid.innerHTML = "";

    for (const repo of repos.filter(r => allowedRepos.includes(r.name))) {
        const hasDemo = await repoHasPages(repo.name);

        // Если есть index.html → открыть GitHub Pages
        const link = hasDemo
            ? `https://${username}.github.io/${repo.name}/`
            : repo.html_url;

        const btnText = hasDemo ? "Открыть сайт" : "Открыть репозиторий";

        projectGrid.innerHTML += `
            <div class="card">
                <h3>${repo.name}</h3>
                <p>${repo.description || "Проект без описания"}</p>
                <a href="${link}" target="_blank">${btnText}</a>
            </div>
        `;
    }
}

loadProjects();

