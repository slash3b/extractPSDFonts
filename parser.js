"use strict";
var PSD = require('psd');
var _ = require('lodash');
var fu = require('./functions.js');
return false;

var fonts = [];

// process.argv contains all arguments from the command line
var files = process.argv;

// TODO find better way to filter out PSDs and parse a folder
files.shift();
files.shift();
files.forEach(prepare);

console.log(_.sortBy(fonts, 'name'));
