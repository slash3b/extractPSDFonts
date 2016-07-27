var PSD = require('psd');
var files = [
    'VRABOTU/1-AVSPORT-HOME.psd',
    'VRABOTU/2-AVSPORT-ABOUT.psd',
    'VRABOTU/3-AVSPORT-KATALOG.psd',
    'VRABOTU/4-AVSPORT-PRODUCT.psd',
    'VRABOTU/5-AVSPORT-CART.psd',
    'VRABOTU/6-AVSPORT-CHECKOUT.psd',
    'VRABOTU/7-AVSPORT-CONTACT.psd',
    'VRABOTU/8-AVSPORT-HOVERS.psd'
];

files.forEach(prepare);



function prepare(file) {
    // console.log(file);

    var psd = PSD.fromFile(file);
    psd.parse();
    element = psd.tree();
    iterator(element);
}

/**
 *
 */
function makeStorage(){
    var fonts = [];

    function store(){
        return fonts;
    }

    store.add = function (arr){
        fonts.push(arr);
    }
    return store;
}
storage = makeStorage();

function iterator(element) {

    if (element.hasChildren()) {
        for (var i = 0; i < element.children().length; i++) {
            if (element.children()[i].hasChildren()) {
                iterator(element.children()[i]);
            } else {
                text_layer = element.children()[i].export().text;

                if (typeof text_layer !== "undefined") {
                    var transY = text_layer.transform.yy; // 2.000077137715913
                    var fontSize = text_layer.font.sizes[0]; // 15.99938 ✘
                    var lineHeight = text_layer.font.hasOwnProperty('leadings') ? text_layer.font.leadings[0] : '1.2';  // 60 ✘
                    fontSize = Math.round((fontSize * transY) * 100) * 0.01; // 32 ✔
			console.log(text_layer.value);
      console.log(text_layer);
			console.log(text_layer.font.name);
			console.log('----------------------');
                    // storage.add([1,2]);
                    // storage.add([text_layer.font.name, text_layer.value, fontSize, lineHeight]);
                }
            }
        }
    }
}

console.log(storage());
