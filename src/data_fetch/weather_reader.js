import {processors, parseString } from 'xml2js';

/**
 * Parse XML into a Javascript object.
 * @param {string} xml - the xml content to be parsed.
 * @return {promise} Javascript object representation of the content.
 */

export default  function reader(xml){
    const options = {
      trim: true, //Trim the whitespace at the beginning and end of text nodes.
      explicitArray: false, //Always put child nodes in an array if true; otherwise an array is created only if there is more than one.
      mergeAttrs: true, //If element has no children then "children" won't be created.
      includeWhiteChars: true, //Determines whether whitespace-only text nodes should be included.
      async: true, //Should the callbacks be async? This might be an incompatible change if your code depends on sync execution of callbacks. Future versions of xml2js might change this default, so the recommendation is to not depend on sync execution anyway
      attrValueProcessors: [ 
        processors.parseNumbers, // parses integer-like strings as integers and float-like strings as floats E.g. "0" becomes 0 and "15.56" becomes 15.56
        processors.parseBooleans, // parses boolean-like strings to booleans E.g. "true" becomes true and "False" becomes false
      ],
    };

    //using promise to read xml, success => return result 
    return new Promise((resolve, reject) => {
        parseString(xml, options, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}