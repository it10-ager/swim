var menu = document.querySelector('header .hidden-menu');
var burger = document.querySelector('header div:last-of-type > img');
var isActive = false;
var fileInput = document.getElementById("file");

burger.addEventListener('click', ()=>{
	if(isActive === false){
		menu.style.top = '0' + 'px';
		menu.style.transition = "top 0.5s ease";
		isActive = true;
	}
	else{
		menu.style.top = '-1000' + 'px';
		menu.style.transition = "top 0.4s ease";
		isActive = false;
	}
});

/* show download file name */
fileInput.addEventListener("change", ()=>{
	var fileName = fileInput.value.split("\\").pop();
	fileInput.nextElementSibling.innerHTML = fileName;
	fileInput.nextElementSibling.style.fontSize = "14px";
});

/* map */
function initMap() {
	const uluru = { lat: 61.2381044, lng: 73.3771722 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 17,
		center: uluru,
	});
	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
}
window.initMap = initMap;