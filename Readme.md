
# ordered-dictionary

 A simple class that permits quick lookups by key or index, and maintains an ordered version of the object (by keeping its keys in an array).

## Installation

Use it as a component:

	$ npm install -g component
	$ cd /my/project/directory
	$ component install bmcmahen/ordered-dictionary
	$ component build

Include the compiled `build/build.js` in your HTML, and access the constructor using:

	var OrderedDict = require(bmcmahen-ordered-dictionary);

## API

### OrderedDict(attributes)

Accepts an object as attributes, and returns an ordered dictionary object.

### .set(key, val)

Accepts a key, value or an object of multiple key/values as an argument. It adds the key/value if the key doesn't exist, and updates the value if the key does exist.

### .get(key)

### .remove(key)

### .at(index)

### .length()

### .forEach(fn)

Iterates through each key, exposing its key, value, and index.

	orderedDict.forEach(function(key, val, i){ });

### .sort(fn)

Sort the ordered dictionary by attribute.

	orderedDict.sort(function(left, right){
		if (left > right) return 1;
		if (left < right) return -1;
		else return 0;
	});

### .clear()

## Events

### enter

When a new key/value pair is added to the dictionary. For example...

	orderedDict.on('enter', function(key, val){ });

### exit

When a key/value pair has been removed from the dictionary.

	orderedDict.on('exit', function(key, val){ });

## Example

	var OrderedDictionary = require('bmcmahen-ordered-dictionary');
	var dict = OrderedDictionary()
		.set({'name': 'ben', 'last_name': 'mcmahen'})
		.sort(function(left, right){
			if (left > right) return 1;
			if (left < right) return -1;
			else return 0;
		})
		.forEach(function(key, val, i){
			console.log(key, val, i);
		});

## License

  MIT
