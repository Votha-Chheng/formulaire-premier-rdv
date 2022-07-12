import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import * as SplashScreen from 'expo-splash-screen';
import { Inter_900Black, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {Roboto_400Regular, Roboto_900Black} from '@expo-google-fonts/roboto';
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,} from '@expo-google-fonts/rubik';
import { 
  FrankRuhlLibre_300Light,
  FrankRuhlLibre_400Regular,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_700Bold,
  FrankRuhlLibre_900Black 
} from '@expo-google-fonts/frank-ruhl-libre';
import {useFonts} from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AdultFormScreen from './screens/AdultFormScreen';
import ChildFormScreen from './screens/ChildFormScreen';
import ListePatientsScreen from './screens/ListePatientsScreen';
import MerciScreen from './screens/MerciScreen';

export type RootStackParamList = {
  Home: undefined
  AdultForm: undefined
  ChildForm: undefined
  ListePatients: undefined
  Merci: undefined
};

const RootStack = createStackNavigator<RootStackParamList>();

const App: FC = () => {

  let fontsLoading = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Roboto_400Regular,
    Inter_600SemiBold,
    Roboto_900Black,
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    Rubik_300Light_Italic,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black_Italic,
    FrankRuhlLibre_300Light,
    FrankRuhlLibre_400Regular,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_700Bold,
    FrankRuhlLibre_900Black 
  })

  const displaySplash = async()=>{
    if (!fontsLoading) {
      try{
        await SplashScreen.preventAutoHideAsync()
      }
      catch(err:any){
        console.log(err.message)
        return err.message
        
      }
    } else {
      try{
        await SplashScreen.hideAsync()

      }
      catch(err: any){
        console.log(err.message)
        return err.message;
      }
    }
  }

  useEffect(()=>{
    displaySplash()
    
  }, [fontsLoading])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Home'>
          <RootStack.Screen name='Home' component={HomeScreen} />
          <RootStack.Screen name='AdultForm' component={AdultFormScreen} />
          <RootStack.Screen name='ChildForm' component={ChildFormScreen} />
          <RootStack.Screen name='ListePatients' component={ListePatientsScreen} />
          <RootStack.Screen name='Merci' component={MerciScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

export default App