var should = require('should'),
		OrderedDict = require('../index.js');

describe('OrderedDict', function(){

		var attributes = {ben: 28, kit: 28, james: 'rad'};

		it('should accept an object in the constructor', function(){
			var d = OrderedDict(attributes);
			d.get('james').should.equal('rad');
		});

	describe('#set()', function(){

		it('should accept an object as an argument', function(){
			var d = OrderedDict().set(attributes);
			d.get('ben').should.equal(28);
			d.get('james').should.equal('rad');
			d.get('kit').should.equal(28);
		});

		it('should accept a key and value as arguments', function(){
			var d = OrderedDict().set('ben', 28);
			d.get('ben').should.equal(28);
		});

		it('should replace the value of a previously defined key', function(){
			var d = OrderedDict().set(attributes);
			d.set('ben', 'super');
			d.get('ben').should.equal('super');
			d.set({ kit : 23 , james: 33});
			d.get('kit').should.equal(23);
		});
	});

	describe('#remove()', function(){
		var d = OrderedDict().set(attributes);

		it('should remove an attribute by key', function(){
			d.remove('ben');
			should.not.exist(d.get('ben'));
		});

		it('should remove it from the array', function(){
			var length = d.length();
			d.remove('james');
			d.length().should.equal(length - 1);
			d.array.should.not.include('james');
		});
	});

	describe('#clear()', function(){
		var d = OrderedDict();
		it('should empty our array', function(){
			d.set(attributes);
			d.clear().length().should.equal(0);
		});
		it('should empty our map', function(){
			d.set(attributes);
			d.clear();
			should.not.exist(d.get('ben'));
		});
	});

	describe('#at()', function(){
		var d = OrderedDict(attributes);
		it('should return a value at a specific index', function(){
			d.at(0).should.equal(28);
		});
	});

	describe('#sort', function(){
		var d = OrderedDict({girl: 'kit', boy: 'ben', wat: 'zach'});
		it('should order our dictionary', function(){
			d.sort(function(left, right){
				if (left < right) return -1;
				if (left > right) return 1;
				return 0;
			});
			d.at(0).should.equal('ben');
		});
		it('should reveal our objects to the sort function', function(done){
			d.clear().set({ben: {age: 28, sex: 'male'}, kit: {age: 28, sex: 'female'}});
			d.sort(function(left, right){
				should.exist(left.age);
				should.exist(left.sex);
				done();
			});
		});
	});
});

