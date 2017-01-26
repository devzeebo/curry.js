(function() {
	var funcDecs = {};

	function funcCall(cArgs, fArgs) {
		funcDecs[cArgs] = funcDecs[cArgs] || {};
		if (!funcDecs[cArgs][fArgs]) {
			var cArr = [];
			for (var i = 0; i < cArgs; i++) {
				cArr.push('cArgs[' + i + ']');
			}
			var cArgStr = cArr.join(', ');
			var fArr = [];
			for (var i = 0; i < fArgs; i++) {
				fArr.push('fArgs[' + i + ']');
			}
			var fArgStr = fArr.join(', ');
			var evalStr =
			"[function(_this, func, cArgs, fArgs) {" +
				"return func.call(_this" + 
					(cArgs ? ", " + cArgStr : '') +
					(fArgs ? ", " + fArgStr : '') + ");" +
			"}]";
			funcDecs[cArgs][fArgs] = eval(evalStr)[0];
		}

		return funcDecs[cArgs][fArgs];
	}

	Function.prototype.curry = function() {
		var func = this;
		var args = Array.prototype.slice.call(arguments);
		var aLen = args.length;
		return function() {
			return (funcDecs[aLen] && funcDecs[aLen][arguments.length] || funcCall(aLen, arguments.length))(this, func, args, Array.prototype.slice.call(arguments));
		}
	};
})();
