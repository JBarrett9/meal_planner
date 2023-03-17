const { initializeApp } = require("firebase-admin/app");
const { G_SECRET, GOOGLE_APPLICATION_CREDENTIALS } = process.env;

const app = initializeApp({
  credential: admin.credential.cert(JSON.parse(GOOGLE_APPLICATION_CREDENTIALS)),
});

const validateRecaptcha = async (response_key) => {
  try {
    const secret_key = G_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

    const response = await fetch(url, {
      method: "POST",
    });

    const result = response.json();
    return result.success == true;
  } catch (error) {
    return error;
  }
};

const verifyToken = async (idToken) => {
  try {
    const decodedToken = await app.getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    next(error);
  }
};

module.exports = { validateRecaptcha, verifyToken };
