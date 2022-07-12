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

export const getHTMLAdultForm = (value:any)=>{
  const returnOuiNon = (statement: boolean)=>{
    if(statement===true){
      return "OUI"
    } else {
      return "NON"
    }
  }
 
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
              Patient : ${value.genre === "Madame" ? "Mme":"M."} ${value.nom} ${value.prenom}
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
                <span style="${value.changementEtatSante===true ? "red":"black"}">${returnOuiNon(value.changementEtatSante)}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold;'>Problèmes connus par le passé : </span><span style='color:red'>${value.maladies.join(", ")} </span>
              </li>

              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident? : </span>
                <span style="${value.saignementInterventionAccident===true ? "red":"black"}">${returnOuiNon(value.saignementInterventionAccident)}</span>
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Avez-vous subi un traitement par radiations ? </span>
                <span style="${value.traitementRadiations===true ? "red":"black"}">${returnOuiNon(value.traitementRadiations)}</span>
              </li>  
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Prise de médicaments actuellement ? </span>
                <span style="color:${value.priseMedicamentActuelle===true ? "red":"black"}">${returnOuiNon(value.priseMedicamentActuelle)} ${value.priseMedicamentActuelle===true && " : " + value.medicamentsActuels.join(", ")}</span>
                  
              </li>
              <li style='margin-bottom:5px;'>
                <span style="font-weight: bold;">Allergies ? </span>
                <span style="color:${value.allergies?"red":"black"};">${returnOuiNon(value.allergies)}</span>
                
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
                "<li style='margin-bottom:5px;'><span style='font-weight: bold; margin-bottom:5px'>Enceinte ? </span><span style='color:"+(value.enceinte? "red":"black")+";'>" + returnOuiNon(value.enceinte) +"</span></li>"
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
                "<li style='margin-bottom:5px;'><span style='font-weight:bold'>Prise de la pilule ? </span><span style='color:"+(value.pilule? "red":"black")+";'>"+ returnOuiNon(value.pilule) +"</span></li>"
                :
                ""
              }
              <li style='margin-bottom:5px;'>
                <span style='font-weight: bold'>Traitement contre l'ostéoporose ? </span style='color:${value.osteoporose===true ? "red":"black"}'>
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
            <span style='color:${value.serrementGrincementDents ? "red":"black"}'>${returnOuiNon(value.serrementGrincementDents)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold;'>Craquements, claquements ou douleur à l’ouverture de la mâchoire ?</span>
            <span style='color:${value.craquementClaquementDouleurOuvertureMachoire ? "red":"black"}'>${returnOuiNon(value.craquementClaquementDouleurOuvertureMachoire)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold;'>Difficultés à avaler, à mâcher ou ne mâchez seulement d’un côté ? </span>
            <span style='color:${value.difficulteAvalerMacherCoteUnique ? "red":"black"}'>${returnOuiNon(value.difficulteAvalerMacherCoteUnique)}</span>
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
            <span style='color:${value.utilisationFilDentaireBrossette ? "red":"black"}'>${returnOuiNon(value.utilisationFilDentaireBrossette)}</span>
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
            <span style='color:${value.mauvaiseHaleine ? "red":"black"}'>${returnOuiNon(value.mauvaiseHaleine)}</span>
          </li>
        </article>

        <h3 style="text-decoration: underline;">
          DENTISTERIE ESTHÉTIQUE
        </h3>
        <article>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Dans un large sourire, vos dents sont-elles toutes de la même couleur ? </span>
            <span style='color:${value.dentsMemeCouleurs ? "red":"black"}'>${returnOuiNon(value.dentsMemeCouleurs)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Aimeriez-vous avoir des dents plus blanches ? </span>
            <span style='color:${value.souhaitDentsPlusBlanches ? "red":"black"}'>${returnOuiNon(value.souhaitDentsPlusBlanches)}</span>
          </li>
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Etes-vous satisfait(e) de l’apparence de vos dents et de vos gencives ? </span>
            <span style='color:${value.satisfactionDentsGencives ? "red":"black"}'>${returnOuiNon(value.satisfactionDentsGencives)}</span>
          </li>
        
        
          <li style='margin-bottom:5px;'>
            <span style='font-weight:bold'>Mettez-vous la main devant la bouche lorsque vous riez ou souriez ? </span>
            <span style='color:${value.mainDevantBoucheSourire ? "red":"black"}'>${returnOuiNon(value.mainDevantBoucheSourire)}</span>
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
            <span style='color:${value.appareilDentaireUneFois===true ? "red":"black"}'>${returnOuiNon(value.appareilDentaireUneFois)}</span>
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

