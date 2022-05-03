import axiosClient from './axiosClient';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './apiFirebase';

async function getCategory() {
  const qr = query(collection(db, 'categories'));
  const snapshot = await getDocs(qr);
  const proList = [];
  snapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    proList.push({ id: doc.id, ...doc.data() });
  });
  return proList;
}

const categoryApi = {
  getAll(params) {
    return getCategory();

    // const url = '/categories';
    // return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
