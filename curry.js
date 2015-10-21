Function.prototype.curry = function() {
	var func = this;
	var args = Array.prototype.slice.call(arguments);
	return function() {
		return func.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	}
};
