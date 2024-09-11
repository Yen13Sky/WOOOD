/*IBG*/
function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();
/*=============================================================================*/

/*function REMOVECLASSES*/
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
/*=============================================================================*/

/*ISMobile*/
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};
/*=============================================================================*/
/*FORMS*/
/*FORMS*/
function forms(){
	$('input, textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-valuer]').each(function(){
		if(this.value == '' || this.value == $(this).attr('data-value')){
			if($(this).hasClass('1') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			if($(this).hasClass('1') && $(this).parent().find('form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}
		$(this).click(function(){
			if(this.value == $(this).attr('data-value')){
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = "";
			};
		});
		$(this).blur(function(){
			if(this.value == ''){
				if(!$(this).hasClass('1')){
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};				
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event){
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});
}
forms();
/*=============================================================================*/
/*VALIDATE-FORMS*/
$('form button[type=submit]').click(function(){
	var er=0;
	var form=$(this).parents('form');
	var ms=form.data('ms');
	$.each(form.find('.req'),function(index, val){
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});

function formValidate(input){
	var er=0;
	var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(".","");
			input.val(em);
		}
		if(!(/^\W+([\.-]?\w+)*@\W+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type'=='checkbox')){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	/*if(input.hasClass('name')){
		if(!(/^[А-Яа-яа-zA-Z-]+([А-Яа-яа-zA-Z-]+)$/.test(input.val()))){
			er++;
			addError(input);
		}
	}*/
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}
	}
	return er;
}
function formLoad(){
	$('.popup').hide();
	$('popup-message-body').hide();
	$('popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идёт загрузка...</div><div class="popup-loading_message"></div></div>');
	$('popup-message').addClass('active').findIn(300);
}
function showMessageByClass(ms){
	$('.popup'.hide());
	popupOpen('massage'+ms, '');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val){
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
	input.addClass('err');
	input.parent().find('form__error').remove();
	if(input.hasClass('email')){
		var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=nul){
			input.parent().append('<div class"form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class"form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}	
}
function addErrorByName(form,input__name,error_text){
	var input=form.find('[name=""]'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
}

/*=============================================================================*/
/*=============================================================================*/
/*BURGER*/
$('.wrapper').addClass('loaded');

$('.icon-menu').click(function (event) {
	$(this).toggleClass('active');
	$('.menu__body',).toggleClass('active');
	$('body').toggleClass('lock');
});
/*=============================================================================*/

/*JS-функция определения поддержки WebP*/
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
/*=============================================================================*/
/*SPOLLERS*/
const spollersArray = document.querySelectorAll('[data-spollers]');
if(spollersArray.length > 0){
	//Получение спойлеров без условий
	const spollersRegular = Array.from(spollersArray).filter(function(item, index, self){
		return !item.dataset.spollers.split(",")[0];
	});
	//Инициализация обычных спойлеров
	if(spollersRegular.length > 0){
		initSpollers(spollersRegular);
	}
	//Получение спойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function(item, index, self){
		return item.dataset.spollers.split(",")[0];
	});
	//Инициализация спойлеров с медиа запросами
	if(spollersMedia.length > 0){
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		//Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function(item){
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;			
		});
		mediaQueries = mediaQueries.filter(function(item, index, self){
			return self.indexOf(item) === index;
		});

		//Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint =>{
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			//Объекты с нужным условием
			const spollersArray = breakpointsArray.filter(function(item){
				if (item.value === mediaBreakpoint && item.type === mediaType){
					return true;
				}
			});

			//Событие
			matchMedia.addListener(function(){
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	//Инициализация
	function initSpollers(spollersArray, matchMedia = false){
		spollersArray.forEach(spollersBlock =>{
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if(matchMedia.matches || !matchMedia){
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			}else{
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	function initSpollerBody(spollersBlock, hideSpollerBody = true){
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if(spollerTitles.length > 0){
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody){
					spollerTitle.removeAttribute('tabindex');
					if(!spollerTitle.classList.contains('_active')){
						spollerTitle.nextElementSibling.hidden = true;
					}
				}else{
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e){
		const el = e.target;
		if(el.hasAttribute('data-spoller') || el.closest('[data-spoller]')){
			const spollerTitle = el.hasAttribute('data-spoler') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if(!spollersBlock.querySelectorAll('._slide').length){
				if(oneSpoller && !spollerTitle.classList.contains('_active')){
					hideSpollerBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');// or toggle
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollerBody(spollersBlock){
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if(spollerActiveTitle){
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
/*=============================================================================*/

/* SlideToggle */
/* SLIDE UP */
let _slideUp = (target, duration=500) => {

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        //alert("!");
    }, duration);
};

/* SLIDE DOWN */
let _slideDown = (target, duration=500) => {

    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};

/* TOOGLE */
let _slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};
/*======================================*/
/*=============================================================================*/
/*Dinamic Adaptive*/
(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
/*=============================================================================*/






















