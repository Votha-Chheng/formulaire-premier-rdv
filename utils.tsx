import { MedicamentsChild } from "./store/childState/etatSanteChild"
import { MaladieGraveChild } from "./store/childState/etatSanteChild"
import { OperationChild } from "./store/childState/etatSanteChild"
import { Boisson } from "./store/childState/etatBuccoDentaire"
import { DentCasse } from "./store/childState/etatBuccoDentaire"

export const displayDateNormal = (date: string): string=>{
  let jour = "", mois = "", annee = ""
  const arrayDate = date.split(" ")

  switch (arrayDate[0]) {
    case "Sun":
      jour = "Dimanche"
      break
    case "Mon":
      jour = "Lundi"
      break
    case "Tue":
      jour = "Mardi"
      break
    case "Wed":
      jour = "Mercredi"
      break
    case "Thu":
      jour = "Jeudi"
      break
    case "Fri":
      jour = "Vendredi"
      break
    case "Sat":
      jour = "Samedi"
      break
  }

  switch (arrayDate[1]) {
    case "Jan":
      mois = "Janvier"
      break
    case "Feb":
      mois = "Février"
      break
    case "Mar":
      mois = "Mars"
      break
    case "Apr":
      mois = "Avril"
      break
    case "May":
      mois = "Mai"
      break
    case "Jun":
      mois = "Juin"
      break
    case "Jul":
      mois = "Juillet"
      break
    case "Aug":
      mois = "Août"
      break
    case "Sep":
      mois = "Septembre"
      break
    case "Oct":
      mois = "Octobre"
      break
    case "Nov":
      mois = "Novembre"
      break
    case "Dec":
      mois = "Décembre"
      break
  }

  annee = arrayDate[3]

  return `${jour} ${arrayDate[2]} ${mois} ${annee}`
}

export const onValidateLengthInput = (lengthMin: number, dispatch: Function, cb: Function, text: string) : void =>{

  if(text.length>lengthMin){
    dispatch(cb(text))
  } else {
    dispatch(cb(undefined))
  }
}

export const onValidateLengthInPutForObject = (text: string, lengthMin: number, dispatch: Function, cb: Function, obj: any, value: string): void =>{
  if(text.length>lengthMin && obj !== undefined){
    dispatch(cb({...obj, [value]: text.trim()}))
  } else {
    dispatch(cb({...obj, [value]: undefined}))
  }
}

export const addRadioItem = (isChecked: boolean, nameAllergie: string, stateArray: string[] | undefined, dispatcher: Function, reducerFromStore: Function, shouldeBeUndefinedIfNull?: boolean)=>{

  if(stateArray===undefined && isChecked){
    dispatcher(reducerFromStore([nameAllergie]))
    
    
  } else if(stateArray !== undefined) {

    if(isChecked){
      let tempState = [...stateArray, nameAllergie]
      dispatcher(reducerFromStore(tempState))

    } else if(!isChecked){
      let temp = stateArray.filter(medic=> medic !== nameAllergie)
      
      if(temp.length<1 && shouldeBeUndefinedIfNull === true){
        dispatcher(reducerFromStore(undefined))

      } else {
        dispatcher(reducerFromStore(temp))
      }
    }
  }  
}

const returnOuiNon = (statement: boolean)=>{
  if(statement===true){
    return "OUI"
  } else {
    return "NON"
  }
}

