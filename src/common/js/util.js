export function urlParse() {
	let search = window.location.search;
	let queryArr = search.substring(1).split('&');
	let obj = {};
	queryArr.forEach( function(element, index) {
		let itemArr = element.split('=');
		obj[itemArr[0]] = itemArr[1];
	});
	return obj;
};
