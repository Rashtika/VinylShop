const vinylsContainer = document.getElementById("vinyls-container");
const album = document.getElementById("album-name");
const band = document.getElementById("band-name");
const genre = document.getElementById("genre");
const photoLink = document.getElementById("photo-link");
const type = document.getElementById("type");
const submitForm = document.getElementById("submitForm");

//state
let vinyls = [];
let upd = "";

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

function removeVynilById(id) {
    for (let i = 0; i < vinyls.length; i++) {
        if (vinyls[i].id == id) {
            vinyls.splice(i, 1);
            break;
        }
    }
}

function getVynilById(id) {
    for (let i = 0; i < vinyls.length; i++) {
        if (vinyls[i].id == id) {
            return vinyls[i];
        }
    }
    return null;
}

function save() {

    let vinyl1 = {
        id: Date.now(),
        albumName: "paris",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "https://media.istockphoto.com/id/1278847693/photo/afro-american-tourist-under-the-eiffel-tower.jpg?s=612x612&w=0&k=20&c=_7RCsuc6yyNGEBfxEh63evjtTSmZvrJSWx7NXXeD2vs=",
        type: "EP"
    };
    vinyls.push(vinyl1);

    let vinyl2 = {
        id: Date.now(),
        albumName: "hamburger pls",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
        type: "EP"
    };
    vinyls.push(vinyl2);

    let vinyl3 = {
        id: Date.now(),
        albumName: "YEAS",
        bandName: "Filthy Frank",
        genre: "(T)RAP",
        photoLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJq43F3buQu8KqTjEDIjFcDTVa0fw81wq3Q&s",
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
        //clearVynilsFromLocalStorage();

    }

    renderVinyls();
})

function renderVinyls() {
    vinylsContainer.innerHTML = "";

    vinyls.forEach((vinyl) => {
        const vinylCard = document.createElement("div");
        vinylCard.classList.add("review-card");

        vinylCard.innerHTML += `
                <br>${vinyl.albumName}<br>
                <button id="${vinyl.id}-del" type="submit" onclick="clickDelButton(${vinyl.id});">DEL</button>
                <button id="${vinyl.id}-upd" type="submit" onclick="clickUpdButton(${vinyl.id});">UPD</button>
                <img src="${vinyl.photoLink}">
            `;

        vinylsContainer.appendChild(vinylCard);
    });
}

function clickDelButton(id) {
    removeVynilById(id);
    saveVinylToLocalStorage(vinyls);
    renderVinyls();
}

function clickUpdButton(id) {
    let vinyl = getVynilById(id);

    if (vinyl != null) {
        album.value = vinyl.albumName;
        band.value = vinyl.bandName;
        genre.value = vinyl.genre;
        photoLink.value = vinyl.photoLink;
        type.value = vinyl.type;
        upd = vinyl.id;
    }
}

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (upd == "") {
        const vinyl = {
            id: Date.now(),
            albumName: album.value,
            bandName: band.value,
            genre: genre.value,
            photoLink: photoLink.value,
            type: type.value
        };
        vinyls.push(vinyl);
    }
    else {
        let vinyl = getVynilById(upd);
        vinyl.albumName = album.value;
        vinyl.bandName = band.value;
        vinyl.genre = genre.value;
        vinyl.photoLink = photoLink.value;
        vinyl.type = type.value;
    }

    upd = "";

    saveVinylToLocalStorage(vinyls);
    renderVinyls(vinyls);
    submitForm.reset();
});