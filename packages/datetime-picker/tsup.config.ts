import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        calendar: "src/components/calendar.tsx",
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
