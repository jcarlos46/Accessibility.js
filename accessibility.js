var Accessibility = new function() {
	var elements = [],
	resizePlus = function() {
		elements.each(function(el){
			var newSize = el.getStyle(('font-size')).toInt() + 1;
			el.setStyle('font-size', newSize + 'px');
		});
	},
	resizeLess = function() {
		elements.each(function(el){
			var newSize = el.getStyle(('font-size')).toInt() - 1;
			el.setStyle('font-size', newSize + 'px');
		});
	},
	resizeNormal = function() {
		elements.each(function(el){
			el.setStyle('font-size', Cookie.read(el.id));
			Cookie.dispose(el.id);
		});
	},
	contrast = function(contrastFile, event) {
		if((Cookie.read('contrast') == '0' && event.type == 'click') || 
			Cookie.read('contrast') == '1' && event.type == 'ready') {
			document.getElement('head').adopt(new Element('link', {
				type: 'text/css',
				rel: 'stylesheet',
				id: 'contrastCssFile',
				href: contrastFile,
			}));
			Cookie.write('contrast','1');
		}else if(Cookie.read('contrast') == '1' && event.type == 'click') {
			document.id('contrastCssFile').destroy();
			Cookie.write('contrast','0');
		}

	},
	createCookies = function() {
		if(Cookie.read('contrast') == null)
			Cookie.write('contrast','0');
		elements.each(function(el){
			Cookie.write(el.id, el.getStyle('font-size'));
		});
	};
	
	this.execute = function(arg) {
		window.addEvent('domready', function() {
			elements = $$(arg.elements.join(','));
			createCookies();
			contrast(arg.contrastFile, {type: 'ready'});

			document.id(arg.resizePlus).addEvent('click', function(){
				resizePlus();
			});
			document.id(arg.resizeLess).addEvent('click', function(){
				resizeLess();
			});
			document.id(arg.resizeNormal).addEvent('click', function(){
				resizeNormal();
			});
			document.id(arg.contrast).addEvent('click', function(e2){
				contrast(arg.contrastFile, e2);
			});
		});
	};
}