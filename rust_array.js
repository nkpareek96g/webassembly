let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const RustArrayOpsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rustarrayops_free(ptr >>> 0, 1));

class RustArrayOps {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RustArrayOpsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rustarrayops_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.rustarrayops_new();
        this.__wbg_ptr = ret >>> 0;
        RustArrayOpsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Find first element matching predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {any}
     */
    find(array, predicate) {
        const ret = wasm.rustarrayops_find(this.__wbg_ptr, array, predicate);
        return ret;
    }
    /**
     * Find index of first element matching predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {number}
     */
    find_index(array, predicate) {
        const ret = wasm.rustarrayops_find_index(this.__wbg_ptr, array, predicate);
        return ret;
    }
    /**
     * Filter elements matching predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {Array<any>}
     */
    filter(array, predicate) {
        const ret = wasm.rustarrayops_filter(this.__wbg_ptr, array, predicate);
        return ret;
    }
    /**
     * Map each element through a transformation function
     * @param {Array<any>} array
     * @param {Function} mapper
     * @returns {Array<any>}
     */
    map(array, mapper) {
        const ret = wasm.rustarrayops_map(this.__wbg_ptr, array, mapper);
        return ret;
    }
    /**
     * Reduce array to single value
     * @param {Array<any>} array
     * @param {Function} reducer
     * @param {any} initial
     * @returns {any}
     */
    reduce(array, reducer, initial) {
        const ret = wasm.rustarrayops_reduce(this.__wbg_ptr, array, reducer, initial);
        return ret;
    }
    /**
     * Check if array includes a value
     * @param {Array<any>} array
     * @param {any} search_value
     * @returns {boolean}
     */
    includes(array, search_value) {
        const ret = wasm.rustarrayops_includes(this.__wbg_ptr, array, search_value);
        return ret !== 0;
    }
    /**
     * Find first index of value
     * @param {Array<any>} array
     * @param {any} search_value
     * @returns {number}
     */
    index_of(array, search_value) {
        const ret = wasm.rustarrayops_index_of(this.__wbg_ptr, array, search_value);
        return ret;
    }
    /**
     * Find last index of value
     * @param {Array<any>} array
     * @param {any} search_value
     * @returns {number}
     */
    last_index_of(array, search_value) {
        const ret = wasm.rustarrayops_last_index_of(this.__wbg_ptr, array, search_value);
        return ret;
    }
    /**
     * Test if any elements pass predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {boolean}
     */
    some(array, predicate) {
        const ret = wasm.rustarrayops_some(this.__wbg_ptr, array, predicate);
        return ret !== 0;
    }
    /**
     * Test if all elements pass predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {boolean}
     */
    every(array, predicate) {
        const ret = wasm.rustarrayops_every(this.__wbg_ptr, array, predicate);
        return ret !== 0;
    }
    /**
     * Binary search on sorted numeric array
     * @param {Array<any>} array
     * @param {number} target
     * @returns {number}
     */
    binary_search(array, target) {
        const ret = wasm.rustarrayops_binary_search(this.__wbg_ptr, array, target);
        return ret;
    }
    /**
     * Split array into chunks of specified size
     * @param {Array<any>} array
     * @param {number} size
     * @returns {Array<any>}
     */
    chunk(array, size) {
        const ret = wasm.rustarrayops_chunk(this.__wbg_ptr, array, size);
        return ret;
    }
    /**
     * Create sliding windows of specified size
     * @param {Array<any>} array
     * @param {number} size
     * @returns {Array<any>}
     */
    sliding_window(array, size) {
        const ret = wasm.rustarrayops_sliding_window(this.__wbg_ptr, array, size);
        return ret;
    }
    /**
     * Remove duplicate elements
     * @param {Array<any>} array
     * @returns {Array<any>}
     */
    distinct(array) {
        const ret = wasm.rustarrayops_distinct(this.__wbg_ptr, array);
        return ret;
    }
    /**
     * Rotate array elements by n positions
     * @param {Array<any>} array
     * @param {number} n
     * @returns {Array<any>}
     */
    rotate(array, n) {
        const ret = wasm.rustarrayops_rotate(this.__wbg_ptr, array, n);
        return ret;
    }
    /**
     * Randomly shuffle array elements (Fisher-Yates)
     * @param {Array<any>} array
     * @returns {Array<any>}
     */
    shuffle(array) {
        const ret = wasm.rustarrayops_shuffle(this.__wbg_ptr, array);
        return ret;
    }
    /**
     * Zip multiple arrays into tuples
     * @param {Array<any>} arrays
     * @returns {Array<any>}
     */
    zip(arrays) {
        const ret = wasm.rustarrayops_zip(this.__wbg_ptr, arrays);
        return ret;
    }
    /**
     * Partition array based on predicate
     * @param {Array<any>} array
     * @param {Function} predicate
     * @returns {Array<any>}
     */
    partition(array, predicate) {
        const ret = wasm.rustarrayops_partition(this.__wbg_ptr, array, predicate);
        return ret;
    }
    /**
     * Take first n elements
     * @param {Array<any>} array
     * @param {number} n
     * @returns {Array<any>}
     */
    take(array, n) {
        const ret = wasm.rustarrayops_take(this.__wbg_ptr, array, n);
        return ret;
    }
    /**
     * Drop first n elements
     * @param {Array<any>} array
     * @param {number} n
     * @returns {Array<any>}
     */
    drop(array, n) {
        const ret = wasm.rustarrayops_drop(this.__wbg_ptr, array, n);
        return ret;
    }
    /**
     * Get first element
     * @param {Array<any>} array
     * @returns {any}
     */
    head(array) {
        const ret = wasm.rustarrayops_head(this.__wbg_ptr, array);
        return ret;
    }
    /**
     * Get all but first element
     * @param {Array<any>} array
     * @returns {Array<any>}
     */
    tail(array) {
        const ret = wasm.rustarrayops_tail(this.__wbg_ptr, array);
        return ret;
    }
    /**
     * Group elements by key function
     * @param {Array<any>} array
     * @param {Function} key_fn
     * @returns {object}
     */
    group_by(array, key_fn) {
        const ret = wasm.rustarrayops_group_by(this.__wbg_ptr, array, key_fn);
        return ret;
    }
    /**
     * Parallel map using Web Workers (simplified version)
     * @param {Array<any>} array
     * @param {Function} mapper
     * @returns {Promise<any>}
     */
    parallel_map(array, mapper) {
        const ret = wasm.rustarrayops_parallel_map(this.__wbg_ptr, array, mapper);
        return ret;
    }
    /**
     * Sort by key function with optimized comparison
     * @param {Array<any>} array
     * @param {Function} key_fn
     * @returns {Array<any>}
     */
    sort_by(array, key_fn) {
        const ret = wasm.rustarrayops_sort_by(this.__wbg_ptr, array, key_fn);
        return ret;
    }
}

