import { Orbit } from "@uiball/loaders";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { defineUser } from "../../features/userSlice";
import { logo } from "../../utils/utils";
import Button from "../Button/Button";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const user = useRef(null);
  const pass = useRef(null);
  const department = useRef(null);
  const city = useRef(null);

  document.title = "Crear Cuenta | Cryptex";

  useEffect(() => {
    fetch("https://crypto.develotion.com/departamentos.php")
      .then((r) => r.json())
      .then((r) => {
        setDepartments(r.departamentos);
      })
      .catch(console.error);

    let currentUser = localStorage.getItem("id");
    if (currentUser !== null) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const updateCityList = () => {
    let departmentCode = department.current.value;
    fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${departmentCode}`)
      .then((r) => r.json())
      .then((r) => {
        setCities(r.ciudades);
      })
      .catch(console.error);
  };

  const handleClick = () => {
    let username = user.current.value;
    let password = pass.current.value;
    let departmentV = department.current.value;
    let cityV = city.current.value;

    if (username === "" || password === "" || !departmentV || !cityV)
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

    fetch("https://crypto.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
        idDepartamento: departmentV,
        idCiudad: cityV,
      }),
    })
      .then((response) => response.json())
      .then((r) => {
        setIsLoading(false);
        if (r.codigo === 200) {
          navigate("/dashboard");
          localStorage.setItem("id", r.id);
          localStorage.setItem("key", r.apiKey);
          toast.success("??Registro exitoso!", {
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
          toast.error("??Oh no! Algo ha salido mal... Int??ntelo de nuevo m??s tarde.", {
            position: "bottom-right",
            autoClose: 5000,
            toastId: 1,
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

  const handleEmptyDepartment = () => {
    if (department.current.value === "") {
      return toast.warn("Primero seleccione un departamento por favor.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className="register-section">
      <div className="form">
        <div className={`overlay ${isLoading ? "" : "hidden"}`}>
          <Orbit size={40} speed={1.5} color="#5d81c8" />
        </div>
        <div className="intro">
          <h1>
            <img src={logo} alt="Cryptex Logo" /> Cryptex
          </h1>
          <h2>Crear una cuenta</h2>
        </div>
        <div className="fieldset">
          <div className="input">
            <label htmlFor="user">Usuario</label>
            <input placeholder="Ingrese su nombre de usuario" type="text" id="user" ref={user} />
          </div>
          <div className="input">
            <label htmlFor="pass">Contrase??a</label>
            <input placeholder="Ingrese su contrase??a" type="password" id="pass" ref={pass} />
          </div>
          <div className="input">
            <label htmlFor="department">Departamento</label>
            <select id="department" ref={department} onChange={updateCityList}>
              <option defaultValue="" value="" disabled selected>
                --Seleccione un departamento--
              </option>
              {departments
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="city">Ciudad</label>
            <select id="city" ref={city} onClick={handleEmptyDepartment}>
              <option defaultValue="" value="" disabled selected>
                --Seleccione una ciudad--
              </option>
              {cities
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className="actions">
            <Button children="Ingresar" onClick={handleClick} type="primary" />
            <p>
              ??Ya tienes una cuenta? <Link to="/login">Inicia sesi??n</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
