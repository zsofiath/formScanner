var formEventNameList = ["click", "blur", "change", "keyup"];
var USAGE_PACKAGE;

function debug_showPackage() {
    console.log(USAGE_PACKAGE);
}

let UsagePackage = function (UserName, taskID, taskType) {
   this.userName = UserName;
   this.taskId = taskID;
   this.taskType = taskType;
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
/**
 * Sets the events position related to the whole monitor screen
 * @param {*} x 
 * @param {*} y 
 */
EventPackage.prototype.setScreenPosition = function (x, y) {
    this.screenPosition = {x: x, y: y};
    return this;
};
/**
 * Sets the events position related to the current element on witch the event happened
 * @param {*} x 
 * @param {*} y 
 */
EventPackage.prototype.setElementPosition = function (x, y) {
    this.elementPosition = {x: x, y: y};
    return this;
};
/**
 * Sets the events position related to the document
 * @param {*} x 
 * @param {*} y 
 */
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

    var storedData = JSON.parse(localStorage.getItem("formScanner"));

    if(!storedData) alert("Nem található a task adatokat, és felhasználót tároló elem a helyi tárolóban.");
    else if(!storedData.UserName) alert("Nem található a felhasználó azonosítója a helyi tárolóban.");
    else if(!storedData.taskID) alert("Nem található a feladat azonosítója a helyi tárolóban.");


    var UserName = storedData.UserName;
    var taskID = storedData.taskID;
    var taskType = storedData.taskType;
    USAGE_PACKAGE = new UsagePackage(
        UserName,
        taskID,
        taskType
    );  
    eddEventListenersToEveryFormElement(collectFormElements());
 });

// Host softvare in focus
window.onfocus = function () { 
    USAGE_PACKAGE
    .AddEventPackage()
    .setEvent("onfocus")
    .setElementName("document")
    .setDocumentWidth(window.width)
    .setDocumentHeight(window.height);
}; 

// Host software in background
window.onblur = function () { 
    USAGE_PACKAGE
    .AddEventPackage()
    .setEvent("onblur")
    .setElementName("document")
    .setDocumentWidth(window.width)
    .setDocumentHeight(window.height);
}; 

// mouse move
document.onmousemove = function(event){

   USAGE_PACKAGE
   .AddEventPackage()
   .setEvent("onmousemove")
   .setElementName(getHtmlElementId(event.target))
   .setElementPosition(event.offsetX, event.offsetY)
   .setDocumentPosition(event.pageX, event.pageY)
   .setScreenPosition(event.screenX, event.screenY)
   .setDocumentWidth(window.width)
   .setDocumentHeight(window.height);
}

// host softvare was clicked
document.onclick = function(event){
    USAGE_PACKAGE
    .AddEventPackage()
    .setEvent("onclick")
    .setElementName(getHtmlElementId(event.target));
}

// the page is visible, or not
document.addEventListener("visibilitychange", function(event) {

    if (document.visibilityState === 'visible') {
        USAGE_PACKAGE
        .AddEventPackage()
        .setEvent("visible")
        .setElementName("document");
    } else {
        USAGE_PACKAGE
        .AddEventPackage()
        .setEvent("idle")
        .setElementName("document");
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
        setFormUsagePackage(USAGE_PACKAGE, getHtmlElementName(htmlElement), eventName);
    });
}

function setFormUsagePackage(usagePackage, Elementname, eventName) {
    usagePackage
    .AddEventPackage()
    .setEvent(eventName)
    .setElementName(Elementname);
}

function getHtmlElementName(htmlElement) {
    console.dir(htmlElement);
    return htmlElement.attributes.formcontrolname.textContent;
}

function getHtmlElementId(htmlElement) {
    console.log(getPathTo(htmlElement));
    return getPathTo(htmlElement);
}

//https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reloaed-to-the-same-place-even-i/2631931#2631931
function getPathTo(element) {
    if (element.id!=='' && element.id!==undefined)
        return 'id("'+element.id+'")';
    if (element===document.body)
        return element.tagName;
    if(element.localName == "html") {
        return "html";
    }

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
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
        setFormUsagePackage(USAGE_PACKAGE, getHtmlElementName(htmlElement), "Empty")
    } 

    if(event.key === "Backspace") {
        setFormUsagePackage(USAGE_PACKAGE, getHtmlElementName(htmlElement), "Backspace")
    }
    else if(event.key === "Delete") {
        setFormUsagePackage(USAGE_PACKAGE, getHtmlElementName(htmlElement), "Delete")
    }
    else {
        setFormUsagePackage(USAGE_PACKAGE, getHtmlElementName(htmlElement), "Typing")
    }
}