module.exports.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
};

module.exports.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

module.exports.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

module.exports.__wbg_call_833bed5770ea2041 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.call(arg1, arg2, arg3);
    return ret;
}, arguments) };

module.exports.__wbg_crypto_574e78ad8b13b65f = function(arg0) {
    const ret = arg0.crypto;
    return ret;
};

module.exports.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments) };

module.exports.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

module.exports.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

module.exports.__wbg_has_a5ea9117f258a0ec = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    return ret;
}, arguments) };

module.exports.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
};

module.exports.__wbg_is_c7481c65e7e5df9e = function(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

module.exports.__wbg_length_e2d2a49132c1b256 = function(arg0) {
    const ret = arg0.length;
    return ret;
};

module.exports.__wbg_msCrypto_a61aeb35a24c1329 = function(arg0) {
    const ret = arg0.msCrypto;
    return ret;
};

module.exports.__wbg_new_405e22f390576ce2 = function() {
    const ret = new Object();
    return ret;
};

module.exports.__wbg_new_78feb108b6472713 = function() {
    const ret = new Array();
    return ret;
};

module.exports.__wbg_new_a12002a7f91c75be = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

module.exports.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

module.exports.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

module.exports.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
};

module.exports.__wbg_node_905d3e251edff8a2 = function(arg0) {
    const ret = arg0.node;
    return ret;
};

