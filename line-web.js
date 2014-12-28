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
    'stroke-width': "1",
    fill: "none",
    d: 'M'+from_x+','+from_y+' L'+to_x+','+to_y
  })
  svg.append(path);
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  path.style.transition = path.style.WebkitTransition =
    'stroke-dashoffset .1s';
  // Go!
  path.style.strokeDashoffset = '0';
  return [to_x, to_y]
}

function drawingDriver(x, y) {
  from_coords = createPath(x, y)
  drawingTime = setTimeout(function() {
    drawingDriver(from_coords[0], from_coords[1]);
  }, 100)
}

function startDrawing() {
  drawingInProgress = true;
  drawingDriver(0,0)
}