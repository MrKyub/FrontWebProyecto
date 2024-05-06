import React from 'react'
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch'
import Modal from 'react-bootstrap/Modal';
import { usePostFetch } from '../hooks/usePostFetch';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



function Secundaria() {

  const { data, isLoading, error } = useFetch('https://localhost:7259/Colegio/api/Carrera/ObtenerCarreras');
  const createUserRequest = usePostFetch('https://localhost:7259/Colegio/api/Carrera/AgregarCarrera', 'POST');

  const [createModal, setCreateModal] = useState(false);

  const handleCreateShow = () => setCreateModal(true);
  const handleCreateHide = () => setCreateModal(false);

  const showSwal = (message) => {
      withReactContent(Swal).fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2500
      })
    }

  return (
    <div className = 'container'>
        { error && <h2 className = 'text-center'>Tenemos un pequeño error: {error}</h2> }
        { isLoading && <h2 className = 'text-center'>Cargando las Carreras....</h2>}

        <div className = 'd-flex justify-content-end'>
            <button className = 'btn btn-primary' onClick={handleCreateShow}>Agregar Carrera</button>
        </div>
        <hr/>

        <table className = 'table table-info table-striped text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
            </thead>

            <tbody>
                { data?.map((carreras) => (
                    <tr key = {carreras.idAlumno}>
                        <th>{carreras.idCarrera}</th>
                        <td>{carreras.nombre}</td>
                    </tr>
                ))}
            </tbody>

        </table>

        {/* Modal para crear usuarios */}
        <Modal show={createModal} onHide={handleCreateHide}>

            <Modal.Header closeButton>
                <Modal.Title>Agregar Carrera</Modal.Title>
            </Modal.Header>

            <Modal.Body>  
            <form id='createAlumnosForm' onSubmit={(event) => {
                event.preventDefault();

                //Opcion con JSON
                let payload = {}
                payload.nombre = document.getElementById('createNombre').value;

                createUserRequest.executePost(payload);


                   handleCreateHide();
                   showSwal('Carrera creada exitosamente');
                   window.location.reload();
                }}>
                <div className='row mb-3'>

                  <div className='col-sm-12 col-md-6'>
                    <label>Nombre Carrera</label>
                    <input type="text" className='form-control' name='nombre' id='createNombre' required />
                  </div>
                </div>

                <div className='d-flex justify-content-end'>
                <button type='button' className='btn btn-danger mx-2' onClick={handleCreateHide}>Cancelar</button>
                <button type='submit' className='btn btn-primary'>Guardar</button>
                </div>
            </form>
            </Modal.Body>

        </Modal>

    </div>
  )
}

export default Secundaria