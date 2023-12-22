const themeForm = document.getElementById("postsTodo");
const themesListContainer = document.getElementById("themesContainer");

document.addEventListener("DOMContentLoaded", function() {

    themeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const themeGet = document.getElementById("theme").value;
        const explanationGet = document.getElementById("explanations").value;

        addThemeToContainer(themeGet, explanationGet);

        const themeData = {
            title: themeGet,
            author: explanationGet
        };
        let themes = localStorage.getItem("themes") ? JSON.parse(localStorage.getItem("themes")) : [];
        themes.push(themeData);
        localStorage.setItem("themes", JSON.stringify(themes));

        themeForm.reset();
    });

    let savedThemes = localStorage.getItem("themes");
    if (savedThemes) {
        savedThemes = JSON.parse(savedThemes);
        savedThemes.forEach(theme => {
            addThemeToContainer(theme.title, theme.author);
        });
    }
});

function addThemeToContainer(theme, explanation) {
    const themeEntry = document.createElement("div");
    themeEntry.classList.add("theme-entry");
    themeEntry.innerHTML = `<strong>${theme}</strong> ---> <span>${explanation}</span> <button class="delete-button">Удалить</button>`;
    themesListContainer.appendChild(themeEntry);


    const deleteButton = themeEntry.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        themesListContainer.removeChild(themeEntry);
        updateLocalStorage();
    });
}

function updateLocalStorage() {
    const themesEntries = Array.from(themesListContainer.querySelectorAll(".theme-entry"));
    const themeData = themesEntries.map(themeEntry => {
        const theme = themeEntry.querySelector("strong").textContent;
        const explanation = themeEntry.querySelector("span").textContent;
        return { title: theme, author: explanation };
    });
    localStorage.setItem("themes", JSON.stringify(themeData));
}
//comment