"use strict";
var PSD = require('psd');
// useless for now
require('./functions.js');

var API = 'asdasdas';

function prepare(file) {
    var psd = PSD.fromFile(file);
    psd.parse();
    var element = psd.tree();
    iterator(element);
}

/**
 * Recursive function
 * @param element Parsed PSD layer
 */
function iterator(element) {
    if (element.hasChildren()) {
        for (var i = 0; i < element.children().length; i++) {
            if (element.children()[i].hasChildren()) {
                iterator(element.children()[i]);
            } else {
                var text_layer = element.children()[i].export().text;
                if (typeof text_layer !== "undefined") {
                    // console.log(text_layer);
                    // var fontSize = text_layer.font.sizes[0]; // 15.99938 ✘
                    // var transY = text_layer.transform.yy; // 2.000077137715913
                    var lineHeight = text_layer.font.hasOwnProperty('leadings') ? text_layer.font.leadings[0] : '1.2';  // 60 ✘
                    // fontSize = Math.round((fontSize * transY) * 100) * 0.01; // 32 ✔
                    // console.log(text_layer.value);
                    // console.log(text_layer.font.name);
                    console.log(lineHeight);
                    console.log('----------------------');
                }
            }
        }
    }
}

// process.argv contains all arguments from the command line
var files = process.argv;

// TODO find better way to filter out PSDs and parse a folder
files.shift();
files.shift();
// console.log(API);
files.forEach(prepare);
