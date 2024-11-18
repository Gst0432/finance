import { Firestore, enableIndexedDbPersistence } from 'firebase/firestore';

export const enablePersistence = async (db: Firestore) => {
  try {
    await enableIndexedDbPersistence(db);
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('La persistance a échoué - plusieurs onglets ouverts');
    } else if (err.code === 'unimplemented') {
      console.warn('Le navigateur ne supporte pas la persistance');
    }
  }
};