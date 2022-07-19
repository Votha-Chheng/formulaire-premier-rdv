import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../globalStyles'
import { Button } from 'react-native-paper'
import { displayDateNormal, getHTMLAdultForm, getHTMLChildForm } from '../utils'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing'
import { moveAsync } from 'expo-file-system'

const ListFichesPatients: FC = () => {

  const [listePatients, setListePatients] = useState<any[] | null>([])

  const searchPatienteleInAsyncStorage = async()=>{
    try{
      const arrayPatienteleJSON: string | null = await AsyncStorage.getItem('Patientèle')

      if(arrayPatienteleJSON!==null){
        const arrayPatientele = JSON.parse(arrayPatienteleJSON)
        
        setListePatients(arrayPatientele)
        console.log("listePatients :", listePatients)

      } else {

        setListePatients(null)
        console.log("listePatients :", listePatients)
      }



      return
      
    } catch (error){
      console.log(error)
    }
  }

  useEffect(()=>{
    searchPatienteleInAsyncStorage()
  },[])


  const printPDF = async (values:any) => {
    await Print.printAsync({
      html : values.isAdult === true ? getHTMLAdultForm(values) : getHTMLChildForm(values)
    });

  }

  const exportFile = async (values: any, name: string) => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html : values.isAdult === true ? getHTMLAdultForm(values) : getHTMLChildForm(values)
    });
    console.log('File has been saved to:', uri);

    const pdfName = `${uri.slice(0, uri.lastIndexOf('/') + 1)}${name}.pdf`

    await moveAsync({
      from: uri,
      to: pdfName,
  })

    await shareAsync(pdfName, { UTI: '.pdf', mimeType: 'application/pdf' });
  }


  return (
    <View style={{maxWidth:"100%"}}>
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:"center", marginVertical:30}}>
        Liste des Fiches Patients
      </Text>
      <View style={{alignItems:'center'}}>
        {
          listePatients!==null && listePatients!== undefined && listePatients.length>0
          ?
          listePatients.reverse().map((liste, index)=>(
            <View 
              key={index.toString()}
              style={[globalStyles.flexRow, {marginBottom:20}]}
            >
              <View style={[styles.bandeau,{backgroundColor:`${index%2 === 0 ? "#4b8095" : "#dbe9ee"}`, alignItems:"center"}]}>
                <Text style={[styles.nom, { color:`${index%2===0 ? "#fff":"#4b8095"}`}]}>
                  {liste.nom.toUpperCase()} {liste.prenom}
                </Text>
                <Text style={{marginHorizontal:5, color:`${index%2===0 ? "#fff":"#4b8095"}`, fontSize:20}}>
                  venu le {displayDateNormal(new Date(liste.dateRdv).toDateString())}
                </Text>
              </View>
              <View>
                <Button
                  mode='contained'
                  style={{backgroundColor:'orange', marginBottom:5}}
                  onPress={()=>printPDF(liste)}
                >
                  Enregistrer le PDF
                </Button>
                <Button
                  mode='contained'
                  style={{marginTop:5}}
                  onPress={()=>exportFile(liste, `${liste.nom}-${liste.prenom}`)}
                >
                  Exporter le PDF
                </Button>
              </View>
            </View>
          ))
          : 
          <View style={{justifyContent:"center", alignItems:"center", height:"75%", width:"100%"}}>
            <Text style={{fontFamily:"FrankRuhlLibre_400Regular", fontSize:25, color:"black"}}>Aucun patient dans la base de données.</Text> 
          </View>
        }

      </View>
    </View>
  )
}

export default ListFichesPatients

const styles = StyleSheet.create({
  bandeau : {
    paddingVertical:2.5,
    paddingHorizontal:7.5,
    borderRadius:3,
    marginRight:5,
    height:80,
    justifyContent:'center'
  },
  nom : {
    fontSize:22.5, 
    fontWeight:"bold",
    marginRight:5
  }
})