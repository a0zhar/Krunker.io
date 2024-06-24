// 
// -----------------------------------
// SEROTONIN | KRUNKER.IO GAMING CHAIR
// -----------------------------------
//

// Function (Hook) | Credits: github.com/ideklmao12  
// ---------------------------------------------------------------------------------------
const replace = String.prototype.replace;

var original_Function = Function;
var hook_Function = new Proxy(Function, handler);

var anti_map = [];
var original_toString = Function.prototype.toString;
function hook_toString(...args) {
	for (var i = 0; i < anti_map.length; i++) {
		if (anti_map[i].from === this) {
			return anti_map[i].to;
		}
	}
	return original_toString.apply(this, args);
}

anti_map.push({ from: hook_Function, to: original_Function.toString() });
anti_map.push({ from: hook_toString, to: original_toString.toString() });

Function = hook_Function;
Function.prototype.toString = hook_toString;
// ---------------------------------------------------------------------------------------
