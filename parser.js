"use strict";
var _ = require('lodash');
var PSD = require('psd');

var fonts = [];
var abbrVocab = {
  'X': 'Extra',
  'Bd': 'Bold',
  'Cn': 'Condensed',
  'Md': 'Medium'
};

/**
 * Wrapper function to prepare PSD file to be parsed
 * @param file
 */
function prepare(file) {
  var psd = PSD.fromFile(file);
  psd.parse();
  var element = psd.tree();
  iterator(element);
}

function normalizeFont(obj) {
  var str = obj.name;
  var normalized = str.split('-');
  obj.name = normalized[0];
  if (typeof normalized[1] !== 'undefined') {
    var chunks = normalized[1].match(/[A-Z][a-z]*/g);
    // todo: improve this
    for (var i = 0; i < chunks.length; i++) {
      obj.name += ' ';
      obj.name += typeof abbrVocab[chunks[i]] == "undefined" ? chunks[i] : abbrVocab[chunks[i]];
    }
  }
}

/**
 * Recursive function
 * @param element Parsed PSD layer
 */
function iterator(element) {
  if (element.hasChildren()) {
    for (var i = 0; i < element.children().length; i++) {
      var target = element.children()[i];
      // if element has children then call iterator()
      if (target.hasChildren()) {
        iterator(target);
      } else {
        var text_layer = target.export().text;
        if (typeof text_layer !== "undefined") {
          var fontSize = Math.round(text_layer.font.sizes[0]); // 15.99938 ✘
          var transY = text_layer.transform.yy; // 2.000077137715913
          var lineHeight = parseFloat(text_layer.font.hasOwnProperty('leadings') ? text_layer.font.leadings[0] : '1.2'); // 60 ✘
          // vfontSize = Math.round((fontSize * transY) * 100) * 0.01; // 32 ✔

          var font = {
            name: text_layer.font.name,
            fontSize: fontSize,
            lineHeight: lineHeight
          };

          // console.log(font);

          // the way to know if we already have this font in the collection
          var isset = _.find(fonts, font);
          if (typeof isset == "undefined") {
            fonts.push(font);
          }
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
files.forEach(prepare);

fonts.forEach(normalizeFont);

console.log(_.sortBy(fonts, 'name'));
