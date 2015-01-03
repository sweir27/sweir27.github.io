function makeSVG(tag, attrs) {
  var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}

function drawArtsyLogo(x, y, color) {
  var newSvg = makeSVG('svg', {
    x: x,
    y: y,
    width: size,
    height: size
  })

  strokeWidth = size/14
  var group = makeSVG('g', {
    stroke:color,
    'stroke-width': strokeWidth
  })
  $(newSvg).append(group)

  var rect = makeSVG('rect', {
    stroke: 'white',
    fill: 'white',
    width: size,
    height: size,
    x: 0,
    y: 0
  })
  $(group).append(rect)

  var rect2 = makeSVG('rect', {
    fill: 'none',
    width: size-(size/5),
    height: size-(size/5),
    x: (size/10),
    y: (size/10)
  })
  $(group).append(rect2)

  var line = makeSVG('line', {
    x1: size-(size/3.5),
    y1: size-(size/10),
    x2: size-(size/3.5),
    y2: size-(size/3.5)
  })
  $(group).append(line)

  var letter = makeSVG('path', {
    fill: "none",
    d: 'M'+(size/5)+','+(size/1.8)+' l'+(size/7.5)+',-'+(size/3)+
    ' h'+(size/18)+
    ' l'+(size/7.5)+','+(size/3)+
    ' m-'+(size/15)+',-'+(size/6.5)+
    ' h-'+(size/5.5)
  })
  $(group).append(letter)

  svg.append(newSvg)
}

function drawingDriver(color) {
  colors = ['#00A8C6', '#40C0CB', '#F9F2E7', '#AEE239', '#8FBE00']
  if (size < smallestSize) {
    size = fullSize;
    drawArtsyLogo(0, 0, colors[Math.floor(Math.random() * colors.length)])
    size = fullSize/2;
  } else {
    for (var newX = 0; newX < fullSize; newX += size ) {
      for (var newY = 0; newY < fullSize; newY += size ) {
        drawArtsyLogo(newX, newY, color)
      }
    }
    size = size/2;
  }
  drawingTime = setTimeout(function() {
    drawingDriver(colors[Math.floor(Math.random() * colors.length)])
  }, 200)
}

function startDrawing() {
  drawingInProgress = true;
  drawArtsyLogo(0, 0, 'black')
  drawingDriver('black')
}