/*!
* Start Bootstrap - The Big Picture v5.0.4 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
//<script src="jquery.min.js" type="text/javascript"></script>

// function CreateHTTPRequestObject () {
//     // although IE supports the XMLHttpRequest object, but it does not work on local files.
// var forceActiveX = (window.ActiveXObject && location.protocol === "file:");
// if (window.XMLHttpRequest && !forceActiveX) {
//     return new XMLHttpRequest();
// }
// else {
//     try {
//         return new ActiveXObject("Microsoft.XMLHTTP");
//     } catch(e) {}
// }
// alert ("Your browser doesn't support XML handling!");
// return null;
// }

// function CreateMSXMLDocumentObject () {
// if (typeof (ActiveXObject) != "undefined") {
//     var progIDs = [
//                     "Msxml2.DOMDocument.6.0", 
//                     "Msxml2.DOMDocument.5.0", 
//                     "Msxml2.DOMDocument.4.0", 
//                     "Msxml2.DOMDocument.3.0", 
//                     "MSXML2.DOMDocument", 
//                     "MSXML.DOMDocument"
//                   ];
//     for (var i = 0; i < progIDs.length; i++) {
//         try { 
//             return new ActiveXObject(progIDs[i]); 
//         } catch(e) {};
//     }
// }
// return null;
// }

// function CreateXMLDocumentObject (rootName) {
// if (!rootName) {
//     rootName = "";
// }
// var xmlDoc = CreateMSXMLDocumentObject ();
// if (xmlDoc) {
//     if (rootName) {
//         var rootNode = xmlDoc.createElement (rootName);
//         xmlDoc.appendChild (rootNode);
//     }
// }
// else {
//     if (document.implementation.createDocument) {
//         xmlDoc = document.implementation.createDocument ("", rootName, null);
//     }
// }

// return xmlDoc;
// }

// function ParseHTTPResponse (httpRequest) {
// var xmlDoc = httpRequest.responseXML;

//         // if responseXML is not valid, try to create the XML document from the responseText property
// if (!xmlDoc || !xmlDoc.documentElement) {
//     if (window.DOMParser) {
//         var parser = new DOMParser();
//         try {
//             xmlDoc = parser.parseFromString (httpRequest.responseText, "text/xml");
//         } catch (e) {
//             alert ("XML parsing error");
//             return null;
//         };
//     }
//     else {
//         xmlDoc = CreateMSXMLDocumentObject ();
//         if (!xmlDoc) {
//             return null;
//         }
//         xmlDoc.loadXML (httpRequest.responseText);

//     }
// }

//         // if there was an error while parsing the XML document
// var errorMsg = null;
// if (xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) {
//     errorMsg = "XML Parsing Error: " + xmlDoc.parseError.reason
//               + " at line " + xmlDoc.parseError.line
//               + " at position " + xmlDoc.parseError.linepos;
// }
// else {
//     if (xmlDoc.documentElement) {
//         if (xmlDoc.documentElement.nodeName == "parsererror") {
//             errorMsg = xmlDoc.documentElement.childNodes[0].nodeValue;
//         }
//     }
// }
// if (errorMsg) {
//     alert (errorMsg);
//     return null;
// }

//     // ok, the XML document is valid
// return xmlDoc;
// }

// // returns whether the HTTP request was successful
// function IsRequestSuccessful (httpRequest) {
//     // IE: sometimes 1223 instead of 204
// var success = (httpRequest.status == 0 || 
//     (httpRequest.status >= 200 && httpRequest.status < 300) || 
//     httpRequest.status == 304 || httpRequest.status == 1223);

// return success;
// }

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

const factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/today";
const factElem = document.getElementById("fact");

fetch(factUrl)
  .then(response => response.json())
  .then(data => {
    factElem.textContent = data.text;
  })
  .catch(error => {
    console.log(error);
    factElem.textContent = "Failed to fetch fact :(";
  });

fetch('https://decentishdev.github.io/website/js/quotes.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    const quotes = xml.getElementsByTagName('quote');
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotes[index];
    const text = quote.getElementsByTagName('text')[0].textContent.split(''); // split text into array of characters
    const author = quote.getElementsByTagName('author')[0].textContent.split(''); // split author into array of characters
    let i = 0;
    let j = 0;
    const maxHeight = quoteContainer.clientHeight; // Get the maximum height of the quote container
    quoteText.textContent = '';
    quoteAuthor.textContent = '';
    quoteContainer.style.display = 'flex';
    quoteContainer.style.height = `${maxHeight}px`; // Set the fixed height of the quote container
    const quoteInterval = setInterval(() => {
      if (text.length > 0) {
        quoteText.textContent += text.shift(); // remove first character from array and append to quote element
      } else if (author.length > 0) {
        quoteAuthor.textContent += author.shift(); // remove first character from array and append to author element
      } else {
        clearInterval(quoteInterval);
      }
    }, 50);
  })
  .catch(error => {
    console.error('Error fetching quote:', error);
  });

