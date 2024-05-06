import React from 'react'
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch'
import Modal from 'react-bootstrap/Modal';
import { usePostFetch } from '../hooks/usePostFetch';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Principal() {

    const { data, isLoading, error } = useFetch('https://localhost:7259/Colegio/api/Alumno/ObtenerAlumnosFiltro');
    const createUserRequest = usePostFetch('https://localhost:7259/Colegio/api/Alumno/AgregarAlumnos', 'POST');

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
        { isLoading && <h2 className = 'text-center'>Cargando los Alumnos....</h2>}

        <div className = 'd-flex justify-content-end'>
            <button className = 'btn btn-primary' onClick={handleCreateShow}>Agregar Alumno</button>
        </div>
        <hr/>

        <table className = 'table table-info table-striped text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Nacimiento</th>
                    <th>Id Carrera</th>
                    <th>Telefono</th>
                </tr>
            </thead>

            <tbody>
                { data?.map((alumnos) => (
                    <tr key = {alumnos.idAlumno}>
                        <th>{alumnos.idAlumno}</th>
                        <td>{alumnos.nombre}</td>
                        <td>{alumnos.apellido}</td>
                        <td>{alumnos.f_Nacimiento.substring(0,10)}</td>
                        <td>{alumnos.idCarrera}</td>
                        <td>{alumnos.telefono}</td>
                    </tr>
                ))}
            </tbody>

        </table>

        {/* Modal para crear usuarios */}
        <Modal show={createModal} onHide={handleCreateHide}>

            <Modal.Header closeButton>
                <Modal.Title>Agregar Alumno</Modal.Title>
            </Modal.Header>

            <Modal.Body>  
            <form id='createAlumnosForm' onSubmit={(event) => {
                event.preventDefault();

                //Opcion con JSON
                let payload = {}
                payload.nombre = document.getElementById('createNombre').value;
                payload.apellido = document.getElementById('createApellido').value;
                payload.f_Nacimiento = document.getElementById('createF_Nacimiento').value;
                //payload.idCarrera = document.getElementById('createIdCarrera').value;
                payload.idCarrera = '3'
                payload.telefono = document.getElementById('createTelefono').value;

                createUserRequest.executePost(payload);


                   handleCreateHide();
                   showSwal('Alumno creado exitosamente');
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

                <div className='col-sm-12 col-md-6'>
                    <label>Fecha Nacimiento</label>
                    <input type="date" className='form-control' name='f_Nacimiento' id='createF_Nacimiento' required />
                </div>

                {/* <div className='col-sm-12 col-md-6'>
                    <label>id Carrera</label>
                    <input type="text" className='form-control' name='idCarrera' id='createIdCarrera' required />
                </div> */}

                <div className='col-sm-12 col-md-6'>
                    <label>Telefono</label>
                    <input type="text" className='form-control' name='telefono' id='createTelefono' required />
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

export default Principal