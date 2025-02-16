import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyCVhss3ROjN4yYYkd7SWOZ5q17wRFdHLpM",
	authDomain: "startrup-app.firebaseapp.com",
	projectId: "startrup-app",
	storageBucket: "startrup-app.firebasestorage.app",
	messagingSenderId: "796748926922",
	appId: "1:796748926922:web:cab798fdda31c059930933",
	measurementId: "G-H777HJNDEH"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
