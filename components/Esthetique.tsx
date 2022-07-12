import { View } from 'react-native';
import React, { FC } from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import RadioComponent from './RadioComponent';
import Label from './Label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getDentsMemeCouleurs, getMainDevantBoucheSourire, getSatisfactionDentsGencives, getSouhaitDentsPlusBlanches, getSouhaitsChangement, getSouhaitsChangementOuiNon } from '../store/adultState/esthetiqueInfo';
import AddText from './AddText';

const Esthetique: FC = () => {

  const {
    dentsMemeCouleurs,
    souhaitDentsPlusBlanches,
    satisfactionDentsGencives,
    mainDevantBoucheSourire,
    souhaitsChangementOuiNon,
    souhaitsChangement
  } = useSelector((state: RootState) => state.esthetiqueInfo)

  const dispatch = useDispatch()


  return (
    <View style={[globalStyles.container, {marginBottom:25}]}>
      <SubTitles title="DENTISTERIE ESTH&Eacute;TIQUE" />
      <View style={{marginTop:15}}>
        <View>
          <Label 
            question="Dans un large sourire, vos dents sont-elles toutes de la même couleur ?"
            statement={dentsMemeCouleurs}
          />
          <RadioComponent
            valueState={dentsMemeCouleurs}
            setValueToTrue={()=>dispatch(getDentsMemeCouleurs(true))}
            setValueToFalse={()=>dispatch(getDentsMemeCouleurs(false))}
          />
        </View>
        <View>
          <Label 
            question="Aimeriez-vous avoir des dents plus blanches ?"
            statement={souhaitDentsPlusBlanches}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={souhaitDentsPlusBlanches}
            setValueToTrue={()=>dispatch(getSouhaitDentsPlusBlanches(true))}
            setValueToFalse={()=>dispatch(getSouhaitDentsPlusBlanches(false))}
          />
        </View>
        <View>
          <Label 
            question="Êtes-vous satisfait(e) de l’apparence de vos dents et de vos gencives ?"
            statement={satisfactionDentsGencives}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={satisfactionDentsGencives}
            setValueToTrue={()=>dispatch(getSatisfactionDentsGencives(true))}
            setValueToFalse={()=>dispatch(getSatisfactionDentsGencives(false))}
          />
        </View>
        <View>
          <Label 
            question="Mettez-vous la main devant la bouche lorsque vous riez ou souriez ?"
            statement={mainDevantBoucheSourire}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={mainDevantBoucheSourire}
            setValueToTrue={()=>dispatch(getMainDevantBoucheSourire(true))}
            setValueToFalse={()=>dispatch(getMainDevantBoucheSourire(false))}
          />
        </View>

        <View>
          <Label 
            question="Si vous aviez la possibilité de changer votre sourire, aimeriez-vous changer quelque chose ?"
            statement={souhaitsChangementOuiNon}
          />
          <RadioComponent
            valueState={souhaitsChangementOuiNon}
            setValueToTrue={()=>{
              dispatch(getSouhaitsChangementOuiNon(true))
              dispatch(getSouhaitsChangement(undefined))
            }}
            setValueToFalse={()=>{
              dispatch(getSouhaitsChangementOuiNon(false))
              dispatch(getSouhaitsChangement(""))
            }}
          />
        </View>
        {
          souhaitsChangementOuiNon === true &&
          <AddText
            dispatcher={dispatch}
            reducerFromStore={getSouhaitsChangement}
            statement={souhaitsChangement}
            parentState={souhaitsChangementOuiNon}
            questionForLabel="Qu'aimeriez-vous changer dans votre sourire ?"
            placeHolder='Décrivez tout ce que vous aimeriez changer...'
            parentStateShouldBe={true}
          />
        }

      </View>  
    </View>
  );
};

export default Esthetique;
