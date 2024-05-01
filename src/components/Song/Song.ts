export enum Attribute {
	'image' = 'image',
	'Title' = 'Title',
	'autor' = 'autor',
	'album' = 'album',
	'dateAdded' = 'dateAdded',
	'duration' = 'duration',
}

class SongCard extends HTMLElement {
	image?: string;
	Title?: string;
	autor?: string;
	album?: string;
	dateAdded?: string;
	duration?: number;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			image: null,
			Title: null,
			autor: null,
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
      <figure>
        <h2>${this.Title}</h2>
        <div class = "frame">
          <img src = "${this.image}"/>
        </div>
        <span>${this.autor}</span>
        <span>${this.album}</span>
        <span>${this.dateAdded}</span>
        <span>${this.duration}</span>
      </figure>
      `;
		}
	}
}

customElements.define('song-card', SongCard);
export default SongCard;
