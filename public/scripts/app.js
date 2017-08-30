var app = app || {}
let templates = [];
window.app = app;

'use strict';
// IIFE that loads templates for quick rendering
{
  app.tabs = $('.svg-parent svg').map((index, tab) => {
    return (tab.id.replace('SVG', ''));
  });

  $.each(app.tabs, (index, tab) => {
    $.getJSON(`scripts/templateJSON/${tab}.json`).done((json) => {
      $.get(`scripts/templateRaw/${tab}.hbs`, (t) => {
        let template = Handlebars.compile(t);
        templates[`${tab}SVG`] = template(json);

        // load home tab when it's compiled
        if (tab === 'home') {$('.main-content').html(templates['homeSVG']); }
      });
    });
  });

  // filter repo list using reduce.
  $.ajax({
    url: 'https://api.github.com/user/repos',
    method: 'GET',
    headers: {
    'Authorization': `token ${githubToken}`
    }
  }).then(results => {
    app.repos = results.map((result) => {
      return {name: result.name, id: result.id};
    });
  }, error => {
    console.log(error);
  }).then(() => {
    app.sortedRepos = app.repos.reduce((prev,curr) => {
      if (!curr.name.match('android')) {
        return prev.concat(curr);
      } else {
        return prev;
      }
    },[]);
  }).then(() => {
    let $repoList = $('#repoList');
    $.each(app.sortedRepos, (repo) => {
      $repoList.append(`<li>Repo Name: ${repo.name} || Repo ID: ${repo.id}</li>`);
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
