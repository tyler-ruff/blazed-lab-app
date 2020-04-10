const getEl = id => document.getElementById(id)

const iFrame = getEl('iFrame').contentWindow.document
const htmlTextArea = getEl('htmlTextarea')
const cssTextArea = getEl('cssTextarea')
const jsTextArea = getEl('jsTextarea')

var fileName =  'blz-export.html'; // You can use the .txt extension if you want
function buildDocument(css, htmljs){
	return '<!DOCTYPE HTML>' +
		'<html lang="en" dir="ltr">' +
		'<head>' +
        css +
		'</head>' +
		'<body>' +
		htmljs +
		'</body>' +
		'</html>';
}
function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = buildDocument(document.getElementById(elId).contentWindow.document.head.innerHTML, document.getElementById(elId).contentWindow.document.body.innerHTML); 
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}

document.body.onkeyup = function() {
    iFrame.open()
    iFrame.writeln(
		buildDocument('<style>' + cssTextArea.value + '</style>', htmlTextArea.value + '<script>' + jsTextArea.value + '</script>')
    )
    iFrame.close()
}
$(document).ready(function(){
	$('.tabs ul li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tabs ul li').removeClass('is-active');
		$('.tab-content').removeClass('current');
		$(this).addClass('is-active');
		$("#"+tab_id).addClass('current');
	})
	$('#downloadLink').click(function(){
		
		var fileName =  'blz-export.html'; // You can use the .txt extension if you want
		downloadInnerHtml(fileName, 'iFrame', 'text/html');
	});
})
