/* eslint-disable no-unused-expressions */

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.NUXT_ENV_API_KEY,
  authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
  projectId: process.env.NUXT_ENV_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGE_SENDER_ID,
  appId: process.env.NUXT_ENV_APP_ID,
  measurementId: process.env.NUXT_ENV_MEASUREMENT_ID
}

!firebase.apps.length ? firebase.initializeApp(config) : ''

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const clientsCollection = db.collection('clients')
const purchasesCollection = db.collection('purchases')
const productsCollection = db.collection('products')
const salesCollection = db.collection('sales')

export {
  firebase,
  auth,
  usersCollection,
  clientsCollection,
  purchasesCollection,
  productsCollection,
  salesCollection
} 