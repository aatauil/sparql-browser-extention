import React from 'react'
import Editor from './components/Editor';
import Output from './components/Output';
import TabList from './components/TabList';
import Directory from './components/Directory';

function App() {  
  return (
    <div className="bg-zinc-900 h-screen max-h-screen w-screen max-w-screen">
      <div className="flex flex-1 w-full h-full">
        <div className="w-full max-w-xs h-full bg-zinc-900 border-r border-zinc-700 text-white">
          <Directory/>
        </div>   
        <div className="flex flex-col w-full h-full flex-1">
          <TabList/>
          <Editor/>
          <Output/>
        </div>
      </div>
    </div>
  );
}

export default App;
