import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import RegisterForm from "../events/RegistrarEvento"
import EventCard from "../events/eventCard"

export default function DashboardPage2() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null)



  useEffect(() => {

  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    navigate("/")
  }

  const handleCloseModal = () => {
    setShowModal(false)

    const updateEvents = JSON.parse(localStorage.getItem("eventos")) || []
    setEvents(updateEvents)
  }


  if (!userData) return null

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)



  return (
    <div className="page">
      <header className="header">
        <div className="headerContent">
          <div className="headerLeft">
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
            <h1 className="headerTitle">Tu Boleta UPC</h1>
          </div>

          <div className="headerRight">
            <button onClick={handleLogout} className="logoutButton">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="profileCard">
          <div className="profileHeader">
            <div className="avatar">{getInitials(userData.name)}</div>
            <div className="profileInfo">
              <h2 className="profileName">{userData.name}</h2>
              <p className="profileEmail">{userData.email}</p>
              <span className="badge">{userData.role}</span>
            </div>
          </div>
        </div>

        <div>
          {userData.role === "Admin" && (
          <div className="registerContainer">
            <button
              className="registerButton"
              onClick={() => setShowModal(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Registrar Evento
            </button>

            <RegisterForm isOpen={showModal} onClose={() => setShowModal(false)} />
          </div>
          )}
        </div>

        <div className="eventsCard">
          <div className="eventsHeader">
            <h2 className="eventsTitle">Eventos Disponibles</h2>
            <p className="eventsDescription">Eventos y boletas adquiridas</p>
          </div>

          <div className="eventsContent">
            {events.length === 0 ? (
              <div className="emptyState">
                <p className="emptyText">No tienes eventos registrados aún</p>
                <p className="emptySubtext">
                  Tus boletas adquiridas aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="eventsList">
                {events.map((event) => (
                  <div key={event.id} className="eventItem" onClick={() => setSelectedEvent(event)}>
                    <div className="eventInfo">
                      <h3 className="eventName">{event.nombre}</h3>
                      <div className="eventDetail">
                        <span>
                          {new Date(event.fecha).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="eventDetail">
                        <span>{event.ubicacion}</span>
                      </div>
                    </div>
                    <span className="ticketBadge">
                      {event.precio ? `Desde $${event.precio}` : "Gratis"}
                    </span>
                  </div>
                ))}
              </div>
              
            )}
          </div> 
          {selectedEvent && (<EventCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />)}

        </div>
      </main>
    </div>
  )
}
