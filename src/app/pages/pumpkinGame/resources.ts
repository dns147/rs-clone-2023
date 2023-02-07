// --- Базовый загрузчик ресурсов ---
// --- Вызывается resources.load со всеми изображениями для загрузки, 
// затем вызывается resources.onReady для создания callback на событие 
// загрузки всех данных. 
// Загруженные изображения хранятся в кеше в resourcesCache, 
// и когда все изображения буду загружены, будут вызваны все callback'и ---

export default class Resources {
	resourceCache: {[key: string]: HTMLImageElement | boolean};
	readyCallbacks: Array<Function>;

	constructor() {
		this.resourceCache = {};
		this.readyCallbacks = [];
	}

	//--- Загружаем URL-адрес изображения или массив URL-адресов изображений
	load(urlOrArr: string | string[]): void {
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach(url => this._load(url));
		}
		else {
			this._load(urlOrArr);
		}
	}

	_load(url: string): HTMLImageElement | boolean | undefined {
		if (this.resourceCache[url]) {
			return this.resourceCache[url];
		} else {
			let img = new Image();
			img.onload = () => {
				this.resourceCache[url] = img;
				
				if (this._isReady()) {
					this.readyCallbacks.forEach(func => func());
				}
			};
			this.resourceCache[url] = false;
			img.src = url;
		}
	}

	get(url: string): HTMLImageElement | boolean {
		return this.resourceCache[url];
	}

	_isReady(): boolean {
		let ready = true;

		for (let k in this.resourceCache) {
			if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
				ready = false;
			}
		}
		return ready;
	}

	onReady(func: Function):void {
		this.readyCallbacks.push(func);
	}
}