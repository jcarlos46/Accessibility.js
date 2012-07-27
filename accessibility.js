var Accessibility = {
	resizePlus: function() {
		this.elements.each(function(el){
			var newSize = el.getStyle(('font-size')).toInt() + 1;
			el.setStyle('font-size', newSize + 'px');
		});
	},
	resizeLess: function() {
		this.elements.each(function(el){
			var newSize = el.getStyle(('font-size')).toInt() - 1;
			el.setStyle('font-size', newSize + 'px');
		});
	},
	resizeNormal: function() {
		this.elements.each(function(el){
			el.setStyle('font-size', Cookie.read(el.id));
			Cookie.dispose(el.id);
		});
	},
	contrast: function(contrastFile, event) {
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
	createCookies: function() {
		Cookie.write('constrast','0');
		this.elements.each(function(el){
			Cookie.write(el.id, el.getStyle('font-size'));
		});
	},
	execute: function(arg) {
		var that = this;
		window.addEvent('domready', function() {
			that.elements = $$(arg.elements.join(','));
			that.createCookies();
			that.contrast(arg.contrastFile, {type: 'ready'});

			document.id(arg.resizePlus).addEvent('click', function(){
				that.resizePlus();
			});
			document.id(arg.resizeLess).addEvent('click', function(){
				that.resizeLess();
			});
			document.id(arg.resizeNormal).addEvent('click', function(){
				that.resizeNormal();
			});
			document.id(arg.contrast).addEvent('click', function(e2){
				that.contrast(arg.contrastFile, e2);
			});
		});
	}
}