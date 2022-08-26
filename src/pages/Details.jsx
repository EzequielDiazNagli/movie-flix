import React from 'react'
import "../styles/details.css"

export default function Details() {
  return (
    <div className='min-h-screen bg-slate-600 flex flex-col gap-5'>
      <div className='detailsContainer'>
        <div className='detailsContainerA'>
        <div className='detailsBox'>
          <div className='detailsBoxOne'>
            <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sYPh29MkZTWewIL5adMwj5stqgA.jpg" alt="" srcset="" />
          </div>
          <div className='detailsBoxTwo'>
            <div className='detailsBoxTwo-A'>
              <h1>Nombre de Pelicula Largo</h1>
            </div>
            <div className='detailsBoxTwo-B'>
              <div>Icon</div>
              <div>Icon</div>
              <div>Icon</div>
            </div>
            <div className='detailsBoxTwo-C'>
              <h2>Vista General</h2>
              <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, dolores dolorem natus tempora commodi suscipit recusandae est, blanditiis numquam dicta quam corporis et maiores autem esse voluptatibus iusto? Odit, hic?</p>
              </div>
              <div className='info'>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
