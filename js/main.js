(function(){
  'use strict';

/* 変数定義 */
  var box_color = "black";
  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext('2d');
  var dnld = document.getElementById("dnld");
  var clr = document.getElementById("clear");

  var csWidth = 10*113;
  var csHeight = 220;

  canvas.width = csWidth;
  canvas.height = csHeight;

/* 関数宣言 */
// color change button
  function change_color(color) {
    box_color = color;
  }

// plot
  function drawRect(x, y, width, height) {
    ctx.fillStyle = box_color;
    ctx.fillRect(x - x % 10, y, width, height);
  }
  function onClick(e) {
    var x = e.clientX - canvas.offsetLeft;
    drawRect(x, 0, 10, 200);
  }
  function greyGrid(x, y, width, height) {
    ctx.fillStyle = "grey";
    ctx.fillRect(x, y, width, height);
  }
  function blueGrid(x, y, width, height) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, width, height);
  }
  function redGrid(x, y, width, height) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width, height);
  }

// clear
  function init_canvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, csWidth, csHeight);
    for(var i=10*11; i<1130-10*7; i= i + 10) {
      greyGrid(i, 0, 1, 200);
    }
    box_color = "black";
    drawRect(10*11, 0, 10, 220);
    drawRect(10*13, 0, 10, 220);
    drawRect(10*57, 0, 10, 220);
    drawRect(10*59, 0, 10, 220);
    drawRect(10*103, 0, 10, 220);
    drawRect(10*105, 0, 10, 220);
    for(var i=10*21; i<=10*56; i+=70) {
      blueGrid(i, 0, 1, 200)
    }
    for(var i=10*68-70; i<10*103; i+=70) {
      blueGrid(i, 0, 1, 200)
    }
  }

// download
  function dwnld() {
    var base64_data = canvas.toDataURL('image/png'), // 画像をbase64に変換
        bin_data = atob(base64_data.replace(/^.*,/, '')), // bas64をバイナリに変換
        len = bin_data.length,
        buf = new Uint8Array(len); // バッファを確保, Uint8Arrayはunsigned charみたいなやつ
    for(var i=0; i<len; i++) {
      buf[i] = bin_data.charCodeAt(i); // バイナリをUTF-16のユニコード値に変換してバッファに書き込む
    }
    var blob_data = new Blob([buf], {type: 'image/png'}), // バッファのデータからBlobを生成
        created_url = window.URL.createObjectURL(blob_data); // BlobからURLを生成
    dnld.setAttribute("href", created_url); // 生成したURLに飛ぶ
    dnld.setAttribute("download", "image.png"); // image.pngとしてダウンロード
  }

/* 実行 */
  canvas.onload = init_canvas();
  document.getElementById("black").addEventListener('click', function() { change_color("black"); }, false);
  document.getElementById("white").addEventListener('click', function() { change_color("white"); }, false);
  canvas.addEventListener('click', onClick, false);
  clr.addEventListener('click', init_canvas, false);
  dnld.addEventListener('click', dwnld, false);
})();

/*
  referring...  https://qiita.com/kyrieleison/items/a3ebf7c55295c3e7d8f0
*/
