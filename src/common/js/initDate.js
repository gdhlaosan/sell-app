export function initDate(date,str) {
	if(/(Y+)/.test(str)) {
		var year = date.getFullYear();
		str = str.replace(RegExp.$1, (year + '').substring(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for(let k in o) {
		if(new RegExp(`(${k})`).test(str)) {
			let fmt = o[k] + '';
			str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(fmt));
		}
	}
	return str;
};

function padLeftZero(str) {
	return ('00' + str).substring(str.length);
}