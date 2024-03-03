// function textformatToImage(){
// const temp=mathjax.Insert(data) ;
// image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
// var image = svg.command("data:image/latex?") ;

// var canvas2= decoment.grtcanvas(image) ;
// const canvas= image+=latex.convert(canvas) ;

// const TouchList =new TouchList() ;
// image+=latex() ;
// const newimage =MathQuill.getElementById().addCommand(image).latex() ;

// }	this is funcatio one o teest img stonlitvg to edit it  in this form and code can be able to for
	


// const temp=mathjax.insert(data) ;
/////////////////////////////////////////////////////


	
	(function () {
		'use strict';
		var pluginName = 'mathedit',
		pluginCmd = 'matheditDialog',
		mathImgClass = 'mathImg',
		runningId = 0;
	
		CKEDITOR.plugins.add(pluginName, {
		init: function (editor) {
			var iconPath = this.path + 'icons/mathedit.png';
	
			editor.addCommand(pluginCmd, {
			exec: function (editor, data) {
				var selection = editor.getSelection();
				var element = selection.getStartElement();

				var currId = 'mathedit-iframe-' ;
				var currClass = "mathquill-editable";
				var iframeSrc = '../../samples/index.html';  			
				runningId += 1;
				$.confirm({
					title: 'Add Math',
					content: '<iframe id="'+ currId +'" width="600px" height="300px" frameborder="0" src="../../samples/index.html"></iframe>',
					rtl: false,
					boxWidth: '600px',
					boxheight:'300px',
					useBootstrap: false,
					onOpen: function () {         
                       console.log("done image :",element.getAttribute('title')) ;
						const iframe = document.getElementById(currId);
						const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
						const test = iframeDocument.getElementById('mathedit-latex-input-field');
					
						var MQ = iframe.contentWindow.MathQuill.getInterface(2);
						var mathField = MQ.MathField(test, {
							spaceBehavesLikeTab: true,
							
						});
					
						$('#mathedit-latex-input-field').keydown(function (e) {
							if (e.key === 'Enter') {
								e.preventDefault();
							}
						});
						
						mathField.write(element.getAttribute('title'));

					},
					buttons: {

					Insert: {
						

						btnClass: 'btn-blue',
						action:function(){
						const iframe = document.getElementById(currId);
						const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
						const test = iframeDocument.getElementById('mathedit-latex-input-field');
						var MQ = iframe.contentWindow.MathQuill.getInterface(2);
						var mathField = MQ.MathField(test);
						var latex = mathField.latex() ;
						console.log("correct latex",latex) ;
						var url = 'http://latex.codecogs.com/gif.latex?';
	
						if (!latex) {
							latex = 'empty';
						}
						
						url += encodeURIComponent(latex);
		
						if (element && element.is('img') && element.getAttribute('class') === mathImgClass) {
						element.setAttribute('src', url);
						element.setAttribute('title', latex);
						} else {
						var newImage = editor.document.createElement('img');
						newImage.setAttribute('src', url);
						newImage.setAttribute('title', latex);
						newImage.setAttribute('class', mathImgClass);
						editor.insertElement(newImage);
						}
							}
					},
						cancel: function(){
		
						}
					},

				});

			}
			});
	
			editor.ui.addButton(pluginName, {
			label: 'Insert math',
			command: pluginCmd,
			toolbar: 'insert',
			icon: iconPath
			});
	
			if (editor.contextMenu) {
			editor.addMenuGroup('Math');
			editor.addMenuItem(pluginName, {
				label: 'Edit function',
				icon: iconPath,
				command: pluginCmd,
				group: 'Math'
			});
	
			editor.contextMenu.addListener(function (element) {debugger
				var res = {};
				if (element) {
				element = element.getAscendant('img', true);
				}
				if (element && !element.data('cke-realelement') &&
				element.getAttribute('class') === mathImgClass) {
				res[pluginName] = CKEDITOR.TRISTATE_OFF;
				return res;
				}
			});
			}
	
			editor.on('doubleclick', function (evt) {debugger
			var element = evt.data.element;
			if (element && element.is('img')) {
				if (element.getAttribute('class') === mathImgClass) {
				editor.execCommand(pluginCmd, element);
				evt.stop();
				}
			}
			});
		}
		});
	})();