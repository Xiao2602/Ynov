import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents_Dispo.css";
import Ynov from "../img/Ynov.png";

const initialTransferredDocs = [
  { id: 1, name: "Dossier-Admission-Emma", date: "01/09/2025", student: "Emma Dupont", year: "2025-2026", docType: "Dossier", condition: "Envoyé", extension: "PDF" },
  { id: 2, name: "Contrat-Stage-Léo", date: "28/08/2025", student: "Léo Martin", year: "2024-2025", docType: "Contrat", condition: "En attente", extension: "DOCX" },
  { id: 3, name: "Attestation-Claire", date: "20/08/2025", student: "Claire Bernard", year: "2024-2025", docType: "Attestation", condition: "Traité", extension: "PDF", reason: "Signature manquante" },
];

const DocumentsTransferes = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(initialTransferredDocs);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  // Nouveaux états et référence pour le menu "Générer un document"
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const generateMenuRef = useRef();

  const documentsMenuRef = useRef();
  const profilMenuRef = useRef();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDownload = (doc) => {
    alert(`📂 Le document "${doc.name}" est en cours de téléchargement...`);
  };

  const handleDelete = (doc) => {
    const confirmDelete = window.confirm(`⚠️ Supprimer le document transféré "${doc.name}" ?`);
    if (confirmDelete) {
      setDocuments(documents.filter((d) => d.id !== doc.id));
      alert(`🗑️ Document "${doc.name}" supprimé.`);
    }
  };

  // --- Gestion des clics en dehors des menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
      // Nouvelle vérification pour le menu "Générer un document"
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) {
        setShowGenerateMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Filtres et recherche
  let filteredDocs = filter ? documents.filter((doc) => doc.docType === filter) : documents;
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filteredDocs = filteredDocs.filter(
      (doc) =>
        doc.name.toLowerCase().includes(query) ||
        doc.student.toLowerCase().includes(query) ||
        doc.year.toLowerCase().includes(query) ||
        doc.docType.toLowerCase().includes(query)
    );
  }

  // --- Tri
  if (sortOption) {
    filteredDocs = [...filteredDocs].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "student-asc":
          return a.student.localeCompare(b.student);
        case "student-desc":
          return b.student.localeCompare(a.student);
        case "date-newest":
          return new Date(b.date.split("/").reverse().join("-")) - new Date(a.date.split("/").reverse().join("-"));
        case "date-oldest":
          return new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"));
        default:
          return 0;
      }
    });
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>
        <nav className="navigation">
          <button className="nav-button" onClick={() => navigate("/dashboard")}>Accueil</button>
          <button className="nav-button" onClick={() => navigate("/notifications")}>Notifications</button>
          
          {/* Menu Documents */}
          <div style={{ position: "relative" }} ref={documentsMenuRef}>
            <button className="nav-button active" onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}>
              Documents <span style={{ marginLeft: "5px" }}>{showDocumentsMenu ? "" : ""}</span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => navigate("/recherche")}>Dernières recherches</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate("/documents-dispo")}>Documents disponibles</button>
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
                <button className="nav-button floating-menu-item" onClick={() => { navigate("/generer/convention-stage"); setShowGenerateMenu(false); }}>Convention</button>
                <button className="nav-button floating-menu-item" onClick={() => { navigate("/generer/certificat"); setShowGenerateMenu(false); }}>Certificat</button>
                <button className="nav-button floating-menu-item" onClick={() => { navigate("/generer/attestation"); setShowGenerateMenu(false); }}>Attestation</button>
              </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: "relative" }} ref={profilMenuRef}>
            <button className="nav-button" onClick={() => setShowProfilMenu(!showProfilMenu)}>
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => navigate("/profil")}>Mon profil</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate("/gestion-profils")}>Gestion des profils</button>
              </div>
            )}
          </div>
          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard">Documents transférés</h1>

          <div className="documents-panel">
            <div className="documents-panel-header">
              <div className="documents-search-row">
                {showSortMenu && (
                  <div className="sort-menu">
                    <button onClick={() => setSortOption("name-asc")}>Nom du document (A → Z)</button>
                    <button onClick={() => setSortOption("name-desc")}>Nom du document (Z → A)</button>
                    <button onClick={() => setSortOption("student-asc")}>Nom étudiant (A → Z)</button>
                    <button onClick={() => setSortOption("student-desc")}>Nom étudiant (Z → A)</button>
                    <button onClick={() => setSortOption("date-newest")}>Date (plus récent)</button>
                    <button onClick={() => setSortOption("date-oldest")}>Date (plus ancien)</button>
                  </div>
                )}
              </div>

              <div className="sort-menu-container">
                <span className="filter-icon" style={{ cursor: "pointer" }} onClick={() => setShowSortMenu(!showSortMenu)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                </span>
                <input
                  className="documents-search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="documents-filters">
                <button className={`filter-btn ${filter === "" ? "active" : ""}`} onClick={() => setFilter("")}>Tous</button>
                <button className={`filter-btn ${filter === "Dossier" ? "active" : ""}`} onClick={() => setFilter("Dossier")}>Dossier</button>
                <button className={`filter-btn ${filter === "Contrat" ? "active" : ""}`} onClick={() => setFilter("Contrat")}>Contrat</button>
                <button className={`filter-btn ${filter === "Attestation" ? "active" : ""}`} onClick={() => setFilter("Attestation")}>Attestation</button>
              </div>
            </div>

            {/* Table */}
            <div className="documents-table-container">
              {filteredDocs.length > 0 ? (
                <table className="documents-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom du fichier</th>
                      <th>Date</th>
                      <th>Étudiant/e</th>
                      <th>Année scolaire</th>
                      <th>Type de documents</th>
                      <th>Extension</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc, idx) => (
                      <tr key={doc.id}>
                        <td>{idx + 1}</td>
                        <td>{doc.name}</td>
                        <td>{doc.date}</td>
                        <td>{doc.student}</td>
                        <td>{doc.year}</td>
                        <td>{doc.docType}</td>
                        <td>{doc.extension}</td>
                        <td>
                            <span title="Voir" style={{cursor: 'pointer', marginRight: 8}} onClick={() => navigate(`/document-transfert/${doc.id}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                </span>
                            <span title="Télécharger" style={{cursor: 'pointer', marginRight: 8}} onClick={() => handleDownload(doc)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
                                </span>
                            <span title="Supprimer" style={{cursor: 'pointer'}} onClick={() => handleDelete(doc)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ marginTop: "15px", textAlign: "center" }}>Aucun document trouvé.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTransferes;