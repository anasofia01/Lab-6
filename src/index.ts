import styles from './index.css';
import { addSongs, getSongs } from './utils/firebase';
import './components/index';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadSongs();
		const formElement = this.shadowRoot?.querySelector('form');
		if (formElement) {
			formElement.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const songData = {
			name: formData.get('title') as string,
			image: formData.get('image') as string,
			author: formData.get('author') as string,
			album: formData.get('album') as string,
			dateAdded: formData.get('dateAdded') as string,
			duration: formData.get('duration') as string,
		};
		await addSongs(songData);

		const removeElement = this.shadowRoot?.querySelector('form');
		if (removeElement) {
			removeElement.reset();
		}

		this.loadSongs();
	}

	async loadSongs() {
		const saveSongs = await getSongs();

		const container = this.shadowRoot?.querySelector('.list-songs');
		if (container) {
			container.innerHTML = '';

			saveSongs.forEach((song) => {
				const songComponent = document.createElement('song-card') as any;
				songComponent.name = song.name;
				songComponent.image = song.image;
				songComponent.author = song.author;
				songComponent.album = song.album;
				songComponent.dateAdded = song.dateAdded;
				songComponent.duration = song.duration;
				container.appendChild(songComponent);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="app-container">
					<div class="title"><h1>MY PLAYLIST</h1></div>
					<div class = "form-create-song">
						<form id="form-song">
							<input type="text" name="title" placeholder="Title" required>
							<input type="text" name="author" placeholder="Author" required>
							<input type="text" name="album" placeholder="Album" required>
							<input type="text" name="dateAdded" placeholder="Date Added" required>
							<input type="text" name="duration" placeholder="Duration" required>
							<input type="text" name="image" placeholder="Image" required>
							<input type="submit" id="save-song" value="Save"/>
						</form>
					</div>
					<div class="list-songs"></div>
				</div>
      `;
		}
	}
}

customElements.define('app-container', AppContainer);
