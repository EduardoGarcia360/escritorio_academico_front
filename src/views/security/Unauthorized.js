import React from 'react';
import { useHistory } from "react-router-dom";

const Unauthorized = () => {
    const history = useHistory();

    const handleBackClick = () => {
        history.push("/admin/dashboard");
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Acceso No Autorizado</h1>
            <p>No tienes permiso para acceder a esta página.</p>
            <button 
                style={{ backgroundColor: 'skyblue', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }} 
                onClick={handleBackClick}
            >
                Regresar a Dashboard
            </button>
        </div>
    );
};

export default Unauthorized;