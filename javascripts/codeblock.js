


function createCodeBlock(father,key,code){

	var container=document.getElementById(father)
	var div = document.createElement('div');
	div.setAttribute('id','editor'+key);
	div.textContent=code;
	container.appendChild(div);
	console.log('bloco criado');

	var acerequire = document.createElement('script');
	acerequire.setAttribute('src','https://pagecdn.io/lib/ace/1.4.13/ace.js');
	acerequire.setAttribute('type','text/javascript');
	acerequire.setAttribute('charset','utf-8');
	container.appendChild(acerequire);
	var aceconfig = document.createElement('script');
	aceconfig.setAttribute('id','script1');
	aceconfig.innerHTML='var editor = ace.edit("editor'+key+'");editor.setTheme("ace/theme/monokai");editor.session.setMode("ace/mode/java");editor.setOptions({maxLines: 15,minLines: 8,fontSize: 15,enableBasicAutocompletion: true,enableLinking: true, enableLiveAutocompletion:true});'
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
//	logic.innerHTML='function leavebtn_'+key+'(){document.getElementById("divbuttonloading'+key+'").classList.toggle(\'running\');}  function getSaturnGif_'+key+'() {var gif= document.getElementById("gif_compilado'+key+'");if(gif!=null){gif.remove();}var editor=ace.edit("editor'+key+'");var code=encodeURIComponent(editor.getValue());var img = document.createElement(\'img\'); img.src = \'https://saturn-web-source-production.up.railway.app/pepe/image-manual-response?content=\'+code;img.setAttribute("id","gif_compilado'+key+'");img.setAttribute("onload","leavebtn_'+key+'()");img.setAttribute("width","350");document.getElementById(\'imgHolder'+key+'\').appendChild(img);console.log(\'gif chegou\');}'
//	logic.innerHTML='function leavebtn_'+key+'(){document.getElementById("divbuttonloading'+key+'").classList.toggle(\'running\');};  function getSaturnGif_'+key+'() {var gif= document.getElementById("gif_compilado'+key+'");if(gif!=null){gif.remove();}var editor=ace.edit("editor'+key+'");var code=encodeURIComponent(editor.getValue());checkCompilation(code,'+key+');var img = document.createElement(\'img\'); img.src = \'http://localhost:8080/pepe/image-manual-response?content=\'+code;img.setAttribute("id","gif_compilado'+key+'");img.setAttribute("onload","leavebtn_'+key+'()");img.setAttribute("onerror","leavebtn_'+key+'()");img.setAttribute("width","350");document.getElementById(\'imgHolder'+key+'\').appendChild(img);console.log(\'gif chegou\');}'
	logic.innerHTML='function leavebtn_'+key+'(){document.getElementById("divbuttonloading'+key+'").classList.toggle(\'running\');};  function getSaturnGif_'+key+'() {var gif= document.getElementById("gif_compilado'+key+'");if(gif!=null){gif.remove();}var editor=ace.edit("editor'+key+'");var code=encodeURIComponent(editor.getValue());checkCompilation(code,'+key+');var img = document.createElement(\'img\'); img.src = \'https://saturn-web-source-production.up.railway.app/pepe/image-manual-response?content=\'+code;img.setAttribute("id","gif_compilado'+key+'");img.setAttribute("onload","leavebtn_'+key+'()");img.setAttribute("onerror","leavebtn_'+key+'()");img.setAttribute("width","350");document.getElementById(\'imgHolder'+key+'\').appendChild(img);console.log(\'gif chegou\');}'

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

	
//ace.edit('editor'+key).getSession().on("click", function () {
//	console.log("pepe");
//    setTimeout(() => {
//        var selected_word = editor.getSelectedText();
//        console.log(selected_word);
//    }, 10);
//});

	ace.edit('editor'+key).getSession().on('change', function() {
  		const prevMarkers = ace.edit('editor'+key).session.getMarkers();
		if (prevMarkers) {
		  const prevMarkersArr = Object.keys(prevMarkers);
		  for (let item of prevMarkersArr) {
		    ace.edit('editor'+key).session.removeMarker(prevMarkers[item].id);
		  }
		  removeMessages(key);
		}
		//console.log('removido')
	});

	ace.edit('editor'+key).completers = [staticWordCompleter]


var Range = require("ace/range").Range, markerId
var handler = function(e){
    var editor = e.editor
    //console.log(e)
    var pos = editor.getCursorPosition()
    var token = editor.session.getTokenAt(pos.row, pos.column)
 

    if(token.value in rawCodeBinding){
    	
    	 // add highlight for the clicked token
    var range = new Range(pos.row, token.start,
        pos.row, token.start + token.value.length)
    //console.log(range)
    editor.session.removeMarker(markerId)
    markerId = editor.session.addMarker(range, 'ace_bracket red')

 	var url = rawCodeBinding[token.value];
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send();
	

	//var divcode = document.createElement('div');
	//divcode.setAttribute('id','codeview'+key);
	//container.appendChild(divcode);

	createModal(father,key+1,xmlHttp.responseText);
    }

  

}


	
	editor.on("dblclick", handler)
}


