import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe8PcMHeOlm4hEeD8zetPUDxCiUZV3EoE",
  authDomain: "event-rate-system-pro.firebaseapp.com",
  projectId: "event-rate-system-pro",
  storageBucket: "event-rate-system-pro.firebasestorage.app",
  messagingSenderId: "932892228777",
  appId: "1:932892228777:web:b7f50fa452081dc51c7db8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);