export const getHTMLAdultForm = (value:any)=>{
  return(
    `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="width:21cm;margin:0 auto;padding: 2px;">
      <div style="margin:0 auto;">
        <div style="text-align: center; background-color: darkgray; padding:2px">
          <h1 style="font-family: 'Times New Roman', Times, serif;margin-bottom: 5px;">L'ENVOL&Eacute;E</h1>
          <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 15px; margin-top: 0;">Cabinet dentaire</h2>
          <h3>${value.dr}</h3>
        </div>
        <main style="padding-top: 20px;">
          <div style="display:flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px;">
            <div style="font-weight: bold;">
              Patient : ${value.genre === "Madame" ? "Mme":"M."} ${value.nom.toUpperCase()} ${value.prenom}
            </div>
            <div>
              <span style="font-weight: bold;">Date : </span>${displayDateNormal(new Date(value.dateRdv).toDateString())}
            </div>
          </div>
          <li>
            <span style="font-weight: bold;">Date de naissance : </span> ${displayDateNormal(new Date(value.dateDeNaissance).toDateString())}
          </li>
          <li>
            <span style="font-weight: bold;">Profession : </span>${value.profession}
          </li>
          <li>
            <span style="font-weight: bold;">Téléphone :</span> ${value.tel}
          </li>
          <li>
            <span style="font-weight: bold;">E-mail : </span>${value.email}
          </li>
          <li>
            <span style="font-weight: bold;">Adresse : </span>${value.adresse} <span style="font-weight: bold;">${value.codePostal} ${value.ville}</span>
          </li>

          <section>
            <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
              HISTORIQUE MEDICAL
            </h2>

            <article>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Médecin traitant : </span>${value.medecinTraitant}
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Date du dernier examen médical : </span>${displayDateNormal(new Date(value.dateDernierExamen).toDateString())}
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Avez-vous connu des changements dans votre état de santé depuis un an ? : </span>
                <span style="${value.changementEtatSante===true ? 'red':'black'}">${returnOuiNon(value.changementEtatSante)}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold;'>Problèmes connus par le passé : </span><span style='color:red'>${value.maladies.join(", ")} </span>
              </li>

              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident? : </span>
                <span style="${value.saignementInterventionAccident===true ? 'red':'black'}">${returnOuiNon(value.saignementInterventionAccident)}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Avez-vous subi un traitement par radiations ? </span>
                <span style="${value.traitementRadiations===true ? 'red':'black'}">${returnOuiNon(value.traitementRadiations)}</span>
              </li>  
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Prise de médicaments actuellement ? </span>
                <span style="color:${value.priseMedicamentActuelle===true ? 'red':'black'}">${returnOuiNon(value.priseMedicamentActuelle)} ${value.priseMedicamentActuelle===true && " : " + value.medicamentsActuels.join(", ")}</span>
                  
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Allergies ? </span>
                <span style="color:${value.allergies?'red':'black'};">${returnOuiNon(value.allergies)}</span>
                
              </li>
              
                ${
                  value.allergies===true &&
                  `<li> Liste allergies :  
                    <span style="font-weight: bold;color:red;"> ${value.allergiesListe.join(", ")}
                  </li>`
                }
              </span>
              
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Fumeur : </span>
                <span style='color:${value.fumeur===true ? 'red':'black'}'>${returnOuiNon(value.fumeur)} (${value.fumeur===true && value.cigarettesParJour + " cig/jour)"} </span>
              </li>
              ${
                value.genre === "Madame" ?
                "<li style='margin-bottom:5px;'><span style='font-weight: bold; margin-bottom:5px'>Enceinte ? </span><span style='color:"+(value.enceinte? 'red':'black')+";'>" + returnOuiNon(value.enceinte) +"</span></li>"
                :
                ""
              }
              ${
                value.genre === "Madame" && value.enceinte===true ?
                "<li style='margin-bottom:5px;'>Enceinte de "+ value.moisDeGrossesse +" mois.</li>"
                :
                ""
              }
              ${
                value.genre === "Madame" && value.enceinte===false ?
                "<li style='margin-bottom:5px;'><span style='font-weight:bold'>Prise de la pilule ? </span><span style='color:"+(value.pilule? 'red':'black')+";'>"+ returnOuiNon(value.pilule) +"</span></li>"
                :
                ""
              }
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold'>Traitement contre l'ostéoporose ? </span style='color:${value.osteoporose===true ? 'red':'black'}'>
                <span>${returnOuiNon(value.osteoporose)}</span>
                ${
                  value.osteoporose===true ?
                  "<span style='color:red;font-weight: bold'> - Médicaments contre l'ostéoporose : "+value.medicOsteoporose.join(", ")+"</span>"
                  :
                  ""
                }
              </li>
            </article>

            <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
              HISTORIQUE DENTAIRE
            </h2>

            <article>
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold'>Date du dernier examen dentaire : 
                ${displayDateNormal(new Date(value.dateDernierExamDentaire).toDateString())}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold'>Motif de consultation aujourd'hui ? ${value.motifConsultation}</span>
              </li> 
              <li>
                ${
                  value.difficulteDentiste===true? 
                  "<span style='font-weight:bold;color:red;'>J'ai rencontré des difficultés particulières lors de précédentes consultations chez le dentiste tels que : " + value.listeDifficulteDentiste.join(", ") + "</span>"
                  :
                  "<span style='font-weight: bold'>Je n'ai pas eu de difficulté particulière lors de précédentes consultations chez le dentiste.</span>"
                }
              </li> 
              
            </article>

            <h3 style="text-decoration: underline;">
              GENCIVES
            </h3>
            <article>
              <li style='margin-bottom:5px;'>
                <span style='font-weight:bold;'>Avez-vous remarqué que vos dents se sont écartées depuis quelque temps ? </span> 
                <span style='color:${value.dentsEcartes===true?'red':'black'}'>${returnOuiNon(value.dentsEcartes)}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style='font-weight:bold;'>Saignement des gencives ? </span> 
                <span style='color:${value.saignementGencives===true?'red':'black'}'>${returnOuiNon(value.saignementGencives)}</span>
              </li>

              <li style='margin-bottom:5px;'>
                <span style='font-weight:bold;'>Traitements des gencives auparavant ? </span>
                <span>${returnOuiNon(value.traitementGencive)}</span>
                ${
                  value.traitementGencive===true ?
                  "<div style='color:red'>Traitements des gencives par : " + value.traitementGencivesPar.join(", ") + "</div>"
                  :
                  ""
                }
              </li>
            </article>

            <h3 style="text-decoration: underline;>
              DENTS
            </h3>
            <article>
              <li style='margin-bottom:5px;'>
                <span style='font-weight:bold'>Avez-vous des dents extraites ? </span>
                <span style='color:${value.dentsExtraites===true?'red':'black'}'>${returnOuiNon(value.dentsExtraites)}</span>  
              </li>
              ${
                value.dentsExtraites===true &&
                "<li style='margin-bottom:5px;'><span style='font-weight:bold'>Raisons des extractions des dents ? </span><span style='color:red'>"+value.causesExtraction.join(", ")+"</span></li>"
              }
              ${
                value.dentsExtraites===true &&
                "<li style='margin-bottom:5px;'><span style='font-weight:bold'>Les dents extraites ont-elles été remplacées ? </span><span style='color:"+ (value.dentsRemplacees===true ? 'red':'black')+"'>" + returnOuiNon(value.dentsRemplacees) +"</span></li>"
              }
              <li style='margin-bottom:5px;'>
                ${
                  value.dentsRemplacees===true ?
                  "<span style='font-weight:bold'>Les dents extraites ont-été remplacées par : </span><span style='color:red'>"+value.moyenDentRemplacement.join(", ")+"</span>"
                  :
                  "<span style='font-weight:bold'>Pour quelles raison n'ont-elle pas été remplacées ? </span><span style='color:red'>"+value.raisonsNonRemplacementDentsExtraites+"</span>"
                }
              </li>
              <li style='margin-bottom:5px;'>
                ${
                  value.dentsRemplacees===true ?
                  "<span style='font-weight:bold'>Comment vous sentez-vous avec vos prothèses actuelles ? </span><span style='color:red'>"+value.sensationProthesesActuelles+"</span>"
                  :
                  "<span>Aucune dent remplacées.</span>"
                }
              </li>
              <li style='margin-bottom:5px;'>
                ${
                  value.utilisationMetaux===true ?
                  "<span style='font-weight:bold'>Préférences particulières pour l'utilisation des métaux dans votre bouche ? </span><span style='color:red;'>"+ value.preferencesUtilisationMetaux+"</span></li>"
                  :
                  "<span style='font-weight:bold'>Pas de préférences pour l'utilisation de métaux dans la bouche.</span>"
                }
              </li>
              
              <li style='margin-bottom:5px;'>
                ${
                  value.dentsSensibles===true ?
                  "<span style='font-weight:bold;'>Dents sensibles à : </span><span style='color:red'>" + value.listeSensibilite.join(", ") +"</span>"
                  :
                  "<span style='font-weight:bold;'>Aucune sensibilité dentaire connue</span>"
                }
              </li>
            </article>
          </section>
        </main>
      </div>

      <div style="overflow:hidden;margin:0 auto;">
        <h3 style="text-decoration: underline;">
          MACHOIRES
        </h3>
        <article>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold;'>Serrez-vous ou grincez-vous des dents ? </span>
            <span style='color:${value.serrementGrincementDents ? 'red':'black'}'>${returnOuiNon(value.serrementGrincementDents)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold;'>Craquements, claquements ou douleur à l’ouverture de la mâchoire ?</span>
            <span style='color:${value.craquementClaquementDouleurOuvertureMachoire ? 'red':'black'}'>${returnOuiNon(value.craquementClaquementDouleurOuvertureMachoire)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold;'>Difficultés à avaler, à mâcher ou ne mâchez seulement d’un côté ? </span>
            <span style='color:${value.difficulteAvalerMacherCoteUnique ? 'red':'black'}'>${returnOuiNon(value.difficulteAvalerMacherCoteUnique)}</span>
          </li>
        </article>

        <h3 style="text-decoration: underline;">
          HYGIÈNE DENTAIRE
        </h3>
        <article>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Types de brosse à dent utilisé : </span>
            ${value.typeBrosseADent!==undefined ? value.typeBrosseADent.join(", ") :"<span>Pas de réponse</span>"}
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Quand vous brossez-vous les dents ? </span>
            ${value.momentsBrossageDents.join(", ")}
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>A quel rythme changez-vous de brosse à dents ? </span>${value.rythmeChangementBrosseAdent}
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Utilisation du fil de soie dentaire ou de brossettes inter-dentaires ? </span>
            <span style='color:${value.utilisationFilDentaireBrossette ? 'red':'black'}'>${returnOuiNon(value.utilisationFilDentaireBrossette)}</span>
          </li>
        </article>

        <h3 style="text-decoration: underline;">
          HABITUDES
        </h3>
        <article>
          <li style='margin-bottom:5px;'>
            ${
              value.habitudes.length>0 ? 
              "<span style='font-weight:bold'>J'ai les habitudes suivantes : </span><span  style='color:red'>"+ value.habitudes.join(", ")+"</span>" 
              : 
              "<span>Aucune habitudes de mâchouillage.</span>"
            }
          </li>
          
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Avez-vous l’impression d’avoir une mauvaise haleine ou un mauvais goût dans la bouche ? </span>
            <span style='color:${value.mauvaiseHaleine ? 'red':'black'}'>${returnOuiNon(value.mauvaiseHaleine)}</span>
          </li>
        </article>

        <h3 style="text-decoration: underline;">
          DENTISTERIE ESTHÉTIQUE
        </h3>
        <article>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Dans un large sourire, vos dents sont-elles toutes de la même couleur ? </span>
            <span style='color:${value.dentsMemeCouleurs ? 'red':'black'}'>${returnOuiNon(value.dentsMemeCouleurs)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Aimeriez-vous avoir des dents plus blanches ? </span>
            <span style='color:${value.souhaitDentsPlusBlanches ? 'red':'black'}'>${returnOuiNon(value.souhaitDentsPlusBlanches)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Etes-vous satisfait(e) de l’apparence de vos dents et de vos gencives ? </span>
            <span style='color:${value.satisfactionDentsGencives ? 'red':'black'}'>${returnOuiNon(value.satisfactionDentsGencives)}</span>
          </li>
        
        
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Mettez-vous la main devant la bouche lorsque vous riez ou souriez ? </span>
            <span style='color:${value.mainDevantBoucheSourire ? 'red':'black'}'>${returnOuiNon(value.mainDevantBoucheSourire)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            ${
              value.souhaitsChangementOuiNon===true ?
              "<span style='font-weight:bold'>Si vous aviez la possibilité de changer votre sourire, qu’aimeriez-vous changer ? </span><span style='color:red'>"+ value.souhaitsChangement +"</span>"
              :
              "<span>Aucun souhait de changement concernant la bouche.</span>"
            }
          </li>
        </article>

        <h3 style="text-decoration: underline;">
          DIVERS
        </h3>
        <article>        
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Avez-vous porté un appareil ou des bagues pour redresser vos dents ? </span>
            <span style='color:${value.appareilDentaireUneFois===true ? 'red':'black'}'>${returnOuiNon(value.appareilDentaireUneFois)}</span>
          </li>
          <li style='margin-bottom:5px;'>
          ${
            value.preoccupationDentsOuiNon==true ?
            "<span style='font-weight:bold'>Préoccupation principale concernant les dents ? </span><span style='color:red'>"+ value.preoccupationDents +"</span>"
            :
            "<span style='font-weight:bold'>Aucune préocuppation particulière concernant les dents.</span>"
          }
          </li>
          <li style='margin-bottom:5px;'>
            ${
              value.modifierDentsOuiNon===true ?
              "<span style='font-weight:bold'>Qu'aimeriez-vous modifier dans l’apparence de vos dents et de vos gencives ? </span><span style='color:red'>" + value.modifierDents +"</span>"
              :
              "<span style='font-weight:bold'>Je suis satisfait de l'apparence de mes dents et gencives</span>"
            }
          </li>
          
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Etes-vous anxieux à l’idée de réaliser des soins dentaires ? </span>
            <span style='color:"red"}'>${value.anxieuxSoinsDentaires}</span>
          </li>

          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Comment avez-vous connu le cabinet ?</span> ${value.commentConnaissezVousLeCabinet}
          </li>
          <li>
            ${
              value.autresRemarquesUtilesOuiNon===true ?
              "<span style='font-weight:bold'>Autres remarques utiles : </span></span>" + (value.autresRemarquesUtiles)+"</span>"
              :
              "<span style='font-weight:bold'>Pas d'autres remarques</span>"
            }
          </li>  
        </article>
      </div>
    </body>
    </html>
    `
  )
}

