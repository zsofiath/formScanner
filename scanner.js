var usagePackage = {};
var eventNameList = ["click", "blur", "change", "keyup"];

document.addEventListener("DOMContentLoaded", function(){
    input =  Array.prototype.slice.call(document.getElementsByTagName("input"), 0);
    select =  Array.prototype.slice.call(document.getElementsByTagName("select"), 0);
    textarea =  Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
    button =  Array.prototype.slice.call(document.getElementsByTagName("button"), 0);

   var elements = [].concat(input).concat(select).concat(textarea).concat(button)
   
   eddEventListenersToEveryFormElement(elements);
});

function eddEventListenersToEveryFormElement(elements){
    elements.forEach(htmlElement => {
        eventNameList.forEach(function(eventName){
            setListeners(eventName, htmlElement)
        })
    });
}

function setListeners(eventName, htmlElement){
    htmlElement.addEventListener(eventName, function(event) {
        addExtraOperationsForListeners(eventName, event, htmlElement);
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), eventName);
    });
}

function setUsagePackage(usagePackage, Elementname, eventName) {
    if(usagePackage[Elementname]){
        usagePackage[Elementname].push({event: eventName, timestamp: Date.now()});
    } else {
        usagePackage[Elementname] = [];
        usagePackage[Elementname].push({event: eventName, timestamp: Date.now()});
    }

    console.log(usagePackage);
}

function getHtmlElementName(htmlElement) {
    return htmlElement.attributes.formcontrolname.textContent;
}

function addExtraOperationsForListeners(eventName, event, htmlElement){
    switch(eventName) {
        case "keyup":
            handleKeyUpEvent(event, htmlElement);
          break;
        default:
          // code block
      }
}

function handleKeyUpEvent(event, htmlElement) {

    if(htmlElement.value.length == 0) {
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), "Empty")
    } 


    if(event.key === "Backspace") {
        console.log(htmlElement.value);
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), "Backspace")
    }
    else if(event.key === "Delete") {
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), "Delete")
    }
    else {
        setUsagePackage(usagePackage, getHtmlElementName(htmlElement), "Typing")
    }
}

