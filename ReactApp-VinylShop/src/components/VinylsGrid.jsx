import React from "react";
//import { useNavigate } from "react-router-dom";

const VinylsGrid = ({ vinyls, deleteVinyl, updateVinyl }) => {
    return (
        <div className="vinyls-grid">
            {vinyls.map((vinyl) => (
                <div className="vinyl" key={vinyl.id}>
                    <img
                        src={vinyl.photoLink}
                        alt={`${vinyl.vinylName} ${vinyl.bandName}`}
                    />
                    <div className="vinyl-info">
                        <h3>
                            {vinyl.albumName} {vinyl.bandName}
                        </h3>
                        <p>Type: {vinyl.type}</p>
                    </div>
                    <div className="vinyl-actions">
                        <button
                            className="btn-update"
                            onClick={() => updateVinyl(vinyl.id)}
                        >
                            Update
                        </button>
                        <button
                            className="btn-delete"
                            onClick={() => deleteVinyl(vinyl.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VinylsGrid;