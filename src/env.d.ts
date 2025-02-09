/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

namespace React {
  interface Attributes {
    tw?: string
  }
}

declare module '*.wasm' {
  const wasm: any
  export default wasm
}

declare namespace globalThis {
  declare var __isWasmInitialized__: boolean
}
