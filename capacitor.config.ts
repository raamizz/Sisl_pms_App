import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'sisl_pw_app',
  webDir: 'build',
  plugins:{
    "camera":{
      "saveToGallery":true
    }
  }
};

export default config;
