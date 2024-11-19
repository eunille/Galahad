import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";
import dataFetch from "./dataService";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  success: boolean;
  id: number;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialToken = sessionStorage.getItem("token");
  
  // No need to decode the token to get the user_id anymore
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState<number>(0); // Default to 0, no user ID logic
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const payload = { username, password };
    setError(null); // Reset error state on each login attempt

    try {
      console.log("Sending login payload:", payload);
      const response = await dataFetch(
        "/api/auth/jwt/create/",
        "POST",
        payload
      );
      const token = response.access;

      if (!token) {
        throw new Error("Token not found in response");
      }

      // Set token and save it in session storage
      setToken(token);
      sessionStorage.setItem("token", token);

      // If user ID extraction is not necessary, you can remove this logic
      setId(1); // You can adjust or remove this line based on your needs
      
      setSuccess(true);
    } catch (err) {
      console.error("Error during login:", err);
      setSuccess(false);
      setError("Login failed. Please check your username and password.");
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setSuccess(false); // Reset success state on logout
    setId(0); // Reset id on logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, success, id, error }}>
      {children}
    </AuthContext.Provider>
  );
};
