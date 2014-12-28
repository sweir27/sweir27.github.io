// FROM: https://github.com/mutaphysis/smackmyglitchupjs/blob/master/glitch.html

function detectJpegHeaderSize(data) {
  jpgHeaderLength = 417;
  l = data.length;
  for (var i = 0; i < l; i++) {
    if (data[i] == 0xFF && data[i+1] == 0xDA) {
      jpgHeaderLength = i + 2;
      return
    }
  }
}

// base64 is 2^6, byte is 2^8, every 4 base64 values create three bytes
function base64ToByteArray(str) {
  var result = [], digitNum, cur, prev;
  for (var i = 23, l = str.length; i < l; i++) {
    cur = reverseBase64Map[str.charAt(i)];
    digitNum = (i-23) % 4;
    switch(digitNum){
      //case 0: first digit - do nothing, not enough info to work with
      case 1: //second digit
        result.push(prev << 2 | cur >> 4);
        break;
      case 2: //third digit
        result.push((prev & 0x0f) << 4 | cur >> 2);
        break;
      case 3: //fourth digit
        result.push((prev & 3) << 6 | cur);
        break;
    }
    prev = cur;
  }
  return result;
}

function byteArrayToBase64(arr) {
  var result = ["data:image/jpeg;base64,"], byteNum, cur, prev;
  for (var i = 0, l = arr.length; i < l; i++) {
    cur = arr[i];
    byteNum = i % 3;
    switch (byteNum) {
      case 0: //first byte
        result.push(base64Map[cur >> 2]);
        break;
      case 1: //second byte
        result.push(base64Map[(prev & 3) << 4 | (cur >> 4)]);
        break;
      case 2: //third byte
        result.push(base64Map[(prev & 0x0f) << 2 | (cur >> 6)]);
        result.push(base64Map[cur & 0x3f]);
        break;
    }
    prev = cur;
  }
  if (byteNum == 0) {
    result.push(base64Map[(prev & 3) << 4]);
    result.push("==");
  } else if (byteNum == 1) {
    result.push(base64Map[(prev & 0x0f) << 2]);
    result.push("=");
  }
  return result.join("");
}

function glitchJpegBytes(strArr) {
  var rnd = Math.floor(jpgHeaderLength + Math.random() * (strArr.length - jpgHeaderLength - 4));
  strArr[rnd] = Math.floor(Math.random() * 256);
}

function glitchJpeg() {
  var glitchCopy = imgDataArr.slice();
  for (var i = 0; i < 10; i++) {
    glitchJpegBytes(glitchCopy);
  }
  glitchAndSave(glitchCopy)
}

function glitchAndSave(glitchCopy) {
  glitchCount += 1
  if (glitchCount == 0) {
    glitchHistory.unshift(imgDataArr.slice())
  }
  glitchHistory.unshift(glitchCopy)
  drawGlitchedImage(glitchCopy)
}

function reverseHistory() {
  if (glitchHistory.length == 1) {
    glitchCount = 0
    drawGlitchedImage(glitchHistory[0])
  } else {
    drawGlitchedImage(glitchHistory[0])
    glitchHistory = glitchHistory.splice(0, 1)
    console.log(glitchHistory.length)

  }
}

function drawGlitchedImage(glitchyImage) {
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
  img.src = byteArrayToBase64(glitchyImage);
}

function glitchDriver() {
  // if (glitchCount < glitchMax) {
  //   glitchJpeg();
  // } else {
  //   reverseHistory();
  // }
  glitchJpeg();
  glitchTime = setTimeout(glitchDriver, 10);
}

function startGlitch() {
  ctx.drawImage(initialImage, 0, 0);
  glitchRunning = true;
  var imgData = canvas.toDataURL("image/jpeg");
  imgDataArr = base64ToByteArray(imgData);
  detectJpegHeaderSize(imgDataArr);
  glitchHistory.unshift(imgDataArr.slice())
  drawGlitchedImage(imgDataArr.slice())
  glitchDriver()
}
