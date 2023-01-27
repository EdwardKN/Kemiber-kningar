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

readTextFile("../table.json", function(text){
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
                value.parentNode.parentNode.parentNode.children[2].children[tmpIndex].children[0].value = JSON.parse(value.parentNode.parentNode.parentNode.children[3].children[tmpIndex].innerText)*JSON.parse(value.value)
            }
            if(tmpIndex2 === 2){
                value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].setAttribute("readonly","")
                value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].value = JSON.parse(value.value)/JSON.parse(value.parentNode.parentNode.parentNode.children[3].children[tmpIndex].innerText)
            }
            
                for(let n = 1; n < newArray.length+1; n++){
                    if(isNumeric(newArray[n-1][0])){
                        amountArray[n] = JSON.parse(newArray[n-1][0]);
                    }else{
                        amountArray[n] = 1;
                    }
                    

                }
                for(let n = 1; n < newArray.length+1; n++){

                    if(newArray[n-1][0] !== "+" && newArray[n-1][0] !== "="){   
                        console.log(amountArray[n]/amountArray[tmpIndex])                     
                        value.parentNode.parentNode.parentNode.children[1].children[n].children[0].value = (amountArray[n]/amountArray[tmpIndex])*JSON.parse(value.parentNode.parentNode.parentNode.children[1].children[tmpIndex].children[0].value)
                        value.parentNode.parentNode.parentNode.children[2].children[n].children[0].value = JSON.parse(value.parentNode.parentNode.parentNode.children[1].children[n].children[0].value)*JSON.parse(value.parentNode.parentNode.parentNode.children[3].children[n].innerText)
                        value.parentNode.parentNode.parentNode.children[1].children[n].children[0].setAttribute("readonly","");
                        value.parentNode.parentNode.parentNode.children[2].children[n].children[0].setAttribute("readonly","");
                    }
                }
            
    
        }
        console.log(startValue.length)

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

    console.log(newValue)

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
            console.log(newValue[stop+1])
            if(isNumeric(newValue[stop+1]) && newValue[stop+1] != "+" && newValue[stop+1] != "="){
                for(let n = start+1; n<stop-start; n++){
                    newValue[n] = newValue[n].repeat(newValue[stop+1])
                }
            }
        }
    };
    
    console.log(newValue)

    

    newArray = split(newValue);
    console.log()
    
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
                let tmpValue = 0;
                deep_value(json,"elements").forEach(element => {
                    
                    newArray[n].forEach(valueThing =>{

                        valueThing.replace(/\d+|[A-Z]/g, '~$&').split('~').forEach(valueThing2 => {
                            if(valueThing2 == (deep_value(element,"symbol"))){
                                tmpValue+=Math.round(deep_value(element,"atomic_mass")*100)/100
                            }
                        });
                        

                    })
                })
                
                td.innerText = Math.round(tmpValue*100)/100

            }
            
            table.children[i].appendChild(td)
        }
    }

}
}

init();

function balance(){
    calculate(document.getElementById("formel").value).then(result =>{

        let newValue = document.getElementById("formel").value.split("")

        newValue = newValue.filter(item => !(item == ' '));
        newValue = split(newValue)

        for(i = 0; i<result.length*2; i+=2){
            newValue[i].unshift(JSON.stringify(result[i/2]))
        }
        document.getElementById("formel").value = "";
        newValue.forEach(newValueValue => {
            newValueValue.forEach(newNewValueValue => {
                if(newNewValueValue === "+" || newNewValueValue === "="){
                    document.getElementById("formel").value += " ";
                }
                if(newNewValueValue !== "1"){
                    document.getElementById("formel").value += newNewValueValue;
                }

                if(newNewValueValue === "+" || newNewValueValue === "="){
                    document.getElementById("formel").value += " ";
                }
            })
        })
        updateInput(document.getElementById("formel").value);
    })
}


function deep_value(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

function splitMulti(str, tokens){
    var tempChar = tokens[0]; 
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str
}


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
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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

function UpperCaseArray(input) {
    var result = input.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    return result.split(",");
}