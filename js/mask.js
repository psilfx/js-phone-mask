/**
 ** @desc Маска для телефона пользователя
 **/
class PhoneMask {
	element;               //Инпут
	pattern;               //Шаблон заполнения
	patterndigits = {};    //Цифры шаблона
	valid         = false; //Шаблон прошёл валидацию, всё введено правильно
	/**
	 ** @desc Конструктор объекта
	 ** @vals (htmlElemnt) input - инпут формы для привязки маски, (string) maskpattern - шаблон заполнения телефона
	 **/
	constructor( input , maskpattern = "+7(___) ___-__-__" ) {
		this.element = input;
		this.pattern = maskpattern;
		this.Init();
	}
	/**
	 ** @desc Инициализирует объект, привязывает действия и обрабатывает шаблон
	 **/
	Init() {
		for( let i = 0; i < this.pattern.length; i++ ) {
			if( this.pattern[ i ].match(/\d/g) ) this.patterndigits[ i ] = this.pattern[ i ];
		}
		this.element.setAttribute( "placeholder" , this.pattern );
		addEventListener( "input", () => { this.OnChange() } );
		addEventListener( "focus", () => { this.OnChange() } );
		addEventListener( "blur" , () => { this.OnChange() } );
		this.OnChange();
	}
	/**
	 ** @desc Обработка ввода пользователя
	 **/
	OnChange() {
		let value  = this.element.value.replace(/\D/g, "");
		let vi     = 0;
		let newval = "";
		for( let i = 0; i < this.pattern.length; i++ ) {
			( this.pattern.length - 1 == i ) ? this.valid = true : this.valid = false;
			if( this.pattern[ i ] == "_" ) {
				( typeof( value[ vi ] ) !== "undefined" ) ? newval += value[ vi ] : newval += "";
				vi++;
				if( vi >= value.length ) break;
			} else {
				newval += this.pattern[ i ];
				if( typeof( this.patterndigits[ i ] ) !== "undefined" ) vi++;
			}
		}
		this.element.value = newval;
	}
	/**
	 ** @desc Для проверки из вне
	 **/
	IsValid() {
		return this.valid;
	}
}