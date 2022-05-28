import React, { useContext } from 'react'
import { ViewContext } from '../context/ViewContext';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';
import { TabContext } from '../context/TabContext';

function TabList() {

  const view = useContext(ViewContext);
  const tabCtx = useContext(TabContext);
  const tabs = useLiveQuery(() => db.tabs.where({ fileId: view.selected || -1 }).toArray(), [view]);
  
  async function addTab() {
    const now = new Date().toISOString();
    db.tabs.add({name: now, fileId: view.selected, code: 'SELECT * WHERE { ?s ?p ?o } LIMIT 10', response: ''});
  }

  function deleteTab(tabId) {
    db.tabs.delete(tabId)
  }

  function setTab(tab) {
    tabCtx.setSelected(tab);
  }

  return (
    <div className='flex items-center w-full bg-gray-900 border space-x-3'>
      <div className='flex items-center py-2 text-gray-300'>
        {tabs?.map((tab, index) => (
          <div key={index} className="flex items-center space-x-2 border-r px-2">

            <div className='px-2 text-sm' onClick={() => setTab(tab)}>{tab.name}</div>
            <button className='bg-red-500 bg-opacity-30 rounded-full flex items-center justify-center h-5 w-5' onClick={() => deleteTab(tab.id)}>
              <i className="ri-close-line text-xs text-red-700"></i>
            </button>

          </div>
        ))}
      </div>
      <button className='bg-gray-800 px-2 text-gray-300' onClick={addTab}>
          <i className="ri-add-line"></i>
      </button>
    </div>
  )
}

export default TabList