(function () {
	// Define a shared_state Map to hold various data structures
	let shared_state = new Map(
		Object.entries({
			safe_windows: new WeakMap(),  // Map to store safe windows
			functions_to_hide: new WeakMap(),  // Map to hide original functions
			functions_to_hide_rev: new WeakMap(),  // Reverse map for original functions
			strings_to_hide: [],  // Array to hold strings to hide (currently empty)
			hidden_globals: [],  // Array to hold hidden global variables (currently empty)
			init: false  // Initialization flag (false by default)
		})
	);

	// Function to define a property on an object invisibly
	let invisible_define = function (obj, key, value) {
		shared_state.get("hidden_globals").push(key);  // Record hidden global key
		Object.defineProperty(obj, key, {
			enumerable: false,  // Not enumerable
			configurable: false,  // Not configurable
			writable: true,  // Can be changed
			value: value  // Set to provided value
		});
	};

	// Master key for accessing shared state across frames
	const master_key = "ttap#4547";

	// Check if the master_key exists in the top frame's context
	if (!top[master_key]) {
		// If not, define shared_state under the master_key in the top frame
		invisible_define(top, master_key, shared_state);
	} else {
		// If yes, retrieve shared_state from the top frame using the master_key
		shared_state = top[master_key];
	}

	// Retrieve a safe window object from shared_state (if any)
	let _window = shared_state.get("safe_windows").get(window);

	// Function to hide original functions and store their hooks
	let conceal_function = function (original_Function, hook_Function) {
		shared_state.get("functions_to_hide").set(hook_Function, original_Function);
		shared_state.get("functions_to_hide_rev").set(original_Function, hook_Function);
	};

	// Array of keys to ignore during function analysis
	const keys_to_ignore = ["call", "apply", "bind"];

	// Recursive function to analyze objects and their properties
	function analyse(parent, keys, descriptors) {
		try {
			const last_key = keys[keys.length - 1];
			let obj = parent[last_key];

			// Check if the object has already been analyzed or is invalid
			if (descriptors.get(obj) || obj == null || new Set(keys).size !== keys.length) {
				return descriptors;
			}

			// If the object is a function or object, analyze its properties
			if (typeof obj === "function" || typeof obj === "object") {
				descriptors.set(obj, {
					parent: parent,
					key: last_key,
					valid:
						typeof obj === "function" &&
						!keys_to_ignore.includes(last_key) &&
						(keys.length <= 2 || keys[keys.length - 2] === "prototype")
				});

				// Iterate through own keys of the object
				Reflect.ownKeys(obj).forEach(function (_key) {
					let descriptor = Object.getOwnPropertyDescriptor(obj, _key);

					// If the property is not a getter/setter, analyze it
					if (descriptor.get == null && descriptor.set == null) {
						keys.push(_key);
						analyse(obj, keys, descriptors);
						keys.pop();
					}
				});
			}
		} catch (e) {}

		return descriptors;
	}

	// Function to replace enumerable properties with hidden functions
	function replace_enumerables(obj, seen) {
		if (obj == null || seen.includes(obj)) {
			return;
		}

		// Replace each enumerable property with its hidden counterpart
		_window.Object.keys(obj).forEach(function (key) {
			obj[key] = shared_state.get("functions_to_hide").get(obj[key]) || obj[key];
			seen.push(obj[key]);
			replace_enumerables(obj[key], seen);
			seen.pop();
		});
	}

	// Analyze the window object starting with "window" itself
	analyse(window, ["window"], new Map()).forEach(function (descriptor, _fn, map) {
		let original = descriptor.parent[descriptor.key];
		let is_hook = shared_state.get("functions_to_hide").get(original);
		let hook = shared_state.get("functions_to_hide_rev").get(original);

		// If the function is already hooked or not valid, skip it
		if (is_hook || !descriptor.valid) {
			// pass
		} else if (hook) {
			// If a hook exists, replace the original function with the hook
			descriptor.parent[descriptor.key] = hook;
		} else {
			// Otherwise, create a new proxy hook for the original function
			hook = new Proxy(original, {
				apply: function (target, _this, _arguments) {
					_this = shared_state.get("functions_to_hide").get(_this) || _this;
					target = shared_state.get("functions_to_hide").get(target) || target;
					replace_enumerables(_arguments, new _window.Array());

					try {
						var ret = _window.Function.prototype.apply.apply(target, [_this, _arguments]);
					} catch (e) {
						// Modify stack trace to remove references to Object.apply
						e.stack = _window.String.prototype.replace.apply(e.stack, [
							/\n.*Object\.apply.*/,
							""
						]);
						throw e;
					}

					return ret;
				}
			});

			// Replace original function with the newly created hook
			descriptor.parent[descriptor.key] = hook;

			// Conceal the original function and its hook
			conceal_function(original, hook);
		}
	});
})();
