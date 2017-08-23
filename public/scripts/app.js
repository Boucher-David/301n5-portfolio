let templates = [];

// IIFE that loads templates for quick loading

(function(){
  ['home','about','portfolio','social'].forEach((tab) => {
    $.getJSON(`scripts/templateJSON/${tab}.json`).done((json) => {
      $.get(`scripts/templateRaw/${tab}.hbs`, (handleBarsTemplate) => {
        let template = Handlebars.compile(handleBarsTemplate);
        templates[`${tab}SVG`] = template(json);

        if (tab === 'home') {$('.main-content').html(templates[`${tab}SVG`]); }
      });
    });
  });
})();
console.log(templates);

// Nav clicking. Clicking on a nav loads a different handlebars template into main content div
$('.svg-parent svg').on('click', function(e) {
  e.preventDefault();

  // load template based on nav selected
  $('.main-content').html(templates[$(this).attr('id')]);

  $("text", this).css('fill', '#990000').css('font-weight', 'Bold');

  // clicking on home should show nav bar again.
  if ($(this).attr('id') === 'homeSVG' && $('.svg-parent svg').not('#homeSVG').not(':visible')) {
    $('.svg-parent svg').not('#homeSVG').show();
  }

  });
