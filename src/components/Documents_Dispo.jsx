import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ynov from "../img/Ynov.png";

const initialDocuments = [
  { id: 1, name: "Certificat-Manel", date: "13/08/2025", student: "Manel OUTALEB", year: "2025-2026", status: "Validé", statusType: "success", docType: "Certificat", condition: "Traité", extension: "PDF", file: null },
  { id: 2, name: "Bulletin-Bachelor-Daphnée", date: "14/08/2025", student: "Daphnée Bouyedi", year: "2024-2025", status: "En cours", statusType: "pending", docType: "Bulletin", condition: "En cours", extension: "PDF", file: null },
  { id: 3, name: "Attestation-Ilyann", date: "14/08/2025", student: "Ilyann Souiri", year: "2024-2025", status: "Rejeté", statusType: "rejected", docType: "Attestation", condition: "Traité", extension: "PDF", reason: "Illisible + Incomplet", file: null },
  { id: 4, name: "Bulletin-Bachelor-Bachir", date: "26/08/2025", student: "Bachirou Mohamadou", year: "2024-2025", status: "En cours", statusType: "pending", docType: "Bulletin", condition: "En cours", extension: "PDF", file: null },
  { id: 5, name: "Attestation-Amine", date: "26/08/2025", student: "Amine Fatih", year: "2025-2026", status: "Validé", statusType: "success", docType: "Attestation", condition: "Traité", extension: "PDF", file: null }
];

