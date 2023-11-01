import React from 'react'
import {DndContext} from '@dnd-kit/core';

const Dashboard = () => {
  return (
    <>
      <div className='p-5'>
        <div>
          <h1 className='fw-bolder'>Personal</h1>
          <p className='text-secondary mb-5'>A board to keep track of personal tasks.</p>
        </div>
        <div className='w-100 bg-body-tertiary rounded-4 row row-cols-4'>
          <div className='col p-4 '>
            <div className='px-3 py-1 bg-body-secondary rounded-4 fw-semibold text-secondary mb-3' style={{width: "fit-content"}}>Not Started</div>
            <div className='mb-3 p-4 bg-white rounded' style={{cursor: 'move'}}>
              <h5 contentEditable="false" style={{width: "80%"}}>Take Coco to a vet</h5>
              <p className='pb-3' contentEditable="false" style={{width: "80%"}}>Lorem ipsum dolor sit amet consectetur.</p>
              <div><span className="material-symbols-outlined " style={{cursor: "pointer"}}>delete</span></div>
            </div>
            <button type="button" className="btn btn-secondary w-100">Add</button>
          </div>
          <div className='col p-4'>
            <div className='px-3 py-1 bg-info-subtle rounded-4 fw-semibold text-secondary' style={{width: "fit-content"}}>In progress</div>
          </div>
          <div className='col p-4'>
            <div className='px-3 py-1 bg-danger-subtle rounded-4 fw-semibold text-secondary' style={{width: "fit-content"}}>Blocked</div>
          </div>
          <div className='col p-4'>
            <div className='px-3 py-1 bg-success-subtle rounded-4 fw-semibold text-secondary' style={{width: "fit-content"}}>Done</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard