import { defineConfig } from "tsup";
import fs from "fs-extra";

export default defineConfig({
  // Specifies the output formats for the bundled code
  // "cjs" for CommonJS modules (e.g., Node.js)
  // "esm" for ECMAScript modules (modern browser and Node.js with --loader=module)
  format: ["cjs", "esm"],

  // Specifies the entry points for the bundler
  // In this case it's the "./src/index.ts" file
  // if you want entire folder structure, then use "src/**/*", otherwise use "src/index.ts"
  entry: ["src/index.ts"],

  // Generate a .d.ts file with type declaration
  dts: true,

  // Generate shims for Node.js built-in modules
  shims: true,

  // Skip bundling dependencies from the node_modules folder
  skipNodeModulesBundle: true,

  // Clean the output directory before start bundling
  clean: true,

  // Generate source map for the bundled code
  sourcemap: true,

  // Call this function once build is success
  onSuccess: async () => {
    try {
      // Copy the package json into dist
      await fs.copySync("package.json", "dist/package.json");
      // Copy public folder into dist
      await fs.copySync("public", "dist/public");
    } catch (e) {
      console.error("failed on success", e);
    }
  },
});