const DocumentsDispo = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(initialDocuments);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    student: '',
    year: '',
    docType: ''
  });
  const [modal, setModal] = useState({
    show: false,
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const documentsMenuRef = useRef();
  const profilMenuRef = useRef();
  const generateMenuRef = useRef();
  const fileInputRef = useRef(null);

  const handleShowModal = (message, onConfirm = null, onCancel = null) => {
    setModal({ show: true, message, onConfirm, onCancel });
  };

  const handleCloseModal = () => {
    setModal({ show: false, message: '', onConfirm: null, onCancel: null });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ file: null, student: '', year: '', docType: '' });
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    const { file, student, year, docType } = formData;

    if (!file || !student || !year || !docType) {
      handleShowModal("Veuillez remplir tous les champs et sélectionner un fichier.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const baseName = file.name.split('.')[0];
    const extension = file.name.split('.').pop().toUpperCase();

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);

        const newDoc = {
          id: documents.length + 1,
          name: baseName,
          date: new Date().toLocaleDateString("fr-FR"),
          student: student,
          year: year,
          status: "En cours",
          statusType: "pending",
          docType: docType,
          condition: "En cours",
          extension: extension,
          file: URL.createObjectURL(file)
        };
        setDocuments([...documents, newDoc]);
        alert(`✅ Le document "${file.name}" a été ajouté pour l'étudiant "${student}".`);
        handleCloseForm();
      }
    }, 300);
  };

  const handleDownload = (doc) => {
    if (doc.file) {
      const a = document.createElement("a");
      a.href = doc.file;
      a.download = doc.name + "." + doc.extension.toLowerCase();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      handleShowModal(`⚠️ Aucun fichier disponible pour le téléchargement.`);
    }
  };

  const handleDelete = (doc) => {
    handleShowModal(
      `⚠️ Voulez-vous vraiment supprimer le document "${doc.name}" ?`,
      () => {
        setDocuments(documents.filter(d => d.id !== doc.id));
        handleShowModal(`🗑️ Le document "${doc.name}" a été supprimé.`);
      },
      handleCloseModal
    );
  };

  const handleSaveEdit = (id) => {
    setDocuments(documents.map(doc => (doc.id === id ? editedValues : doc)));
    setEditingDoc(null);
    handleShowModal("✏️ Modifications enregistrées.");
  };

  const handleEdit = (doc) => {
    setEditingDoc(doc.id);
    setEditedValues({ ...doc });
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
    setEditedValues({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) {
        setShowGenerateMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let filteredDocuments = filter ? documents.filter(doc => doc.docType === filter) : documents;
  if (searchQuery.trim() !== "") {
    filteredDocuments = filteredDocuments.filter(doc => {
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        doc.student.toLowerCase().includes(query) ||
        doc.year.toLowerCase().includes(query) ||
        doc.docType.toLowerCase().includes(query)
      );
    });
  }
  if (sortOption) {
    filteredDocuments = [...filteredDocuments].sort((a, b) => {
      switch (sortOption) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "student-asc": return a.student.localeCompare(b.student);
        case "student-desc": return b.student.localeCompare(a.student);
        case "date-newest": return new Date(b.date.split("/").reverse().join("-")) - new Date(a.date.split("/").reverse().join("-"));
        case "date-oldest": return new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"));
        case "year-asc": return a.year.localeCompare(b.year);
        case "year-desc": return b.year.localeCompare(a.year);
        default: return 0;
      }
    });
  }

  return (
    <div className="dashboard-container">
      {showForm && (
        <div className="form-modal-overlay">
          <form className="form-container" onSubmit={handleAddDocument}>
            <h3>Ajouter un document</h3>
            <div className="form-group">
                <label htmlFor="student">Nom de l'étudiant</label>
                <input type="text" id="student" name="student" placeholder="Nom de l'étudiant" value={formData.student} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="file">Fichier</label>
                <input type="file" id="file" name="file" onChange={handleFormChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="year">Année scolaire</label>
                <input type="text" id="year" name="year" placeholder="Ex: 2025-2026" value={formData.year} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="docType">Type de document</label>
                <select id="docType" name="docType" value={formData.docType} onChange={handleFormChange} required>
                    <option value="">Sélectionner un type</option>
                    <option value="Certificat">Certificat</option>
                    <option value="Bulletin">Bulletin</option>
                    <option value="Attestation">Attestation</option>
                    <option value="Relevé de notes">Relevé de notes</option>
                    <option value="Convention">Convention de stage</option>
                </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="add-btn">Ajouter</button>
              <button type="button" className="cancel-btn" onClick={handleCloseForm}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {modal.show && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <p>{modal.message}</p>
            </div>
            <div className="modal-actions">
              {modal.onConfirm ? (
                <>
                  <button onClick={() => { modal.onConfirm(); handleCloseModal(); }} className="modal-confirm">Oui</button>
                  <button onClick={() => { modal.onCancel(); }} className="modal-cancel">Non</button>
                </>
              ) : (
                <button onClick={handleCloseModal} className="modal-confirm">OK</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>
        <nav className="navigation">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>Accueil</button>
          <button className="nav-button" onClick={() => navigate('/notifications')}>Notifications</button>
          <div style={{ position: 'relative' }} ref={documentsMenuRef}>
            <button className="nav-button active" onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}>
              Documents <span style={{ marginLeft: "5px" }}>{showDocumentsMenu ? "" : ""}</span>
            </button>
            {showDocumentsMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => navigate('/recherche')}>Dernières recherches</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate('/documents-transferts')}>Documents transférés</button>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }} ref={generateMenuRef}>
            <button className="nav-button" onClick={() => setShowGenerateMenu(!showGenerateMenu)}>
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenerateMenu ? "" : ""}</span>
            </button>
            {showGenerateMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => navigate('/generer/convention-etude')}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate('/generer/convention-stage')}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate('/generer/attestation')}>Attestation</button>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }} ref={profilMenuRef}>
            <button className="nav-button" onClick={() => setShowProfilMenu(!showProfilMenu)}>
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => navigate('/profil')}>Mon profil</button>
                <button className="nav-button floating-menu-item" onClick={() => navigate('/gestion-profils')}>Gestion des profils</button>
              </div>
            )}
          </div>
          <button className="nav-button logout" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard"> Documents disponibles </h1>
          <div className="documents-panel">
            <div className="documents-panel-header">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
              />
              <button className="add-document-btn" onClick={handleOpenForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ajouter un document
              </button>

              <div className="documents-search-row">
                {showSortMenu && (
                  <div className="sort-menu">
                    <button className={sortOption === "name-asc" ? "active" : ""} onClick={() => setSortOption("name-asc")}>Nom du document (A → Z)</button>
                    <button className={sortOption === "name-desc" ? "active" : ""} onClick={() => setSortOption("name-desc")}>Nom du document (Z → A)</button>
                    <button className={sortOption === "student-asc" ? "active" : ""} onClick={() => setSortOption("student-asc")}>Nom de l'élève (A → Z)</button>
                    <button className={sortOption === "student-desc" ? "active" : ""} onClick={() => setSortOption("student-desc")}>Nom de l'élève (Z → A)</button>
                    <button className={sortOption === "date-newest" ? "active" : ""} onClick={() => setSortOption("date-newest")}>Date (plus récent)</button>
                    <button className={sortOption === "date-oldest" ? "active" : ""} onClick={() => setSortOption("date-oldest")}>Date (plus ancien)</button>
                    <button className={sortOption === "year-asc" ? "active" : ""} onClick={() => setSortOption("year-asc")}>Année scolaire (croissant)</button>
                    <button className={sortOption === "year-desc" ? "active" : ""} onClick={() => setSortOption("year-desc")}>Année scolaire (décroissant)</button>
                  </div>
                )}
              </div>

              <div className="sort-menu-container">
                <span className="filter-icon" style={{cursor: "pointer"}} onClick={() => setShowSortMenu(!showSortMenu)}>
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
                <button className={`filter-btn ${filter === "Certificat" ? "active" : ""}`} onClick={() => setFilter("Certificat")}>Certificat</button>
                <button className={`filter-btn ${filter === "Bulletin" ? "active" : ""}`} onClick={() => setFilter("Bulletin")}>Bulletin</button>
                <button className={`filter-btn ${filter === "Attestation" ? "active" : ""}`} onClick={() => setFilter("Attestation")}>Attestation</button>
                <button className={`filter-btn ${filter === "Convention" ? "active" : ""}`} onClick={() => setFilter("Convention")}>Convention</button>
                <button className={`filter-btn ${filter === "Relevé de notes" ? "active" : ""}`} onClick={() => setFilter("Relevé de notes")}>Relevé de notes</button>
              </div>
            </div>

            {uploading && (
              <div style={{ marginTop: "10px", width: "100%" }}>
                <p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12L12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 16V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Importation en cours... {uploadProgress}%
                </p>
                <div style={{ height: "8px", background: "#eee", borderRadius: "4px" }}>
                  <div style={{ width: `${uploadProgress}%`, background: "#4ECDC4", height: "8px", borderRadius: "4px" }}></div>
                </div>
              </div>
            )}

            <div className="documents-table-container">
              {filteredDocuments.length > 0 ? (
                <table className="documents-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom du fichier</th>
                      <th>Date de réception</th>
                      <th>Etudiant/e</th>
                      <th>Année scolaire</th>
                      <th>Statut</th>
                      <th>Type de document</th>
                      <th>Condition</th>
                      <th>Extension</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc, idx) => (
                      <tr key={doc.id}>
                        <td>{idx + 1}</td>
                        <td>
                          {editingDoc === doc.id ? (
                            <input type="text" value={editedValues.name} onChange={(e) => setEditedValues({...editedValues, name: e.target.value})} />
                          ) : (
                            doc.name
                          )}
                        </td>
                        <td>{doc.date}</td>
                        <td>
                          {editingDoc === doc.id ? (
                            <input type="text" value={editedValues.student} onChange={(e) => setEditedValues({...editedValues, student: e.target.value})} />
                          ) : (
                            doc.student
                          )}
                        </td>
                        <td>{doc.year}</td>
                        <td><span className={`status-label ${doc.statusType}`}>{doc.status}</span></td>
                        <td>{doc.docType}</td>
                        <td>{doc.condition}</td>
                        <td>{doc.extension}</td>
                        <td className="documents-actions">
                          {editingDoc === doc.id ? (
                            <>
                              <button
                                title="Enregistrer"
                                style={{ cursor: 'pointer', marginRight: 8, background: 'none', border: 'none', padding: 0 }}
                                onClick={() => handleSaveEdit(doc.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                                  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
                                  <path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                                </svg>
                              </button>
                              <button
                                title="Annuler"
                                style={{ cursor: 'pointer', marginRight: 8, background: 'none', border: 'none', padding: 0 }}
                                onClick={handleCancelEdit}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 6 6 18"/>
                                  <path d="m6 6 12 12"/>
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <span title="Voir" style={{cursor: 'pointer', marginRight: 8}} onClick={() => navigate(`/documents-dispo/${doc.id}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                              </span>
                              <span title="Télécharger" style={{cursor: 'pointer', marginRight: 8}} onClick={() => handleDownload(doc)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
                              </span>
                              <span title="Editer" style={{cursor: 'pointer', marginRight: 8}} onClick={() => handleEdit(doc)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                              </span>
                              <span title="Supprimer" style={{cursor: 'pointer'}} onClick={() => handleDelete(doc)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ marginTop: "15px", textAlign: "center" }}>
                  Aucun document trouvé pour cette recherche.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsDispo;