function checkCompilation(code,key){

	const Http = new XMLHttpRequest();
	const url='https://jsonplaceholder.typicode.com/posts';
	Http.open("GET", 'https://saturn-web-source-production.up.railway.app/pepe/compile?content='+code);
	//Http.setRequestHeader("Access-Control-Allow-Origin","*");
	Http.responseType="text";
	Http.send();


	Http.onreadystatechange = (e) => {
		if(Http.responseText == ""){
			return;
		}
		let response =JSON.parse(Http.responseText);
		console.log(response);
		for (let i=0;i<response.length;i++){
			let error=response[i];
			colorLine(error.line-26,key)
			displayErrorMessage(key,error.line-26,error.message);
		}
	}
}

function colorLine(line,key){
	var Range = ace.require('ace/range').Range;
	ace.edit('editor'+key).session.addMarker(new Range(line, 0, line, 1), "myMarker", "fullLine");
}


function displayErrorMessage(key, line, message){
	let currentAnnotations=ace.edit('editor'+key).getSession().getAnnotations();
	currentAnnotations.push({
	  row: line,
	  column: 0,
	  text: message, // Or the Json reply from the parser 
	  type: "error" // also "warning" and "information"
	});
		ace.edit('editor'+key).getSession().setAnnotations(currentAnnotations);
}

function removeMessages(key){
	ace.edit('editor'+key).getSession().setAnnotations([{}]);	
}

var staticWordCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
    	console.log(prefix)
        callback(null, getSuggestion(editor.getValue(),pos.row,pos.column));
    }
}



function createStaticBlock(father,key,code){



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
	aceconfig.innerHTML='var editor = ace.edit("editor'+key+'");editor.setReadOnly(true);editor.setTheme("ace/theme/monokai");editor.session.setMode("ace/mode/java");editor.setOptions({maxLines: 30,minLines: 8,fontSize: 15,enableBasicAutocompletion: true});'
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

}


function createModal(father,key,content){
	var container=document.getElementById(father)
	var divmodal = document.createElement('div');
	divmodal.setAttribute('id','myModal');
	divmodal.setAttribute('class','modal');
	container.appendChild(divmodal);

var divmodalcontent = document.createElement('div');
	divmodalcontent.setAttribute('id','modalcontent');
	divmodalcontent.setAttribute('class','modal-content');
	divmodal.appendChild(divmodalcontent);

	console.log('bloco criado');

	// Get the modal
var modal = document.getElementById('myModal');
	createStaticBlock('modalcontent',key,content);
modal.style.display = "block";
window.onclick = function(event) {
  if (event.target == modal) {
    modal.remove()
  }
}
}

