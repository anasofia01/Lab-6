import styles from './Song.css';

export enum Attribute {
	'image' = 'image',
	'name' = 'name',
	'author' = 'author',
	'album' = 'album',
	'dateAdded' = 'dateAdded',
	'duration' = 'duration',
}

class SongCard extends HTMLElement {
	image?: string;
	name?: string;
	author?: string;
	album?: string;
	dateAdded?: string;
	duration?: number;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			image: null,
			name: null,
			author: null,
			album: null,
			dateAdded: null,
			duration: null,
		};
		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.duration:
				if (newValue) {
					this.duration = Number(newValue);
				} else {
					this.duration = undefined;
				}

				break;

			default:
				this[propName] = newValue;

				break;
		}
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class = "container-song">
        <div class = "column1">
          <img class = "image-song" src = "${this.image}"/>
          <div class = "song-info">
            <span class = "name-song"><b>${this.name}</b></span>
            <span class = "author-song">${this.author}</span>
          </div>
        </div>
        <div class = "column2">
          <span class = "name-album-song">${this.album}</span>
        </div>
        <div class = "column3">
          <span class = "date-song">${this.dateAdded}</span>
        </div>
        <div class = "column4">
          <span class = "duration-song">${this.duration}</span>
        </div>
      </div>
      `;
		}
	}
}

customElements.define('song-card', SongCard);
export default SongCard;
