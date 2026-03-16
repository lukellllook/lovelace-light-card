import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');
const isRelease = process.argv.includes('--release');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: isRelease ? 'release/entity-controller.js' : 'dist/entity-controller.js',
  format: 'esm',
  target: 'es2020',
  minify: isRelease,
  sourcemap: !isRelease,
  loader: {
    '.ts': 'ts',
  },
  resolveExtensions: ['.ts', '.js', '.mjs'],
  platform: 'browser',
  mainFields: ['browser', 'module', 'main'],
};

async function build() {
  if (isRelease) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.rebuild();
    await ctx.dispose();
    console.log('✅ Release build complete: release/entity-controller.js');
  } else if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('👀 Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
    console.log('✅ Build complete: dist/entity-controller.js');
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
