// rust_array.d.ts

declare global {
  interface Array<T> {
    /**
     * High-performance array utilities powered by Rust and WebAssembly.
     */
    readonly rust: {
      /**
       * Find first element matching predicate.
       * @param predicate A function to test each element of the array.
       * @returns The first element in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
       */
      find(predicate: (element: T, index: number, array: T[]) => boolean): T | undefined;

      /**
       * Find index of first element matching predicate.
       * @param predicate A function to test each element of the array.
       * @returns The index of the first element in the array that passes the test. Otherwise, -1.
       */
      find_index(predicate: (element: T, index: number, array: T[]) => boolean): number;

      /**
       * Filter elements matching predicate.
       * @param predicate A function to test each element of the array.
       * @returns A new array with all elements that pass the test.
       */
      filter(predicate: (element: T, index: number, array: T[]) => boolean): T[];

      /**
       * Map each element through a transformation function.
       * @param mapper A function that accepts up to three arguments. The map method calls the mapper function one time for each element in the array.
       * @returns A new array with each element being the result of the mapper function.
       */
      map<U>(mapper: (element: T, index: number, array: T[]) => U): U[];

      /**
       * Reduce array to a single value.
       * @param reducer A function to execute on each element in the array.
       * @param initial_value A value to use as the first argument to the first call of the reducer.
       * @returns The single value that results from the reduction.
       */
      reduce<U>(reducer: (accumulator: U, current_value: T, current_index: number, array: T[]) => U, initial_value: U): U;

      /**
       * Check if array includes a value.
       * @param search_value The value to search for.
       * @returns A boolean which is true if the value is found in the array.
       */
      includes(search_value: T): boolean;

      /**
       * Find first index of value.
       * @param search_value The value to locate in the array.
       * @returns The first index of the element in the array; -1 if not found.
       */
      index_of(search_value: T): number;

      /**
       * Find last index of value.
       * @param search_value The value to locate in the array.
       * @returns The last index of the element in the array; -1 if not found.
       */
      last_index_of(search_value: T): number;

      /**
       * Test if any elements pass a predicate.
       * @param predicate A function to test each element of the array.
       * @returns true if the predicate function returns a truthy value for any array element; otherwise, false.
       */
      some(predicate: (element: T, index: number, array: T[]) => boolean): boolean;

      /**
       * Test if all elements pass a predicate.
       * @param predicate A function to test each element of the array.
       * @returns true if the predicate function returns a truthy value for every array element; otherwise, false.
       */
      every(predicate: (element: T, index: number, array: T[]) => boolean): boolean;

      /**
       * Binary search on a sorted numeric array.
       * @param target The value to search for.
       * @returns The index of the target value, or -1 if not found.
       */
      binary_search(target: number): number;

      /**
       * Split array into chunks of a specified size.
       * @param size The size of each chunk.
       * @returns A new array containing the chunks.
       */
      chunk(size: number): T[][];

      /**
       * Create sliding windows of a specified size.
       * @param size The size of each window.
       * @returns A new array containing the sliding windows.
       */
      sliding_window(size: number): T[][];

      /**
       * Remove duplicate elements.
       * @returns A new array with unique elements.
       */
      distinct(): T[];

      /**
       * Rotate array elements by n positions.
       * @param n The number of positions to rotate.
       * @returns A new array with the elements rotated.
       */
      rotate(n: number): T[];

      /**
       * Randomly shuffle array elements (Fisher-Yates).
       * @returns A new array with the elements shuffled.
       */
      shuffle(): T[];

      /**
       * Zip this array with other arrays into tuples.
       * @param arrays The other arrays to zip with.
       * @returns A new array of tuples.
       */
      zip(...arrays: any[][]): any[][];

      /**
       * Partition array based on a predicate.
       * @param predicate The function to determine the partition.
       * @returns An array containing two arrays: the first with elements that passed the predicate, the second with elements that did not.
       */
      partition(predicate: (element: T, index: number, array: T[]) => boolean): [T[], T[]];

      /**
       * Take the first n elements.
       * @param n The number of elements to take.
       * @returns A new array with the first n elements.
       */
      take(n: number): T[];

      /**
       * Drop the first n elements.
       * @param n The number of elements to drop.
       * @returns A new array without the first n elements.
       */
      drop(n: number): T[];

      /**
       * Get the first element.
       * @returns The first element of the array, or undefined if the array is empty.
       */
      head(): T | undefined;

      /**
       * Get all but the first element.
       * @returns A new array containing all elements except the first.
       */
      tail(): T[];

      /**
       * Group elements by a key function.
       * @param key_fn A function that returns the key for each element.
       * @returns An object where keys are the result of the key function and values are arrays of elements.
       */
      group_by(key_fn: (element: T) => string | number): Record<string | number, T[]>;

      /**
       * Parallel map using Web Workers (simplified version).
       * @param mapper A function to apply to each element.
       * @returns A Promise that resolves to a new array with the results.
       */
      parallel_map<U>(mapper: (element: T) => U): Promise<U[]>;

      /**
       * Sort by a key function with optimized comparison.
       * @param key_fn A function that returns a value to sort by.
       * @returns A new sorted array.
       */
      sort_by(key_fn: (element: T) => any): T[];
    };
  }
}

// Export an empty object to satisfy the module requirement for global augmentation
export {};