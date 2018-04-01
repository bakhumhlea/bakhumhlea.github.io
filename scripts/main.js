
$( document ).ready(function(){
    var startAnimateFrame = setInterval(function(){
        $('.top-border').addClass('ready');
        $('.right-border').addClass('ready');
        $('.bottom-border').addClass('ready');
        $('.left-border').addClass('ready');

        $('.site-logo').addClass('ready');
        $('.site-name').addClass('ready');
        $('.page-nav').addClass('ready');
    }, 500);
});
var $page_nav = $('.page-nav li');
$.each($page_nav, function() {
    var $el = $(this);

    $el.hover(function(){
        $el.addClass('respond');
    },function(){
        $el.removeClass('respond');
    });
})

$('.contact-btn').on('click', function() {
    $('.contact-page').addClass('opened');
});

$('.examine-btn').on('click', function() {
    var nameCard = $('.name-card');
    if (nameCard.hasClass('flipped')) {
        nameCard.removeClass('flipped');
    } else {
        nameCard.addClass('flipped');
    }
});
$('.dismiss-btn').on('click', function() {
    $('.contact-page').removeClass('opened');
});
