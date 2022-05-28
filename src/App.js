import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from './db';
import Folder from './components/Folder';
import Editor from './components/Editor';
import { ViewProvider } from './context/ViewContext';
import { TabProvider } from './context/TabContext';
import TabList from './components/TabList';
import Output from './components/Output';

function App() {  

  const folders = useLiveQuery(() => db.folders.toArray());

  function addFolder() {
    db.folders.add({name: "folder1"});
  }

  return (
    <ViewProvider>
      <div className="bg-zinc-900 h-screen max-h-screen w-screen max-w-screen">
        <div className="flex flex-1 w-full h-full bg-gray-500">
          <div className="w-full max-w-xs h-full bg-zinc-900 border-r border-gray-700 text-white">
            <div className='py-2 w-full border-b border-gray-700 flex items-center justify-center space-x-2 text-sm text-gray-300 shadow-gray-500/5 shadow mb-3'>
              <i className="ri-folder-add-line"></i>
              <button onClick={addFolder}>add folder</button> 
            </div>
            {folders?.map((folder, index) => (
              <Folder key={index} data={folder} />
            ))}
          </div>
          <TabProvider>
            <div className="flex flex-col w-full h-full flex-1">
              <TabList/>
              <Editor/>
              <Output/>
            </div>
          </TabProvider>
        </div>
      </div>
    </ViewProvider>
  );
}

export default App;
