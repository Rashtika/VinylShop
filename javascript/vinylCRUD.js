const reviewsContainer = document.getElementById("vinyls-container");

let vinyls = [];

function loadVinylsFromLocalStorage() {
    const vinylData = localStorage.getItem('vinyls');
    return JSON.parse(vinylData) || [];
}

function saveVinylToLocalStorage(vinyls) {
    localStorage.setItem('vinyls', JSON.stringify(vinyls));
}

function removeVynilFromLocalStorage(vinyl) {
    removeVynil(vinyl);
    saveVinylToLocalStorage(vinyls);
}

function clearVynilsFromLocalStorage() {
    vinyls = []
    saveVinylToLocalStorage(vinyls);
}

function removeVynil(vinyl) {
    const i = vinyls.indexOf(vinyl);
    if (i > -1) {
        vinyls.splice(i, 1);
    }
}

function save() {

    let vinyl1 = {
        id: Date.now(),
        albumName: "paris",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "nema",
        type: "EP"
    };
    vinyls.push(vinyl1);

    let vinyl2 = {
        id: Date.now(),
        albumName: "hamburger pls",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "nema",
        type: "EP"
    };
    vinyls.push(vinyl2);

    let vinyl3 = {
        id: Date.now(),
        albumName: "YEAS",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "nema",
        type: "EP"
    };
    vinyls.push(vinyl3);

    saveVinylToLocalStorage(vinyls);
}

document.addEventListener("DOMContentLoaded", () => {
    vinyls = loadVinylsFromLocalStorage();

    if (vinyls.length == 0) {
        save();
        console.log("sad smo napravili");
    }
    else {

        reviewsContainer.innerHTML = "";

        vinyls.forEach((vinyl) => {
            const reviewCard = document.createElement("div");
            reviewCard.classList.add("review-card");

            reviewCard.innerHTML += `
                <br>${vinyl.albumName}<br>
            `;

            reviewsContainer.appendChild(reviewCard);
        });

    }

})
