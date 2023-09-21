const num = 200;
const section = document.querySelector('section');
const aside = document.querySelector('aside');
const loadingNum = document.querySelector('aside p span');
const imgs = createImgs(section, num);
const delay = convertSpeed(aside);

window.addEventListener('mousemove', (e) => {
	const percent = getPercent(e, num);
	activation(imgs, percent);
});

function getPercent(e, num) {
	const curPos = e.pageX;
	const wid = window.innerWidth;
	return parseInt((curPos / wid) * num);
}

function createImgs(target, num) {
	for (let i = 0; i < num; i++) {
		const img = document.createElement('img');
		const src = document.createAttribute('src');
		src.value = `img/pic${i}.jpg`;
		img.setAttributeNode(src);
		target.append(img);
	}
	const imgs = target.querySelectorAll('img');
	let count = 0;
	imgs.forEach((img) => {
		//해당 돔에 수반되는 소스이미지가 로딩완료시 실행되는 이벤트
		//만약 이미지요소의 소스이미지에 문제 발생시 대체 이미지 처리
		img.onerror = () => {
			img.setAttribute('src', 'img/thumb1.jpg');
		};

		img.onload = () => {
			count++;
			const percent = parseInt((count / num) * 100);
			loadingNum.innerText = percent;
			if (count === num) {
				console.log('모든 소스이미지 로딩 완료');
				aside.classList.add('off');
				setTimeout(() => {
					aside.remove();
				}, delay);
			}
		};
	});
	return imgs;
}

function activation(arr, index) {
	arr.forEach((el) => (el.style.display = 'none'));
	arr[index].style.display = 'block';
}

function convertSpeed(el) {
	const result = getComputedStyle(el).transitionDuration;
	return parseFloat(result) * 1000;
}
