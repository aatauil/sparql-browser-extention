import React, { useState } from 'react';
import { db } from '../db';
import { useHover } from '../hooks/useHover';
import { useDrag } from 'react-dnd'

function File({data}) {
  const [hoverRef, isHovered] = useHover();
  const [editMode, setEditMode] = useState(false);
  const [localName, setlocalName] = useState(data.name)

  const [, drag] = useDrag(() => ({
    type: "FILE",
    collect: (file) => ({
      isDragging: file.isDragging()
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log(dropResult)
      db.files.update(data.id, {
        folderId: dropResult.id
      });

      db.folders.update(dropResult.id, {
        isCollapsed: 0
      })
    }
  }))

  function setSelected(fileId) {
    db.files.where('focused').equals(1).modify({ focused: 0 });
    db.files.update(fileId, {
      inTab: 1,
      focused: 1
    })
  }

  function handleDoubleClick() {
    console.log("double")
  }

  function deleteFile() {
    db.files.delete(data.id);
  }

  function updateFileName() {
    if(!localName) return;

    db.files.update(data.id, {
      name: localName
    });
    setEditMode(false)
  }

  if(editMode) return (
    <div>
      <div className='flex items-center text-zinc-400 hover:text-white hover:bg-zinc-900/50 py-1 px-2 w-full' > 
        <div className='flex flex-1 items-center space-x-2'>
          <i className="ri-file-2-line text-blue-500"></i>
          <input autoFocus type="text" name="file-name" value={localName} onChange={(e) => setlocalName(e.target.value)} className='text-xs bg-zinc-800 border border-zinc-800 w-full'/>
        </div>
        <div className='flex items-center text-sm text-zinc-600 space-x-1.5 px-1'>
            <i className="ri-check-line hover:text-green-500" onClick={updateFileName}></i>
            <i className="ri-close-line hover:text-red-500" onClick={() => setEditMode(false)}></i>
          </div>
      </div>
    </div>
  )
  
  return (
    <div ref={hoverRef}>
      <button ref={drag} className='flex items-center text-zinc-400 hover:text-white hover:bg-zinc-900/50 py-1 px-2 w-full' > 
        <div  className='flex flex-1 items-center space-x-2' onClick={() => setSelected(data.id)}>
          <i className="ri-file-2-line text-blue-500"></i>
          <span onDoubleClick={handleDoubleClick} className='text-xs'>{data.name}</span> 
        </div>
        {isHovered ? 
          <div className='flex items-center text-sm text-zinc-600 space-x-1.5 px-1'>
            <i className="ri-pencil-line hover:text-zinc-200" onClick={() => setEditMode(true)}></i>
            <i className="ri-close-line hover:text-red-500" onClick={deleteFile}></i>
          </div>
        : null}
      </button>
    </div>
  )
}

export default File