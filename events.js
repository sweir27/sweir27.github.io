$(function() {
  $('body').on('click', '#glitch-on', function(e) {
    if (glitchRunning == false) {
      startGlitch()
    }
  });

  $('body').on('click', '#glitch-off', function(e) {
    clearTimeout(glitchTime)
    glitchRunning = false;
  });
});