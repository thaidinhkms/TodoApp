/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { bootstrap } from './bootstrap';

bootstrap();
AppRegistry.registerComponent(appName, () => App);
