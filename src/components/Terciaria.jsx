import React from 'react'
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch'
import Modal from 'react-bootstrap/Modal';
import { usePostFetch } from '../hooks/usePostFetch';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Terciaria() {

    const { data, isLoading, error } = useFetch('https://backproyectoalex.azurewebsites.net/Colegio/api/Docente/ObtenerDocentes');
    const createUserRequest = usePostFetch('https://backproyectoalex.azurewebsites.net/Colegio/api/Docente/AgregarDocente', 'POST');

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
        { isLoading && <h2 className = 'text-center'>Cargando a los docente....</h2>}

        <div className = 'd-flex justify-content-end'>
            <button className = 'btn btn-primary' onClick={handleCreateShow}>Agregar Docente</button>
        </div>
        <hr/>

        <table className = 'table table-info table-striped text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>

            <tbody>
                { data?.map((docente) => (
                    <tr key = {docente.idDocuentes}>
                        <th>{docente. idDocuentes}</th>
                        <td>{docente.nombre}</td>
                        <td>{docente.apellido}</td>
                    </tr>
                ))}
            </tbody>

        </table>

        {/* Modal para crear usuarios */}
        <Modal show={createModal} onHide={handleCreateHide}>

            <Modal.Header closeButton>
                <Modal.Title>Agregar Docente</Modal.Title>
            </Modal.Header>

            <Modal.Body>  
            <form id='createAlumnosForm' onSubmit={(event) => {
                event.preventDefault();

                //Opcion con JSON
                let payload = {}
                payload.nombre = document.getElementById('createNombre').value;
                payload.apellido = document.getElementById('createApellido').value;

                createUserRequest.executePost(payload);


                   handleCreateHide();
                   showSwal('Docente creado exitosamente');
                   window.location.reload();
                }}>
                <div className='row mb-3'>

                    <div className='col-sm-12 col-md-6'>
                        <label>Nombre</label>
                        <input type="text" className='form-control' name='nombre' id='createNombre' required />
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <label>Apellido</label>
                        <input type="text" className='form-control' name='apellido' id='createApellido' required />
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

export default Terciaria