import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.idevotion.chattuto',
  appName: 'ChatTuto',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "large",
      "spinnerColor": "#ffffff",
      "showSpinner": true,
      "splashFullScreen": true,
      "splashImmersive": true
    }
  }
};

export default config;
 