module.exports.__wbg_process_dc0fbacc7c1c06f7 = function(arg0) {
    const ret = arg0.process;
    return ret;
};

module.exports.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

module.exports.__wbg_randomFillSync_ac0988aba3254290 = function() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments) };

module.exports.__wbg_require_60cc747a6bc5215a = function() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments) };

module.exports.__wbg_resolve_4851785c9c5f573d = function(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

module.exports.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

module.exports.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

module.exports.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

module.exports.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

module.exports.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

module.exports.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

module.exports.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
};

module.exports.__wbg_versions_c01dfd4722a88165 = function(arg0) {
    const ret = arg0.versions;
    return ret;
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

module.exports.__wbindgen_is_falsy = function(arg0) {
    const ret = !arg0;
    return ret;
};

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbindgen_is_string = function(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'rust_array_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

// ========= START: MODIFICATION FOR PROTOTYPE EXTENSION (CORRECT LOCATION) =========
const rustArrayOpsInstance = new RustArrayOps();

Object.defineProperty(Array.prototype, 'rust', {
    get: function() {
        const self = this; // 'this' is the array instance on which .rust was accessed
        const rustAPI = {
            find: (predicate) => rustArrayOpsInstance.find(self, predicate),
            find_index: (predicate) => rustArrayOpsInstance.find_index(self, predicate),
            filter: (predicate) => rustArrayOpsInstance.filter(self, predicate),
            map: (mapper) => rustArrayOpsInstance.map(self, mapper),
            reduce: (reducer, initial) => rustArrayOpsInstance.reduce(self, reducer, initial),
            includes: (search_value) => rustArrayOpsInstance.includes(self, search_value),
            index_of: (search_value) => rustArrayOpsInstance.index_of(self, search_value),
            last_index_of: (search_value) => rustArrayOpsInstance.last_index_of(self, search_value),
            some: (predicate) => rustArrayOpsInstance.some(self, predicate),
            every: (predicate) => rustArrayOpsInstance.every(self, predicate),
            binary_search: (target) => rustArrayOpsInstance.binary_search(self, target),
            chunk: (size) => rustArrayOpsInstance.chunk(self, size),
            sliding_window: (size) => rustArrayOpsInstance.sliding_window(self, size),
            distinct: () => rustArrayOpsInstance.distinct(self),
            rotate: (n) => rustArrayOpsInstance.rotate(self, n),
            shuffle: () => rustArrayOpsInstance.shuffle(self),
            zip: (...otherArrays) => rustArrayOpsInstance.zip([self, ...otherArrays]),
            partition: (predicate) => rustArrayOpsInstance.partition(self, predicate),
            take: (n) => rustArrayOpsInstance.take(self, n),
            drop: (n) => rustArrayOpsInstance.drop(self, n),
            head: () => rustArrayOpsInstance.head(self),
            tail: () => rustArrayOpsInstance.tail(self),
            group_by: (key_fn) => rustArrayOpsInstance.group_by(self, key_fn),
            parallel_map: (mapper) => rustArrayOpsInstance.parallel_map(self, mapper),
            sort_by: (key_fn) => rustArrayOpsInstance.sort_by(self, key_fn),
        };

        Object.defineProperty(self, 'rust', {
            value: rustAPI,
            configurable: true,
            writable: false,
            enumerable: false
        });
        return rustAPI;
    },
    configurable: true,
    enumerable: false
});
// ========= END: MODIFICATION FOR PROTOTYPE EXTENSION =========

wasm.__wbindgen_start();