var app = app || {}
let templates = [];

'use strict';
// IIFE that loads templates for quick rendering
{

  $.each(app.tabs, (index, tab)=>{
    app.getTemplates(tab);
    app.getTemplateData(tab);
  }).promise().done(() => {
    app.getRepos(app.compileTemplates);
  });

}


// Nav clicking. Clicking on a nav loads a different handlebars template into main content div
$('.svg-parent svg').on('click', function(e) {
  e.preventDefault();

  // load template based on nav selected
  $('.main-content').html(app.compiledTemplates[$(this).attr('id')]);

  // Hide all navs except home.
  $('.svg-parent svg').not('#homeSVG').hide();

  // clicking on home should show nav bar again.
  if ($(this).attr('id') === 'homeSVG' && $('.svg-parent svg').not('#homeSVG').not(':visible')) {
    $('.svg-parent svg').not('#homeSVG').show();
  }
});
