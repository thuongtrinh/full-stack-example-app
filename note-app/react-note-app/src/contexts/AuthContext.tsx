import { createContext, useContext } from "react";
import type { UserDTO } from "../interfaces/DataTypes";
import type { Auth } from "firebase/auth";

interface AuthContextType {
    user: UserDTO | null;
    setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
    auth: Auth;
}

// export const AuthContext = createContext({});
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Now TypeScript knows 'context' is AuthContextType (not undefined)
};