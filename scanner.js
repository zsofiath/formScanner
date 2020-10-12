var usagePackage = [];
var formEventNameList = ["click", "blur", "change", "keyup"];
var USAGE_PACKAGE;

let UsagePackage = function () {
   this.userName = "";
   this.taskId = '';
   this.taskType = '';
   this.eventList = []; //EventPackage[]
};

let EventPackage = function () {
   this.elementName = "";
   this.eventName = "";
   this.elementPosition = {x: null, y: null};
   this.screenPosition = {x: null, y: null};
   this.documentPosition = {x: null, y: null};
   this.documentSize = {width: null, heigth: null};
   this.dateTime = new Date();
};

UsagePackage.prototype.AddEventPackage = function () {
    let eventPackage = new EventPackage();
    this.eventList.push(eventPackage);
    return eventPackage;
};
EventPackage.prototype.setEvent = function (eventName) {
    this.eventName = eventName;
    return this;
};
EventPackage.prototype.setElementName = function (elementName) {
    this.elementName = elementName;
    return this;
};
EventPackage.prototype.setScreenPosition = function (x, y) {
    this.screenPosition = {x: x, y: y};
    return this;
};
EventPackage.prototype.setElementPosition = function (x, y) {
    this.elementPosition = {x: x, y: y};
    return this;
};
EventPackage.prototype.setDocumentPosition = function (x, y) {
    this.documentPosition = {x: x, y: y};
    return this;
};
EventPackage.prototype.setDocumentWidth = function (width) {
    this.documentSize.width = width;
    return this;
};
EventPackage.prototype.setDocumentHeight = function (height) {
    this.documentSize.height = height;
    return this;
};


// ============================================= Events =============================================

// Content loaded
document.addEventListener("DOMContentLoaded", function(){

    USAGE_PACKAGE = new UsagePackage();
   
    eddEventListenersToEveryFormElement(collectFormElements());
 });

// Host softvare in focus
window.onfocus = function () { 
  console.log("____onfocus"); 
}; 

// Host softvare in background
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

// host softvare was clicked
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

// ====================================================== functions ============================================================

function collectFormElements() {
    input =  Array.prototype.slice.call(document.getElementsByTagName("input"), 0);
    select =  Array.prototype.slice.call(document.getElementsByTagName("select"), 0);
    textarea =  Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
    button =  Array.prototype.slice.call(document.getElementsByTagName("button"), 0);

   var elements = [].concat(input).concat(select).concat(textarea).concat(button);
   return elements;
}

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
    USAGE_PACKAGE
    .AddEventPackage()
    .setEvent("click")
    .setElementName("hui")
    .setScreenPosition(10,10)
    .setElementPosition(2,0)
    .setDocumentPosition(12,13)
    .setDocumentWidth(200)
    .setDocumentHeight(100);


    console.log("--------------------------------------");
    console.log(USAGE_PACKAGE);
    console.log("--------------------------------------");
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

