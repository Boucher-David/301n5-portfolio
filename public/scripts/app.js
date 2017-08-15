// replace this with IIFE that gets all templates and precompiles them.It should also potentially get all data and put them together too.

function getHBTemplate(tab) {
  $.getJSON(`scripts/templateJSON/${tab}.json`).done((json) => {
    $.get(`scripts/templateRaw/${tab}.hbs`, (t) => {
      let template = Handlebars.compile(t);
      $('.main-content').html(template(json));
    });
  });
}

// Load home on page load
getHBTemplate('home');

// Nav clicking. Clicking on a nav loads a different handlebars template into main content div
$('.svg-parent svg').on('click', function(e) {
  e.preventDefault();
  let clickedSVG = $(this).attr('id').replace('SVG', '');

  // load template based on nav selected
  getHBTemplate(clickedSVG);

  // Hide all navs except home.
  $('.svg-parent svg').not('#homeSVG').hide();

  // clicking on home should show nav bar again.
  if (clickedSVG === 'home' && $('.svg-parent svg').not('#homeSVG').not(':visible')) {
    $('.svg-parent svg').not('#homeSVG').show();
  }

});
