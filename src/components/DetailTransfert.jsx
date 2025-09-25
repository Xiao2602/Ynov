import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailTransfert.css";
import Ynov from "../img/Ynov.png";

const transferredDocs = [
  { id: 1, name: "Dossier-Admission-Emma", date: "01/09/2025", student: "Emma Dupont", year: "2025-2026", status: "Transféré", statusType: "success", docType: "Dossier", condition: "Envoyé", extension: "PDF" },
  { id: 2, name: "Contrat-Stage-Léo", date: "28/08/2025", student: "Léo Martin", year: "2024-2025", status: "En attente", statusType: "pending", docType: "Contrat", condition: "En attente", extension: "DOCX" },
  { id: 3, name: "Attestation-Claire", date: "20/08/2025", student: "Claire Bernard", year: "2024-2025", status: "Refusé", statusType: "rejected", docType: "Attestation", condition: "Traité", extension: "PDF", reason: "Signature manquante" },
];

const DetailTransfert = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showGenererMenu, setShowGenererMenu] = useState(false);
  const documentsMenuRef = useRef(null);
  const genererMenuRef = useRef(null);

  // État pour édition
  const [editing, setEditing] = useState(false);
  const [editedDoc, setEditedDoc] = useState({});

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(`/${path}`);
    setShowDocumentsMenu(false);
    setShowGenererMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) &&
        (genererMenuRef.current && !genererMenuRef.current.contains(event.target))
      ) {
        setShowDocumentsMenu(false);
        setShowGenererMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const doc = transferredDocs.find((d) => d.id === parseInt(id));
  if (!doc) return <p>Document introuvable</p>;

  const handleEdit = () => {
    setEditing(true);
    setEditedDoc({ ...doc });
  };

  const handleSave = () => {
    alert(`✏️ Le document "${editedDoc.name}" a été mis à jour.`);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedDoc({});
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`⚠️ Voulez-vous vraiment supprimer le document "${doc.name}" ?`);
    if (confirmDelete) {
      alert(`🗑️ Le document "${doc.name}" a été supprimé.`);
      navigate("/documents-transferts"); // retour à la liste des transferts
    }
  };

  const handleDownload = () => {
    // Simulation d’un fichier à télécharger
    const content = `Nom du document: ${doc.name}\nÉtudiant: ${doc.student}\nType: ${doc.docType}\nAnnée: ${doc.year}\nDate: ${doc.date}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.name}.${doc.extension.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

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
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("recherche")}>Dernières recherches</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("documents-dispo")}>Documents disponibles</button>
              </div>
            )}
          </div>

          {/* Menu Générer un document */}
          <div style={{ position: "relative" }} ref={genererMenuRef}>
            <button className="nav-button" onClick={() => setShowGenererMenu(!showGenererMenu)}>
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenererMenu ? "" : ""}</span>
            </button>
            {showGenererMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-stage")}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-etude")}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/attestation")}>Attestation</button>
              </div>
            )}
          </div>

          <button className="nav-button" onClick={() => navigate("/profil")}>Profil</button>
          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard">Détails du document transféré</h1>

          <div className="detail-panel">
            <div className="detail-info">
              <p><strong>Nom du document:</strong> {editing ? <input value={editedDoc.name} onChange={(e) => setEditedDoc({ ...editedDoc, name: e.target.value })} /> : doc.name}</p>
              <p><strong>Étudiant/e:</strong> {editing ? <input value={editedDoc.student} onChange={(e) => setEditedDoc({ ...editedDoc, student: e.target.value })} /> : doc.student}</p>
              <p><strong>Date de transfert:</strong> {doc.date}</p>
              <p><strong>Année scolaire:</strong> {doc.year}</p>
              <p><strong>Type:</strong> {doc.docType}</p>
              <p><strong>Extension:</strong> {doc.extension}</p>
            </div>

            <div className="detail-preview">
              <div className="preview-header">
                {editing ? (
                  <>
                    {/* Enregistrer */}
                    <button title="Enregistrer" style={{ cursor: "pointer", marginRight: 8, background: "none", border: "none", padding: 0 }} onClick={() => handleSave(doc.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
                        <path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                      </svg>
                    </button>
                    {/* Annuler */}
                    <button title="Annuler" style={{ cursor: "pointer", marginRight: 8, background: "none", border: "none", padding: 0 }} onClick={handleCancel}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Editer */}
                    <span title="Editer" className="icon" style={{ cursor: "pointer", marginRight: 8 }} onClick={handleEdit}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                      </svg>
                    </span>
                    {/* Télécharger */}
                    <span title="Télécharger" className="icon" style={{ cursor: "pointer", marginRight: 8 }} onClick={handleDownload}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 17V3"/>
                        <path d="m6 11 6 6 6-6"/>
                        <path d="M19 21H5"/>
                      </svg>
                    </span>
                    {/* Supprimer */}
                    <span title="Supprimer" className="icon" style={{ cursor: "pointer", marginRight: 8 }} onClick={handleDelete}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        <path d="M3 6h18"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </span>
                  </>
                )}
              </div>
              <div className="preview-body">
                <div className="preview-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg> Aperçu du document {doc.extension}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailTransfert;
