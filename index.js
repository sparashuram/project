import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import OnboardingScreen from './components/Onboarding';
AppRegistry.registerComponent(appName, () => OnboardingScreen);
