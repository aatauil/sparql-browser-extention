import React, { useState } from 'react'

export const TabContext = React.createContext();

export function TabProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState();

  return (
    <TabContext.Provider value={{selected, setSelected}}>
      {children}
    </TabContext.Provider>
  )
}