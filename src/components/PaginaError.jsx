import React from 'react'

function PaginaError(props) {
  return (
    <div className = 'error-panel position-relative'>
      <div className = 'error-card position-absolute'>
        Parece que la pagina a la que quieres entrar no existe
        <img src={props.url} className = 'img-error'/>
      </div>
      </div>
  )
}

export default PaginaError