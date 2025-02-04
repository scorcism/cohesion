import { AppContextType, UserType } from "@/types/common";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<UserType>(null);

  const value: AppContextType = {
    showLoginModal,
    setShowLoginModal,
    user,
    setUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
