import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './components/SearchScreen';
import Artwork from './components/Artwork';

const Stack = createNativeStackNavigator();

// Creates the base app with navigation between the search page and an artwork's page
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
