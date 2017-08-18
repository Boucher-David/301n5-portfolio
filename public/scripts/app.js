let templates = [];

// IIFE that loads templates for quick loading
(function() {
  ['home','about','portfolio','social'].forEach((tab) => {
    $.getJSON(`scripts/templateJSON/${tab}.json`).done((json) => {
      $.get(`scripts/templateRaw/${tab}.hbs`, (t) => {
        let template = Handlebars.compile(t);
        templates[`${tab}SVG`] = template(json);
        if (tab === 'home') {$('.main-content').html(templates['homeSVG']); }
      });
    });
  });
})();


// Load home on page load

// Nav clicking. Clicking on a nav loads a different handlebars template into main content div
$('.svg-parent svg').on('click', function(e) {
  e.preventDefault();

  // load template based on nav selected
  $('.main-content').html(templates[$(this).attr('id')]);

  // Hide all navs except home.
  $('.svg-parent svg').not('#homeSVG').hide();

  // clicking on home should show nav bar again.
  if ($(this).attr('id') === 'homeSVG' && $('.svg-parent svg').not('#homeSVG').not(':visible')) {
    $('.svg-parent svg').not('#homeSVG').show();
  }

});
