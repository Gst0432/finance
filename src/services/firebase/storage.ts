import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

export const uploadFile = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw new Error('Échec du téléchargement du fichier');
  }
};

export const uploadCompanyLogo = async (
  userId: string,
  file: File
): Promise<string> => {
  try {
    const path = `logos/${userId}/${file.name}`;
    return await uploadFile(file, path);
  } catch (error) {
    throw new Error('Échec du téléchargement du logo');
  }
};