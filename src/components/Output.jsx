import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';

function Output() {

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  if(!file?.output) return null;

  const keys = Object.keys(file.output[0])


  return (
    <table className='text-white border-y border-zinc-700 w-full h-full'>
      <thead>
        <tr className='bg-zinc-800 divide-x divide-zinc-700'>
          {keys.map((key) => <th key={key}>{key}</th> )}
        </tr>
      </thead>
      <tbody className='font-medium text-sm'>
        {file.output.map((entry, index) => 
          <tr key={index} className='text-sm font-light divide-x divide-zinc-700 odd:bg-black/20'>
            { keys.map((key, index) =>
              <td className='px-2' key={index}>{entry[key].value}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}
export default Output