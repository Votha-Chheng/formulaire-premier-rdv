import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { FC, useEffect, useState } from 'react';
import { globalStyles } from '../globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Button } from 'react-native-paper';
import { getMaladies } from '../store/adultState/medicalInfo';

const OtherDiseases: FC = ()=>{

  const [inputValue, setInputValue] = useState("")
  const [showNewValues, setShowNewValues] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [extraDiseases, setExtraDiseases] = useState<string[]>([])

  const {maladies} = useSelector((state: RootState) => state.medicalHistory)

  const dispatch = useDispatch()

  useEffect(()=>{
    extraDiseases.length>0 ? setShowDelete(true) : setShowDelete(false)
  }, [extraDiseases])

  useEffect(()=>{
    extraDiseases.length === 0 && setDeleteMode(false)
  }, [extraDiseases])

  const validateNewDisease = ()=> {
    setExtraDiseases([...extraDiseases, inputValue])
    const newArrayExtraMaladies = [...maladies, inputValue]
    dispatch(getMaladies(newArrayExtraMaladies))
    setInputValue("")
    setShowNewValues(false)
  }

  const deleteDisease = (event: any)=>{
    let temp = extraDiseases.filter((disease) => disease !== (event._dispatchInstances.memoizedProps.children[0].props.children))
    let tempState = maladies.filter((disease) => disease !== (event._dispatchInstances.memoizedProps.children[0].props.children))
    dispatch(getMaladies(tempState))
    setExtraDiseases(temp)
  }

  return (
    <ScrollView style={[globalStyles.container, {marginBottom:15}]}>
      <View style={[globalStyles.flexRow, {flexWrap:"wrap"}]}>
        <Text style={[globalStyles.label]}>
          Autres (ajouter un seul élément à la fois puis valider) :
        </Text>
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", marginBottom:0}]}> 
          {
            extraDiseases.length>0 ? 
            extraDiseases.map((disease, index)=> (
              <TouchableOpacity 
                key={index}
                style={
                  deleteMode 
                  ? 
                  [styles.deletable, { height:50, padding:5, marginLeft:10, borderRadius:5}] 
                  : 
                  [styles.noDelete, { height:50, padding:5, marginLeft:10, marginBottom:2.5, borderRadius:5}]
                }
                onPress={(event)=> deleteMode && deleteDisease(event)}
              >
                <Text style={{fontSize:20, color: `${deleteMode ? "white" : "purple"}`, textAlign:"center", justifyContent:"center"}}>
                  {disease} 
                </Text>
              </TouchableOpacity>
            ))    
            : null
          }
        </View>
        {
          deleteMode && <Text style={{marginHorizontal:5, marginTop:0}}>
            (Appuyer sur un élément en rouge pour le supprimer de la liste.)
          </Text>
        }
      </View>
      
      <View style={globalStyles.flexRow}>
        {
          showNewValues ?
          <View style={{flexDirection:'row'}}>
            <TextInput
              style={[globalStyles.input, {width:250, marginRight:10}]}  
              onChangeText={(text)=>setInputValue(text)}
              placeholder='Maladie'
            />
            <Button
              mode="contained"
              color="orange"
              onPress={()=>setShowNewValues(false)}
              style={{marginHorizontal:5}}
            >
              Annuler
            </Button>
            <Button
              mode="contained"
              color={inputValue.length<1? "#e5e2de" :"green"}
              labelStyle={{color:  "whitesmoke"}}
              onPress={()=>validateNewDisease()}
              style={{marginHorizontal:5}}
            >
              Valider
            </Button>
          </View>
          :
          <View style={[globalStyles.flexRow, {marginBottom:0}]}>
            <Button 
              mode='contained'
              color="#2086EB"
              onPress={()=>setShowNewValues(true)}
              disabled={deleteMode}
              style={{marginHorizontal:5}}
            >
              AJOUTER
            </Button>

            {
              showDelete 
              ?
              <Button
                color="#f79c09"
                onPress={()=>setDeleteMode(prev => !prev)}
                mode="contained"
                style={{marginHorizontal:5}}
              >
                {deleteMode ? "FIN SUPPRESSION":"SUPPRIMER"}
              </Button>
              
              :
              null
            }
          </View>  
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  extraDiseases :{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  deletable : {
    backgroundColor:"red",
  },
  noDelete: {
    backgroundColor:"#fff",
    borderWidth: 2,
    borderColor: "purple"
  }
});

export default OtherDiseases