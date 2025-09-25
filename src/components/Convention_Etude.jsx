import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Convention_Etude.css";
import Ynov from '../img/Ynov.png';

const ConventionEtudeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // État civil du candidat
    civiliteCandidat: "",
    nomCandidat: "",
    prenomCandidat: "",
    dateNaissanceCandidat: "",
    lieuNaissanceCandidat: "",
    paysCandidat: "",
    nationaliteCandidat: "",
    adresseCandidat: "",
    villeCandidat: "",
    codePostalCandidat: "",
    telephoneCandidat: "",
    portableCandidat: "",
    emailCandidat: "",
    idCandidat: "",
    photoCandidat: null,

    // État civil du responsable légal
    civiliteRespLegal: "",
    qualiteRespLegal: "",
    nomRespLegal: "",
    prenomRespLegal: "",
    dateNaissanceRespLegal: "",
    lieuNaissanceRespLegal: "",
    paysRespLegal: "",
    nationaliteRespLegal: "",
    adresseRespLegal: "",
    villeRespLegal: "",
    codePostalRespLegal: "",
    telephoneRespLegal: "",
    portableRespLegal: "",
    emailRespLegal: "",
    idRespLegal: "",

    // État civil du responsable financier
    civiliteRespFin: "",
    qualiteRespFin: "",
    nomRespFin: "",
    prenomRespFin: "",
    dateNaissanceRespFin: "",
    lieuNaissanceRespFin: "",
    paysRespFin: "",
    nationaliteRespFin: "",
    adresseRespFin: "",
    villeRespFin: "",
    codePostalRespFin: "",
    telephoneRespFin: "",
    emailRespFin: "",
    idRespFin: "",

    // Études antérieures
    etudes: [
      { annee: "", etudeSuivie: "", etablissement: "", diplome: "", dateObtention: "" },
      { annee: "", etudeSuivie: "", etablissement: "", diplome: "", dateObtention: "" },
      { annee: "", etudeSuivie: "", etablissement: "", diplome: "", dateObtention: "" },
    ],

    commentaire: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photoCandidat: e.target.files[0] }));
  };

  const handleEtudesChange = (index, field, value) => {
    const updatedEtudes = [...formData.etudes];
    updatedEtudes[index][field] = value;
    setFormData((prev) => ({ ...prev, etudes: updatedEtudes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Convention d'étude :", formData);
    window.alert("✅ Formulaire soumis avec succès !");
    navigate("/documents-transferts");
  };

  return (
    <div className="ce-main-container">
      <div className="ce-content-wrapper">
        <div className="convention-header">
        <img src={Ynov} alt="Ynov Campus" className="logo-ynov" />
        <h1 className="ce-title">Générer une convention d'étude</h1>
    </div>
        <form onSubmit={handleSubmit} className="ce-form">

          {/* ---------------- État civil du candidat ---------------- */}
          <fieldset className="ce-fieldset">
            <legend>ÉTAT CIVIL DU CANDIDAT</legend>
            <div className="ce-grid">
              {/* Civilité */}
              <div className="ce-form-group">
                <label>Civilité :</label>
                <div className="ce-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="civiliteCandidat"
                      value="Mr"
                      checked={formData.civiliteCandidat === "Mr"}
                      onChange={handleChange}
                    />
                    Mr.
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="civiliteCandidat"
                      value="Mme"
                      checked={formData.civiliteCandidat === "Mme"}
                      onChange={handleChange}
                    />
                    Mme.
                  </label>
                </div>
              </div>

              {/* Nom et prénom */}
              <div className="ce-form-group ce-full-width">
                <label>Nom :</label>
                <input type="text" name="nomCandidat" value={formData.nomCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>Prénoms :</label>
                <input type="text" name="prenomCandidat" value={formData.prenomCandidat} onChange={handleChange} required />
              </div>

              {/* Naissance */}
              <div className="ce-form-group">
                <label>Né(e) le :</label>
                <input type="date" name="dateNaissanceCandidat" value={formData.dateNaissanceCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>à :</label>
                <input type="text" name="lieuNaissanceCandidat" value={formData.lieuNaissanceCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Pays :</label>
                <input type="text" name="paysCandidat" value={formData.paysCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Nationalité :</label>
                <input type="text" name="nationaliteCandidat" value={formData.nationaliteCandidat} onChange={handleChange} required />
              </div>

              {/* Adresse */}
              <div className="ce-form-group ce-full-width">
                <label>Adresse :</label>
                <input type="text" name="adresseCandidat" value={formData.adresseCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Code postal :</label>
                <input type="text" name="codePostalCandidat" value={formData.codePostalCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Ville :</label>
                <input type="text" name="villeCandidat" value={formData.villeCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Téléphone :</label>
                <input type="text" name="telephoneCandidat" value={formData.telephoneCandidat} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Portable :</label>
                <input type="text" name="portableCandidat" value={formData.portableCandidat} onChange={handleChange} />
              </div>
              <div className="ce-form-group">
                <label>Email :</label>
                <input type="email" name="emailCandidat" value={formData.emailCandidat} onChange={handleChange} required />
              </div>

              {/* ID et photo */}
              <div className="ce-form-group ce-full-width">
                <label>N° de carte d'identité / passeport / carte de séjour :</label>
                <input type="text" name="idCandidat" value={formData.idCandidat} onChange={handleChange} required />
              </div>
            </div>

            <div className="ce-photo-box">
              {formData.photoCandidat ? (
                  <img src={URL.createObjectURL(formData.photoCandidat)} alt={`${formData.nomCandidat} ${formData.prenomCandidat}`} className="ce-photo-preview" />
              ) : (
                <span className="ce-photo-placeholder">Photo d'identité</span>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="ce-photo-input" />
            </div>
          </fieldset>

          {/* ---------------- État civil du responsable légal ---------------- */}
          <fieldset className="ce-fieldset">
            <legend>ÉTAT CIVIL DU RESPONSABLE LEGAL</legend>
            <div className="ce-grid">
              {/* Civilité et qualité */}
              <div className="ce-form-group">
                <label>Civilité :</label>
                <div className="ce-radio-group">
                  <label>
                    <input type="radio" name="civiliteRespLegal" value="Mr" checked={formData.civiliteRespLegal === "Mr"} onChange={handleChange} /> Mr
                  </label>
                  <label>
                    <input type="radio" name="civiliteRespLegal" value="Mme" checked={formData.civiliteRespLegal === "Mme"} onChange={handleChange} /> Mme
                  </label>
                </div>
              </div>

              <div className="ce-form-group">
                <label>Qualité :</label>
                <div className="ce-radio-group">
                  <label>
                    <input type="radio" name="qualiteRespLegal" value="Père" checked={formData.qualiteRespLegal === "Père"} onChange={handleChange} /> Père
                  </label>
                  <label>
                    <input type="radio" name="qualiteRespLegal" value="Mère" checked={formData.qualiteRespLegal === "Mère"} onChange={handleChange} /> Mère
                  </label>
                  <label>
                    <input type="radio" name="qualiteRespLegal" value="Tuteur" checked={formData.qualiteRespLegal === "Tuteur"} onChange={handleChange} /> Tuteur
                  </label>
                </div>
              </div>

              {/* Nom, prénom, naissance */}
              <div className="ce-form-group ce-full-width">
                <label>Nom :</label>
                <input type="text" name="nomRespLegal" value={formData.nomRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>Prénoms :</label>
                <input type="text" name="prenomRespLegal" value={formData.prenomRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Né(e) le :</label>
                <input type="date" name="dateNaissanceRespLegal" value={formData.dateNaissanceRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>à :</label>
                <input type="text" name="lieuNaissanceRespLegal" value={formData.lieuNaissanceRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Pays :</label>
                <input type="text" name="paysRespLegal" value={formData.paysRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Nationalité :</label>
                <input type="text" name="nationaliteRespLegal" value={formData.nationaliteRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>Adresse :</label>
                <input type="text" name="adresseRespLegal" value={formData.adresseRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Code postal :</label>
                <input type="text" name="codePostalRespLegal" value={formData.codePostalRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Ville :</label>
                <input type="text" name="villeRespLegal" value={formData.villeRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Téléphone :</label>
                <input type="text" name="telephoneRespLegal" value={formData.telephoneRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Portable :</label>
                <input type="text" name="portableRespLegal" value={formData.portableRespLegal} onChange={handleChange} />
              </div>
              <div className="ce-form-group">
                <label>Email :</label>
                <input type="email" name="emailRespLegal" value={formData.emailRespLegal} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>N° de carte d'identité / passeport / carte de séjour :</label>
                <input type="text" name="idRespLegal" value={formData.idRespLegal} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>

          {/* ---------------- État civil du responsable financier ---------------- */}
          <fieldset className="ce-fieldset">
            <legend>ÉTAT CIVIL DU RESPONSABLE FINANCIER</legend>
            <div className="ce-grid">
              {/* Civilité et qualité */}
              <div className="ce-form-group">
                <label>Civilité :</label>
                <div className="ce-radio-group">
                  <label>
                    <input type="radio" name="civiliteRespFin" value="Mr" checked={formData.civiliteRespFin === "Mr"} onChange={handleChange} /> Mr
                  </label>
                  <label>
                    <input type="radio" name="civiliteRespFin" value="Mme" checked={formData.civiliteRespFin === "Mme"} onChange={handleChange} /> Mme
                  </label>
                </div>
              </div>

              <div className="ce-form-group">
                <label>Qualité :</label>
                <div className="ce-radio-group">
                  <label>
                    <input type="radio" name="qualiteRespFin" value="Père" checked={formData.qualiteRespFin === "Père"} onChange={handleChange} /> Père
                  </label>
                  <label>
                    <input type="radio" name="qualiteRespFin" value="Mère" checked={formData.qualiteRespFin === "Mère"} onChange={handleChange} /> Mère
                  </label>
                  <label>
                    <input type="radio" name="qualiteRespFin" value="Tuteur" checked={formData.qualiteRespFin === "Tuteur"} onChange={handleChange} /> Tuteur
                  </label>
                </div>
              </div>

              {/* Nom, prénom, naissance */}
              <div className="ce-form-group ce-full-width">
                <label>Nom :</label>
                <input type="text" name="nomRespFin" value={formData.nomRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>Prénoms :</label>
                <input type="text" name="prenomRespFin" value={formData.prenomRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Né(e) le :</label>
                <input type="date" name="dateNaissanceRespFin" value={formData.dateNaissanceRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>à :</label>
                <input type="text" name="lieuNaissanceRespFin" value={formData.lieuNaissanceRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Pays :</label>
                <input type="text" name="paysRespFin" value={formData.paysRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Nationalité :</label>
                <input type="text" name="nationaliteRespFin" value={formData.nationaliteRespFin} onChange={handleChange} required />
              </div>

              {/* Adresse */}
              <div className="ce-form-group ce-full-width">
                <label>Adresse :</label>
                <input type="text" name="adresseRespFin" value={formData.adresseRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Code postal :</label>
                <input type="text" name="codePostalRespFin" value={formData.codePostalRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Ville :</label>
                <input type="text" name="villeRespFin" value={formData.villeRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Téléphone :</label>
                <input type="text" name="telephoneRespFin" value={formData.telephoneRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group">
                <label>Email :</label>
                <input type="email" name="emailRespFin" value={formData.emailRespFin} onChange={handleChange} required />
              </div>
              <div className="ce-form-group ce-full-width">
                <label>N° de carte d'identité / passeport / carte de séjour :</label>
                <input type="text" name="idRespFin" value={formData.idRespFin} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>

          {/* ---------------- Études antérieures ---------------- */}
          <fieldset className="ce-fieldset">
            <legend>ÉTUDES ANTÉRIEURES</legend>
            {formData.etudes.map((etude, index) => (
              <React.Fragment key={index}>
                <div className="ce-grid">
                  <div className="ce-form-group">
                    <label>Année scolaire :</label>
                    <input type="text" value={etude.annee} onChange={(e) => handleEtudesChange(index, "annee", e.target.value)} required />
                  </div>
                  <div className="ce-form-group">
                    <label>Étude suivie :</label>
                    <input type="text" value={etude.etudeSuivie} onChange={(e) => handleEtudesChange(index, "etudeSuivie", e.target.value)} required />
                  </div>
                  <div className="ce-form-group">
                    <label>Établissement fréquenté :</label>
                    <input type="text" value={etude.etablissement} onChange={(e) => handleEtudesChange(index, "etablissement", e.target.value)} required />
                  </div>
                  <div className="ce-form-group">
                    <label>Diplôme :</label>
                    <input type="text" value={etude.diplome} onChange={(e) => handleEtudesChange(index, "diplome", e.target.value)} required />
                  </div>
                  <div className="ce-form-group">
                    <label>Date d'obtention :</label>
                    <input type="date" value={etude.dateObtention} onChange={(e) => handleEtudesChange(index, "dateObtention", e.target.value)} required />
                  </div>
                </div>
                {index < formData.etudes.length - 1 && <div className="ce-etude-separator"></div>}
              </React.Fragment>
            ))}
          </fieldset>

          {/* ---------------- Commentaires ---------------- */}
          <fieldset className="ce-fieldset">
            <legend>COMMENTAIRES</legend>
            <div className="ce-form-group ce-full-width">
              <label>Si vous avez interrompu vos études, veuillez indiquer durée + raison :</label>
              <textarea value={formData.commentaire} onChange={(e) => setFormData({...formData, commentaire: e.target.value})} rows="4" />
            </div>
          </fieldset>

          <div className="ce-form-actions">            
            <button type="button" className="ce-btn-cancel" onClick={() => navigate("/dashboard")}>Annuler</button>
            <button type="submit" className="ce-btn-submit">Générer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConventionEtudeForm;
