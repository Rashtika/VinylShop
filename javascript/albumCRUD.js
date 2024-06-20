document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const vinylsList = document.querySelector(".vinyl-list");

    loadVinyls();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const albumName = document.getElementById("album-name").value;
        const bandName = document.getElementById("band-name").value;
        const type = document.getElementById("type").value;

        const vinyl = {
            id: Date.now(),
            albumName,
            bandName,
            type
        };

        addVinylToLocalStorage(vinyl);
        addVinylToList(vinyl);
        form.reset();
    });

    function addVinylToLocalStorage(vinyl) {
        const vinyls = getVinylsFromLocalStorage();
        players.push(vinyl);
        localStorage.setItem("vinyls", JSON.stringify(vinyls));
    }

    function getVinylsFromLocalStorage() {
        const vinyls = localStorage.getItem("vinyls");
        return JSON.parse(vinyls);
    }

    function loadVinyls() {
        const vinyls = getVinylsFromLocalStorage();
        vinyls.forEach((vinyl) => addVinylToList(vinyl));
    }

    function addVinylToList(vinyl) {
        const typeMap = {
            LP: "Long Play",
            EP: "Extended Play",
            SINGLE: "Single",
        };

        const vinylElement = document.createElement("div");
        vinylElement.classList.add("vinyl");
        vinylElement.innerHTML = `
            <img src="${vinyl.photoLink}" alt="${vinyl.AlbumName} ${vinyl.BandName
            }" />
            <div class="vinyl-info">
                <h3>${vinyl.albumName} ${vinyl.BandName}</h3>
                <p>Type: ${typeMap[vinyl.type]}</p>
            </div>
            <div class="vinyl-actions">
                <button class="btn-update" data-id="${vinyl.id}">Update</button>
                <button class="btn-delete" data-id="${vinyl.id}">Delete</button>
            </div>
        `;

        vinylsList.appendChild(vinylElement);

        vinylElement
            .querySelector(".btn-delete")
            .addEventListener("click", function () {
                deleteVinyl(vinyl.id);
            });

        vinylElement
            .querySelector(".btn-update")
            .addEventListener("click", function () {
                window.location.href = `update-vinyl.html?id=${vinyl.id}`;
            });
    }

    function deleteVinyl(vinylId) {
        let vinyls = getVinylsFromLocalStorage();
        vinyls = vinyls.filter((vinyl) => vinyl.id !== vinylId);
        localStorage.setItem("vinyls", JSON.stringify(vinyls));
        location.reload();
    }
});