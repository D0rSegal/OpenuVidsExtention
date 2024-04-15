
function createSeenElement(){
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	svg.setAttribute("width", "20px");
	svg.setAttribute("height", "20px");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");

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
	path2.style = "stroke: gray;"

	svg.appendChild(path2);
	svg.appendChild(path1);
	svg.style = "margin-right: 10px;"

	return svg
}

function appendViewdFeature(elements){
	elements.forEach((val,index)=>{
			let title = val.getElementsByClassName('ovc_playlist_title')[0];
			let itemId = val.id;
			let seenElement = createSeenElement();
			title.appendChild(seenElement);
		});
}

function getCollectionElement(){
	var b = Array.from(document.getElementsByClassName("playlists"));
	return b.filter(val => val.className === 'playlists')[0];
}

function main(){
	let collectionElement = getCollectionElement();
	let collectionId = collectionElement.id;
	let ch = Array.from(collectionElement.children);
	appendViewdFeature(ch)
}

main()