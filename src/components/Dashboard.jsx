import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import DISPO from '../img/Dispo.png';
import TRANSFERT from '../img/Transfert.png';
import RECHERCHE from '../img/Recherche.png';
import NOTIF from '../img/Notif.png';
import Ynov from '../img/Ynov.png';


const Dashboard = () => {
  const navigate = useNavigate();
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showProfilMenu, setShowProfilMenu] = useState(false);
  const [showGenererMenu, setShowGenererMenu] = useState(false);
  const documentsMenuRef = useRef();
  const profilMenuRef = useRef();
  const genererMenuRef = useRef();

  const handleNavigation = (section) => {
    switch (section) {
      case 'documents-dispo':
        navigate('/documents-dispo');
        break;
      case 'recherche':
        navigate('/recherche');
        break;
      case 'documents-transferts':
        navigate('/documents-transferts');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'generer/convention-stage':
        navigate('/generer/convention-stage');
        break;
      case 'generer/attestation':
        navigate('/generer/attestation');
        break;
      case 'generer/certificat':
        navigate('/generer/certificat');
        break;
      case 'generer/convention-etude':
        navigate('/generer/convention-etude');
        break;
      case 'profil':
        navigate('/profil');
        break;
      case 'gestion-profils':
        navigate('/gestion-profils');
        break;
      default:
        navigate('/dashboard');
    }
    setShowDocumentsMenu(false);
    setShowProfilMenu(false);
    setShowGenererMenu(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Fermer les menus si clic à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (documentsMenuRef.current && !documentsMenuRef.current.contains(event.target)) {
        setShowDocumentsMenu(false);
      }
      if (profilMenuRef.current && !profilMenuRef.current.contains(event.target)) {
        setShowProfilMenu(false);
      }
      if (genererMenuRef.current && !genererMenuRef.current.contains(event.target)) {
        setShowGenererMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
            className="nav-button active" 
            onClick={() => handleNavigation('accueil')}
          >
            Accueil
          </button>

          <button 
            className="nav-button" 
            onClick={() => handleNavigation('notifications')}
          >
            Notifications
          </button>

          <div style={{ position: 'relative' }} ref={documentsMenuRef}>
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
                  onClick={() => handleNavigation('documents-dispo')}
                >
                  Documents disponibles
                </button>
                <button 
                  className="nav-button floating-menu-item" 
                  onClick={() => handleNavigation('documents-transferts')}
                >
                  Documents transférés
                </button>
                <button className="nav-button floating-menu-item" onClick={() => handleNavigation('recherche')}>
                  Dernières recherches
                </button>
              </div>
            )}
            
          </div>
          <div style={{ position: 'relative' }} ref={genererMenuRef}>
            <button 
              className="nav-button" 
              onClick={() => setShowGenererMenu(!showGenererMenu)}
            >
              Générer un document <span style={{ marginLeft: "5px" }}>{showGenererMenu ? "" : ""}</span>
            </button>
            {showGenererMenu && (
                <div className="floating-menu">
                    <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/convention-etude')}>Convention d'étude</button>
                    <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/attestation')}>Attestation</button>
                    <button className="nav-button floating-menu-item" onClick={() => handleNavigation('generer/convention-stage')}>Convention de stage</button>
                </div>
            )}
          </div>

          {/* Menu Profil */}
          <div style={{ position: 'relative' }} ref={profilMenuRef}>
            <button
              className="nav-button"
              onClick={() => setShowProfilMenu(!showProfilMenu)}
              style={{ fontWeight: showProfilMenu ? 'bold' : 'normal' }}
            >
              Profil <span style={{ marginLeft: "5px" }}>{showProfilMenu ? "" : ""}</span>
            </button>
            {showProfilMenu && (
              <div className="floating-menu">
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation('profil')}
                >
                  Mon Profil
                </button>
                <button
                  className="nav-button floating-menu-item"
                  onClick={() => handleNavigation('gestion-profils')}
                >
                  Gestion des profils
                </button>
              </div>
            )}
          </div>

          <button 
            className="nav-button logout" 
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="welcome-title-dashboard"> Dashboard </h1>
          <div className="cards-grid">
            <div className="dashboard-card" onClick={() => navigate('/documents-dispo')} style={{cursor: 'pointer'}}>
              <div className="card-icon">
                <img src={DISPO} alt="Documents disponibles" className="icon-image" />
              </div>
              <h3 className="card-title">Documents disponibles</h3>
            </div>
            <div className="dashboard-card" onClick={() => navigate('/documents-transferts')} style={{cursor: 'pointer'}}>
              <div className="card-icon">
                <img src={TRANSFERT} alt="Documents transférés" className="icon-image" />
              </div>
              <h3 className="card-title">Documents transférés</h3>
            </div>
            <div className="dashboard-card" onClick={() => navigate('/recherche')} style={{cursor: 'pointer'}}>
              <div className="card-icon">
                <img src={RECHERCHE} alt="Dernières recherches effectuées" className="icon-image" />
              </div>
              <h3 className="card-title">Dernières recherches effectuées </h3>
            </div>
            <div className="dashboard-card" onClick={() => navigate('/notifications')} style={{cursor: 'pointer'}}>
              <div className="card-icon">
                <img src={NOTIF} alt="Alertes et demandes" className="icon-image" />
              </div>
              <h3 className="card-title">Alertes et demandes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;