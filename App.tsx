import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigation/StackNavigator';

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
