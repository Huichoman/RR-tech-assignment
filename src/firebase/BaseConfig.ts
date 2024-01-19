import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection,
    addDoc,
    deleteDoc,getDocs, query } from 'firebase/firestore';

const  app  =  initializeApp({
 apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
 storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

export const firebaseAuth = getAuth(app);
export default app;
export const db = getFirestore(app);

export const getData = async (id) => {
    const productsRef = collection(db, "products");
    const result = await getDocs(query(productsRef));
    // console.log(getArrayFromCollection(result));
    // console.log(result.id);
    return await getArrayFromCollection(result);
  };
  
  const getArrayFromCollection = (collection) => {
    return collection.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };