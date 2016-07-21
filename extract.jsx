function run(){
    var layerSets = app.activeDocument.layerSets;
    dumpLayerSets(layerSets);

    $.writeln("Top-level layers:");
    dumpLayers(app.activeDocument.layers);

}

function dumpLayerSets(layerSets){
    $.writeln("--- Processing...");
    var len = layerSets.length;
    for(var i=0;i<len;i++){
         var layerSet = layerSets[i];
         //$.writeln(layerSet.name);
         dumpLayers(layerSet.artLayers);
    }
}

function dumpLayers(layers){
    var len = layers.length;
    for(var i=0;i<len;i++){
         var layer = layers[i];
         if(layer.kind==undefined){
                continue;
         }
        if(layer.kind == LayerKind.TEXT){
         $.writeln('font: '+ layer.textItem.font +' font-size: ' + layer.textItem.size + ' color: #' + layer.textItem.color.rgb.hexValue);
        }
    }
}
run();
