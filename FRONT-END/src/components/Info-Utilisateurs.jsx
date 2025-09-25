import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Info-Utilisateurs.css";
import Ynov from "../img/Ynov.png";

const fakeUsers = [
  { id: 1, nom: "OUTALEB", prenom: "Manel", email: "manel.outaleb@ynov.com", role: "Étudiant", promotion: "Master I", specialite: "Data & IA", statut: "Actif" },
  { id: 2, nom: "Souiri", prenom: "Frederic", email: "frederic.souiri@ynov.com", role: "Parents", promotion: "", specialite: "", statut: "Inactif" },
  { id: 3, nom: "Bernard", prenom: "Emma", email: "emma.bernard@ynov.com", role: "Admin", promotion: "", specialite: "", statut: "Actif" },
  { id: 4, nom: "Martin", prenom: "Lucas", email: "martin.lucas@ynov.com", role: "Admin", promotion: "", specialite: "", statut: "Actif" },
  { id: 5, nom: "Essoh", prenom: "Alice", email: "alice.essoh@ynov.com", role: "Parents", promotion: "", specialite: "", statut: "Inactif" },
  { id: 6, nom: "Livith-Desiré", prenom: "Laz", email: "laz.livith-desire@ynov.com", role: "Étudiant", promotion: "Bachelor III", specialite: "Cybersécurité", statut: "Actif" }
];

const InfoUtilisateurs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // États des menus flottants
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);

  // Références pour les clics en dehors
  const documentsMenuRef = useRef(null);
  const generateMenuRef = useRef(null);
  const profilMenuRef = useRef(null);

  // Simuler la récupération de l'utilisateur
  const user = fakeUsers.find(u => u.id === parseInt(id));

  // Gestion de la navigation
  const handleNavigation = (path) => {
    // Naviguer et fermer tous les menus pour la clarté
    navigate(`/${path}`);
    setShowDocumentsMenu(false);
    setShowGenerateMenu(false);
    setShowProfilMenu(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Fermer les menus si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) {
        setShowGenerateMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="info-container">
        <div className="sidebar">
          <div className="logo-section-dashboard">
            <img src={Ynov} alt="Ynov Campus" className="logo-image" />
          </div>
        </div>
        <div className="main-content">
          <h2>Utilisateur introuvable ❌</h2>
          <button className="back-button" onClick={() => navigate("/gestion-profils")}>⬅ Retour à la gestion des profils</button>
        </div>
      </div>
    );
  }

  return (
    <div className="info-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>
        <nav className="navigation">
          <button className="nav-button" onClick={() => handleNavigation("dashboard")}>Accueil</button>
          <button className="nav-button" onClick={() => handleNavigation("notifications")}>Notifications</button>

          {/* Menu Documents */}
          <div style={{ position: "relative" }} ref={documentsMenuRef}>
            <button 
              className="nav-button"
              onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}
            >
              Documents <span style={{ marginLeft: "5px" }}>{showDocumentsMenu ? "" : ""}</span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("documents-dispo")}>Documents disponibles</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("documents-transferts")}>Documents transférés</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("recherche")}>Dernières recherches</button>
              </div>
            )}
          </div>
          
          {/* Menu Générer un document (NOUVEAU) */}
          <div style={{ position: "relative" }} ref={generateMenuRef}>
            <button 
              className="nav-button"
              onClick={() => setShowGenerateMenu(!showGenerateMenu)}
            >
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenerateMenu ? "" : ""}</span>
            </button>
            {showGenerateMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/covention-stage")}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-etude")}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/attestation")}>Attestation</button>
              </div>
            )}
          </div>

          {/* Menu Profil (EXISTANT MAIS AMÉLIORÉ) */}
          {/* Note : J'ai entouré le bouton Profil d'un div avec ref/état pour le rendre flottant comme dans GestionUtilisateurs.js */}
          <div style={{ position: "relative" }} ref={profilMenuRef}>
            <button 
              className="nav-button active"
              onClick={() => setShowProfilMenu(!showProfilMenu)}
            >
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("profil")}>Mon Profil</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("gestion-profils")}>Gestion des profils</button>
              </div>
            )}
          </div>

          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="main-content-info">
        <div className="user-card">
          <h2>{user.prenom} {user.nom}</h2>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
          <p>
            <strong>Promotion :</strong> {user.promotion ? user.promotion : "Non applicable"}
          </p>
          <p>
            <strong>Spécialité :</strong> {user.specialite ? user.specialite : "Non applicable"}
          </p>
          <p>
            <strong>Statut :</strong>
            <span className={`statut ${user.statut === "Actif" ? "actif" : "inactif"}`}>
              {user.statut}
            </span>
          </p>
        </div>
        <button className="back-button" onClick={() => navigate("/gestion-profils")}>⬅ Retour à la gestion des profils</button>
      </div>
    </div>
  );
};

export default InfoUtilisateurs;