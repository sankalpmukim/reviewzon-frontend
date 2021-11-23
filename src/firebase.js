// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbccd9KLDo_CONhPJz7HjaXTRRK06f8Jg",
  authDomain: "reviewzon-6ccc8.firebaseapp.com",
  databaseURL:
    "https://reviewzon-6ccc8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reviewzon-6ccc8",
  storageBucket: "reviewzon-6ccc8.appspot.com",
  messagingSenderId: "383951442167",
  appId: "1:383951442167:web:728795d909557f7f4843f2",
  measurementId: "G-V2ZWNNG9BB",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const remoteConfig = getRemoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
const defaultObj = {
  backend_url: "http://localhost:8000",
  cloud_commands: [
    {
      name: "placeholder0",
      description: "this will be displayed in help for placeholder0",
      target: "/placeholder/0",
      meta: {
        description: "meta is useful for providing info for planned cases",
        useFirebase: true,
        firebase: { rtdb_path: "testing/dynamic" },
      },
    },
  ],
};

remoteConfig.defaultConfig = defaultObj;
