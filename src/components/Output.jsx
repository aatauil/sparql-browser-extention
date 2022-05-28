import React, { useContext } from 'react'
import { TabContext } from '../context/TabContext';
import { useLiveQuery } from "dexie-react-hooks";

function Output() {
  const tabCtx = useContext(TabContext);

  if(!tabCtx.selected) return null;
  
  return (
    <div>{tabCtx.selected.response}</div>
  )
}

export default Output