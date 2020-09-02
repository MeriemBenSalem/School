//**** Fonction d'inscription  ****/
function inscrire() {
  /***  Nom  ***/
  var nom = document.getElementById("nom").value;
  var verifLongNom = verifLong(nom, 5);
  if (!verifLongNom) {
    document.getElementById("nomMsg").innerHTML =
      "Le nom doit comporter au moins 5 caractères";
  } else {
    document.getElementById("nomMsg").innerHTML = "";
  }
  /***  Prenom  ***/
  var prenom = document.getElementById("prenom").value;
  var verifLongPrenom = verifLong(prenom, 5);
  if (!verifLongPrenom) {
    document.getElementById("prenomMsg").innerHTML =
      "Le nom doit comporter au moins 5 caractères";
  } else {
    document.getElementById("prenomMsg").innerHTML = "";
  }
  /***  Email  ***/
  var email = document.getElementById("email").value;
  var verifEmail = VerifEmail(email);
  var validEmail = validationEmail();

  if (verifEmail) {
    document.getElementById("emailMsg").innerHTML =
      " Email existe déjà";
  }
  else if (!validEmail) {
    document.getElementById("emailMsg").innerHTML = "L'adresse mail n'est pas valide";
  }

  else {
    document.getElementById("emailMsg").innerHTML = "";
  }

  /***  mot de passe  ***/
  var mp = document.getElementById("mp").value;
  var verifMdp = verifMp(mp);
  if (!verifMdp) {
    document.getElementById("mpMsg").innerHTML =
      "Mot de passe doit contenir au moins 8 caractères avec au moins un chiffre";
  } else {
    document.getElementById("mpMsg").innerHTML =
      "<p style='color:green'>Mot de passe fort.</p>";
  }

  /***  Confirmer mot de passe  ***/
  var confirmMp = document.getElementById("confirmMp").value;
  var compareMp = compare(mp, confirmMp);
  if (!compareMp) {
    document.getElementById("confirmMpMsg").innerHTML = "confirmer mot de passe";
  } else {
    document.getElementById("confirmMpMsg").innerHTML = "";
  }
  //**Tel */
  var tel = document.getElementById("tel").value;
  var verifLgTel = verifLong(tel, 8);
  var verifTel = VerifTel(tel);
  if (!verifLgTel) {
    document.getElementById("telMsg").innerHTML =
      "Vérifier votre numéro de téléphone ";
  }
  else if (verifTel) {
    document.getElementById("telMsg").innerHTML =
      " ce numéro existe déjà ";
  }
  else {
    document.getElementById("telMsg").innerHTML = "";
  }
  /***  Cin  ***/
  var cin = document.getElementById("cin").value;
  var verifLongCin = verifLong(cin, 8);
  var verifCin1 = verifCin(cin);

  if (!verifLongCin) {
    document.getElementById("cinMsg").innerHTML =
      "Le CIN doit comporter 8 entiers";
  }
  else if (verifCin1) {
    document.getElementById("cinMsg").innerHTML =
      " CIN déjà existe ";
  } else {
    document.getElementById("cinMsg").innerHTML = "";
  }
  /***  Type  ***/
  var typeUt = document.getElementById("typeUt").value;
  /***  Classe  ***/

  /***  date de Naissance  ***/
  var date = document.getElementById("date").value;
  age = CalculAge();
  if (age < 18) {
    document.getElementById("dateMsg").innerHTML =
      "Votre age est " + age + " ans !! dois être supérieur à 18 ans";
  } else {
    document.getElementById('dateMsgv').innerHTML = age + ' ans';
  }

  /***  Ville ***/
  var ville = document.getElementById("ville").value;
  /** Id */
  idU = localStorage.getItem('idU' || '1');


  // JSON Utilisateur
  var Utilisateur = {
    id: Number(idU),
    Cin: cin,
    nom: nom,
    prenom: prenom,
    email: email,
    mp: mp,
    confirMp: confirmMp,
    tel: tel,
    type: typeUt,
    dateN: date,
    ville: ville
  };


  if (verifLongNom && verifLongPrenom && !verifEmail && validEmail && verifMdp &&
    compareMp && verifLongCin && !verifCin1 && verifLgTel && !verifTel && (age > 18)) {
    var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
    T.push(Utilisateur);
    localStorage.setItem("Utilisateurs", JSON.stringify(T));

  }

}



