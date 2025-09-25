import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Gestion-Utilisateurs.css";
import Ynov from '../img/Ynov.png';

const GestionUtilisateurs = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, nom: "OUTALEB", prenom: "Manel", email: "manel.outaleb@ynov.com", role: "Étudiant", promotion: "Master I", specialite: "Data & IA" },
    { id: 2, nom: "Souiri", prenom: "Frederic", email: "frederic.souiri@ynov.com", role: "Parents", promotion: "", specialite: "" },
    { id: 3, nom: "Bernard", prenom: "Emma", email: "emma.bernard@ynov.com", role: "Admin", promotion: "", specialite: "" },
    { id: 4, nom: "Martin", prenom: "Lucas", email: "martin.lucas@ynov.com", role: "Admin", promotion: "", specialite: "" },
    { id: 5, nom: "Essoh", prenom: "Alice", email: "alice.essoh@ynov.com", role: "Parents", promotion: "", specialite: "" },
    { id: 6, nom: "Livith-Desiré", prenom: "Laz", email: "laz.livith-desire@ynov.com", role: "Étudiant", promotion: "Bachelor III", specialite: "Cybersécurité" }
  ]);

  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  // Nouveaux états pour le menu "Générer un document"
  const [showGenerateMenu, setShowGenerateMenu] = useState(false); 
  
  const [filterNom, setFilterNom] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterPromotion, setFilterPromotion] = useState("");
  const [filterSpecialite, setFilterSpecialite] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ nom: "", prenom: "", email: "", role: "", promotion: "", specialite: "" });

  const documentsMenuRef = useRef(null);
  const profilMenuRef = useRef(null);
  // Nouvelle référence pour le menu "Générer un document"
  const generateMenuRef = useRef(null); 

  // Navigation
  const handleNavigation = (page) => {
    switch (page) {
      case "accueil": navigate("/dashboard"); break;
      case "notifications": navigate("/notifications"); break;
      case "documents-dispo": navigate("/documents-dispo"); break;
      case "documents-transferts": navigate("/documents-transferts"); break;
      case "recherche": navigate("/recherche"); break;
      case "generer": navigate("/generer"); break; // Routes spécifiques
      case "generer/certificat": navigate("/generer/certificat"); break;
      case "generer/attestation": navigate("/generer/attestation"); break;
      case "profil": navigate("/profil"); break;
      case "gestion-profils": navigate("/gestion-profils"); break;
      default: break;
    }
    setShowDocumentsMenu(false);
    setShowProfilMenu(false);
    setShowGenerateMenu(false); // Fermer le menu après navigation
  };

  const handleLogout = () => navigate("/login");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) setShowDocumentsMenu(false);
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) setShowProfilMenu(false);
      // Nouvelle vérification pour le menu "Générer un document"
      if (generateMenuRef.current && !generateMenuRef.current.contains(event.target)) setShowGenerateMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const supprimerUtilisateur = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${userToDelete.nom} ${userToDelete.prenom} ?`)) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Normalisation du rôle
  const normalizeRole = (role) => {
    let r = role.toLowerCase();
    if (["etudiant", "étudiant", "etudiante", "étudiante"].includes(r)) return "Étudiant";
    if (r === "parents" || r === "parent") return "Parents";
    if (r === "admin" || r === "administrateur") return "Admin";
    return role;
  };

  // Normalisation de la promotion (ajusté pour les différentes années)
  const normalizePromotion = (promo) => {
    if (!promo) return "";
    let p = promo.toLowerCase();
    if (p.includes("bachelor 1")) return "Bachelor I";
    if (p.includes("bachelor 2")) return "Bachelor II";
    if (p.includes("bachelor 3")) return "Bachelor III";
    if (p.includes("master 1")) return "Master I";
    if (p.includes("master 2")) return "Master II";
    return promo;
  };

  // Normalisation de la spécialité
  const normalizeSpecialite = (spec) => {
    if (!spec) return "";
    let s = spec.toLowerCase();
    if (s.includes("data") && s.includes("ia")) return "Data & IA";
    if (s.includes("cyber")) return "Cybersécurité";
    if (s.includes("dev")) return "Développement";
    if (s.includes("market")) return "Marketing Digital";
    if (s.includes("3d")) return "Animation 3D";
    return spec;
  };

  // Ajouter ou Modifier utilisateur
  const handleSaveUser = () => {
    if (!userForm.nom || !userForm.prenom || !userForm.email || !userForm.role) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }
    if (userForm.role === "Étudiant" && (!userForm.promotion || !userForm.specialite)) {
      alert("Veuillez spécifier la promotion et la spécialité pour un étudiant.");
      return;
    }

    const newUser = {
      ...userForm,
      role: normalizeRole(userForm.role),
      promotion: normalizePromotion(userForm.promotion),
      specialite: normalizeSpecialite(userForm.specialite)
    };

    if (editingUser) {
      // Modification
      setUsers(users.map((u) => u.id === editingUser.id ? { ...u, ...newUser } : u));
    } else {
      // Ajout
      setUsers([...users, { id: Date.now(), ...newUser }]);
    }

    setUserForm({ nom: "", prenom: "", email: "", role: "", promotion: "", specialite: "" });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ nom: user.nom, prenom: user.prenom, email: user.email, role: user.role, promotion: user.promotion, specialite: user.specialite });
    setShowForm(true);
  };

  const filteredUsers = users.filter((user) => {
    const nomMatch = user.nom.toLowerCase().includes(filterNom.toLowerCase());

    const userRoleNormalized = normalizeRole(user.role);
    const filterRoleNormalized = normalizeRole(filterRole);
    const roleMatch = filterRoleNormalized === "" || userRoleNormalized === filterRoleNormalized;

    const userPromotionNormalized = normalizePromotion(user.promotion);
    const filterPromotionNormalized = normalizePromotion(filterPromotion);
    const promotionMatch = filterPromotionNormalized === "" || userPromotionNormalized === filterPromotionNormalized;

    const userSpecialiteNormalized = normalizeSpecialite(user.specialite);
    const filterSpecialiteNormalized = normalizeSpecialite(filterSpecialite);
    const specialiteMatch = filterSpecialiteNormalized === "" || userSpecialiteNormalized === filterSpecialiteNormalized;

    return nomMatch && roleMatch && promotionMatch && specialiteMatch;
  });

  return (
    <div className="gestion-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section-dashboard">
          <img src={Ynov} alt="Ynov Campus" className="logo-image" />
        </div>

        <nav className="navigation">
          <button className="nav-button" onClick={() => handleNavigation("accueil")}>Accueil</button>
          <button className="nav-button" onClick={() => handleNavigation("notifications")}>Notifications</button>

          {/* Menu Documents */}
          <div style={{ position: "relative" }} ref={documentsMenuRef}>
            <button className="nav-button" onClick={() => setShowDocumentsMenu(!showDocumentsMenu)}>
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
            <button className="nav-button" onClick={() => setShowGenerateMenu(!showGenerateMenu)}>
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenerateMenu ? "" : ""}</span>
            </button>
            {showGenerateMenu && (
              <div className="floating-menu">
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/convention-stage")}>Convention de stage</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/covention-etude")}>Convention d'étude</button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation("generer/attestation")}>Attestation</button>
              </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: "relative" }} ref={profilMenuRef}>
            <button className="nav-button active" onClick={() => setShowProfilMenu(!showProfilMenu)}>
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "▲" : "▼"}</span>
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

      {/* Main content */}
      <div className="main-content">
        <h1>Gestion des Utilisateurs</h1>

        <button className="add-button" onClick={() => { setShowForm(true); setEditingUser(null); setUserForm({ nom: "", prenom: "", email: "", role: "", promotion: "", specialite: "" }); }}>+ Ajouter un utilisateur</button>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editingUser ? "Modifier un utilisateur" : "Ajouter un utilisateur"}</h2>
              <input
                type="text"
                placeholder="Nom"
                value={userForm.nom}
                onChange={(e) => setUserForm({ ...userForm, nom: e.target.value })}
              />
              <input
                type="text"
                placeholder="Prénom"
                value={userForm.prenom}
                onChange={(e) => setUserForm({ ...userForm, prenom: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="">Sélectionner un rôle</option>
                <option value="Étudiant">Étudiant</option>
                <option value="Parents">Parents</option>
                <option value="Admin">Admin</option>
              </select>
              {userForm.role === "Étudiant" && (
                <>
                  <select
                    value={userForm.promotion}
                    onChange={(e) => setUserForm({ ...userForm, promotion: e.target.value })}
                  >
                    <option value="">Sélectionner une promotion</option>
                    <option value="Bachelor I">Bachelor 1</option>
                    <option value="Bachelor II">Bachelor 2</option>
                    <option value="Bachelor III">Bachelor 3</option>
                    <option value="Master I">Master 1</option>
                    <option value="Master II">Master 2</option>
                  </select>
                  <select
                    value={userForm.specialite}
                    onChange={(e) => setUserForm({ ...userForm, specialite: e.target.value })}
                  >
                    <option value="">Sélectionner une spécialité</option>
                    <option value="Data & IA">Data & IA</option>
                    <option value="Cybersécurité">Cybersécurité</option>
                    <option value="Développement">Développement</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="Animation 3D">Animation 3D</option>
                  </select>
                </>
              )}

              <div className="modal-actions">
                <button className="confirm-button" onClick={handleSaveUser}>{editingUser ? "Modifier" : "Ajouter"}</button>
                <button className="cancel-button" onClick={() => { setShowForm(false); setEditingUser(null); }}>Annuler</button>
              </div>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="filters">
          <input
            type="text"
            placeholder="Filtrer par nom..."
            value={filterNom}
            onChange={(e) => setFilterNom(e.target.value)}
          />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">Tous les rôles</option>
            <option value="Étudiant">Étudiant/e</option>
            <option value="Parents">Parents</option>
            <option value="Admin">Admin</option>
          </select>
          <select value={filterPromotion} onChange={(e) => setFilterPromotion(e.target.value)}>
            <option value="">Toutes les promotions</option>
            <option value="Bachelor I">Bachelor I</option>
            <option value="Bachelor II">Bachelor II</option>
            <option value="Bachelor III">Bachelor III</option>
            <option value="Master I">Master I</option>
            <option value="Master II">Master II</option>
          </select>
          <select value={filterSpecialite} onChange={(e) => setFilterSpecialite(e.target.value)}>
            <option value="">Toutes les spécialités</option>
            <option value="Data & IA">Data & IA</option>
            <option value="Cybersécurité">Cybersécurité</option>
            <option value="Développement">Développement</option>
            <option value="Marketing Digital">Marketing Digital</option>
            <option value="Animation 3D">Animation 3D</option>
          </select>
        </div>

        {/* Tableau des utilisateurs */}
        <table className="users-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Promotion</th>
              <th>Spécialité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.promotion}</td>
                <td>{user.specialite}</td>
                <td>
                  <button className="button-info" onClick={() => navigate(`/utilisateur/${user.id}`)}>Consulter</button>
                  <button className="edit-button" onClick={() => handleEditUser(user)}>Modifier</button>
                  <button className="delete-button" onClick={() => supprimerUtilisateur(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUtilisateurs;