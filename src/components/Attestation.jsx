import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ynov from "../img/Ynov.png";
import "./Attestation.css";
import jsPDF from 'jspdf';

// --- Informations fixes de l'établissement (à adapter) ---
const INFOS_ETABLISSEMENT = {
  directeur: "Mr. Amine ZNIBER",
  adresse: "8 Rue Ibnou Khatima - Quartier des Hôpitaux- Casablanca",
};

const INFOS_BANCAIRES = {
  iban: "MA64011780000020210000281555",
  rib: "011 780 0000 20 210 00 02815 55",
  codeGuichet: "78020",
  swift: "BMCEMA55",
};
// -----------------------------------------------------------

const AttestationForm = () => {
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    // Infos Étudiant
    nom: "",
    prenom: "",
    dateNaissance: "",
    // Infos Formation
    promotion: "",
    specialite: "",
    anneeScolaire: "",

    // Infos Paiement
    modalitePaiement: "",
    fraisPreinscription: "",
    fraisScolarite: "",
    totalPaye: "",
    modePaiement: "",
    date: new Date().toISOString().substring(0, 10),
  });

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Titre de l'attestation
    doc.setFontSize(22);
    doc.setTextColor(78, 205, 196); // #4ECDC4
    doc.text("Attestation de frais de scolarité", pageWidth / 2, yPos, { align: 'center' });
    yPos += 20;

    // Infos de l'établissement
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(INFOS_ETABLISSEMENT.directeur, margin, yPos);
    yPos += 6;
    doc.text(INFOS_ETABLISSEMENT.adresse, margin, yPos);
    yPos += 15;

    // Introduction
    doc.setFontSize(12);
    doc.text(`Je soussigné ${INFOS_ETABLISSEMENT.directeur}, directeur général d'IDG - YNOV CAMPUS, sise au ${INFOS_ETABLISSEMENT.adresse}, atteste par la présente que :`, margin, yPos, {
      maxWidth: pageWidth - 2 * margin
    });
    yPos += 20;

    // Informations de l'étudiant
    doc.setFontSize(12);
    doc.text(`Nom: ${formData.nom}`, margin, yPos);
    yPos += 10;
    doc.text(`Prénom: ${formData.prenom}`, margin, yPos);
    yPos += 10;
    doc.text(`Date de naissance: ${formData.dateNaissance}`, margin, yPos);
    yPos += 10;
    doc.text(`Promotion: ${formData.promotion}`, margin, yPos);
    yPos += 10;
    doc.text(`Spécialité: ${formData.specialite}`, margin, yPos);
    yPos += 10;
    doc.text(`Année scolaire: ${formData.anneeScolaire}`, margin, yPos);
    yPos += 20;

    // Informations de paiement
    doc.text("Détails du Paiement :", margin, yPos);
    yPos += 10;
    doc.text(`- Modalité de paiement: ${formData.modalitePaiement}`, margin + 5, yPos);
    yPos += 10;
    doc.text(`- Frais de préinscription: ${formData.fraisPreinscription} MAD`, margin + 5, yPos);
    yPos += 10;
    doc.text(`- Frais de scolarité: ${formData.fraisScolarite} MAD`, margin + 5, yPos);
    yPos += 10;
    doc.text(`- Total payé: ${formData.totalPaye} MAD`, margin + 5, yPos);
    yPos += 10;
    doc.text(`- Mode de paiement: ${formData.modePaiement}`, margin + 5, yPos);
    yPos += 10;
    doc.text(`- Fait le: ${formData.date}`, margin + 5, yPos);
    yPos += 20;

    // Informations bancaires et mention légale
    doc.setFontSize(10);
    doc.text("Informations bancaires de l'établissement :", margin, yPos);
    yPos += 5;
    doc.text(`RIB: ${INFOS_BANCAIRES.rib}`, margin, yPos);
    yPos += 5;
    doc.text(`IBAN: ${INFOS_BANCAIRES.iban}`, margin, yPos);
    yPos += 5;
    doc.text(`SWIFT: ${INFOS_BANCAIRES.swift}`, margin, yPos);
    yPos += 5;
    doc.text(`CODE GUICHET: ${INFOS_BANCAIRES.codeGuichet}`, margin, yPos);
    yPos += 10;
    doc.text("Cette attestation est délivrée à l'intéressé, à sa demande, pour servir et valoir ce que de droit.", margin, yPos, {
      maxWidth: pageWidth - 2 * margin
    });

    // Sauvegarde du document et navigation
    doc.save(`Attestation-${formData.nom}-${formData.prenom}.pdf`);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Génération et téléchargement du PDF
    generatePdf();
    
    // Redirection vers la page des documents générés après une courte pause
    setTimeout(() => {
        navigate("/documents-transferts");
    }, 1000); // Délai d'une seconde pour s'assurer que le téléchargement est lancé
  };

  return (
    <div className="main-content">
      <div className="content-wrapper">
        <div className="convention-header">
          <img src={Ynov} alt="Ynov Campus" className="logo-ynov" />
          <h1>Générer une attestation <br />de frais de scolarité</h1>
        </div>

        <form className="attestation-form" onSubmit={handleSubmit}>
          {/* ... (le reste de votre formulaire reste inchangé) ... */}
          <fieldset>
            <legend>Informations de l'Étudiant</legend>
            <div className="form-grid-attestation">
              <div className="form-group">
                <label>Nom :</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prénom :</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de naissance :</label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Informations de la Formation</legend>
            <div className="form-grid">
              <div className="form-group">
                <label>Promotion :</label>
                <select
                  name="promotion"
                  value={formData.promotion}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="B1">Bachelor 1</option>
                  <option value="B2">Bachelor 2</option>
                  <option value="B3">Bachelor 3</option>
                  <option value="M1">Mastère 1</option>
                  <option value="M2">Mastère 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Spécialité :</label>
                <select
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Data IA">Data IA</option>
                  <option value="Développement">Développement</option>
                  <option value="Cybersécurité">Cybersécurité</option>
                  <option value="Informatique">Informatique</option>
                </select>
              </div>
              <div className="form-group">
                <label>Année scolaire :</label>
                <input
                  type="text"
                  name="anneeScolaire"
                  value={formData.anneeScolaire}
                  onChange={handleChange}
                  placeholder="2025-2026"
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Détails du Paiement</legend>
            <div className="form-grid">
              <div className="form-group">
                <label>Modalité de paiement :</label>
                <select
                  name="modalitePaiement"
                  value={formData.modalitePaiement}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Trismestrielle">Trismestrielle</option>
                  <option value="Semestrielle">Semestrielle</option>
                  <option value="Un coup">Un coup (Annuel)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Frais de préinscription (MAD) :</label>
                <input
                  type="number"
                  name="fraisPreinscription"
                  value={formData.fraisPreinscription}
                  onChange={handleChange}
                  placeholder="Ex: 500"
                  required
                />
              </div>
              <div className="form-group">
                <label>Frais de scolarité (MAD) :</label>
                <input
                  type="number"
                  name="fraisScolarite"
                  value={formData.fraisScolarite}
                  onChange={handleChange}
                  placeholder="Ex: 8000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Total payé (MAD) :</label>
                <input
                  type="number"
                  name="totalPaye"
                  value={formData.totalPaye}
                  onChange={handleChange}
                  placeholder="Ex: 8500"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mode de paiement :</label>
                <select
                  name="modePaiement"
                  value={formData.modePaiement}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="CB">Carte bancaire</option>
                  <option value="Virement">Virement bancaire</option>
                  <option value="Cheque">Chèque</option>
                  <option value="Especes">Espèces</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fait le :</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>
          
          <fieldset>
            <legend>Informations Bancaires de l'Établissement</legend>
            <div className="form-grid">
              <div className="form-group full-width">
                <p>Mode de paiement: Un virement bancaire dont vous trouverez les références ci-dessous: 
                <p><b>RIB: </b> 011 780 0000 20 210 00 02815 55 
                <br />
                <b>IBAN:</b> MA64011780000020210000281555 
                <br />
                <b>SWIFT: </b> BMCEMA55
                <br />
                <b>CODE GUICHET: </b> 78020</p>
                <p>NB: Il faut remettre à l'école la copie de l'ordre de virement effectué.</p>  
                Cette attestation est délivrée à l'intéressé, à sa demande, pour servir et valoir ce que de droit.</p>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Informations de l'Établissement</legend>
            <div className="form-grid">
              <div className="form-group full-width">
                <p>IDG Maroc- YNOV CAMPUS <br />
                Société anonyme au capital de 6.400.000 DH - 88 Rue Ibnou Khatima - Quartier des Hôpitaux- Casablanca 
                CNSS : 7164833-IF:1023591 -RC:144155 -PATENTE:36330905-ICE:001645521000037</p>
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/dashboard")}
            >
              Annuler
            </button>
            <button type="submit" className="btn-generate">
              Générer l’attestation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttestationForm;