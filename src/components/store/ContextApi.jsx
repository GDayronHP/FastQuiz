import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  // Obtener el token y el estado de admin desde localStorage
  const getToken = localStorage.getItem("JWT_TOKEN") || null;
  const isADmin = localStorage.getItem("IS_ADMIN") || false;

  // Estado para el token
  const [token, setToken] = useState(getToken);

  // Estado para el usuario actual
  const [currentUser, setCurrentUser] = useState(null);

  // Estado para el estado del sidebar en el panel de administración
  const [openSidebar, setOpenSidebar] = useState(true);

  // Estado si el usuario es admin
  const [isAdmin, setIsAdmin] = useState(isADmin);

  // Función para obtener el usuario actual
  const fetchUser = async () => {
    if (token) {
      try {
        const { data } = await api.get(`/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const roles = data.roles;

        // Verificar si el usuario es admin
        if (roles.includes("ROLE_ADMIN")) {
          localStorage.setItem("IS_ADMIN", true);
          setIsAdmin(true);
        } else {
          localStorage.removeItem("IS_ADMIN");
          setIsAdmin(false);
        }

        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
      }
    }
  };

  // Sincronizar el token con localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT_TOKEN", token);
      fetchUser(); // Cargar usuario si hay un token
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  }, [token]);

  // Proveer los datos de contexto
  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        openSidebar,
        setOpenSidebar,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

// Custom hook para acceder al contexto
export const useMyContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useMyContext debe usarse dentro de un ContextProvider");
  }
  return context;
};
