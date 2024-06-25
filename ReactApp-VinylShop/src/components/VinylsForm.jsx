import React from "react";
import { useState } from "react";

const VinylsForm = ({ addVinyl }) => {
    const [albumName, setAlbumName] = useState("");
    const [bandName, setBandName] = useState("");
    const [genre, setGenre] = useState("");
    const [photoLink, setPhotoLink] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newVinyl = {
            id: Date.now(),
            albumName,
            bandName,
            genre,
            photoLink,
            type,
        };

        addVinyl(newVinyl);

        setAlbumName("");
        setBandName("");
        setGenre("");
        setPhotoLink("");
        setType("");
    };

    return (
        <div className="form-container">
            <h2>Add New Vinyl</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="album-name">Album Name:</label>
                <input
                    type="text"
                    id="album-name"
                    name="album-name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="band-name">Band Name:</label>
                <input
                    type="text"
                    id="band-name"
                    name="band-name"
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="photo-link">Photo Link:</label>
                <input
                    type="url"
                    id="photo-link"
                    name="photo-link"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="LP">Long PLay</option>
                    <option value="EP">Extended Play</option>
                    <option value="SINGLE">Single</option>
                </select>
                <br />
                <button type="submit">Add Vinyl</button>
            </form>
        </div>
    );
};

export default VinylsForm;
