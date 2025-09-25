import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profil.css";
import Ynov from "../img/Ynov.png";

const Profil = () => {
  const navigate = useNavigate();
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  // ✅ Nouvel état pour le menu Générer
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);

  // Nouvel état pour le modal d'édition
  const [showEditModal, setShowEditModal] = useState(false);

  // États pour la gestion des emails
  const [emails, setEmails] = useState(["alexarawles@gmail.com"]);
  const [newEmail, setNewEmail] = useState("");
  const [isAddingEmail, setIsAddingEmail] = useState(false);

  const documentsMenuRef = useRef(null);
  const profilMenuRef = useRef(null);
  // ✅ Nouvelle référence pour le menu Générer
  const generateMenuRef = useRef(null);

  // Navigation centralisée
  const handleNavigation = (page) => {
    switch (page) {
      case "accueil":
        navigate("/dashboard");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "documents-dispo":
        navigate("/documents-dispo");
        break;
      case "documents-transferts":
        navigate("/documents-transferts");
        break;
      case "derniere-recherches":
        navigate("/recherche");
        break;
      case "generer/convention-etude":
        navigate("/generer/convention-etude");
        break;
      case "generer/convention-stage":
        navigate("/generer/convention-stage");
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
        break;
    }
    // Fermer tous les menus
    setShowDocumentsMenu(false);
    setShowProfilMenu(false);
    setShowGenerateMenu(false); // ✅ Fermer le menu Générer
  };

  // Déconnexion
  const handleLogout = () => {
    navigate("/login");
  };

  // Fonction d'ajout de mail
  const handleAddEmail = () => {
    if (newEmail.trim() !== "" && !emails.includes(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail("");
      setIsAddingEmail(false);
    }
  };

  // Fermer menus quand clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
      // ✅ Vérification du nouveau menu Générer
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) {
        setShowGenerateMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="gestion-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>

        <nav className="navigation">
          <button className="nav-button" onClick={() => handleNavigation("accueil")}>
            Accueil
          </button>

          <button className="nav-button" onClick={() => handleNavigation("notifications")}>
            Notifications
          </button>

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
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation("derniere-recherches")}
                >
                  Dernières recherches
                </button>
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
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-etude")}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-stage")}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/attestation")}>Attestation</button>
              </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: "relative" }} ref={profilMenuRef}>
            <button
              className="nav-button active"
              onClick={() => setShowProfilMenu(!showProfilMenu)}
            >
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
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
        <h1>Mon Profil</h1>

        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-avatar">
                <img src="https://placehold.co/80x80/4a90e2/ffffff?text=AR" alt="Alexa Rawles profile" />
              </div>
              <div className="profile-details">
                <h2>Alexa Rawles</h2>
                <p>{emails[0]}</p>
              </div>
            </div>
            {/* Bouton ouvre modal */}
            <button className="edit-button" onClick={() => setShowEditModal(true)}>
              Modifier
            </button>
          </div>

          {/* Formulaire affiché normalement */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Nom</label>
                <input type="text" placeholder="Rawles" />
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input type="text" placeholder="Alexa" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Genre</label>
                <select>
                  <option>Femme</option>
                  <option>Homme</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pays</label>
                <select>
                  <option>France</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Âge</label>
                <input type="number" placeholder="25" />
              </div>
              <div className="form-group">
                <label>Région</label>
                <input type="text" placeholder="Île-de-France" />
              </div>
            </div>

            {/* Liste des emails */}
            <div className="email-section">
              <label>Adresses mail</label>
              <div className="email-display">
                {emails.map((email, index) => (
                  <span key={index} className="email-item">{email}</span>
                ))}
              </div>

              {/* Formulaire d'ajout d'email */}
              {isAddingEmail ? (
                <div className="add-email-form">
                  <input
                    type="email"
                    placeholder="Nouvelle adresse mail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button onClick={handleAddEmail}>Valider</button>
                  <button onClick={() => setIsAddingEmail(false)}>Annuler</button>
                </div>
              ) : (
                <button className="add-email-btn" onClick={() => setIsAddingEmail(true)}>
                  Ajouter une adresse mail
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDIT PROFIL */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier mon profil</h2>
            <input type="text" placeholder="Nom" defaultValue="Rawles" />
            <input type="text" placeholder="Prénom" defaultValue="Alexa" />
            <input type="email" placeholder="Adresse mail" defaultValue={emails[0]} />
            <input type="number" placeholder="Âge" defaultValue="25" />
            <input type="text" placeholder="Région" defaultValue="Île-de-France" />
            <select defaultValue="Femme">
              <option>Femme</option>
              <option>Homme</option>
              <option>Autre</option>
            </select>
            <select defaultValue="France">
              <option>France</option>
              <option>Belgique</option>
              <option>Suisse</option>
            </select>

            <div className="modal-actions">
              <button className="confirm-button" onClick={() => setShowEditModal(false)}>Enregistrer</button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;