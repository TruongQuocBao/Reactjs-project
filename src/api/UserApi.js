import axiosClient from './axiosClient';
import { auth, db } from './apiFirebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, getDoc } from 'firebase/firestore';

async function signUp(payload) {
  try {
    console.log('fsgsgsgs', payload);
    const responseRegister = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    const user = await setDoc(doc(db, 'user', responseRegister.user.uid), {
      fullname: payload.fullName,
    });
    console.log(user);
    return { ...responseRegister.user, fullname: { fullname: payload.fullName } };
  } catch (error) {
    console.log('fsgsgsghsh', error);
    const errorCode = error.code;
    const errorMessage = error.message;
  }

  // .then(async (userCredential) => {
  //     console.log(object);
  //     // Signed in
  //     const response = userCredential.user;
  //     const user = await setDoc(doc(db, 'user', response.uid), { fullname: payload.fullname });
  //     // const docRef = await addDoc(collection(db, 'user'), {
  //     //   id: response.uid,
  //     //   fullname: 'Bao',
  //     // });
  //     console.log(user);
  //     return response;
  //   })
  //   .catch((error) => {
  //     console.log('fsgsgsghsh', error);
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

  // return data;
}

async function login(payload) {
  const responseLogin = await signInWithEmailAndPassword(
    auth,
    payload.identifier,
    payload.password
  );

  const docRef = doc(db, 'user', responseLogin.user.uid);
  const docSnap = await getDoc(docRef);

  console.log(docSnap.data());

  return { ...responseLogin.user, fullname: docSnap.data() };
  // const
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;

  //     console.log(user);
  //     return user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
}

const userApi = {
  register(data) {
    return signUp(data);
    // const url = '/auth/local/register';
    // return axiosClient.post(url, data);
  },

  login(data) {
    return login(data);
    // const url = '/auth/local';
    // return axiosClient.post(url, data);
  },
};

export default userApi;
