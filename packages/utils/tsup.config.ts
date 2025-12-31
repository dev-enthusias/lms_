import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        cn: "src/cn.ts",
    },
    format: ["esm", "cjs"],
    dts: {
        resolve: true, 
        compilerOptions: {
            moduleResolution: "NodeNext",
        },
    },
    sourcemap: true,
    clean: true,
    splitting: false,
    outDir: "dist",
});
