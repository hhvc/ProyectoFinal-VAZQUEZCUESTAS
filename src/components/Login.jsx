import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const Login = ({ registro }) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrando, setRegistrando] = useState(registro);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const functAutenticacion = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      if (registrando) {
        await auth.register(email, password);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/perfil");
        }, 2000);
      } else {
        await auth.login(email, password);
      }
    } catch (error) {
      // Manejar errores específicos de Firebase Auth
      if (error.code === "auth/weak-password") {
        alert("La contraseña es débil. Debe tener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        alert("El formato del correo electrónico es inválido.");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("El correo o la contraseña son incorrectos.");
      } else {
        alert(
          "Error al intentar autenticarse. Por favor, inténtelo de nuevo más tarde."
        );
      }
    }
  };

  const toggleRegistro = () => {
    setRegistrando(!registrando);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <form onSubmit={functAutenticacion}>
                <h3 className="title">{registrando ? "Registro" : "Login"}</h3>
                <input
                  type="text"
                  placeholder="Ingresar email"
                  className="cajatexto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Ingresar contraseña"
                  className="cajatexto"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btnform form-control">
                  {registrando ? "Registrate" : "Inicia Sesión"}
                </button>
              </form>
              <h4 className="texto">
                {registrando
                  ? "Si ya tienes cuenta"
                  : "Si no tienes cuenta, haz clic en:"}{" "}
                <button className="btnswitch" onClick={toggleRegistro}>
                  {registrando ? "Inicia Sesión" : "Registrate"}
                </button>
              </h4>
            </div>
          </div>
        </div>
      </div>
      {showSuccessAlert && (
        <Alert
          message="¡Datos del usuario guardados con éxito!"
          type="success"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import Alert from "./Alert";

// const Login = ({ registro }) => {
//   const auth = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registrando, setRegistrando] = useState(registro);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

//   const functAutenticacion = async (e) => {
//     e.preventDefault();

//     if (password.length < 8) {
//       alert("La contraseña debe tener al menos 8 caracteres");
//       return;
//     }

//     try {
//       if (registrando) {
//         await auth.register(email, password);
//         setShowSuccessAlert(true);
//         setTimeout(() => {
//           setShowSuccessAlert(false);
//           history.push("/perfil");
//         }, 2000);
//       } else {
//         await auth.login(email, password);
//       }
//     } catch (error) {
//       // Manejar errores específicos de Firebase Auth
//       if (error.code === "auth/weak-password") {
//         alert("La contraseña es débil. Debe tener al menos 6 caracteres.");
//       } else if (error.code === "auth/invalid-email") {
//         alert("El formato del correo electrónico es inválido.");
//       } else if (
//         error.code === "auth/user-not-found" ||
//         error.code === "auth/wrong-password"
//       ) {
//         alert("El correo o la contraseña son incorrectos.");
//       } else {
//         alert(
//           "Error al intentar autenticarse. Por favor, inténtelo de nuevo más tarde."
//         );
//       }
//     }
//   };

//   const toggleRegistro = () => {
//     setRegistrando(!registrando);
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-4">
//           <div className="padre">
//             <div className="card card-body shadow">
//               <form onSubmit={functAutenticacion}>
//                 <h3 className="title">{registrando ? "Registro" : "Login"}</h3>
//                 <input
//                   type="text"
//                   placeholder="Ingresar email"
//                   className="cajatexto"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Ingresar contraseña"
//                   className="cajatexto"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button type="submit" className="btnform form-control">
//                   {registrando ? "Registrate" : "Inicia Sesión"}
//                 </button>
//               </form>
//               <h4 className="texto">
//                 {registrando
//                   ? "Si ya tienes cuenta"
//                   : "Si no tienes cuenta, haz clic en:"}{" "}
//                 <button className="btnswitch" onClick={toggleRegistro}>
//                   {registrando ? "Inicia Sesión" : "Registrate"}
//                 </button>
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showSuccessAlert && (
//         <Alert
//           message="¡Datos del usuario guardados con éxito!"
//           type="success"
//           onClose={() => setShowSuccessAlert(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Login;
