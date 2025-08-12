/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="react" />
/// <reference types="react-dom" />

// NOTE: This file should not be edited
// see https://next.js.org/docs/basic-features/typescript for more information.

// Add TypeScript JSX type definitions
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
