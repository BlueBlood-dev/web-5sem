document.addEventListener("DOMContentLoaded", function() {
    const themeForm = document.getElementById("postsTodo");
    const themesListContainer = document.getElementById("themesContainer");

    function addThemeToContainer(theme, explanation) {
        const themeEntry = document.createElement("div");
        themeEntry.classList.add("theme-entry");
        themeEntry.innerHTML = `<strong>${theme}</strong> - ${explanation} <button class="delete-button">Удалить</button>`;
        themesListContainer.appendChild(themeEntry);

        const deleteButton = themeEntry.querySelector(".delete-button");
        deleteButton.addEventListener("click", function() {
            themesListContainer.removeChild(themeEntry);
            updateLocalStorage();
        });
    }

    function updateLocalStorage() {
        const bookEntries = Array.from(themesListContainer.querySelectorAll(".book-entry"));
        const booksData = bookEntries.map(bookEntry => {
            const title = bookEntry.querySelector("strong").textContent;
            const author = bookEntry.textContent.split(" - ")[1];
            return { title, author };
        });
        localStorage.setItem("themes", JSON.stringify(booksData));
    }

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
        savedThemes.forEach(book => {
            addThemeToContainer(book.title, book.author);
        });
    }
});
//comment