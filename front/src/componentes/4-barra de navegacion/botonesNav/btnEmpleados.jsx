
function BtnEmpleados({ onClick }) { 
    return (
        <>
            <section className="d-flex justify-content-center align-items-center">
                <article className="col-auto mx-2">
                    <img src="../../../pic/astronauta 2.png" alt="" width='30px' />
                </article>
                <article className="col-auto">
                    <button type="button" className="px-3  btn btn-danger shadow-lg btn-nav" onClick={onClick}>Empleados</button> {/* Llama a la función onClick cuando se hace clic en el botón */}
                </article>
            </section>
        </>
    )
};

export default BtnEmpleados;
