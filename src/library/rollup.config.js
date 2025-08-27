import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/postreq.js',
        format: 'iife',
        name: 'POSTreq',
        sourcemap: true,
      },
      {
        file: 'dist/postreq.min.js',
        format: 'iife',
        name: 'POSTreq',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
];