export const getHTMLChildForm = (value:any) => {
  return(
    `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="width:21cm;margin:0 auto;padding: 2px;">
      <div style="margin:0 auto;">
        <div style="text-align: center; background-color: darkgray; padding:2px">
          <h1 style="font-family: 'Times New Roman', Times, serif;margin-bottom: 5px;">L'ENVOL&Eacute;E</h1>
          <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 15px; margin-top: 0;">Cabinet dentaire</h2>
          <h3>Dr. Sylvie MA-FRANCIN</h3>
          <h4>Fiche renseignement enfant</h4>
        </div>
        <main style="padding-top: 20px;">
          <div style="display:flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px;">
            <div style="font-weight: bold;">
              ${value.nom} ${value.prenom}
            </div>
            <div>
              <span style="font-weight: bold;">Date : </span>${displayDateNormal(value.dateRdv)}
            </div>
          </div>

          <li>
            <span style="font-weight: bold;">Date de naissance : </span> ${displayDateNormal(value.dateDeNaissance)}
          </li>

          ${
            value.telEnfant !== "" ? "<li><span style='font-weight: bold;'>Téléphone :</span>" + value.telEnfant + "</li>" : ""
          }

          <li>
            <span style="font-weight: bold;">Adresse : </span>${value.adresse} 
            <span style="font-style: italic;">${value.codePostal} ${value.ville}</span>
          </li>

          <li>
            <span style="font-weight: bold;">Niveau scolaire : </span>${value.niveauScolaire} 
          </li>
          ${
            value.hobbies.length !== 0 && "<li><span style='font-weight: bold;'>Loisirs, hobbies : </span>" + value.hobbies.join(", ") + "</li>" 
          }

          <li>
          ${
            value.fratrie === true ?
            "<span style='font-weight: bold;'>Nombre de frère et soeur : " + value.nbreFrereSoeur + "</span> <br/> <span>Place dans la fratrie : "+ value.place + "</span>"
            :
            "<span style='font-weight: bold;'>Pas de frères et soeurs.</span>"
          }
          </li>


          <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
            IDENTITE DES RESPONSABLES LEGAUX
          </h2>

          <article>
            ${
              value.responsablesParents === false ?
              "<li style='margin-bottom:5px; font-weight:bold;'>Les responsables légaux ne sont pas les parents de l'enfants.</li>"
              :
              ""
            }
            <div style='font-weight: bold;margin:10px 0;text-decoration:underline;'>
              ${
                value.responsablesParents === false ?
                "Responsable légal 1"
                :
                "Parent 1"
              }
            </div>

            <li>
              <span style="font-weight: bold;">Nom : </span> <span>${value.parentOne.nom} </span>
            </li>

            <li>
              <span style="font-weight: bold;">Prénom : </span> <span>${value.parentOne.prenom} </span>
            </li>
            <li>
              <span style="font-weight: bold;">Tél : </span> <span>${value.parentOne.tel} </span>
            </li>
            <li>
              <span style="font-weight: bold;">Profession : </span> <span>${value.parentOne.profession} </span>
            </li>
            ${
              value.parentOne.emailOuiNon === true ?
              "<li><span style='font-weight: bold;'>E-mail : </span> <span>"+ value.parentOne.email + "</span></li>"
              :
              ""
            }

            <div style='font-weight: bold;margin:10px 0;text-decoration:underline;margin:5px,0;'>
              ${
                value.responsablesParents === false && typeof(value.parentTwo) !=='string' ?
                "Responsable légal 2"
                :
                value.responsablesParents === true && typeof(value.parentTwo) !=='string' ?
                "Parent 2"
                :
                value.responsablesParents === true && typeof(value.parentTwo) === "string" ?
                "<span style='color:red;text-decoration:none;'>Je suis dans l'incapacité de renseigner les coordonnées du second parent.</span>"
                :
                ""
              }
            </div>


            ${
              value.parentTwo !== null && typeof(value.parentTwo) !== 'string' ?
              `<li> <span style='font-weight: bold;'>Nom : </span> <span> ${value.parentTwo.nom} </span></li>
              <li><span style='font-weight: bold;'>Prénom : </span> <span>${value.parentTwo.prenom}</span></li>
              <li><span style='font-weight: bold;'>Tél : </span> <span>${value.parentTwo.tel}</span></li>
              <li><span style='font-weight: bold;'>Profession : </span> <span>${value.parentTwo.profession}</span></li>
              ${
                value.parentTwo.emailOuiNon === true ?
                "<li><span style='font-weight: bold;'>E-mail : </span> <span>"+ value.parentTwo.email + "</span></li>" : ""
              }`
              :
              ""
            }

            <li>
              <span style="font-weight: bold;">Situation familiale : </span> <span>${value.situationFamiliale} </span>
            </li>
          </article>


          <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
            RENSEIGNEMENT SUR LA CONSULTATION
          </h2>
          <article>
            <li>
              <span style="font-weight: bold;">Motif de la consultation : </span> <span>${value.motif} </span>
            </li>
            <li>
              ${
                value.firstVisitDentiste === true ?
                "<span style='font-weight: bold;color:red;'>Première visite chez le dentiste.</span>"
                :
                "<span style='font-weight: bold;'>Dernière visite chez le dentiste le : " + displayDateNormal(value.dateDerniereConsultation) + "</span>"
              }
            </li>
            <li>
              <span style="font-weight: bold;">A-t-il déjà fait des radios dentaire : </span> <span style='color:${value.radiosDentaires === true ? "black": "red"}' >${returnOuiNon(value.radiosDentaires)} </span>
            </li>
            <li>
              <span style="font-weight: bold;">Première visite dans ce cabinet : </span> <span>${returnOuiNon(value.firstVisiteCabinet)}</span>
            </li>
            <li>
              <span style="font-weight: bold;">Comment connaissez-vous le cabinet ? </span> <span>${value.commentConnaissezVousLeCabinet}</span>
            </li>

          </article>
              

          <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
            ETAT DE SANTE GENERAL DE L'ENFANT
          </h2>
          <article>
            <li>
              <span style="font-weight: bold;">A-t-il des problèmes de santé ? : </span>
              <span style="color:${value.problemeSante===true ? 'red':'black'}">${returnOuiNon(value.problemeSante)}</span>
            </li>
            <li>
              <span style="font-weight: bold;">Est-il sous surveillance médicale ? : </span>
              <span style="color:${value.surveillanceMedicale===true ? 'red':'black'}">${returnOuiNon(value.surveillanceMedicale)}</span>
              ${
                value.surveillanceMedicale===true ?
                `<span style='color:red;'>
                  | Surveillé(e) ${value.periodeSurveillanceMedicale} pour ${value.raisonSurveillanceMedicale}
                </span>`
                :
                ""
              }
            </li>
            <li>
              <span style="font-weight: bold;">Prise de médicaments : </span>
              <span  style="color:${value.priseMedicamentsChild===true ? 'red':'black'}">${returnOuiNon(value.priseMedicamentsChild)}</span>
              ${
                value.priseMedicamentsChild===true ?
                `<span style="color:red;"> || 
                  ${
                    value.listeMedicamentsChild.map((medic:MedicamentsChild) => (
                      `<span>
                        ${medic.nomMedicament} tous/toutes les ${medic.frequence} 
                      </span>`
                    ))
                  }
                </div>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">Allergies médicamenteuses : </span>
              <span  style="color:${value.allergiesMedicamentsOuiNon===true ? 'red':'black'}">${returnOuiNon(value.allergiesMedicamentsOuiNon)}</span>
              ${
                value.allergiesMedicamentsOuiNon===true ?
                `<span style="color:red;"> || ${ value.listeAllergiesMedicaments.join(",")}</span>`
                :""
              }
            </li>

            <li>
              <span style="font-weight: bold;">Maladie(s) grave(s) : </span>
              <span style="color:${value.maladieGraveOuiNon===true ? 'red':'black'}">${returnOuiNon(value.maladieGraveOuiNon)}</span>
              ${
                value.maladieGraveOuiNon===true ?
                `<span style="color:red;">
                  ${
                    value.listeMaladiesGraves.map((maladie:MaladieGraveChild) => (
                      `<span>
                        || ${maladie.nomMaladie} à l'âge de ${maladie.age} an(s)
                      </span>`
                    ))
                  }
                </span>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">A-t-il déjà été opéré ? : </span>
              <span style="color:${value.operationOuiNon===true ? 'red':'black'}">${returnOuiNon(value.operationOuiNon)}</span>
              ${
                value.operationOuiNon===true ?
                `<span> 
                  ${
                    value.listeOperations.map((maladie:OperationChild) => (
                      `<span>
                        || ${maladie.cause} à l'âge de ${maladie.age} an(s)
                      </span>`
                    ))
                  }
                </span>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">Autres antécédents médicaux : </span>
              <span  style="color:${value.autresAntecedentsMedicauxOuiNon===true ? 'red':'black'}">${returnOuiNon(value.autresAntecedentsMedicauxOuiNon)}</span>
              ${
                value.autresAntecedentsMedicauxOuiNon===true ?
                `<div style="color:red";>${ value.autresAntecedentsMedicaux}</div>`
                :
                ""
              }
            </li>
          </article>


          <h2 style="background-color: darkgray;font-size: 17px;padding: 2.5px;text-align: center;margin: 10px auto;">
            ETAT DE SANTE BUCCO-DENTAIRE DE L'ENFANT
          </h2>
          <article>
            <li>
              <span style="font-weight: bold;">Moment(s) du lavage de dents : </span>
              <span style="color:${value.operationOuiNon===true ? 'red':'black'}">${value.momentsBrossageDents.join(", ")}</span>
            </li>

            <li>
              <span style="font-weight: bold;">Brossage des dents tout seul : </span>
              <span>${returnOuiNon(value.brossageSeul)}</span>
            </li>

            <li>
              <span style="font-weight: bold;">Nombre de repas par jour : </span>
              <span>${value.nbRepasParJour.toString()}</span>
            </li>

            <li>
              <span style="font-weight: bold;">Sucreries : </span>
              <span style="color:${value.sucrerieOuiNon===true ? 'red':'black'}">${returnOuiNon(value.sucrerieOuiNon)} </span>
              ${
                value.sucrerieOuiNon === true ?
                `<span style="color:red;">|| ${value.frequenceSucrerie}</span>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">Boissons (hors eau) : </span>
              <span style="color:${value.sodaOuiNon===true ? 'red':'black'}">${returnOuiNon(value.sodaOuiNon)} </span>
              ${
                value.sodaOuiNon===true ?
                `<span style="color:red;">
                  ${
                    value.sodasListe.map((maladie:Boisson) => (
                      `<span>
                        || ${maladie.boisson} tous/toutes les ${maladie.frequence} an(s) 
                      </span>`
                    ))
                  }
                </span>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">A-t-il déjà eu des caries dans le passé : </span>
              <span style="color:${value.cariesAvant===true ? 'red':'black'}">${returnOuiNon(value.cariesAvant)} </span>
            </li>

            <li>
              <span style="font-weight: bold;">Lui a-t-on déjà enlevé une dent ? : </span>
              <span style="color:${value.dentEnleveOuiNon===true ? 'red':'black'}">${returnOuiNon(value.dentEnleveOuiNon)}</span>
            </li>
            <li>
              <span style="font-weight: bold;">Dent(s) cassé(s) : </span>
              <span style="color:${value.dentCasseOuiNon===true ? 'red':'black'}">${returnOuiNon(value.dentCasseOuiNon)}</span>
              ${
                value.dentCasseOuiNon===true ?
                `<span style="color:red;">  
                  ${
                    value.dentCasse.map((dent:DentCasse) => (
                      `<span>
                        || ${dent.nomDentCasse} en ${dent.comment} 
                      </span>`
                    ))
                  }
                </span>`
                :
                ""
              }
            </li>

            <li>
              <span style="font-weight: bold;">Problème suite à un traitement dentaire : </span>
              <span style="color:${value.problemeApresTraitementDentaire===true ? 'red':'black'}">${returnOuiNon(value.problemeApresTraitementDentaire)}</span>
            </li>    

            <li>
              <span style="font-weight: bold;">Traitement ortho actuel ou par le passé : </span>
              <span style="color:${value.traitementOrtho === true ? "red":"black"}">${returnOuiNon(value.traitementOrtho)}</span>
            </li>              
            
            <li>
            ${
              value.habitudesChild.length>0 ?
              `<span style="font-weight: bold;">Habitudes : </span><span style="color:red">${value.habitudesChild.join(", ")} </span>`
              :
              "<span>Pas de mauvaises habitudes (pouce, tétine, ongle rongé).</span>"
            }
            </li>

            <li>
              <span style="font-weight: bold;">Anesthésie locale : </span>
              <span style="color:${value.anesthesieLocale===true ? 'red':'black'}">${returnOuiNon(value.anesthesieLocale)}</span>
            </li>    
            <li>

              <span style="font-weight: bold;">Anesthésie dentaire : </span>
              <span style="color:${value.anesthesieDentaire===true ? 'red':'black'}">${returnOuiNon(value.anesthesieDentaire)}</span>
            </li>  

            <li>
              <span style="font-weight: bold;">Séance(s) d'orthophonie : </span>
              <span style="color:${value.orthophonie===true ? 'red':'black'}">${returnOuiNon(value.orthophonie)}</span>
            </li>  
            
            <li>
            ${
              value.troubleSommeil.length>0 ?
              `<span style="font-weight: bold;">Trouble(s) du sommeil : </span><span style="color:red;">${value.troubleSommeil.join(", ")} </span>`
              :
              "<span>Pas de troubles du sommeil.</span>"
            }
            </li>

            <li>
            ${
              value.craintesGeneralesOuiNon === true ?
              `<span style="font-weight: bold;">Phobies, craintes : </span><span style="color:red;">${value.listeCraintesGenerales.join(", ")} </span>`
              :
              "<span>Pas de phobies particulières.</span>"
            }
            </li>

            <li>
              <span style="font-weight: bold;">Crainte du dentiste : </span>
              <span style="color:${value.craintesDentiste===true ? 'red':'black'}">${returnOuiNon(value.craintesDentiste)}</span>
            </li>  

            <li>
            ${
              value.remarquesUtilesOuiNon === true ?
              `<span style="font-weight: bold;">Remarques utiles : </span><span>${value.remarquesUtiles} </span>`
              :
              "<span>Pas de remarque à ajouter.</span>"
            }
            </li>
          </article>

      </div>
    </body>
    </html>
    `
  )
}