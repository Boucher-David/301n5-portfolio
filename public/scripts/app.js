var app = app || {}
'use strict';

// IIFE that loads templates for quick rendering.
{
  // Functions are declared in appFunctions.js and stored in the global app space.

  // loop throgh each tab
  $.each(app.tabs, (index, tab)=>{

    // load tab's template from handlebars file.
    app.getTemplates(tab);

    // load tab's data from JSON file.
    app.getTemplateData(tab);

  // make sure we wait for $.each to run on each tab, so we have every template and its data loaded.
  }).promise().done(() => {

    // Make an AJAX call to my github as un-authenticated user. When repo data is returned, compile each template as by calling function as callback.

    //Seeing I am deploying this to Heroku, I can't save a github token. So the only alternative is to call this AJAX function without authentication.
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
