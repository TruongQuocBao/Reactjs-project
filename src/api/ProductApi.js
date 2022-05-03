/* eslint-disable no-use-before-define */
import axiosClient from './axiosClient';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db, app } from './apiFirebase';

async function getListProduct(params, startAfter1) {
  let sortValue;
  let isFreeShip;
  let isPromotion;

  if (params._sort) {
    const orderValue = params._sort.split(':')[1];
    sortValue = orderValue === 'ASC' ? 'asc' : 'desc';
  }

  if (params.isFreeShip !== undefined) {
    isFreeShip = params.isFreeShip;
  }

  if (params.isPromotion !== undefined) {
    isPromotion = params.isPromotion;
  }

  let qr1 = query(
    collection(db, 'products'),
    orderBy('salePrice', sortValue),
    limit(params._limit)
  );

  if (params['category.id']) {
    qr1 = query(qr1, where('category', '==', params['category.id']));
  }

  if (params.startAfter) {
    qr1 = query(qr1, startAfter(startAfter1));
  }

  if (params.isFreeShip) {
    qr1 = query(qr1, where('isFreeShip', '==', isFreeShip));
  }

  if (params.isPromotion) {
    qr1 = query(qr1, where('isPromotion', '==', isPromotion));
  }

  if (params.salePrice_lte) {
    qr1 = query(
      qr1,
      where('salePrice', '>', parseInt(params.salePrice_gte)),
      where('salePrice', '>', parseInt(params.salePrice_lte))
    );
  }

  const snapshot = await getDocs(qr1);
  const proList = [];
  snapshot.forEach((doc) => {
    proList.push({ id: doc.id, ...doc.data() });
  });
  return { proList, raw: snapshot };
}

async function getCount(params) {
  if (params['category.id']) {
    return getDocs(
      query(collection(db, 'products'), where('category', '==', params['category.id']))
    );
  }
  return getDocs(query(collection(db, 'products')));
}

async function getProductId(id) {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);

  return { data: { ...docSnap.data(), id: docSnap.id } };
}

const productApi = {
  async getAll(params, startAfter) {
    // Transform _page to _start
    const newParams = { ...params };
    const { proList, raw } = await getListProduct(newParams, startAfter);

    const count = await getCount(params);

    return {
      data: proList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count.size,
        startAfter: raw.docs[raw.docs.length - 1],
      },
    };
  },

  get(id) {
    // const url = `/products/${id}`;
    // return axiosClient.get(url);
    return getProductId(id);
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
