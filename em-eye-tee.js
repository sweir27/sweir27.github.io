function makeSVG(tag, attrs) {
  var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}

function randomIntWithStrokeWidth(startingPoint) {
  min = startingPoint - letterWidth
  max = startingPoint + letterWidth
  return Math.floor(Math.random()*(max-min+1)+min);
}

function createPath() {
  // colors = ['#5D0F0D', '#333333', '#E8E8E8']
  colors = ['#FA023C', '#5D0F0D', '#333333']
  letters = ['em', 'eye', 'tee']

  color = colors[Math.floor(Math.random() * colors.length)];
  letter = letters[Math.floor(Math.random() * letters.length)];
  window[letter](color)
}

function em(color) {
  bottom_left_x = randomIntWithStrokeWidth(50)
  bottom_left_y = randomIntWithStrokeWidth(400)
  top_left_x = randomIntWithStrokeWidth(75)
  top_left_y = randomIntWithStrokeWidth(25)
  bottom_middle_x = randomIntWithStrokeWidth(150)
  bottom_middle_y = randomIntWithStrokeWidth(250)
  top_right_x = randomIntWithStrokeWidth(225)
  top_right_y = randomIntWithStrokeWidth(25)
  bottom_right_x = randomIntWithStrokeWidth(250)
  bottom_right_y = randomIntWithStrokeWidth(400)

  var path = makeSVG('path', {
    stroke: color,
    'stroke-width': strokeWidth,
    fill: "none",
    d: 'M'+bottom_left_x+','+bottom_left_y+' L'+top_left_x+','+top_left_y+
    ' L'+bottom_middle_x+','+bottom_middle_y+' L'+top_right_x+','+top_right_y+
    ' L'+bottom_right_x+','+bottom_right_y
  })
  svg.append(path);
  animateAndDraw(path)
}

function eye(color) {
  top_x = randomIntWithStrokeWidth(325)
  top_y = randomIntWithStrokeWidth(25)
  bottom_x = randomIntWithStrokeWidth(325)
  bottom_y = randomIntWithStrokeWidth(400)

  var path = makeSVG('path', {
    stroke: color,
    'stroke-width': strokeWidth,
    fill: "none",
    d: 'M'+top_x+','+top_y+' L'+bottom_x+','+bottom_y
  })
  svg.append(path);
  animateAndDraw(path)
}

function tee(color) {
  top_left_x = randomIntWithStrokeWidth(400)
  top_left_y = randomIntWithStrokeWidth(25)
  top_middle_x = randomIntWithStrokeWidth(500)
  top_middle_y = randomIntWithStrokeWidth(25)
  top_right_x = randomIntWithStrokeWidth(600)
  top_right_y = randomIntWithStrokeWidth(25)
  bottom_x = randomIntWithStrokeWidth(500)
  bottom_y = randomIntWithStrokeWidth(400)

  var path = makeSVG('path', {
    stroke: color,
    'stroke-width': strokeWidth,
    fill: "none",
    d: 'M'+top_left_x+','+top_left_y+' L'+top_middle_x+','+top_middle_y+
    ' L'+top_right_x+','+top_right_y+' L'+top_middle_x+','+top_middle_y+
    ' L'+bottom_x+','+bottom_y
  })
  svg.append(path);
  animateAndDraw(path)
}

function animateAndDraw(path) {
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
    'stroke-dashoffset 1s';
  // Go!
  path.style.strokeDashoffset = '0';
}

function drawingDriver(x, y) {
  createPath()
  drawingTime = setTimeout(drawingDriver, 100)
}

function startDrawing() {
  drawingInProgress = true;
  drawingDriver(0,0)
}