function makeSVG(tag, attrs) {
  var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}

function createPath(from_x, from_y) {
  to_x = Math.floor(Math.random() * 639)
  to_y = Math.floor(Math.random() * 426)
  var path = makeSVG('path', {
    stroke: "#000",
    'stroke-width': "2",
    fill: "none",
    d: 'M'+from_x+','+from_y+' L'+to_x+','+to_y
  })
  svg.append(path);
  return [to_x, to_y]
}

function drawingDriver(x, y) {
  from_coords = createPath(x, y)
  drawingTime = setTimeout(function() {
    drawingDriver(from_coords[0], from_coords[1]);
  }, 50)
}

function startDrawing() {
  drawingInProgress = true;
  drawingDriver(0,0)
}