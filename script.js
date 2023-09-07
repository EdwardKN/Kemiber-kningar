var table;

var rows = {
    formel:"Formula",
    mol:"Mole",
    massa:"Mass",
    molmassa:"Molemass",
    input:"Input"
};

var newArray;

var json;

var moleMass = [];

readTextFile("table.json", function(text){
    json = JSON.parse(text);
});


function init(){
    table = document.createElement("table");
    
    
    document.body.appendChild(table);
}

function updateTable(value){
    let tmpIndex;
    let amountArray = [];
    let tmpIndex2;
    let startValue = value.value

        for(let i =0; i <value.parentNode.parentNode.children.length; i++){
            if(value.parentNode.parentNode.children[i] == value.parentNode){
                tmpIndex = i;
            }

        }
        for(let i =0; i <value.parentNode.parentNode.parentNode.children.length; i++){
            if(value.parentNode.parentNode.parentNode.children[i] == value.parentNode.parentNode){
                tmpIndex2 = i;
            }

        }
        if(value.value === "" || value.value === "0"){
            updateInput(document.getElementById("formel").value)
        }

        if(isNumeric(value.value)){
        
            if(tmpIndex2 === 1){
                value.parentNode.parentNode.parentNode.children[2].children[tmpIndex].children[0].setAttribute("readonly","")
                value.parentNode.parentNode.parentNode.children[2].children[tmpIndex].children[0].value = JSON.parse(moleMass[tmpIndex-1])*JSON.parse(value.value)
            }
            if(tmpIndex2 === 2){
                value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].setAttribute("readonly","")
                value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].value = JSON.parse(value.value)/JSON.parse(moleMass[tmpIndex-1])
            }
            
                for(let n = 1; n < newArray.length+1; n++){
                    if(isNumeric(newArray[n-1][0])){
                        amountArray[n] = JSON.parse(newArray[n-1][0]);
                    }else{
                        amountArray[n] = 1;
                    }
                    

                }
                for(let n = 1; n < newArray.length+1; n++){
                    if(newArray[n-1][0] !== "+" && newArray[n-1][0] !== "=" && n != tmpIndex){
                        value.parentNode.parentNode.parentNode.children[1].children[n].children[0].value = (amountArray[n]/amountArray[tmpIndex])*JSON.parse(value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].value)
                        value.parentNode.parentNode.parentNode.children[2].children[n].children[0].value = ((moleMass[(n-1)/2])* (amountArray[n]/amountArray[tmpIndex])*JSON.parse(value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].value))
                        value.parentNode.parentNode.parentNode.children[1].children[n].children[0].setAttribute("readonly","");
                        value.parentNode.parentNode.parentNode.children[2].children[n].children[0].setAttribute("readonly","");
                    }
                }
            
    
        }
    for(let i = 1; i < newArray.length+1; i++){
        if(newArray[i-1][0] !== "+" && newArray[i-1][0] !== "="){      
            if(value.value.startsWith(0)){
                table.children[3].children[i].innerText = moleMass[(i-1)/2].toPrecision(startValue.replaceAll(".","").length)
            }else if(value.value.includes(".")){
                table.children[3].children[i].innerText = moleMass[(i-1)/2].toPrecision(startValue.replaceAll(".","").length)
            }else{
                table.children[3].children[i].innerText = moleMass[(i-1)/2].toPrecision(startValue.replaceAll(".","").length)
            }   
        }
    }
    for(let x = 1; x < newArray.length+1; x++){
        for(let y = 1; y < 3; y++){
            if(newArray[x-1][0] !== "+" && newArray[x-1][0] !== "="){                        
                if(table.children[y].children[x].children[0] != value){
                    if(table.children[y].children[x].children[0].value.startsWith(0)){
                        if(table.children[y].children[x].children[0].value.includes(".")){
                            table.children[y].children[x].children[0].value = JSON.parse(table.children[y].children[x].children[0].value).toPrecision(startValue.replaceAll(".","").length)
                        }else{
                            table.children[y].children[x].children[0].value = JSON.parse(table.children[y].children[x].children[0].value).toPrecision(startValue.replaceAll(".","").length)
                        }
                    }else{
                        if(table.children[y].children[x].children[0].value.includes(".")){
                        table.children[y].children[x].children[0].value = JSON.parse(table.children[y].children[x].children[0].value).toPrecision(startValue.replaceAll(".","").length)
                    }else{
                        table.children[y].children[x].children[0].value = JSON.parse(table.children[y].children[x].children[0].value).toPrecision(startValue.replaceAll(".","").length)
                    }
                    }

                    if (table.children[y].children[x].children[0].value.charAt(table.children[y].children[x].children[0].value.length - 1) == '.') {
                        table.children[y].children[x].children[0].value = table.children[y].children[x].children[0].value.substr(0, table.children[y].children[x].children[0].value.length - 1);
                      }


                } else{
                    value.value = startValue;
                }

            }
        }
    }
    
    value.removeAttribute("readonly")
}