//**** Fonction verifier long ****/
function verifLong(ch, n) {
  return ch.length >= n;
}

//**** Fonction verifier Cin ****/
function verifCin(cin) {
  var i = 0;
  var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
  while (i < T.length && T[i].cin != cin) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return T[i].cin == cin;
  }
}


//**** Fonction verifier Telephone ****/
function VerifTel(tel) {
  var i = 0;
  var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
  while (i < T.length && T[i].tel != tel) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return T[i].tel == tel;
  }
}
// Fonction de comparaison
function compare(ch1, ch2) {
  return ch1 == ch2;
}
// Fonction de Npmber

function verifNomber(ch) {
  return isNaN(ch);
}
//**** Fonction verifier Email ****/
function VerifEmail(email) {
  var i = 0;
  var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
  while (i < T.length && T[i].email != email) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return T[i].email == email;
  }
}
//**** Valid Email ****/

function validationEmail() {
  var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  document.getElementById("emailMsg").innerHTML = "";
  if (expressionReguliere.test(document.getElementById("email").value)) {
    return true;
  }
  else { return false; }
}

//**Calcule date  */
function CalculAge() {
  var td = new Date();// Le date d'ouverture de la page (aujourd'hui)
  var dtn = document.getElementById('date').value; // on lit la date de naissance
  var an = dtn.substr(0, 4); // l'année (les quatre premiers caractères de la chaîne à partir de zéro)
  var age = td.getFullYear() - an; // l'âge du joueur
  return age;

}
//** Verif mot de passe  */

function verifMp(ch) {
  //La méthode match() permet d'obtenir 
  //le tableau des correspondances entre la chaîne courante et
  //une expression rationnelle.
  //str.match( /[^a-zA-Z\d]/g) && str.match( /[A-Z]/g) && str.match(/[a-z]/g)
  if (ch.match(/[0-9]/g) && ch.length >= 8) { return true; }
  else { return false; }

}


//**** function Se Connecter   
function connecter() {
  var tel = document.getElementById("tel").value;
  var mp = document.getElementById("mp").value;
  var i = 0;
  var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
  while (i < T.length && (T[i].tel != tel || T[i].mp != mp)) {
    i++;
  }
  console.log("i=" + i)
  if (i == T.length) {
    return null;
  } else {
    if (T[i].typeUt == "1") {
      localStorage.setItem("utilConnecte", JSON.stringify(T[i]));
      location.replace("Etudiant.html");
    } else {
      localStorage.setItem("utilConnecte", JSON.stringify(T[i]));
      location.replace("Enseignant.html");
    }
    return T[i];
  }
}

//** utilisateur  Connecter**/
function AfficheParamtUt() {
  var utCnct = JSON.parse(localStorage.getItem("utilConnecte"));
  document.getElementById("navNom").innerHTML = utCnct.nom;
  document.getElementById("navPrenom").innerHTML = utCnct.prenom;
}

//***Calculer Moyenne Etudiant  */

