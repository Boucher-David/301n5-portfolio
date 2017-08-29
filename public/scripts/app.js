var app = app || {}
let templates = [];
window.app = app;

'use strict';
// IIFE that loads templates for quick rendering
{

  // when we go through the github API I will update this reduce to parse that data.
  var total = [0, 1, 2, 3].reduce(function(sum, value) {
    return sum + value;
  }, 0);
  console.log(total);

  app.tabs = $('.svg-parent svg').map((index, tab) => {
    return (tab.id.replace('SVG', ''));
  });

  $.each(app.tabs, (index, tab) => {
    $.getJSON(`scripts/templateJSON/${tab}.json`).done((json) => {
      $.get(`scripts/templateRaw/${tab}.hbs`, (t) => {
        let template = Handlebars.compile(t);
        templates[`${tab}SVG`] = template(json);

        // load home tab when it's compiled
        if (tab === 'portfolio') {$('.main-content').html(templates['portfolioSVG']); }
      });
    });
  });
}


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
