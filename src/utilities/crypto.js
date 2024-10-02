import CryptoJS from "crypto-js";

const secretKey = "masudrana_924"; // Make sure to keep this key secure and not hard-coded in production

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
