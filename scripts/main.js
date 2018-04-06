$( document ).ready(function(){
    var startAnimateFrame = setInterval(function(){
        $('.site-logo').addClass('ready');
        $('.site-name').addClass('ready');
        $('.page-nav').addClass('ready');
    }, 300);

    $.each($projects, function(index,value){
        var init = -50;
        var translateX = init+(index*100);
        $project = $(this);
        $project.css('transform','translate('+translateX+'%,0)');
    });

    projectsList.forEach( (project, index) => {
        var targetProject = `#project_0${index+1} .canvas`;
        var bgAttr = `url(${project.imgSrc[0]})`;
        $(targetProject).css( 'background-image', bgAttr );
    });

    $( window ).on('resize', function(){
        var w = $(this).width();
        var h = $(this).height();
        if (w/h < 1.63 ){
            $('.canvas').css(
                'background-size', 'auto 100%'
            );
        } else {
            $('.canvas').css(
                'background-size', '100% auto'
            );
        }
        var meW = ($(this).width()*40)/100;
        var meH = $(this).height();
        if (meW/meH < 0.66) {
            $('.my-img').css('background-size', 'auto 100%');
        } else {
            $('.my-img').css('background-size', '100% auto');
        }
    });
    btnColor(0);
});

var $projects = $('.projects li');

$( window ).on('resize', function(){

});
function resizeMe(width, height) {
    if (((w*40)/100)/h < 0.66) {
        $('.my-img').css('background-size', 'auto 100%');
    } else {
        $('.my-img').css('background-size', '100% auto');
    }
}

var $page_nav = $('.page-nav li');

$.each($page_nav, function() {
    var $el = $(this);
    $el.hover(function(){
        $el.addClass('respond');
    },function(){
        $el.removeClass('respond');
    });
})

function openPage(pageClass){
    var pages = [$('.about-page'),$('.projects-page'),$('.contact-page')];
    for (var i = 0; i < pages.length ; i++){
        if(pages[i].hasClass(pageClass)){
            pages[i].addClass('opened');
        } else {
            pages[i].removeClass('opened');
        }
    }
};

function toggleNavBtn(navBtnClass){
    $.each($page_nav, function() {
        var $nav_btn = $(this);
        if($nav_btn.hasClass(navBtnClass)) {
            if ($nav_btn.hasClass('active')){
                $nav_btn.removeClass('active');
            } else {
                $nav_btn.addClass('active');
            }
        } else {
            $nav_btn.removeClass('active');
        }
    })
}

$('.about-btn').on('click',function() {
    var el = $('.about-page');
    if(el.hasClass('opened')){
        toggleNavBtn('about-btn');
        el.removeClass('opened');
        $('.site-name').removeClass('opened');
        $('.about-page .top-border').removeClass('ready');
        $('.about-page .right-border').removeClass('ready');
        $('.about-page .bottom-border').removeClass('ready');
        $('.about-page .left-border').removeClass('ready');
    } else {
        toggleNavBtn('about-btn');
        openPage('about-page');
        $('.site-name').addClass('opened');
        $('.about-page .top-border').addClass('ready');
        $('.about-page .right-border').addClass('ready');
        $('.about-page .bottom-border').addClass('ready');
        $('.about-page .left-border').addClass('ready');
    }
});

$('.projects-btn').on('click',function() {
    var el = $('.projects-page');
    if(el.hasClass('opened')){
        clearInterval(projectProp.imgTimer);
        toggleNavBtn('projects-btn');
        el.removeClass('opened')
        $('.site-name').removeClass('opened');
        $('.projects-page .top-border').removeClass('ready');
        $('.projects-page .right-border').removeClass('ready');
        $('.projects-page .bottom-border').removeClass('ready');
        $('.projects-page .left-border').removeClass('ready');
    } else {
        //displayImgNum(projectProp.currentProjectIndex, 0)
        autoSlideImg(projectProp.currentProjectIndex);
        toggleNavBtn('projects-btn');
        openPage('projects-page');
        $('.site-name').addClass('opened');
        $('.projects-page .top-border').addClass('ready');
        $('.projects-page .right-border').addClass('ready');
        $('.projects-page .bottom-border').addClass('ready');
        $('.projects-page .left-border').addClass('ready');
    }
});

$('.contact-btn').on('click', function() {
    $('.contact-page').addClass('opened');
    $('.site-name').addClass('opened');
});

$('.dismiss-btn').on('click', function() {
    $('.contact-page').removeClass('opened');
    $('.site-name').removeClass('opened');
});

$('.examine-btn').on('click', function() {
    var nameCard = $('.name-card');
    if (nameCard.hasClass('flipped')) {
        nameCard.removeClass('flipped');
    } else {
        nameCard.addClass('flipped');
    }
});
