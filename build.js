import build from 'esbuild';
import glob from 'glob';

const entryPoints = glob.sync('./src/**/*.ts'); // 適宜読み替えてください

build.build({
  entryPoints,
  outbase: './src', // outbaseを指定することで指定したディレクトリの構造が出力先ディレクトリに反映されるようになる,
  outdir: './build', // 出力先ディレクトリ
  // bundle: true,
  format: 'esm',
  platform: 'node', // 'node' 'browser' 'neutral' のいずれかを指定,
  external: [], // バンドルに含めたくないライブラリがある場合は、パッケージ名を文字列で列挙する,
  watch: false, // trueにすれば、ファイルを監視して自動で再ビルドしてくれるようになる
});
