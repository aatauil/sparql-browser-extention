import React, { useState } from 'react'

export const ViewContext = React.createContext();

export function ViewProvider({ children }) {
  const [selected, setSelected] = useState();

  return (
    <ViewContext.Provider value={{selected, setSelected}}>
      {children}
    </ViewContext.Provider>
  )
}