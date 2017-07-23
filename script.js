$(function() {
    $('a.scroll-down').click (function() {
    	console.log("click");
      $('html, body').animate(
      	{scrollTop: $('section#about').offset().top }, 'slow');
      return false;
    });
});

$(function() {
    $('a.scroll-top').click (function() {
    	console.log("click");
      $('html, body').animate(
      	{scrollTop: $('section#header').offset().top }, 'slow');
      return false;
    });
});