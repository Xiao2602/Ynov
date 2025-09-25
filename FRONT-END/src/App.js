import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Composants
import ReponseMail from './components/ReponseMail';
import Dashboard from "./components/Dashboard";
import NotificationsAlertes from "./components/Notifications-alertes"; 
import Alertes from "./components/Alertes";
import DocumentsDispo from "./components/Documents_Dispo";
import Recherche from "./components/Recherche";
import DocumentsTransferts from "./components/Documents_Transferts";
import DetailTransfert from "./components/DetailTransfert";
import Login from "./components/Login";
import DetailPage from "./components/Detail";
import Demandes from "./components/Demandes";
import AttestationForm from "./components/Attestation";
import DemandesMails from "./components/Demandes-Mails";
import Generer from "./components/Generer_Convention";
import GestionUtilisateurs from "./components/Gestion-Utilisateurs";
import InfoUtilisateurs from "./components/Info-Utilisateurs";
import Profil from "./components/Profil"
import ConventionEtudeForm from "./components/Convention_Etude"

function App() {
  return (
    <Router>
      <Routes>
        {/* Page par défaut */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Notifications */}
        <Route path="/notifications" element={<NotificationsAlertes />} />
        <Route path="/notifications/alertes" element={<Alertes />} />   
        <Route path="/notifications/demandes" element={<Demandes />} />

        {/* Demandes */}
        <Route path="/demandes" element={<Demandes />} />
        <Route path="/demandes/:id" element={<DemandesMails />} />
        <Route path="/demandes-mail/:id" element={<DemandesMails />} />
        <Route path="/reponse-mail/:id" element={<ReponseMail />} />

        {/* Documents */}
        <Route path="/documents-dispo" element={<DocumentsDispo />} />
        <Route path="/documents-dispo/:id" element={<DetailPage />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/documents-transferts" element={<DocumentsTransferts />} />
        <Route path="/document-transfert/:id" element={<DetailTransfert />} />

        {/* Générer */}
        <Route path="/generer/convention-stage" element={<Generer />} />
        <Route path="/generer/attestation" element={<AttestationForm />} />
        <Route path="/generer/convention-etude" element={<ConventionEtudeForm />} />

        <Route path="/profil" element={<Profil/>} />
        <Route path="/utilisateur/:id" element={<InfoUtilisateurs />} />
        <Route path="/gestion-profils" element={<GestionUtilisateurs />} />  

        {/* Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
