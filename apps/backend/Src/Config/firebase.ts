import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import fs from "fs";

function getCredential() {
  if (
    process.env.GOOGLE_APPLICATION_CREDENTIALS &&
    fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  ) {
    return applicationDefault();
  }

  const credentialsDir = path.join(__dirname, "../credentials");
  if (fs.existsSync(credentialsDir)) {
    const files = fs
      .readdirSync(credentialsDir)
      .filter((file) => file.endsWith(".json"));
    if (files.length > 0) {
      const credPath = path.join(credentialsDir, files[0]);
      return cert(credPath);
    }
  }

  return applicationDefault();
}

const firebaseApp =
  getApps().length === 0
    ? initializeApp({
        credential: getCredential(),
      })
    : getApps()[0];

export const db = getFirestore(firebaseApp);
db.settings({ ignoreUndefinedProperties: true });

export async function ConnectDb() {
  // Firestore initializes automatically with db instance
}
