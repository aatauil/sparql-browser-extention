import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';
import { generateSlug } from "random-word-slugs";

function TabList() {

  const tabs = useLiveQuery(() => db.files.where({ inTab: 1 }).toArray());
  
  async function addTab() {
    const slug = generateSlug();
    const now = new Date().toISOString();
    db.files.where('focused').equals(1).modify({ focused: 0 });
    db.files.add({
      name: slug,
      code: 'SELECT * WHERE { ?s ?p ?o } LIMIT 10',
      inTab: 1,
      focused: 1,
      folderId: -1,
      created: now,
      modified: now
    });
  }

  function deleteTab(fileId) {
    db.files.update(fileId, { inTab: 0, focused: 0 });
  }

  function setTab(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }

  function isFocused(value) {
    if(value) {
      return "border-blue-600"
    } else {
      return "border-transparent";
    }
  }

  return (
    <div className='flex items-center w-full space-x-3'>
      <div className='flex items-center text-zinc-300 h-full  border-b border-zinc-700 w-full'>
        {tabs?.map((tab, index) => (
          <div key={index} className={`flex items-center space-x-2 px-2 py-3 border-b cursor-pointer ${isFocused(tab?.focused)}`} >

            <div className='px-2 text-sm' onClick={() => setTab(tab.id)}>{tab.name}</div>
            <button className='hover:text-red-500 rounded-full text-zinc-700 flex items-center justify-center h-5 w-5 text-xs' onClick={() => deleteTab(tab.id)}>
              <i className="ri-close-line "></i>
            </button>

          </div>
        ))}
      
        <button className='bg-white/10 px-2 text-zinc-300 rounded hover:bg-white/20' onClick={addTab}>
            <i className="ri-add-line"></i>
        </button>
      </div>
    </div>
  )
}

export default TabList