import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Generer_Convention.css';
import Ynov from '../img/Ynov.png';

const Generer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Période de stage
    dateDebut: '',
    dateFin: '',
    // Stagiaire
    stagiaireNom: '',
    stagiairePrenom: '',
    stagiaireCivilite: 'Monsieur',
    stagiaireAdresse: '',
    stagiaireCodePostal: '',
    stagiaireVille: '',
    stagiaireTelephone: '',
    stagiaireEmail: '',
    // Entreprise
    entrepriseType: '',
    entrepriseNom: '',
    entrepriseAdresse: '',
    entrepriseCodePostal: '',
    entrepriseVille: '',
    entreprisePays: '',
    entrepriseTelephone: '',
    entrepriseFax: '',
    entrepriseSiteWeb: '',
    entrepriseNbEmployes: '',
    // Représentant
    representantNom: '',
    representantPrenom: '',
    representantCivilite: 'Monsieur',
    representantFonction: '',
    representantTelephone: '',
    representantEmail: '',
    // Descriptif
    taches: '',
    environnementTechno: '',
    formations: '',
    objectifs: '',
    nbCollaborateurs: '',
    commentaires: '',
    // Indemnité
    indemniteMontant: '',
    indemniteMonnaie: 'EUROS',
    indemniteCommentaire: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the data to a backend here
    console.log(formData);
    navigate('/gestion-conventions');
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="convention-container">
      <div className="convention-header">
        <img src={Ynov} alt="Ynov Campus" className="logo-ynov" />
        <h1>Générer une Convention de Stage</h1>
      </div>
      <form onSubmit={handleSubmit} className="convention-form">

        <fieldset>
          <legend>Période de stage</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dateDebut">Date de début</label>
              <input type="date" id="dateDebut" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dateFin">Date de fin</label>
              <input type="date" id="dateFin" name="dateFin" value={formData.dateFin} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Le Stagiaire</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="stagiaireNom">Nom</label>
              <input type="text" id="stagiaireNom" name="stagiaireNom" value={formData.stagiaireNom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiairePrenom">Prénom</label>
              <input type="text" id="stagiairePrenom" name="stagiairePrenom" value={formData.stagiairePrenom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiaireCivilite">Civilité</label>
              <select id="stagiaireCivilite" name="stagiaireCivilite" value={formData.stagiaireCivilite} onChange={handleChange}>
                <option>Monsieur</option>
                <option>Madame</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="stagiaireAdresse">Adresse</label>
              <input type="text" id="stagiaireAdresse" name="stagiaireAdresse" value={formData.stagiaireAdresse} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiaireCodePostal">Code Postal</label>
              <input type="text" id="stagiaireCodePostal" name="stagiaireCodePostal" value={formData.stagiaireCodePostal} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiaireVille">Ville</label>
              <input type="text" id="stagiaireVille" name="stagiaireVille" value={formData.stagiaireVille} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiaireTelephone">Téléphone</label>
              <input type="tel" id="stagiaireTelephone" name="stagiaireTelephone" value={formData.stagiaireTelephone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stagiaireEmail">Adresse E-mail</label>
              <input type="email" id="stagiaireEmail" name="stagiaireEmail" value={formData.stagiaireEmail} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>L'Entreprise</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="entrepriseType">Type d'entreprise</label>
              <input type="text" id="entrepriseType" name="entrepriseType" value={formData.entrepriseType} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseNom">Nom de l'entreprise</label>
              <input type="text" id="entrepriseNom" name="entrepriseNom" value={formData.entrepriseNom} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="entrepriseAdresse">Adresse</label>
              <input type="text" id="entrepriseAdresse" name="entrepriseAdresse" value={formData.entrepriseAdresse} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseCodePostal">Code Postal</label>
              <input type="text" id="entrepriseCodePostal" name="entrepriseCodePostal" value={formData.entrepriseCodePostal} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseVille">Ville</label>
              <input type="text" id="entrepriseVille" name="entrepriseVille" value={formData.entrepriseVille} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="entreprisePays">Pays</label>
              <input type="text" id="entreprisePays" name="entreprisePays" value={formData.entreprisePays} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseTelephone">Téléphone</label>
              <input type="tel" id="entrepriseTelephone" name="entrepriseTelephone" value={formData.entrepriseTelephone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseFax">Fax</label>
              <input type="tel" id="entrepriseFax" name="entrepriseFax" value={formData.entrepriseFax} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseSiteWeb">Site Web</label>
              <input type="url" id="entrepriseSiteWeb" name="entrepriseSiteWeb" value={formData.entrepriseSiteWeb} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entrepriseNbEmployes">Nombre d'employés</label>
              <input type="number" id="entrepriseNbEmployes" name="entrepriseNbEmployes" value={formData.entrepriseNbEmployes} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Représentant de l'entreprise</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="representantNom">Nom</label>
              <input type="text" id="representantNom" name="representantNom" value={formData.representantNom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="representantPrenom">Prénom</label>
              <input type="text" id="representantPrenom" name="representantPrenom" value={formData.representantPrenom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="representantCivilite">Civilité</label>
              <select id="representantCivilite" name="representantCivilite" value={formData.representantCivilite} onChange={handleChange}>
                <option>Monsieur</option>
                <option>Madame</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="representantFonction">Fonction</label>
              <input type="text" id="representantFonction" name="representantFonction" value={formData.representantFonction} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="representantTelephone">Téléphone</label>
              <input type="tel" id="representantTelephone" name="representantTelephone" value={formData.representantTelephone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="representantEmail">Adresse E-mail</label>
              <input type="email" id="representantEmail" name="representantEmail" value={formData.representantEmail} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Descriptif du stage</legend>
          <div className="form-grid-single">
            <div className="form-group">
              <label htmlFor="taches">Tâches quotidiennes du stagiaire</label>
              <textarea id="taches" name="taches" value={formData.taches} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="environnementTechno">Environnement technologique</label>
              <textarea id="environnementTechno" name="environnementTechno" value={formData.environnementTechno} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="formations">Formations prévues</label>
              <textarea id="formations" name="formations" value={formData.formations} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="objectifs">Objectifs pédagogiques</label>
              <textarea id="objectifs" name="objectifs" value={formData.objectifs} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="nbCollaborateurs">Nombre de collaborateurs dans l'équipe</label>
              <input type="number" id="nbCollaborateurs" name="nbCollaborateurs" value={formData.nbCollaborateurs} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="commentaires">Commentaires</label>
              <textarea id="commentaires" name="commentaires" value={formData.commentaires} onChange={handleChange}></textarea>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Indemnité de stage</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="indemniteMontant">Montant</label>
              <input type="number" id="indemniteMontant" name="indemniteMontant" value={formData.indemniteMontant} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="indemniteMonnaie">Monnaie</label>
              <select id="indemniteMonnaie" name="indemniteMonnaie" value={formData.indemniteMonnaie} onChange={handleChange}>
                <option>EUROS</option>
                <option>FCFA</option>
                <option>MAD</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="indemniteCommentaire">Commentaire</label>
              <textarea id="indemniteCommentaire" name="indemniteCommentaire" value={formData.indemniteCommentaire} onChange={handleChange}></textarea>
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button onClick={handleBack} className="cancel-button">Annuler</button>
          <button type="submit" className="submit-button">Générer la convention</button>        
        </div>
      </form>
    </div>
  );
};

export default Generer;