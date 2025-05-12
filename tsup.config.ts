import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'], // 输出格式
    dts: true, // 生成类型文件
    splitting: false, // 是否拆分文件
    sourcemap: true, // 生成 sourcemap
    clean: true, // 清理输出目录
    treeshake: true, // 摇树优化
    external: ['react'], // 外部依赖
});