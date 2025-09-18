/* Final expanded shim to unblock react-bits examples (safe to remove later) */
declare module "gl-matrix" {
  export type vec2 = { [k: string]: unknown }
  export type vec3 = { [k: string]: unknown }
  export type mat4 = { [k: string]: unknown }
  export type quat = { [k: string]: unknown }

  export const vec2: vec2 & {
    create: () => vec2
    fromValues: (x: number, y: number) => vec2
    normalize: (out: vec2, a: vec2) => vec2
    add: (out: vec2, a: vec2, b: vec2) => vec2
    subtract: (out: vec2, a: vec2, b: vec2) => vec2
    scale: (out: vec2, a: vec2, b: number) => vec2
  }

  export const vec3: vec3 & {
    create: () => vec3
    fromValues: (x: number, y: number, z: number) => vec3
    normalize: (out: vec3, a: vec3) => vec3
    cross: (out: vec3, a: vec3, b: vec3) => vec3
    subtract: (out: vec3, a: vec3, b: vec3) => vec3
    add: (out: vec3, a: vec3, b: vec3) => vec3
    scale: (out: vec3, a: vec3, b: number) => vec3
    transformMat4: (out: vec3, a: vec3, m: mat4) => vec3
  }

  export const mat4: mat4 & {
    create: () => mat4
    identity: (out: mat4) => mat4
    multiply: (out: mat4, a: mat4, b: mat4) => mat4
    invert: (out: mat4, a: mat4) => mat4
    translate: (out: mat4, a: mat4, v: vec3) => mat4
    rotateX: (out: mat4, a: mat4, rad: number) => mat4
    rotateY: (out: mat4, a: mat4, rad: number) => mat4
    rotateZ: (out: mat4, a: mat4, rad: number) => mat4
    perspective: (out: mat4, fovy: number, aspect: number, near: number, far: number) => mat4
    lookAt: (out: mat4, eye: vec3, center: vec3, up: vec3) => mat4
  }

  export const quat: quat & {
    create: () => quat
    setAxisAngle: (out: quat, axis: vec3, rad: number) => quat
    multiply: (out: quat, a: quat, b: quat) => quat
    normalize: (out: quat, a: quat) => quat
  }
}