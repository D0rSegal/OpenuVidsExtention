const ouvePrefix = 'OUVE';


function createSeenElement(watched) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	svg.setAttribute("width", "20px");
	svg.setAttribute("height", "20px");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("class", `${ouvePrefix}_svg`)
	const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path1.setAttribute("d", "M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z");
	path1.setAttribute("stroke", "#000000");
	path1.setAttribute("stroke-width", "2");
	path1.setAttribute("stroke-linecap", "round");
	path1.setAttribute("stroke-linejoin", "round");

	const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path2.setAttribute("d", "M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z");
	path2.setAttribute("stroke", "#000000");
	path2.setAttribute("stroke-width", "2");
	path2.setAttribute("stroke-linecap", "round");
	path2.setAttribute("stroke-linejoin", "round");
	path2.setAttribute("name", "path2")

	if (watched) {
		path2.style.fill = "yellow";
	}


	svg.appendChild(path2);
	svg.appendChild(path1);

	return svg
}

function onClickCallback(collectionId, itemId, watched) {
	//updating watched value to true
	updateWatched(collectionId, itemId, watched);
	let path2Item = Array.from(document.getElementById(`${ouvePrefix}_${collectionId}_${itemId}`).children).filter(val => {
		if (val.attributes.name) {
			return val.attributes.name.value == "path2"
		}
	})[0]
	if (watched) {
		path2Item.style.setProperty("fill", "yellow");
	}
	else {
		path2Item.style.removeProperty("fill");
	}

}

function appendViewdFeature(elements, collectionId) {
	elements.forEach((val, index) => {

		// create and append the view icon element
		let itemId = val.id;
		let watched = isWatched(collectionId, itemId)
		seenElementId = `${ouvePrefix}_${collectionId}_${itemId}`;

		if (!document.getElementById(seenElementId)) {
			let title = val.getElementsByClassName('ovc_playlist_title')[0];
			let seenElement = createSeenElement(watched);
			seenElement.id = seenElementId;
			title.style.setProperty('display', 'inline');
			title.style.setProperty('margin-left', '10px');

			//create listeners for click action, inner div clickable elements
			let clickables = Array.from(val.children[0].children).filter(val => { if (val.className.include) { return val.className.includes('clickable') } });
			clickables.forEach((val, index) => {
				val.addEventListener('click', function () {
					onClickCallback(collectionId, itemId, true);
				});
			})

			seenElement.addEventListener('click', function () {
				onClickCallback(collectionId, itemId, !isWatched(collectionId, itemId));
			})
			// title.appendChild(seenElement);
			title.insertAdjacentElement('afterend', seenElement);
		}

	});
}

function initLocalStorage(collection) {
	let collectionId = collection.id;
	var collectionObj;

	if (!localStorage.getItem(ouvePrefix + collectionId)) {
		collectionObj = new Object();

		Array.from(collection.children).forEach((child, index) => {
			collectionObj[ouvePrefix + child.id] = false;
		})

		localStorage.setItem(ouvePrefix + collectionId, JSON.stringify(collectionObj));
	}

}

function isWatched(collectionId, itemId) {
	let collectionObj = localStorage.getItem(ouvePrefix + collectionId) ? JSON.parse(localStorage.getItem(ouvePrefix + collectionId)) : new Object();
	return collectionObj[ouvePrefix + itemId] ? collectionObj[ouvePrefix + itemId] : false;
}

function updateWatched(collectionId, itemId, val) {
	let collectionObj = localStorage.getItem(ouvePrefix + collectionId) ? JSON.parse(localStorage.getItem(ouvePrefix + collectionId)) : new Object();

	// collectionObj = localStorage.getItem(ouvePrefix + collectionId);
	collectionObj[ouvePrefix + itemId] = val;
	localStorage.setItem(ouvePrefix + collectionId, JSON.stringify(collectionObj));
}

function updateCollection(collection) {
	let collectionId = collection.id;
	initLocalStorage(collection);

	let playlist_items = Array.from(collection.children);
	appendViewdFeature(playlist_items, collectionId);
}

function getCollectionElements() {
	var b = Array.from(document.getElementsByClassName("playlists"));
	return b.filter(val => val.id.startsWith('collection'));
}

function runOverCollections() {
	let collectionElements = getCollectionElements();
	collectionElements.forEach((collection, index) => {
		updateCollection(collection)
	})
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

Array.from(document.getElementById('ovc_collections_list').children).forEach((val, index) => {
	val.addEventListener('click', function () {
		sleep(500).then(() => {
			runOverCollections();
		});
	});
})

runOverCollections()
