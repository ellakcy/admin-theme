import $ from 'jquery';


/**
* Convert a value into a boolean
* @param {Mixed} value The value to check convert into boolean
* @return {Boolean}
*/
export function boolVal (value){
    var falseValues=['false',0,undefined,'0','no','null',null];
  
    if (typeof value === 'string' || value instanceof String){
        value=value.toLowerCase();
    }
    
    return falseValues.indexOf(value) == -1;
}


/**
* In many cases we want to retrieve an element that has an id defined in an attribute.
* @param {Element} element The element to retrieve the id.
* @param {String} attribute the attribute containing the id.
*/
export function getElementFromIdProvidedInDataAttribute(element, attribute){
    console.log("Getting Element");
    var href=$(element).attr(attribute);
    href=document.getElementById(href);
    return href;
}

export default {boolVal,getElementFromIdProvidedInDataAttribute}