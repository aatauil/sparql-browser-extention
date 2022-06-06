import React from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';
import { generateSlug } from "random-word-slugs";
import Folder from './Folder';
import File from './File';
import { useDrop } from 'react-dnd';


function Directory() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: () => ({ id: -1 }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const folders = useLiveQuery(() => db.folders.toArray());
  const files = useLiveQuery(() => db.files.where({ folderId: -1 }).toArray());


  function addFolder(e) {
    e.stopPropagation();
    const slug = generateSlug()
    db.folders.add({
      name: slug,
      isCollapsed: 0
    });
  }

  return (
    <>
      <div className='flex items-center p-4 pb-0'>
        <h2 className='text-xs font-light text-zinc-300'>Folders</h2> 
        <div className='flex-1 flex justify-end'>
          <button onClick={(e) => addFolder(e)}><i className="ri-folder-add-line text-zinc-300 hover:text-white"></i></button>
        </div>
      </div>
      
      <div className='flex flex-col p-2' >
        { folders?.map((folder, index) => <Folder key={index} data={folder} /> )}
        { files?.map((file, index) => <File key={index} data={file} /> )}
        <div ref={drop} className="h-24 w-full"></div>
      </div>
    </>
  )
}

export default Directory