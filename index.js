// Modules
var indexOf = require('indexof'),
		Emitter = require('emitter');

var OrderedDictonary = function(attr){
	if (!(this instanceof OrderedDictonary))
		return new OrderedDictonary(attr);

	this.map = {};
	this.array = [];

	if (typeof attr === 'object')
		this.set(attr);
};

module.exports = OrderedDictonary;

Emitter(OrderedDictonary.prototype);

// Allow both 'key', 'value' and {key: value} style arguments.
OrderedDictonary.prototype.set = function(key, val){
	var attr, attrs;
	if (typeof key === 'object') attrs = key;
	else (attrs = {})[key] = val;
	for (attr in attrs) {
		if (attr in this.map) this.map[attr] = attrs[attr];
		else {
			this.array.push(attr);
			this.map[attr] = attrs[attr];
			this.emit('enter', attrs[attr]);
		}
	}
	return this;
};

OrderedDictonary.prototype.remove = function(key) {
	var index = indexOf(this.array, key);
	if (index === -1) throw new Error('Key doesnt exist');
	this.emit('exit', this.map[key]);
	this.array.splice(index, 1);
	delete this.map[key];
};

OrderedDictonary.prototype.get = function(key){
	return this.map[key];
};

OrderedDictonary.prototype.at = function(index){
	return this.map[this.array[index]];
};

OrderedDictonary.prototype.length = function(){
	return this.array.length;
};

// Iterates through our array, providing the key, value,
// and index of the field.
OrderedDictonary.prototype.forEach = function(fn){
	var key, value;
	for (var i = 0, len = this.array.length; i < len; i++) {
		key = this.array[i];
		value = this.map[key];
		fn(key, value, i);
	}
	return this;
};

OrderedDictonary.prototype.sort = function(fn){
	var _this = this;
	this.array.sort(function(left, right){
		return fn(_this.map[left], _this.map[right]);
	});
	return this;
};

OrderedDictonary.prototype.clear = function(){
	this.map = {};
	this.array = [];
	return this;
};