function updateInput(value){

    document.body.appendChild(document.getElementById("formel"))

    while(table.rows.length > 0) {
        table.deleteRow(0);
      }

      Object.entries(rows).forEach(rad => {
        rad[1] = document.createElement("tr")
        table.appendChild(rad[1])
    })

    let newValue = value.split("")

    newValue = newValue.filter(item => !(item == ' '));
    

    

    var oldNewValue = value.split("").filter(item => !(item == ' '));


    for(let i = 0; i < newValue.length; i++){

        if(isNumeric(newValue[i]) && i>0 && newValue[i-1] != "+" && newValue[i-1] != "="  && newValue[i-1] != "("  && newValue[i-1] != ")" && isNumeric(newValue[i-1]) == true ){
            newValue[i-1] += newValue[i];
            newValue.splice(i,1)
            i = 0;
        }
    }
    for(let i = 0; i < newValue.length; i++){

         if(newValue[i] == newValue[i].toLowerCase() && newValue[i] != "+" && newValue[i] != "=" && newValue[i] != "("  && newValue[i] != ")" && i>0 && !isNumeric(newValue[i] )){
             newValue[i-1] += newValue[i];
             newValue.splice(i,1)
             i = 0;
             continue;
         }else{
             if(isNumeric(newValue[i]) && i>0 && newValue[i-1] != "+" && newValue[i-1] != "="  && newValue[i-1] != "("  && newValue[i-1] != ")" &&  isNumeric(newValue[i-1]) == false ){
                 newValue[i-1] = newValue[i-1].repeat(newValue[i])
                 newValue.splice(i,1)
                 i = 0;
             }
        }
    }
    let start;
    let stop;

    for(let i = 0; i < newValue.length; i++){
        if(i === 0){
            start = 0;
            stop = 0; 
        }
        if(newValue[i] === "("){
            start = i;
        }
        if(newValue[i] === ")"){
            stop = i;
            if(isNumeric(newValue[stop+1]) && newValue[stop+1] != "+" && newValue[stop+1] != "="){
                for(let n = start+1; n<stop-start; n++){
                    newValue[n] = newValue[n].repeat(newValue[stop+1])
                }
            }
        }
    };
    

    

    newArray = split(newValue);
    console.log(newArray)
    for(let n = 0; n<Object.entries(rows).length;n++ ){
        let td = document.createElement("td")
        td.innerText = Object.entries(rows)[n][1]
        table.children[n].appendChild(td)
    }
    

    for(let n = 0; n<split(oldNewValue).length;n++ ){
        if(n >= 0){
        for(let i = 0; i< 5; i++){
            let td;
            if(i === 4 && n === 0){
                td = document.createElement("td");
                td.setAttribute("colspan",split(oldNewValue).length-1)
                td.appendChild(document.getElementById("formel"))

                td2 = document.createElement("td");
                let but = document.createElement("button");
                but.innerText = "Balance"
                but.setAttribute("onclick","balance()")
                td2.appendChild(but)
                table.children[i].appendChild(td)
                table.children[i].appendChild(td2)
            }
            
            if(i != 4){
                td = document.createElement("td");
            }else if(n > 0){
                continue;
            }
            
            if(i === 0){
                split(oldNewValue)[n].forEach(valueThing =>{
                    td.innerText+=valueThing;
                })
            }
            if(i === 1 && split(oldNewValue)[n][0] !== "+" && split(oldNewValue)[n][0] !== "="){
                let tmp = document.createElement("input");
                tmp.setAttribute("onchange","updateTable(this)")
                tmp.value = "0"
                td.appendChild(tmp);
            }
            if(i === 2 && split(oldNewValue)[n][0] !== "+" && split(oldNewValue)[n][0] !== "="){
                let tmp = document.createElement("input");
                tmp.setAttribute("onchange","updateTable(this)")
                tmp.value = "0"

                td.appendChild(tmp);
            }
            if(i === 3 && split(oldNewValue)[n][0] !== "+" && split(oldNewValue)[n][0] !== "="){
                let tempMass = 0
                for (let el of newArray[n].filter(e => e !== '(' && e !== ')' && !isDigit(e))) {
                    let atom = el.match(/[A-Z][a-z]?/)[0]
                    tempMass += json.elements.filter(e => deep_value(e, 'symbol') === atom)[0].atomic_mass * el.length / atom.length
                }

                moleMass[n/2] = tempMass
                td.innerText = tempMass.toPrecision(5)

            }
            
            table.children[i].appendChild(td)
        }
    }

}
}

