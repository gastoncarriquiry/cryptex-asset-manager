import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import "./Login.css";
import { logo } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { defineUser } from "../../features/userSlice";
import { Orbit } from "@uiball/loaders";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(true);
  const user = useRef(null);
  const pass = useRef(null);

  document.title = "Iniciar Sesión | Cryptex";

  useEffect(() => {
    let currentUser = localStorage.getItem("id");
    if (currentUser !== null) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const submitLogin = () => {
    let username = user.current.value;
    let password = pass.current.value;

    if (username === "" || password === "")
      return toast.warn("Ingrese todos los datos por favor.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    setIsLoading(true);

    fetch("https://crypto.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((r) => {
        setIsLoading(false);
        if (r.codigo === 200) {
          navigate("/dashboard");
          localStorage.setItem("id", r.id);
          localStorage.setItem("key", r.apiKey);
          toast.success("¡Inicio de sesión exitoso!", {
            position: "bottom-right",
            autoClose: 5000,
            toastId: 1,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(defineUser(username));
        } else {
          toast.error("¡Oh no! Algo ha salido mal... Inténtelo de nuevo más tarde.", {
            position: "bottom-right",
            autoClose: 5000,
            toastId: 3,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(console.error);
  };

  const handleKeyUp = (e) => {
    if (user.current.value !== "" && pass.current.value !== "") {
      setIsComplete(true);
      if (e.key === "Enter") submitLogin();
    } else {
      setIsComplete(false);
    }
  };

  return (
    <section className="login-section">
      <div className="form">
        <div className={`overlay ${isLoading ? "" : "hidden"}`}>
          <Orbit size={40} speed={1.5} color="#5d81c8" />
        </div>
        <div className="intro">
          <h1>
            <img src={logo} alt="Cryptex Logo" /> Cryptex
          </h1>
          <h2>Iniciar sesión</h2>
        </div>
        <div className="fieldset">
          <div className="input">
            <label htmlFor="user">Usuario</label>
            <input
              onKeyUp={handleKeyUp}
              placeholder="Ingrese su nombre de usuario"
              type="text"
              id="user"
              ref={user}
            />
          </div>
          <div className="input">
            <label htmlFor="pass">Contraseña</label>
            <input
              onKeyUp={handleKeyUp}
              placeholder="Ingrese su contraseña"
              type="password"
              id="pass"
              ref={pass}
            />
          </div>
          <div className="actions">
            <Button
              disabled={!isComplete}
              children="Ingresar"
              onClick={submitLogin}
              type="primary"
            />
            <p>
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
