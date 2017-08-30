$(document).ready(function () {
    var articleContainer = $('article-container');
    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleScrape);

    initPage();
    function intiPage() {
        articleContainer.empty();
        $.get('/api/healines?saved=false')
            .then(function (data) {
                if (data && data.legnth) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }
    function renderArticles(articles) {
        var articlePanel = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanel.push(createPanel(atricles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function renderEmpty() {
        var emptyAlert = $([
            'div class= "alert alert-warning text-center">',
            '<h3> Sorry you have no articles to view.</h3>',
            '</div>',
            '<div class="panel panel-default>',
            '<div class= "panel-body text-center">',
            '<h4><a class="scrape-new">Try Scraping New Articles</a></h4>',
            '<h4><a href="/saved">Go to Saved Articles</a><h4>',
            '</div>'
        ].join(''));
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var article = $(this)
            .parents('.panel')
            .data();
        articleToSave.saved = true;
    }

    function createPanel() {

        var panel = $([
            '<div class="panel panel-default">',
            '<div class="panel-heading">',
            '<h3>',
            article.headline,
            '<a class="btn btn-success save">',
            'Save Article',
            '</a>',
            '</h3>',
            '</div>',
            '<div class"panel-body">',
            article.summary,
            '</div>',
            '</div>'
        ].join(''));
        panel.data('_id, article._id');
        return panel;
    }

    function handleArticleToScrape() {
        $.get('/api/fetch').then(function(data) {
            initPage();
            bootbox.alert('<h3 class="text-center m-top-80">' + data.message + '</h3>');
        });
    }
    
    function handleArticleSave() {

        var articleToSave = $(this)
            .parents('.panel')
            .data();
        articleToSave.saved = true;

        $
            .ajax({method: "PATCH", url: '/api/headlines', data: articleToSave})
            .then(function (data) {
                if (data.ok) {
                    initPage();
                }
            });
    }
    
});