init();

function balance(){

    testing(trimBeginnings(document.getElementById("formel").value.split("").filter(item => !(item == ' ')).join().replaceAll(",",""))).then(result =>{

        result = Object.entries(result).map(e => e = e[1])
        
        let newValue = document.getElementById("formel").value

        newValue = newValue.split("")
        
        newValue = newValue.filter(item => !(item == ' '));

        newValue = newValue.join().replaceAll(",","")

        newValue = trimBeginnings(newValue).split("");


        newValue = split(newValue);

        for(i = 0; i<result.length*2; i+=2){
            if(result[i/2] !== 1){
                newValue[i].unshift(JSON.stringify(result[i/2]))
            }
        }


        let newNewValue = newValue.join().replaceAll(",","").replaceAll("+"," + ").replaceAll("=", " = ")

        document.getElementById("formel").value = newNewValue


        updateInput(document.getElementById("formel").value);
    })
}

function trimBeginnings(string){
    let tmpTrim = string.replaceAll("+", "#+#").split("#")

    let tmpTrim2 = [];

    tmpTrim.forEach(trim =>{
        if(trim.includes("=")){
            trim.replaceAll("=", "#=#").split("#").forEach(tmp3 => {
                tmpTrim2.push(tmp3)
            })
        }else{
            tmpTrim2.push(trim)
        }
    })

    for(let i = 0; i < tmpTrim2.length; i++){
        let tmp2 = tmpTrim2[i]

        if(isNumeric(tmp2.charAt(0))){
            tmpTrim2[i] = tmp2.substring(1);
            i = 0;
        }
            
    }
    return tmpTrim2.join().replaceAll(",","")
}


function deep_value(obj, path){
    return obj[path];
};

const split = (arr) => {
    const output = [];
    const win = [];
    
    arr.forEach((item) => {
      if (item === "=" || item === "+") {
        output.push([...win], [item]);
        win.length = 0;
      } else {
        win.push(item);
      }
    });
    if (win.length > 0) {
      output.push([...win]);
    }
    return output;
  };

  function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && 
           !isNaN(parseFloat(str)) 
  }

  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
