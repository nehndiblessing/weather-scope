import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{ mobileOpen, setMobileOpen }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
