function createCodeBlock(father,key,code){

	var container=document.getElementById(father)
	var div = document.createElement('div');
	div.setAttribute('id','editor'+key);
	div.textContent=code;
	container.appendChild(div);
	console.log('bloco criado');

	var acerequire = document.createElement('script');
	acerequire.setAttribute('src','https://pagecdn.io/lib/ace/1.4.12/ace.js');
	acerequire.setAttribute('type','text/javascript');
	acerequire.setAttribute('charset','utf-8');
	container.appendChild(acerequire);
	var aceconfig = document.createElement('script');
	aceconfig.setAttribute('id','script1');
	aceconfig.innerHTML='var editor = ace.edit("editor'+key+'");editor.setTheme("ace/theme/chaos");editor.session.setMode("ace/mode/java");editor.setOptions({maxLines: 15,minLines: 8,fontSize: 15});'
	container.appendChild(aceconfig);


	var loadingLink = document.createElement('link');
	loadingLink.setAttribute('rel','stylesheet');
	loadingLink.setAttribute('type','text/css');
	loadingLink.setAttribute('href','https://cdn.jsdelivr.net/gh/loadingio/loading.css@v2.0.0/dist/loading.min.css');
	container.appendChild(loadingLink);

	var ldbtnLink = document.createElement('link');
	ldbtnLink.setAttribute('rel','stylesheet');
	ldbtnLink.setAttribute('type','text/css');
	ldbtnLink.setAttribute('href','//cdn.jsdelivr.net/gh/loadingio/ldbutton@v1.0.1/dist/ldbtn.min.css');
	container.appendChild(ldbtnLink);

	
	var logic = document.createElement('script');
	logic.setAttribute('id','logicscript');
	logic.innerHTML='function leavebtn_'+key+'(){document.getElementById("divbuttonloading'+key+'").classList.toggle(\'running\');}  function getSaturnGif_'+key+'() {var gif= document.getElementById("gif_compilado'+key+'");if(gif!=null){gif.remove();}var editor=ace.edit("editor'+key+'");var code=editor.getValue();var img = document.createElement(\'img\'); img.src = \'https://stark-woodland-13363.herokuapp.com/pepe/image-manual-response?content=\'+code;img.setAttribute("id","gif_compilado'+key+'");img.setAttribute("onload","leavebtn_'+key+'()");img.setAttribute("width","350");document.getElementById(\'imgHolder'+key+'\').appendChild(img);console.log(\'gif chegou\');}'
	container.appendChild(logic);

	container.appendChild(document.createElement('br'));

	var btn = document.createElement('div');
	btn.setAttribute('class','btn btn-primary ld-ext-right');
	btn.setAttribute('id','divbuttonloading'+key);
	btn.setAttribute('onclick','document.getElementById("divbuttonloading'+key+'").classList.toggle(\'running\');getSaturnGif_'+key+'();')
	btn.innerHTML='Click to build\n <div class="ld ld-ring ld-spin"></div>';
	container.appendChild(btn);

	var imgHolder=document.createElement('div');
	imgHolder.setAttribute('id','imgHolder'+key)
	container.appendChild(imgHolder);

}









