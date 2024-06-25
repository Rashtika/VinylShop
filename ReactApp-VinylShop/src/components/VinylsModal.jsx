import React from "react";
import { useState, useEffect } from "react";
import vinyls from "../vinyls.css";
import VinylsForm from "../components/VinylsForm";
import VinylsGrid from "../components/VinylsGrid";



const VinylsModal = () => {
    const [vinyls, setVinyls] = useState([]);
    const [updateId, setUpdateId] = useState("");

    useEffect(() => {
        const storedVinyls = JSON.parse(localStorage.getItem("vinyls")) || [];
        setVinyls(storedVinyls);
    }, []);

    const addVinyl = (vinyl) => {
        if (updateId == "") {
            const updatedVinyls = [...vinyls, vinyl];
            setVinyls(updatedVinyls);
            localStorage.setItem("vinyls", JSON.stringify(updatedVinyls));
        }
        else {
            const updatedVinyls = vinyls;
            let vinylToUpdate = updatedVinyls.find(v => { return v.id == updateId; })
            if (vinylToUpdate != null) {
                vinylToUpdate.albumName = vinyl.albumName;
                vinylToUpdate.bandName = vinyl.bandName;
                vinylToUpdate.genre = vinyl.genre;
                vinylToUpdate.photoLink = vinyl.photoLink;
                vinylToUpdate.type = vinyl.type;
                localStorage.setItem("vinyls", JSON.stringify(updatedVinyls));
            }
        }
        setUpdateId("");
    };

    const deleteVinyl = (id) => {
        const updatedVinyls = vinyls.filter((vinyl) => vinyl.id !== id);
        setVinyls(updatedVinyls);
        localStorage.setItem("vinyls", JSON.stringify(updatedVinyls));
    };

    const updateVinyl = (id) => {
        let albumField = document.getElementById("album-name");
        let bandField = document.getElementById("band-name");
        let genreField = document.getElementById("genre");
        let photoField = document.getElementById("photo-link");
        let typeField = document.getElementById("type");
        console.log("updating");
        const updatedVinyls = vinyls;
        let vinylToUpdate = updatedVinyls.find(v => { return v.id == id; })
        albumField.value = vinylToUpdate.albumName;
        bandField.value = vinylToUpdate.bandName;
        genreField.value = vinylToUpdate.genre;
        photoField.value = vinylToUpdate.photoLink;
        typeField.value = vinylToUpdate.type;
        setUpdateId(id);
    };

    return (
        <div className="content">
            <VinylsForm addVinyl={addVinyl} />
            <div class="vinyls-list">
                <h2>Vinyls List</h2>
                <VinylsGrid vinyls={vinyls} deleteVinyl={deleteVinyl} updateVinyl={updateVinyl} />
            </div>
        </div>
    );
};

export default VinylsModal;