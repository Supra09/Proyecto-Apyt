import { useState } from 'react';
import BarraNav from '../4-barra de navegacion/barraNav.jsx';

function Supervisor() {
    const [btnsSuper,setBtnsSuper] = useState(true);


    return (
        <>
            <BarraNav estado={btnsSuper} />
        </>
    )
};

export default Supervisor;