import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGER_ID,
  APP_ID,
} from "@env";

//Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGER_ID,
  appId: APP_ID,
};

app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
