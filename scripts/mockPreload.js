async function displayComments() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 99) + 1}`);
        if (!response.ok) {
            throw new Error(`Что-то пошло не так: ${response.status} - ${response.statusText}`);
        }
        response.json().then(json => {
            addThemeToContainer(json.title, json.body)
        })
            //addThemeToContainer(response.json(), response.json().body);
    } catch (err) {
        console.log(err)
        alert(err)
    }
}
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader')
    preloader.classList.add('preloader_hidden')
})
window.addEventListener('DOMContentLoaded', displayComments);

