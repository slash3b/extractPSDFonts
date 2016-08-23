"use strict";
function functions() {
  /**
   * Wrapper function to prepare PSD file to be parsed
   * @param file
   */
  function prepare(file) {
    console.log();
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
        var target = element.children()[i];
        // if element has children then call iterator()
        if (target.hasChildren()) {
          iterator(target);
        } else {
          var text_layer = target.export().text;
          if (typeof text_layer !== "undefined") {
            // var fontSize = text_layer.font.sizes[0]; // 15.99938 ✘
            // var transY = text_layer.transform.yy; // 2.000077137715913
            // var lineHeight = text_layer.font.hasOwnProperty('leadings') ? text_layer.font.leadings[0] : '1.2';  // 60 ✘
            // vfontSize = Math.round((fontSize * transY) * 100) * 0.01; // 32 ✔

            var font = {
              name: text_layer.font.name
            };
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
}

module.exports = functions;
