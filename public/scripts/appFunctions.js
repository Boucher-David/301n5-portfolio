'use strict';

var app = app || {}

{
  // Check each nav bar for their IDS and store for future reference.
  app.tabs = $('.svg-parent svg').map((index, tab) => {
    return (tab.id.replace('SVG', ''));
  });

  app.rawTemplates = [];
  app.rawTemplateData = [];
  app.compiledTemplates = [];

  app.getTemplates = function(tab){
    $.get(`scripts/templateRaw/${tab}.hbs`, (template) => {
      app.rawTemplates[`${tab}SVG`] = template;
    });
  }

  app.getTemplateData = function(tab) {
    $.getJSON(`scripts/templateJSON/${tab}.json`).done((json)=>{
      app.rawTemplateData[`${tab}SVG`] = json;
    });
  }

  // makes use of Github API, map(), and reduce().
  app.getRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/boucher-david/repos',
      method: 'GET',
    }).then(results => {
      app.rawTemplateData['portfolioSVG'] = results.map((result) => {
        return result.name;
      }).reduce((previous,current) => {
        if (!current.match('android')) {
          return previous.concat(current);
        } else {
          return previous;
        }
      }, []);
    }).then(() => {
      callback();
    });
  }

  app.compileTemplates = function(){
    $.each(app.tabs, (index, tab) => {

      let template = Handlebars.compile(app.rawTemplates[`${tab}SVG`]);
      app.compiledTemplates[`${tab}SVG`] = template(app.rawTemplateData[`${tab}SVG`]);

      if (tab === 'home') {$('.main-content').html(app.compiledTemplates['homeSVG']); }
    });
  }
}
