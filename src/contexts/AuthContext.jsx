import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const authContext = createContext();

const db = getFirestore();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("Error creando contexto de usuario");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userFotoPerfil, setUserFotoPerfil] = useState(null);
  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser("");
        setUserRole(null);
        setUserName(null);
        setUserLastName(null);
        setUserFotoPerfil(null)
      } else {
        setUser(currentUser);

        // Obtén el rol, nombre y apellido del usuario desde Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserRole(userData.rol);
          setUserName(userData.nombre);
          setUserLastName(userData.apellido);
          setUserFotoPerfil(userData.fotoPerfil);
        }
      }
    });

    return () => suscribed();
  }, []);

  const completarRegistro = async (docuRef, data) => {
    try {
      await setDoc(docuRef, data, { merge: true });
      console.log("Registro completado con éxito");
    } catch (error) {
      console.error("Error al completar el registro:", error);
    }
  };

  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
    const docuRef = doc(db, `users/${response.user.uid}`);

    completarRegistro(docuRef, { correo: email, rol: "customer" });
  };

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };
  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
        userRole,
        userName,
        userLastName,
        userFotoPerfil,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
