# 🦀 Rust Array Utilities

&#x20;    &#x20;

High-performance, chainable array utilities for JavaScript powered by Rust & WebAssembly.

---

## 📖 Table of Contents

* [🔍 Overview](#-overview)
* [🚀 Features](#-features)
* [⚙️ Installation](#️-installation)
* [🔧 Usage](#-usage)
* [✨ Examples](#-examples)
* [📘 API Reference](#-api-reference)
* [⚡️ Benchmarks](#️-benchmarks)
* [🛣️ Roadmap](#️-roadmap)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## 🔍 Overview

Rust Array Utilities brings Rust’s speed to JavaScript arrays via WebAssembly. Extend `Array.prototype` with a `.rust` namespace to access over 25 utility methods—everything from `map`, `filter`, and `reduce` to advanced operations like `binarySearch`, `chunk`, `distinct`, and more.

Designed for:

* CPU-bound array transformations
* Large datasets (thousands to millions of elements)
* Seamless Node.js & browser integration

---

## 🚀 Features

* **Blazing Performance**: Rust → WebAssembly pipeline delivers substantial speedups over native JS
* **Chainable API**: Use `.rust` exactly like native array methods (`arr.rust.map(...).rust.filter(...)`)
* **Zero Dependencies**: Tiny footprint—only Rust + WebAssembly
* **TypeScript Ready**: Full `.d.ts` support for autocomplete & type safety
* **Universal**: Works in Node.js (v16+) and modern browsers

---

## ⚙️ Installation

```bash
npm install @nkpareek96g/rust_array
```

Or with Yarn:

```bash
yarn add @nkpareek96g/rust_array
```

---

## 🔧 Usage

Import once in your entrypoint to patch all arrays:

```js
// index.js or main.ts
require('@nkpareek96g/rust_array');

const arr = [1, 2, 3, 4, 5, 6];
const evens = arr.rust.filter(n => n % 2 === 0); // [2, 4, 6]
const doubled = evens.rust.map(n => n * 2);        // [4, 8, 12]

console.log(doubled);
```

For ES modules:

```js
import '@nkpareek96g/rust_array';
```

---

## ✨ Examples

### 1. Filter & Map Chain

```js
const data = [1,2,3,4,5,6,7,8,9,10];
const squares = data.rust
  .filter(n => n > 5)
  .rust.map(n => n * n);
// [36,49,64,81,100]
```

### 2. Distinct Values

```js
const items = [1,2,'a',2,3,'b','a',4];
console.log(items.rust.distinct());
// [1,2,'a',3,'b',4]
```

### 3. Chunking

```js
const letters = ['a','b','c','d','e','f','g'];
console.log(letters.rust.chunk(3));
// [['a','b','c'], ['d','e','f'], ['g']]
```

### 4. Sort by Key

```js
const users = [
  { name: 'Nirmal', age: 28 },
  { name: 'Gemini', age: 1 },
  { name: 'Rust', age: 15 }
];
console.log(users.rust.sortBy(u => u.age));
// Sorted ascending by age
```

---

## 📘 API Reference

| Method             | Description                                 |
| ------------------ | ------------------------------------------- |
| `find(fn)`         | Return first element matching predicate     |
| `findIndex(fn)`    | Return index of first match                 |
| `filter(fn)`       | Return array of elements matching predicate |
| `map(fn)`          | Map each element                            |
| `reduce(fn, init)` | Reduce to a single value                    |
| `includes(val)`    | Check for existence                         |
| `indexOf(val)`     | First index of value                        |
| `lastIndexOf(val)` | Last index of value                         |
| `some(fn)`         | True if any element matches                 |
| `every(fn)`        | True if all elements match                  |
| `binarySearch(x)`  | Binary search on sorted numeric array       |
| `chunk(n)`         | Split into chunks of size `n`               |
| `slidingWindow(n)` | Overlapping windows of size `n`             |
| `distinct()`       | Remove duplicates                           |
| `rotate(n)`        | Rotate elements by `n` positions            |
| `shuffle()`        | Fisher–Yates shuffle                        |
| `zip(...arrays)`   | Zip arrays into tuples                      |
| `partition(fn)`    | Split into `[truthy, falsy]` groups         |
| `take(n)`          | First `n` elements                          |
| `drop(n)`          | Remove first `n` elements                   |
| `head()`           | First element                               |
| `tail()`           | All but first                               |
| `groupBy(fn)`      | Group elements by key function              |
| `parallelMap(fn)`  | ⚠️ Experimental parallelized map            |
| `sortBy(fn)`       | Sort by a computed key                      |

---

## ⚡️ Benchmarks

Benchmarks run on AMD Ryzen 7 5800X, Node.js v18.6.0

| Operation    | Native JS (ms) | Rust WASM (ms) | Speedup |
| ------------ | -------------- | -------------- | ------- |
| `filter/map` | 12.4           | 3.1            | ×4.0    |
| `reduce`     | 8.7            | 2.2            | ×3.9    |
| `distinct`   | 15.3           | 4.8            | ×3.2    |

> Results vary by data size and platform.

---

## 🛣️ Roadmap

* ✅ Basic array ops (`filter`, `map`, `reduce`)
* ✅ Extended utilities (`chunk`, `distinct`, `sortBy`)
* 🔜 Async & streaming variants
* 🔜 GPU-accelerated numeric transforms


---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

See  for details.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

> *“Make JavaScript arrays fast again!”* 🚀
