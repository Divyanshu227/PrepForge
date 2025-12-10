import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
const formatPrivateKey = (key) => {
  if (!key) return null;

  let formattedKey = key.replace(/\\n/g, '\n');
  
  formattedKey = formattedKey.replace(/-----BEGIN PRIVATE KEY-----\n?/g, '').replace(/\n?-----END PRIVATE KEY-----\n?/g, '');

  return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
};

const firebaseConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
};

console.log("Firebase Config loaded:", {
  project_id: firebaseConfig.project_id,
  client_email: firebaseConfig.client_email,
  private_key_length: firebaseConfig.private_key?.length || 0
});

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const auth = admin.auth();

export { auth };
