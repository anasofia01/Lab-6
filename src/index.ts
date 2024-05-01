import firebase from './utils/firebase';
import { Song } from './types/Song';
import './components/index';
import { SongCard } from './components/index';
import { Attribute } from './components/Song/Song';

const formSong: Omit<Song, 'id'> = {
	image: '',
	Title: '',
	autor: '',
	album: '',
	dateAdded: '',
	duration: 0,
};

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render = this.render.bind(this);
	}

	connectedCallback() {
		this.render();
	}

	submitForm() {
		// firebase.addPosts(formPost);
		firebase.addSongs(formSong);
		this.render();
		// firebase.logIn(formPost.email,formPost.password);
	}

	changeImage(e: any) {
		formSong.image = e.target.value;
	}

	changeTitle(e: any) {
		formSong.Title = e.target.value;
	}

	changeAutor(e: any) {
		formSong.autor = e.target.value;
	}

	changeAlbum(e: any) {
		formSong.album = e.target.value;
	}

	changeDateAdded(e: any) {
		formSong.dateAdded = e.target.value;
	}

	changeDuration(e: any) {
		formSong.duration = e.target.value;
	}

	async render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'New Song';
		this.shadowRoot?.appendChild(title);

		const pTitle = this.ownerDocument.createElement('input');
		pTitle.placeholder = 'Song Title';
		pTitle.addEventListener('change', this.changeTitle);
		this.shadowRoot?.appendChild(pTitle);

		const pAutor = this.ownerDocument.createElement('input');
		pAutor.placeholder = 'Song Autor';
		pAutor.addEventListener('change', this.changeAutor);
		this.shadowRoot?.appendChild(pAutor);

		const pAlbum = this.ownerDocument.createElement('input');
		pAlbum.placeholder = 'Song Album';
		pAlbum.addEventListener('change', this.changeAlbum);
		this.shadowRoot?.appendChild(pAlbum);

		const pDateAdded = this.ownerDocument.createElement('input');
		pDateAdded.placeholder = 'Date Added';
		pDateAdded.addEventListener('change', this.changeDateAdded);
		this.shadowRoot?.appendChild(pDateAdded);

		const pDuration = this.ownerDocument.createElement('input');
		pDuration.placeholder = 'Song Duration';
		pDuration.addEventListener('change', this.changeDuration);
		this.shadowRoot?.appendChild(pDuration);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Add Song';
		save.addEventListener('click', this.submitForm);
		this.shadowRoot?.appendChild(save);

		const container = this.ownerDocument.createElement('div');
		this.shadowRoot?.appendChild(container);
		const songs = await firebase.getSongs();
		songs.forEach((song: Song) => {
			const newSongCard = this.ownerDocument.createElement('song-card') as SongCard;
			console.log(song.dateAdded);
			newSongCard.setAttribute(Attribute.Title, song.Title);
			newSongCard.setAttribute(Attribute.image, song.image);
			newSongCard.setAttribute(Attribute.autor, song.autor);
			newSongCard.setAttribute(Attribute.album, song.album);
			newSongCard.setAttribute(Attribute.dateAdded, song.dateAdded);
			newSongCard.setAttribute(Attribute.duration, song.duration.toString());
			container.appendChild(newSongCard);
		});
	}
}

customElements.define('app-container', AppContainer);
