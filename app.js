const auth = "563492ad6f91700001000001987f90fb8f154861a4b5bd9ee26d0635";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let seachValue;

// Event
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', e => {
    e.preventDefault();
    searchPhotos(searchValue);
});

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original}>Dowload</a>
            </div>
            <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

curatedPhotos();