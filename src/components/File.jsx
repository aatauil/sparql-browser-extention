import React, { useContext } from 'react';
import { ViewContext } from '../context/ViewContext';


function File({data}) {
  const { selected, setSelected } = useContext(ViewContext);
  
  return (
    <div> 
      <div className='flex items-center space-x-1 p-1' onClick={() => setSelected(data.id)}>
        <i className="ri-file-2-line text-blue-600"></i>
        <span className='text-sm font-medium'>{data.name}</span> 
      </div>
    </div>
  )
}

export default File