import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Song } from '../types/Song';

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

const songDocuments = collection(db, 'songs');

export const addSongs = async (song: Song) => {
	try {
		await addDoc(songDocuments, song);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getSongs = async () => {
	const querySnapshot = await getDocs(songDocuments);
	const songs: Song[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data: Omit<Song, 'id'> = doc.data() as any;
		const songData = doc.data() as Song;
		songs.push(songData);
	});

	return songs;
};
