import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications-alertes.css";
import ALERTES from '../img/Alertes.png';
import DEMANDES from '../img/Demandes.png';
import Ynov from '../img/Ynov.png';

export default function NotificationsAlertes({ handleLogout }) {
  const navigate = useNavigate();

  // États pour les menus déroulants
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  // ✅ Nouvel état pour le menu "Générer un document"
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);

  // Références pour les clics en dehors
  const notificationsMenuRef = useRef(null);
  const documentsMenuRef = useRef(null);
  const profilMenuRef = useRef(null);
  // ✅ Nouvelle référence
  const generateMenuRef = useRef(null);

  // Fonction de navigation générale avec fermeture des menus
  const handleNavigation = (path) => {
    navigate(path);
    setShowNotificationsMenu(false);
    setShowDocumentsMenu(false);
    setShowProfilMenu(false);
    setShowGenerateMenu(false);
  };

  // Fermer les menus si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target)) {
        setShowNotificationsMenu(false);
      }
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
      // ✅ Vérification du nouveau menu
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) {
        setShowGenerateMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>

        <nav className="navigation">
          <button className="nav-button" onClick={() => handleNavigation('/dashboard')}>Accueil</button>

          {/* Menu Notifications (Bouton actif pour cette page) */}
          <div style={{ position: 'relative' }} ref={notificationsMenuRef}>
            <button 
              className="nav-button active" 
              onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
            >
              Notifications 
            </button>
          </div>

          {/* Menu Documents */}
          <div style={{ position: 'relative' }} ref={documentsMenuRef}>
            <button 
              className="nav-button" 
              onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}
            >
              Documents <span style={{ marginLeft: "5px" }}>{showDocumentsMenu ? "" : ""}</span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/documents-dispo')}>Documents disponibles</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/documents-transferts')}>Documents transférés</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/recherche')}>Dernières recherches</button>
              </div>
            )}
          </div>
          
          {/* Menu Générer un document (NOUVEAU) */}
          <div style={{ position: "relative" }} ref={generateMenuRef}>
            <button className="nav-button" onClick={() => setShowGenerateMenu(!showGenerateMenu)}>
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenerateMenu ? "" : ""}</span>
            </button>
            {showGenerateMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/generer/convention-etude')}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/generer/convention-stage')}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/generer/attestation')}>Attestation</button>
              </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: 'relative' }} ref={profilMenuRef}>
            <button className="nav-button" onClick={() => setShowProfilMenu(!showProfilMenu)}>
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/profil')}>Mon profil</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('/gestion-profils')}>Gestion des profils</button>
              </div>
            )}
          </div>

          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard"> Alertes et demandes </h1>

          <div className="notifications-cards">
            {/* Carte Alertes */}
            <div 
              className="notification-card"
              onClick={() => navigate('/notifications/alertes')}
            >
              <img src={ALERTES} alt="Alertes" className="notification-img" />
              <p className="notification-title">Alertes</p>
            </div>

            {/* Carte Demandes */}
            <div 
              className="notification-card"
              onClick={() => navigate('/notifications/demandes')}
            >
              <img src={DEMANDES} alt="Demandes" className="notification-img" />
              <p className="notification-title">Demandes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}