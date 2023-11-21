import { StyleSheet, Text, Pressable, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './components/SearchScreen';
import Artwork from './components/Artwork';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ title: 'Search Artworks'}}  
        />
        <Stack.Screen 
          name="Artwork" 
          component={Artwork} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 100
  },
});