var rawCodeBinding={
        	'BenchMark':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/BenchMark.java',
'CodecType':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/CodecType.java',
'EngineType':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/engine/EngineType.java',
'JavaFXEngine':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/engine/JavaFXEngine.java',
'JavaGraphicEngine':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/engine/JavaGraphicEngine.java',
'JavaNativeEngine':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/engine/JavaNativeEngine.java',
'GIFCodec':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/GIFCodec.java',
'Giffer':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/Giffer.java',
'JCodec':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/JCodec.java',
'RawImageCodec':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/RawImageCodec.java',
'TestPanel1':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/TestPanel1.java',
'VideoCodec':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/VideoCodec.java',
'XugglerCodec':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/codec/XugglerCodec.java',
'AnimationBuilder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/AnimationBuilder.java',
'BackGround':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/BackGround.java',
'Behavior':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/behavior/Behavior.java',
'FollowBehavior':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/behavior/FollowBehavior.java',
'ColorHolder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/ColorHolder.java',
'DecodeAndCaptureFrames':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/DecodeAndCaptureFrames.java',
'A':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/examples/A.java',
'B':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/examples/B.java',
'BmanEx':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/examples/BmanEx.java',
'Arc':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Arc.java',
'Ball':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Ball.java',
'Camera':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Camera.java',
'Circle':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Circle.java',
'CircleBuilder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/CircleBuilder.java',
'DynamicPath':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/DynamicPath.java',
'EffectLens':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/EffectLens.java',
'Fonts':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Fonts.java',
'FrameSequence':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/FrameSequence.java',
'GobjectFrame':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/GobjectFrame.java',
'Group':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Group.java',
'Image':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Image.java',
'Img':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Img.java',
'Char':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/Char.java',
'GraphicsdrawCharProxy':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/GraphicsdrawCharProxy.java',
'GraphicsProxy':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/GraphicsProxy.java',
'BoxFrame':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/lixao/BoxFrame.java',
'FakeInheritance':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/lixao/FakeInheritance.java',
'Latex':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/lixao/Latex.java',
'Rect':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/Rect.java',
'Text':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/latex/Text.java',
'Light':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Light.java',
'Line':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Line.java',
'Pencil':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Pencil.java',
'Polygon':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Polygon.java',
'ShapeLike':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/shape/ShapeLike.java',
'StrokeWriterV2':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/shape/StrokeWriterV2.java',
'ShapeGobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/ShapeGobject.java',
'StringGobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/StringGobject.java',
'StrokeWriter':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/StrokeWriter.java',
'Char2':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/Char2.java',
'FillAndStroke':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/FillAndStroke.java',
'Gobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/Gobject.java',
'ShapeGobject2':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/ShapeGobject2.java',
'StrokeGobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/StrokeGobject.java',
'SVGGobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/struct/SVGGobject.java',
'Text':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Text.java',
'TextGobject':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/TextGobject.java',
'Video':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/gobject/Video.java',
'Location':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/location/Location.java',
'LocationPair':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/location/LocationPair.java',
'Point':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/location/Point.java',
'SeekPoint':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/location/SeekPoint.java',
'SupplierPoint':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/location/SupplierPoint.java',
'Pivot':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/Pivot.java',
'Animation':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/Animation.java',
'T3b1b':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/effects/T3b1b.java',
'FpsControler':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/FpsControler.java',
'GenerateBindings':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/GenerateBindings.java',
'Positioning':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/Positioning.java',
'Presentation':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/Presentation.java',
'PresentationConfig':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/presentation/PresentationConfig.java',
'CodeTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/CodeTask.java',
'ContextSetupTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/ContextSetupTask.java',
'EndLessParallelTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/EndLessParallelTask.java',
'InterruptableTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/InterruptableTask.java',
'ParalelTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/ParalelTask.java',
'RepeatTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/RepeatTask.java',
'SequenceTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/SequenceTask.java',
'SingleStepTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/SingleStepTask.java',
'StartedTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/StartedTask.java',
'Task':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/Task.java',
'TaskPainter':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/TaskPainter.java',
'ColorListTranform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/ColorListTranform.java',
'ColorListTranform2':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/ColorListTranform2.java',
'ColorTranform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/ColorTranform.java',
'ColorTranform2':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/ColorTranform2.java',
'MorfTransform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/MorfTransform.java',
'Pixel':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/Pixel.java',
'PositionListTransform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/PositionListTransform.java',
'PositionTransform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/gobject/PositionTransform.java',
'ConstantSpeedTransformation':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/value/ConstantSpeedTransformation.java',
'MeanSpeedTransformation':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/value/MeanSpeedTransformation.java',
'ValueTransform':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/transformation/value/ValueTransform.java',
'WaitTask':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/task/WaitTask.java',
'BindedNumberHolder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/value/BindedNumberHolder.java',
'ChangeType':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/value/ChangeType.java',
'DoubleHolder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/value/DoubleHolder.java',
'NumberHolder':'https://raw.githubusercontent.com/chompa111/saturnGL/master/src/main/java/graphical/basics/value/NumberHolder.java'
        }





