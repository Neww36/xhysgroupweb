/* Local shim to relax Array/TypedArray type constraints for react-bits examples.
   Safe to delete once examples are excluded or upstream types are fixed. */
declare global {
  interface ArrayConstructor {
    // Treat Array.from(any) as number[] in examples to satisfy Float32Array constructor
    from<T>(arrayLike: ArrayLike<T> | Iterable<T>): T[]; // keep
  }
}
// For explicit casts used in examples when creating typed arrays from unknown[]
declare const __RBITS_ASSUME_NUM_ARRAY__: (v: unknown[]) => number[];