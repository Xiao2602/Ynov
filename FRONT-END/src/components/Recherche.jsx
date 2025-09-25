import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Recherche.css";
import Ynov from "../img/Ynov.png";

const Recherche = () => {
  const navigate = useNavigate();
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showGenererMenu, setShowGenererMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);

  const documentsMenuRef = useRef();
  const genererMenuRef = useRef();
  const profilMenuRef = useRef();

  // 🔍 Historique des recherches
  const [historique, setHistorique] = useState([]);

  // Charger depuis localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("historique")) || [];
    setHistorique(saved);
  }, []);

  // Sauvegarde dans localStorage dès que l’historique change
  useEffect(() => {
    localStorage.setItem("historique", JSON.stringify(historique));
  }, [historique]);

  const handleNavigation = (section) => {
    switch (section) {
      case "documents-dispo":
        navigate("/documents-dispo");
        break;
      case "documents-transferts":
        navigate("/documents-transferts");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "generer/convention-stage":
        navigate("/generer/convention-stage");
        break;
      case "generer/convention-etude":
        navigate("/generer/convention-etude");
        break;
      case "generer/attestation":
        navigate("/generer/attestation");
        break;
      case "profil":
        navigate("/profil");
        break;
      case "gestion-profils":
        navigate("/gestion-profils");
        break;
      default:
        navigate("/dashboard");
    }
    setShowDocumentsMenu(false);
    setShowGenererMenu(false);
    setShowProfilMenu(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Supprimer une recherche spécifique
  const deleteRecherche = (index) => {
    setHistorique(historique.filter((_, i) => i !== index));
  };

  // Vider tout l’historique
  const clearHistorique = () => {
    setHistorique([]);
  };

  // Fermer les menus si clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        documentsMenuRef.current &&
        !documentsMenuRef.current.contains(event.target)
      ) {
        setShowDocumentsMenu(false);
      }
      if (
        genererMenuRef.current &&
        !genererMenuRef.current.contains(event.target)
      ) {
        setShowGenererMenu(false);
      }
      if (
        profilMenuRef.current &&
        !profilMenuRef.current.contains(event.target)
      ) {
        setShowProfilMenu(false);
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
          <button
            className="nav-button"
            onClick={() => handleNavigation("accueil")}
          >
            Accueil
          </button>

          <button
            className="nav-button"
            onClick={() => handleNavigation("notifications")}
          >
            Notifications
          </button>

          {/* Menu Documents */}
          <div style={{ position: "relative" }} ref={documentsMenuRef}>
            <button
              className="nav-button"
              onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}
            >
              Documents{" "}
              <span style={{ marginLeft: "5px" }}>
                {showDocumentsMenu ? "" : ""}
              </span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("documents-dispo")}
                >
                  Documents disponibles
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("documents-transferts")}
                >
                  Documents transférés
                </button>
              </div>
            )}
          </div>

          {/* Menu Générer */}
          <div style={{ position: "relative" }} ref={genererMenuRef}>
            <button
              className="nav-button"
              onClick={() => setShowGenererMenu(!showGenererMenu)}
            >
              Générer un document{" "}
              <span style={{ marginLeft: "5px" }}>
                {showGenererMenu ? "" : ""}
              </span>
            </button>
            {showGenererMenu && (
              <div className="floating-menu">
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("generer/convention-stage")}
                >
                  Convention de stage
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("generer/convention-etude")}
                >
                  Convention d’étude
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("generer/attestation")}
                >
                  Attestation
                </button>
              </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: "relative" }} ref={profilMenuRef}>
            <button
              className="nav-button"
              onClick={() => setShowProfilMenu(!showProfilMenu)}
            >
              Profil{" "}
              <span style={{ marginLeft: "5px" }}>
                {showProfilMenu ? "" : ""}
              </span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("profil")}
                >
                  Mon Profil
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("gestion-profils")}
                >
                  Gestion des profils
                </button>
              </div>
            )}
          </div>

          <button className="nav-button logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard">Historique des recherches</h1>

          {historique.length > 0 ? (
            <>
              <ul className="historique-list">
                {historique.map((rech, index) => (
                  <li key={index} className="historique-item">
                    <span>{rech}</span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteRecherche(index)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
              <button className="clear-btn" onClick={clearHistorique}>
                Vider l’historique
              </button>
            </>
          ) : (
            <p>Aucune recherche effectuée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recherche;
