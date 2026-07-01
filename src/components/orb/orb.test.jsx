import { render } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import Orb from "./orb";

const originalWebGLRenderingContext = window.WebGLRenderingContext;
const originalResizeObserver = window.ResizeObserver;
const originalIntersectionObserver = window.IntersectionObserver;

vi.mock("ogl", () => {
  class Renderer {
    constructor() {
      this.gl = {
        canvas: document.createElement("canvas"),
        clearColor() {},
        getExtension() {
          return { loseContext() {} };
        },
      };
    }

    setSize() {}
    render() {}
  }

  class Program {
    constructor(_gl, options) {
      this.uniforms = options.uniforms;
    }
  }

  class Vec3 {
    set() {}
  }

  return {
    Renderer,
    Program,
    Mesh: class Mesh {},
    Triangle: class Triangle {},
    Vec3,
  };
});

afterEach(() => {
  vi.restoreAllMocks();
  window.WebGLRenderingContext = originalWebGLRenderingContext;
  window.ResizeObserver = originalResizeObserver;
  window.IntersectionObserver = originalIntersectionObserver;
});

test("renders when observer APIs are unavailable after WebGL initializes", () => {
  window.WebGLRenderingContext = function WebGLRenderingContext() {};
  window.ResizeObserver = undefined;
  window.IntersectionObserver = undefined;

  vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

  expect(() => render(<Orb />)).not.toThrow();
});
