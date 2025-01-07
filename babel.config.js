module.exports = {
  presets: [
    [
      '@babel/preset-env', // 最新のJavaScriptをサポート
      {
        targets: {
          node: 'current', // 現在のNodeバージョンをターゲットにする
        },
      },
    ],
    '@babel/preset-react', // React用の設定
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
