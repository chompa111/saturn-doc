
const variableRegex=/(([A-Z]{1}[a-z]+)|var|long|double|int|float|boolean) ([A-z]+) ?= ?(.+)/
let classBase = null;
function setup(){
	const Http = new XMLHttpRequest();
	const url='https://jsonplaceholder.typicode.com/posts';
	
	Http.open("GET", 'https://saturn-web-source-production.up.railway.app/pepe/class-structure');
	//Http.open("GET", 'http://localhost:8080/pepe/class-structure');
	//Http.setRequestHeader("Access-Control-Allow-Origin","*");
	Http.responseType="text";
	Http.send();


	Http.onreadystatechange = (e) => {
		if(Http.responseText == ""){
			console.log('nooooo')
			return;
		}
		 classBase=new Map(Object.entries(JSON.parse(Http.responseText)));
	}
}
setup();


 const defaultCompletions =[
{
capition:"add",
value:"add",
 meta:"void add(Gobject g) Presentation"
},
{
capition:"add ",
value:"add ",
 meta:"void add(Behavior b) Presentation"
},
{
capition:"parallel",
value:"parallel",
 meta:"Task parallel(Task t) Task"
},
{
capition:"andThen",
value:"andThen",
 meta:"Task andThen(Task t) Task"
},
{
capition:"repeat",
value:"repeat",
 meta:"Task repeat(int times) Task"
},
{
capition:"execute()",
value:"execute()",
 meta:"void execute() Task"
},
{
capition:"executeInBackGround()",
value:"executeInBackGround()",
 meta:"void executeInBackGround() Task"
},
{
capition:"move",
value:"move",
 meta:"Task move(double x, double y) Gobject"
},
{
capition:"changeColor",
value:"changeColor",
 meta:"Task changeColor(Color c) Gobject"
},
{
capition:"rotate",
value:"rotate",
 meta:"Task rotate(double radians) Gobject"
},
{
capition:"scale",
value:"scale",
 meta:"Task scale(double amount) Gobject"
},
{
capition:"seconds",
value:"seconds",
 meta:"int seconds(double s) Presentation"
},
{
capition:"CircleBuilder",
value:"CircleBuilder",
 meta:" class"
}
];

function getSuggestion(code, row,column){
	return getComplexSuggetion(code,row,column);
}



function getVaiableSuggestion(code,row,column){
	let resp=[];
	console.log(row)
	let lines = code.split('\n').slice(0,row);
	lines.forEach(el => {
		if(variableRegex.test(el)){
			let matchResult=el.match(variableRegex);
			resp.push({
				capition:matchResult[3],
				value:matchResult[3],
				meta:'variable: '+matchResult[1]
			});
		}
		
	})

	return resp;


}


function getVariables(code,row,column){
	let resp= new Map();
	console.log(row)
	let lines = code.split('\n').slice(0,row);
	lines.forEach(el => {
		if(variableRegex.test(el)){
			let matchResult=el.match(variableRegex);
			resp.set(matchResult[3],matchResult[1]);
		}
		
	})

	return resp;
}

function getComplexSuggetion(code,row,column){
	let resp=[];
	console.log(row)
	let line = code.split('\n')[row].substring(0,column);
	//console.log(line)
	let regex=/(?<= |^)[^ ]+$/
	if(regex.test(line)){
		let prefix=line.match(regex)[0];

		if(/\./.test(prefix)){
			let splited=prefix.split(".");
			let prePoint=splited[0];
			let posPoint=splited[1];

			console.log(prePoint);
			console.log(posPoint);
			let vars=getVariables(code,row,column);
			if(vars.has(prePoint)){
				//console.log('sugestoes de metodos para variavel existente')
				var variableType = vars.get(prePoint);
				if(classBase != null){
					var clazz = classBase.get(variableType);
					//console.log(clazz)
					return getMethodsAndSupperClassMethods(clazz).map(function(item){
						return {
							capition:item.name+'()',
							value:item.name+'()',
 							meta:item.description
						}
					})

				}
			}
		}
	}
	

	return getVaiableSuggestion(code,row,column);
}

function getMethodsAndSupperClassMethods(clazz){
	let resp=[];
	let classAux=clazz;
	//console.log("banzai")

	while(classAux !=null && classAux.name != 'Object'){
		console.log(classAux)
		console.log(resp)
		resp.push(...classAux.methods);
		classAux=classBase.get(classAux.superClassName);
	}
	return resp
}



