import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const targets = [
  {
    input: 'src/test1/index.ts',
    tsconfig: 'src/test1/tsconfig.json',
    // you can put an absolute path to your csgo content folder here
    output: 'build/test1.js'
  },
  {
    input: 'src/test2/index.ts',
    tsconfig: 'src/test2/tsconfig.json',
    output: 'build/test2.js',
  },
];

export default targets.map(({ input, output, tsconfig }) => ({
  input,
  output: {
    file: output,
    format: "esm",
  },
  external: ['cs_script/point_script'],
  plugins: [
    typescript({
      tsconfig,
    }),
    nodeResolve(),
    commonjs()
  ],
}));