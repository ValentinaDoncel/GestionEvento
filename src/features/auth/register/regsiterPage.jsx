import { useState } from "react"
import "./registerPage.css"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefono: 0,
    password: "",
    confirmPassword: "",
    role: 0,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden")
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        setLoading(false)
        return
      }

      try {
        const res = await fetch('https://localhost:7267/api/Usuarios');
        if (res.ok) {
            const data = await res.json();

            if (!data || data.length === 0) {
                console.log("La lista de usuarios está vacía");
            } else {
                if (data.find((u) => u.email === formData.email)) {
                setError("Este correo ya está registrado")
                setLoading(false)
                return
              }
            }

        } else {
            console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }


      const newUser = {
        email: formData.email,
        nombre: formData.name,
        telefono: formData.telefono,
        contraseña: formData.password,
        idRol: Number(formData.role),
        //createdAt: new Date().toISOString(),
      }
      console.log("Datos enviados:", newUser);


      const response = await fetch("https://localhost:7267/api/Usuarios ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado:", data);
        alert("Usuario guardado correctamente");
        navigate("/")
      } else {
        alert("Error al guardar el usuario");
      }
      
    } catch (err) {
      setError("Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1 className="title">Crear cuenta</h1>
          <p className="description">Regístrate como asistente</p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}

          <div className="field">
            <label htmlFor="name" className="label">Nombre completo</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="email" className="label">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="telefono" className="label">Telefono</label>
            <input
              id="telefono"
              name="telefono"
              type="number"
              placeholder="3000000000"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword" className="label">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="field">
              <label htmlFor="role" className="label">Rol</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input roleBox"
                required
              >
                <option value="">Selecciona un rol</option>
                <option value="2">Organizador</option>
                <option value="3">Asistente</option>
              </select>
          </div>


          <button type="submit" className="button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>

          <p className="footer">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="link">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