function calculeMoyEt() {

  var noteMath = document.getElementById("noteMath").value;
  var notePh = document.getElementById("notePh").value;
  var noteCh = document.getElementById("noteCh").value;
  var noteInfo = document.getElementById("noteInfo").value;
  var noteEle = document.getElementById("noteElectro").value;
  var idN = localStorage.getItem('idN' || '1');

  var moyenne = (noteMath * 3 + notePh * 2 + noteCh * 1 + noteInfo * 4 + noteEle * 2) / 12;
  if (moyenne < 10) {
    document.getElementById('alertMoy').innerHTML =
      `<div class='alert alert-danger' role='alert'>
         votre moyenne est `  + moyenne;
    `</div>`
  }
  else {
    document.getElementById('alertMoy').innerHTML =
      `<div class='alert alert-success' role='alert'>
      votre moyenne est `  + moyenne;
    `</div>`
  }
}
function afficheNoteEt() {

  var K = JSON.parse(localStorage.getItem('utilConnecte'));
  console.log(K.nom);
  render = `<table class="table table-striped" id="myTable">
     <thead  class="thead-dark">
         <tr>
             <th scope="col">Id</th>
             <th scope="col">Nom</th>
             <th scope="col">Math</th>
             <th scope="col">physique</th>
             <th scope="col">chimie</th>
             <th scope="col">Informatique</th>
             <th scope="col">Electromécanique</th>
         </tr>
     </thead>
     <tbody>`;
  render += `
                     <tr>
                         <th scope="row">${K.idU}</th>
                         <td>${K.nom}</td>
                         <td>${K.prenom}</td>
                         <td>${noteMath}</td>
                         <td>${notePh}</td>
                         <td>${noteCh}</td>
                         <td>${noteInfo}</td>
                         <td>${noteEle}</td>
                     </tr>
         `;
  render += `</tbody> </table>`;
  document.getElementById("tabMoy").innerHTML = render;
}



//** Calculer moyenne pour enseignant */
function calculeMoyEns() {
  var cin = document.getElementById("cinN").value;
  var verifCin1 = verifCin(cin);
  if (!verifCin1) {
    document.getElementById("cinMsg").innerHTML =
      " Cin n'existe pas ";
  }

  var noteMath = document.getElementById("noteMath").value;
  var notePh = document.getElementById("notePh").value;
  var noteCh = document.getElementById("noteCh").value;
  var noteInfo = document.getElementById("noteInfo").value;
  var noteEle = document.getElementById("noteElectro").value;
  var idN = localStorage.getItem('idN' || '1');

  // JSON Notes
  var Note = {
    id: Number(idN),
    NCin: cinN,
    NMath: noteMath,
    NPhy: notePh,
    NCh: noteCh,
    NInfo: noteInfo,
    NEle: noteEle
  };
  if (verifCin1) {
    var T = JSON.parse(localStorage.getItem('Notes') || '[]');
    T.push(Note);
    localStorage.setItem('Notes', JSON.stringify(T));
  }
  localStorage.setItem('idN', Number(idN) + 1);
  var moyenne = (noteMath * 3 + notePh * 2 + noteCh * 1 + noteInfo * 4 + noteEle * 2) / 12;
  if (moyenne < 10) {
    document.getElementById('alertMoy').innerHTML =
      `<div class='alert alert-danger' role='alert'>
           votre moyenne est `  + moyenne;
    `</div>`
  }
  else {
    document.getElementById('alertMoy').innerHTML =
      `<div class='alert alert-success' role='alert'>
        votre moyenne est `  + moyenne;
    `</div>`
  }
}


/**Afficher Profil */

function AfficheProfil() {
  var utCnct = JSON.parse(localStorage.getItem("utilConnecte"));
  var render = `
          <table class="table table-striped" id="profilUt">
            <thead>
                <tr>
                    <th scope="col">Cin</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>`;
  render += `
                <tr>
                    <th scope="row">${utCnct.Cin}</th>
                    <td>${utCnct.prenom}</td>
                    <td>${utCnct.nom}</td>
                    <td>${utCnct.email}</td>
                    <td>${utCnct.tel}</td>
                    <td>${utCnct.ville}</td>

                    <td>
                    <div class="row form-group">
                  <div class="col-md-12">
                    <input type="submit" value="Modifier" onclick="modification(${utCnct.idU})"
                      class="btn btn-pill btn-primary btn-md text-white">
                  </div>
                </div>
                    </td>

                </tr>
    `;


  render += `</tbody> </table>`;
  document.getElementById("profilUt").innerHTML = render;
}

//**Fonction de Recherche */
function RechercheProfil(id) {
  var T = JSON.parse(localStorage.getItem("Utilisateurs") || "[]");
  var profil;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      profil = T[i];
    }
  }
  return profil;
}

