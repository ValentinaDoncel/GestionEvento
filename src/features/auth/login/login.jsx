import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./login.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();

  

  try {
    const res = await fetch("https://localhost:7267/api/Usuarios");

    if (!res.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const usuarios = await res.json();
    console.log("todos los usuarios", usuarios)

   
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.contraseña === password
    );

    console.log(email)
    console.log(password)

    
    if (usuarioEncontrado) {
      alert("Inicio de sesión exitoso ");
      setLoading(true)
      navigate(`/mis-eventos/${usuarioEncontrado.id}`)
    } else {
      alert("Correo o contraseña incorrectos ");
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el servidor");
  }
 };

  

  
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
              <path d="M3 7l9-4 9 4" />
              <path d="M12 3v18" />
            </svg>
          </div>
          <h1 className="title">Bienvenido</h1>
          <p className="description">Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}

          <div className="field">
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <p className="footer">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
