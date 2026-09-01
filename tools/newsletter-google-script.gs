/**
 * jononj.love — réception des inscriptions à la newsletter.
 * ---------------------------------------------------------------------------
 * Ce script ne tourne PAS sur le site : il tourne dans le compte Google de Jon,
 * rattaché à une feuille de calcul. Le site lui envoie l'adresse saisie, le
 * script ajoute une ligne dans la feuille et (au choix) envoie un e-mail.
 *
 * Les inscrits ne sont donc stockés nulle part ailleurs que dans le Drive de
 * Jon. Aucun service tiers, aucune limite de contacts, aucun compte à payer.
 *
 * INSTALLATION — voir README.md, section 4. En résumé :
 *   1. Ouvrir la feuille Google Sheets voulue — une feuille EXISTANTE convient
 *      très bien : le script y ajoute simplement un nouvel onglet
 *   2. Extensions > Apps Script
 *   3. Coller ce fichier à la place du contenu par défaut
 *   4. Déployer > Nouveau déploiement > Application Web
 *        Exécuter en tant que : moi
 *        Qui a accès      : tout le monde   <-- indispensable
 *   5. Copier l'URL fournie dans content.js (champ "endpoint")
 *
 * Après toute modification de ce fichier : Déployer > Gérer les déploiements >
 * crayon > Version : nouvelle > Déployer. Sinon l'ancienne version reste active.
 */

/* Mettre "" pour ne PAS recevoir d'e-mail à chaque inscription
   (la feuille se remplit quand même). */
const NOTIFY_EMAIL = "jononjmusic@gmail.com";

/* Nom de l'onglet qui reçoit les inscriptions. S'il n'existe pas, il est créé
   avec ses en-têtes. Pour utiliser un onglet déjà en place, mettre son nom ici
   — ses colonnes doivent alors être Date / E-mail / Source, dans cet ordre. */
const SHEET_NAME = "Inscriptions";


function doPost(e) {
  try {
    const body  = (e && e.postData && e.postData.contents) || "{}";
    const data  = JSON.parse(body);
    const email = String(data.email || "").trim().toLowerCase();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: "adresse invalide" });
    }

    const sheet = getSheet();

    // Doublon : on répond "ok" sans rien ajouter. Cela rend aussi l'envoi
    // rejouable — si le site renvoie la même inscription, rien n'est dupliqué.
    if (alreadyThere(sheet, email)) {
      return json({ ok: true, duplicate: true });
    }

    sheet.appendRow([new Date(), email, String(data.source || "")]);

    /* L'e-mail est un bonus : s'il échoue (quota Google atteint, par exemple),
       l'inscription est déjà enregistrée et ne doit pas être perdue. */
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          replyTo: email,             // répondre à l'e-mail écrit directement à la personne
          subject: "Nouvelle inscription newsletter — jononj.love",
          body: email + "\n\n"
              + "Liste complète : " + SpreadsheetApp.getActiveSpreadsheet().getUrl() + "\n"
              + "(Répondre à ce message écrit directement à la personne inscrite.)",
        });
      } catch (mailErr) {
        console.warn("e-mail non envoyé : " + mailErr);
      }
    }

    return json({ ok: true });

  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}


/* Ouvrir l'URL du script dans un navigateur affiche ceci : pratique pour
   vérifier que le déploiement est bien actif. */
function doGet() {
  return json({ ok: true, service: "jononj.love newsletter" });
}


function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "E-mail", "Source"]);
    sheet.setFrozenRows(1);
    sheet.getRange("A1:C1").setFontWeight("bold");
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 280);
  }
  return sheet;
}


function alreadyThere(sheet, email) {
  const last = sheet.getLastRow();
  if (last < 2) return false;
  return sheet.getRange(2, 2, last - 1, 1)
              .getValues()
              .some(function (row) {
                return String(row[0]).trim().toLowerCase() === email;
              });
}


function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
