var usagePackage = {};

document.addEventListener("DOMContentLoaded", function(){
    input =  Array.prototype.slice.call(document.getElementsByTagName("input"), 0);
    select =  Array.prototype.slice.call(document.getElementsByTagName("select"), 0);
    textarea =  Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
    button =  Array.prototype.slice.call(document.getElementsByTagName("button"), 0);

   var elments = [].concat(input).concat(select).concat(textarea).concat(button)


   var eventNameList = ["click", "blur", "change", "keyup"];
   
    elments.forEach(htmlElement => {
        eventNameList.forEach(function(eventName){
            setListeners(eventName, htmlElement)
        })
    });
});

function setListeners(eventName, htmlElement){
    htmlElement.addEventListener(eventName, function(event){
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), eventName);
    });
}

function setUsagePackage(usagePackage, name, eventName) {
    if(usagePackage[name]){
        usagePackage[name].push({event: eventName, timestamp: Date.now()});
    } else {
        usagePackage[name] = [];
        usagePackage[name].push({event: eventName, timestamp: Date.now()});
    }

    console.log(usagePackage);
}

function getHtmlElementName(htmlElement) {
    return htmlElement.attributes.formcontrolname.textContent;
}
