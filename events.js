$(function() {
  // Set padding to center arrows
  padding = ($('.main-image').height()/2) - 50;
  $('.arrow-wrap').css('padding-bottom', padding+'px')

  $('body').on('click', '#glitch-on', function(e) {
    if (glitchRunning == false) {
      startGlitch()
    }
  });

  $('body').on('click', '#glitch-off', function(e) {
    clearTimeout(glitchTime)
    glitchRunning = false;
  });

  $('body').on('click', '#scribble-on', function(e) {
    if (drawingInProgress == false) {
      startDrawing()
    }
  });

  $('body').on('click', '#scribble-off', function(e) {
    clearTimeout(drawingTime)
    drawingInProgress = false;
  });

  $('body').on('click', '#party-on', function(e) {
    if (drawingInProgress == false) {
      startDrawing()
    }
  });

  $('body').on('click', '#party-off', function(e) {
    clearTimeout(drawingTime)
    drawingInProgress = false;
  });
});