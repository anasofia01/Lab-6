import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Song } from '../types/Song';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCLg7sLMT6IHqvK0uek1RWGLU59qxU8B8o',
	authDomain: 'lab6-6393c.firebaseapp.com',
	projectId: 'lab6-6393c',
	storageBucket: 'lab6-6393c.appspot.com',
	messagingSenderId: '894209387675',
	appId: '1:894209387675:web:f952abdb05a15ffa13ea3e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addSongs = async (song: Omit<Song, 'id'>) => {
	try {
		const where = collection(db, 'songs');
		await addDoc(where, song);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

const getSongs = async () => {
	const querySnapshot = await getDocs(collection(db, 'songs'));
	const transformed: Array<Song> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<Song, 'id'> = doc.data() as any;
		transformed.push({
			id: doc.id,
			...data,
		});
	});

	return transformed;
};

export default {
	addSongs,
	getSongs,
};
