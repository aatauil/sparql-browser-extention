import React from 'react'
import { db } from '../db';
import File from './File';
import { useLiveQuery } from "dexie-react-hooks";
import { generateSlug } from "random-word-slugs";
import { useDrop } from 'react-dnd';


function Folder({ data }) {  
  const [, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: () => ({ id: data.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }))
  
  const files = useLiveQuery(() => db.files.where({ folderId: data.id }).toArray());

  function setCollapsed() {
    db.folders.update(data.id, {
      isCollapsed: data.isCollapsed ? 0 : 1
    })
  }

  async function addFile(e) {
    e.stopPropagation()
    const slug = generateSlug()
    const now = new Date().toISOString();
    db.files.add({
      name: slug, 
      folderId: data.id,
      code: 'SELECT * WHERE { ?s ?p ?o } LIMIT 10',
      output: null,
      inTab: true,
      created: now,
      modified: now
    });
    db.folders.update(data.id, { isCollapsed: 0 })
  }

  return (
    <div> 
      <div ref={drop} className='flex justify-between items-center space-x-1 px-2 py-1 text-zinc-400 hover:text-white w-full cursor-pointer' onClick={() => setCollapsed()}>
        <div className='flex items-center space-x-2'>
          <i className={data.isCollapsed ? "ri-folder-fill text-blue-500" : "ri-folder-4-line text-blue-500"}></i>
          <span className='text-sm font-light'>{data.name}</span> 
        </div>
        <button onClick={addFile}><i className="ri-file-add-line  text-sm text-zinc-600 hover:text-white"></i></button>
      </div>

      {data.isCollapsed ? null :
        <div className='pl-3 w-full'>
          {files?.map((file, index) => (
            <File key={index} data={file} />
          ))}
        </div> 
      }
    </div>
  )
}

export default Folder
