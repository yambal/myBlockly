# myBlockly
ややこしいBlockly( https://developers.google.com/blockly/ )をできるだけシンプルに利用したい。

jQuery Plug-in とし、いくぶん扱いやすくした

## サンプル
Blockly の内部に構築する例。

その要素自体のサイズ、レイアウトについては別途解決する必要があります。
```JavaScript
var blockly = $('#Blockly').blockly({
  codeTypes: [{
    name: 'javascript'
  }],
  //toolBoxXMLText: toolBoxXMLText,
  toolBoxXML : "https://raw.githubusercontent.com/yambal/myBlockly/master/dist/toolbox-sample.xml",
  media: "https://dl.dropboxusercontent.com/u/438976/Qlockly/media/",
  onInitized : function(){
    blockly.setXML('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set" x="0" y="0"><field name="VAR">a</field><value name="VALUE"><block type="text"><field name="TEXT">Hello! Blockly!</field></block></value></block></xml>');
  }
});
```
- codeTypes : Block からコードに変換する対象言語。対応する「Generator stub」が読み込まれている必要があります
- toolBoxXMLText : ツールボックスを規定するXML（テキスト）toolBoxXML とどちらかを設定
- toolBoxXML : ツールボックスを規定するXML（URL） toolBoxXMLText とどちらかを設定
- media : Blockly 組み込みの画像、音声フォルダへのURL
- onInitized : 初期化が完了したときのコールバック（上記では初期ブロックを配置している）

## メソッド
show(codeType) : ビューをスイッチします
```JavaScript
blockly.show("blocks"); // ブロックを表示します
blockly.show("xml"); // ブロックXML表示します
blockly.show("javascript"); // codeTypes オプションで指定した言語を表示します
```
resize() : 領域のサイズが変化した時にと呼び出し、再描画を行います
```JavaScript
blockly.resize();
```
getXML() : ブロックXML（テキスト）を取得します
```JavaScript
blockly.getXML();
```
sgetXML() : ブロックXML（テキスト）をブロックに追加します
```JavaScript
blockly.setXML('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set" x="0" y="0"><field name="VAR">a</field><value name="VALUE"><block type="text"><field name="TEXT">Hello! Blockly!</field></block></value></block></xml>');
```
