# extractPSDFonts
Simple function which allows to extract fonts from PSD

In order to use just cloone or donwload and run `npm install` command.
The parser function is pretty straight forward, in order to extract fonts from PSD you should run `node parser.js <full/path/to/file>`

As a response the script will spit out JSON, similar to this 
```
{
	"fonts": [{
		"name": "AkzidenzGroteskPro Bold Condensed",
		"fontSize": 18,
		"lineHeight": 1.2
	}, {
		"name": "Intro Black",
		"fontSize": 40,
		"lineHeight": 1.2
	}, {
		"name": "OpenSans",
		"fontSize": 13,
		"lineHeight": 1.2
	}]
}

```
