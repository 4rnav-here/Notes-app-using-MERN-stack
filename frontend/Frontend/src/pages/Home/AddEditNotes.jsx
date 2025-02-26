import React from 'react'

const AddEditNotes = () => {
  return (
    <>
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input
            type='text'
            className='text-2xl text-slate-950 outline-none'
            placeholder='Write a note title'>
            </input>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
            className='text-slate-950 outline-none bg-slate-80 p-2 rounded'
            placeholder='Write your note here'
            rows={10}>
            </textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
    </>
  )
}

export default AddEditNotes