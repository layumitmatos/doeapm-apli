import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2d0cfb6548534d238d06deeb1ad8db83',
  appName: 'DOE APM',
  webDir: 'dist',
  server: {
    url: 'https://2d0cfb65-4853-4d23-8d06-deeb1ad8db83.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e3a8a',
      androidSplashResourceName: 'splash',
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      showSpinner: true
    }
  }
};

export default config;