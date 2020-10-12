var usagePackage = [];
var formEventNameList = ["click", "blur", "change", "keyup"];


  window.onfocus = function () { 
    console.log("_________onfocus"); 
  }; 
  
  window.onblur = function () { 
    console.log("____onblur");
  }; 

 // mouse move
 document.onmousemove = function(event){
    //console.log(event);
    //console.log(event.metaKey);
    var htmlElement = event.target;
    var positionInTargetElementX = event.offsetX;
    var positionInTargetElementY = event.offsetY;

    var documentX = event.pageX;
    var documentY = event.pageY;

    event.screenX;
    event.screenY;

    // egér rángatás (ha > 50 akkor elég idegesen rángatja az egeret)
    event.movementX
    event.movementY
}

document.onclick = function(event){
   // console.log(event);
}


// the page is visible, or not
document.addEventListener("visibilitychange", function(event) {

    console.log(document.visibilityState);
    console.log(event);

    if (document.visibilityState === 'visible') {
        console.log('foreground')
    } else {
        console.log('idle')
    }
  });




// event listeners on form elements
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
        formEventNameList.forEach(function(eventName){
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
    usagePackage.push({ElementName: Elementname, event: eventName, timestamp: Date.now()});
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

