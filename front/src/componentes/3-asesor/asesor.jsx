import { useState } from 'react';
import BarraNav from '../4-barra de navegacion/barraNav.jsx';

function Asesor() {
    const [btnsAsesor,setBtnsAsesor] = useState(false);
    return(
        <>
            <BarraNav estado={btnsAsesor} />
        </>
    )
};

export default Asesor;