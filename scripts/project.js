$( document ).ready(function() {
    
});

var projectProp = {
    imgTimer : undefined,
    imgLength : undefined,
    currentProjectIndex : 0,
    currentImgIndex : 0,
}

function btnColor(index) {
    var textColor = projectsList[index].textColor;
    $('.prev-btn').css('color', textColor);
    $('.next-btn').css('color', textColor);
    $('.desc-dismiss-btn').css('color', textColor);
};

function autoSlideImg(index){
    console.log('start timer');
    var project = projectsList[index];
    var targetProject = `#project_0${index+1} .canvas`;
    projectProp.imgLength = project.imgSrc.length;
    projectProp.currentProjectIndex = index;
    if (project.imgSrc.length > 1) {
         projectProp.imgTimer = setInterval(()=>{
            if ( projectProp.currentImgIndex < projectProp.imgLength-1 ) {
                var imgUrl = `url(${project.imgSrc[projectProp.currentImgIndex]})`;
                $(targetProject).css('background-image', imgUrl);
                projectProp.currentImgIndex++;
            } else {
                var imgUrl = `url(${project.imgSrc[0]})`;
                $(targetProject).css('background-image', imgUrl);
                projectProp.currentImgIndex = 0;
            }
        }, 4000);
    } else {
        var imgUrl = `url(${project.imgSrc[0]})`;
        $(targetProject).css('background-image', imgUrl);
    }
};

function translate_project_list() {
    clearInterval(projectProp.imgTimer);
    var projects_left = $('.projects').offset().left; //0
    var projects_width = $('.projects').outerWidth();
    var projects_mid_line = projects_left + (projects_width / 2);
    var projects_each_left = [];
    var object = $(this).hasClass('next-btn');
    console.log($(this).hasClass('next-btn'));
    $.each($projects, function() {
        var $el = $(this);
        var el_width = $el.outerWidth();
        var el_left = $el.offset().left;
        projects_each_left.push(el_left)
    });
    for (var i = projects_each_left.length-1 ; i >= 0 ; i--) {
        var conditions = object?i!==projects_each_left.length-1:i!==0;
        if (projects_mid_line > projects_each_left[i] && conditions  ) {
            var translateX = object?(i+1)*(-100):(i-1)*(-100);
            var projectIndex = object?i+1:i-1;
            btnColor(projectIndex);
            autoSlideImg(projectIndex);
            $('.projects-list').css(
                'transform', "translate("+translateX+"%, 0)"
            );
            return console.log('break');
        } else if (projects_mid_line > projects_each_left[i] && i===projects_each_left.length-1 && object ) {
            btnColor(0);
            autoSlideImg(0);
            $('.projects-list').css(
                'transform', "translate(0%, 0)"
            );
            return console.log('to first');
        } else if (projects_mid_line > projects_each_left[i] && i===0 && !object) {
            btnColor(projects_each_left.length-1);
            autoSlideImg(projects_each_left.length-1);
            $('.projects-list').css(
                'transform', "translate("+ ((projects_each_left.length-1)*(-100)) +"%, 0)"
            );
            return console.log('to last');
        }
    }
}

function openDesc(){
    var el = $('.project-desc');
    var button = $('.desc-dismiss-btn');
    var next = $('.next-btn');
    var prev = $('.prev-btn');
    if (el.hasClass('opened')) {
        el.removeClass('opened');
        next.removeClass('opened');
        prev.removeClass('opened');
        button.removeClass('ion-ios-close-empty opened');
        button.addClass('ion-ios-information-outline');
    } else {
        el.addClass('opened');
        next.addClass('opened');
        prev.addClass('opened');
        button.removeClass('ion-ios-information-outline');
        button.addClass('ion-ios-close-empty opened');
    }
}

$('.next-btn').on('click', translate_project_list);
$('.prev-btn').on('click', translate_project_list);

$('.desc-dismiss-btn').on('click', openDesc );
$('.canvas').on('click', openDesc );
