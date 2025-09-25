import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Demandes.css";
import Ynov from "../img/Ynov.png";

const Demandes = () => {
  const navigate = useNavigate();

  const [demandes, setDemandes] = useState([
    { id: 1, date: "18/08/2025 10:00", personne: "Laz Livith Désiré", message: "Laz Livith Désiré demande son bulletin de bachelor.", type: "Bulletin", lu: false },
    { id: 2, date: "18/08/2025 13:00", personne: "Walid Mouahiddi", message: "Walid Mouahiddi demande la réédition de son badge étudiant.", type: "Convention", lu: false },
    { id: 3, date: "18/08/2025 14:00", personne: "Amine Fatih", message: "Amine Fatih demande son bulletin de bachelor.", type: "Bulletin", lu: false },
    { id: 4, date: "19/08/2025 09:30", personne: "Chaimaa Mellouk", message: "Chaimaa Mellouk demande une attestation de scolarité.", type: "Attestation", lu: false },
    { id: 5, date: "19/08/2025 11:45", personne: "Laila Lamsaski", message: "Laila Lamsaski demande un relevé de notes du semestre 2.", type: "Relevé de notes", lu: false },
    { id: 6, date: "21/08/2025 10:10", personne: "Sam Essoh", message: "Sam Essoh demande un certificat de scolarité.", type: "Certificat", lu: false },
    { id: 7, date: "20/08/2025 15:20", personne: "Nabel Abdel Ali", message: "Nabil Abdel Ali demande la réédition de son badge étudiant.", type: "Convention", lu: false },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const notificationsMenuRef = useRef();
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const documentsMenuRef = useRef();
  const [showGenererMenu, setShowGenererMenu] = useState(false);
  const genererMenuRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const types = ["Tous", ...Array.from(new Set(demandes.map(d => d.type))).sort()];

  const toggleSelection = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDemandes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDemandes.map(d => d.id));
    }
  };

  const markSelected = (etat) => {
    if (selectedIds.length === 0) {
      setModalMessage("Veuillez sélectionner au moins une demande !");
      setIsConfirmation(false);
      setShowModal(true);
      return;
    }
    const confirmMsg = etat
      ? "Voulez-vous vraiment marquer ces demandes comme lues ?"
      : "Voulez-vous vraiment marquer ces demandes comme non lues ?";
      
    setModalMessage(confirmMsg);
    setIsConfirmation(true);
    setConfirmAction(() => () => {
      setDemandes(prev =>
        prev.map(d => (selectedIds.includes(d.id) ? { ...d, lu: etat } : d))
      );
      setSelectedIds([]);
      setShowModal(false);
    });
    setShowModal(true);
  };

  const filteredDemandes = filter === "Tous" ? demandes : demandes.filter(d => d.type === filter);

  const handleLogout = () => navigate("/login");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target)) {
        setShowNotificationsMenu(false);
      }
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (genererMenuRef.current && !genererMenuRef.current.contains(event.target)) {
        setShowGenererMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (section) => {
    switch (section) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "documents-dispo":
        navigate("/documents-dispo");
        break;
      case "documents-transferts":
        navigate("/documents-transferts");
        break;
      case "dernieres-recherches":
        navigate("/recherche");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "generer":
        navigate("/generer");
        break;
      case "profil":
        navigate("/profil");
        break;
      case "alertes":
        navigate("/notifications/alertes");
        break;
      default:
        navigate("/dashboard");
    }
    setShowDocumentsMenu(false);
    setShowNotificationsMenu(false);
    setShowGenererMenu(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>
        <nav className="navigation">
          <button className="nav-button" onClick={() => handleNavigation("dashboard")}>Accueil</button>

          {/* Menu Notifications */}
          <div style={{ position: "relative" }} ref={notificationsMenuRef}>
            <button
              className="nav-button active"
              onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
            >
              Notifications <span>{showNotificationsMenu ? "" : ""}</span>
            </button>
            {showNotificationsMenu && (
              <div className="floating-menu">
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("alertes")}
                >
                  Alertes
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => navigate("/notifications/demandes")}
                >
                  Demandes
                </button>
              </div>
            )}
          </div>

          {/* Menu Documents */}
          <div style={{ position: "relative" }} ref={documentsMenuRef}>
            <button className="nav-button" onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}>
              Documents <span>{showDocumentsMenu ? "" : ""}</span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("documents-dispo")}>Documents disponibles</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("documents-transferts")}>Documents transférés</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate("/recherche")}>Dernières recherches</button>
              </div>
            )}
          </div>

          {/* Menu Générer */}
          <div style={{ position: 'relative' }} ref={genererMenuRef}>
            <button
              className="nav-button"
              onClick={() => setShowGenererMenu(!showGenererMenu)}
            >
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenererMenu ? "" : ""}</span>
            </button>
            {showGenererMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/convention-stage')}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/attestation')}>Attestation</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/convention-etude')}>Convention d'étude</button>
              </div>
            )}
          </div>

          <button className="nav-button" onClick={() => handleNavigation("profil")}>Profil</button>
          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard"> Demandes </h1>

          {/* Filtres */}
          <div className="filters">
            {types.map(t => {
              const count = t === "Tous"
                ? demandes.filter(d => !d.lu).length
                : demandes.filter(d => d.type === t && !d.lu).length;
              return (
                <button
                  key={t}
                  className={`filter-btn ${filter === t ? "active" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t} ({count})
                </button>
              );
            })}
          </div>

          {/* Légende */}
          <div className="legend">
            <span className="legend-lu">Lu</span>
            <span className="legend-non-lu">Non lu</span>
          </div>

          {/* Boutons d'action */}
          <div className="action-buttons">
            <button className="btn-lu" onClick={() => markSelected(true)}>Marquer comme lu</button>
            <button className="btn-lu" onClick={() => markSelected(false)}>Marquer comme non lu</button>
          </div>

          {/* Tableau demandes */}
          <div className="notifications-table-wrapper">
            <table className="notifications-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredDemandes.length && filteredDemandes.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Date/heure</th>
                  <th>Personne</th>
                  <th>Message</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.map(d => (
                  <tr
                    key={d.id}
                    className={d.lu ? "lu" : "non-lu"}
                    onClick={() => navigate(`/demandes/${d.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(d.id)}
                        onClick={(e) => e.stopPropagation()} // Bloque la propagation du clic
                        onChange={() => toggleSelection(d.id)}
                      />
                    </td>
                    <td>{d.date}</td>
                    <td>{d.personne}</td>
                    <td>{d.message}</td>
                    <td>{d.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal pour les messages et confirmations */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="floating-modal">
            <h2 className="modal-title">Notification</h2>
            <p className="modal-message">{modalMessage}</p>
            <div className="modal-actions">
              {isConfirmation && (
                <>
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
                  <button className="btn-confirm" onClick={confirmAction}>Confirmer</button>
                </>
              )}
              {!isConfirmation && (
                <button className="btn-confirm" onClick={() => setShowModal(false)}>OK</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demandes;
