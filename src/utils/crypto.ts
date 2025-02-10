import CryptoJS from "crypto-js";

const SECRET_KEY = "chiave_super_segreta"; // Meglio salvarla in un file .env

/**
 * Cifra un oggetto JavaScript e lo trasforma in una stringa
 * @param data - Dati da crittografare
 * @returns stringa crittografata
 */
export function encryptData<T>(data: T): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

/**
 * Decifra una stringa crittografata e la trasforma in un oggetto JavaScript
 * @param ciphertext - Stringa crittografata
 * @returns L'oggetto decifrato o null in caso di errore
 */
export function decryptData<T>(ciphertext: string | null): T | null {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
  } catch (error) {
    console.error("Errore durante la decrittazione:", error);
    return null;
  }
}