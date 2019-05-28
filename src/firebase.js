import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyAPCqwTZhJiUnDYgFo_x4CN4Yj7PbLsENU",
  authDomain: "carteira-a73f8.firebaseapp.com",
  databaseURL: "https://carteira-a73f8.firebaseio.com",
  projectId: "carteira-a73f8",
  storageBucket: "carteira-a73f8.appspot.com",
  messagingSenderId: "109588004475",
  appId: "1:109588004475:web:edf05dbc3bf2b119"
});
  
export const db = app.database();
export const dbAuth = app;
export const contasRef = db.ref('contas');
export const movimentosRef = db.ref('movimentos');