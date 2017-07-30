function Article(work) {
  this.title = work.title;
  this.company = work.company;
  this.duration = work.duration;
  this.companyURL = work.companyURL;
  this.roles = work.roles;
  this.imageLink = '../images/' + this.company + '.img';
}

Article.prototype.toHtml = function () {
  var $newArticle = $('article#template').clone();
  $newArticle.removeAttr('id');
  $newArticle.attr('id', this.company);

  $newArticle.find('h1').html(this.title);
  $newArticle.find('h3').html(this.company);
  $newArticle.find('a').attr('href', this.companyURL);
  $newArticle.find('p').html(this.duration);
  return $newArticle;
}

var articles = [];
workExperience.forEach(function(articleObject){
  articles.push(new Article(articleObject));
});




articles.forEach(function(job) {
  $('.work-experience').append(job.toHtml());
});
