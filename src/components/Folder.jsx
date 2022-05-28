import React, { useState } from 'react'
import { db } from '../db';
import File from './File';
import { useLiveQuery } from "dexie-react-hooks";

function Folder({ data }) {
  const [collapsed, setCollapsed] = useState(false);
  const files = useLiveQuery(() => db.files.where({ folderId: data.id }).toArray());

  async function addFile() {
    const now = new Date().toISOString();
    const fileId = await db.files.add({name: "file", folderId: data.id});
    db.tabs.add({name: now, fileId: fileId})
  }

  return (
    <div className='pb-2'> 
      <div className='flex justify-between items-center space-x-1 px-2 py-1 hover:bg-gray-500/30 rounded-md' onClick={() => setCollapsed(!collapsed)}>
        <div className='flex items-center space-x-2'>
          <i className={collapsed ? "rotate-180 ri-arrow-up-s-line" : "ri-arrow-up-s-line"}></i>
          <div className='flex items-center space-x-1'>
            <i className="ri-folder-fill text-blue-800/70"></i>
            <span className='text-sm font-medium'>{data.name}</span> 
          </div>
        </div>
        <button onClick={addFile}><i className="ri-file-add-line"></i></button>
      </div>

      {collapsed &&
        <div className='pl-3'>
          {files?.map((file, index) => (
            <File key={index} data={file} />
          ))}
        </div>
      }
    </div>
  )
}

export default Folder