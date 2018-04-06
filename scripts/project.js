
var projectProp = {
    imgTimer : undefined,
    imgLength : undefined,
    imgNumText : 1,
    currentProjectIndex : 0,
    currentImgIndex : 0,
}

function btnColor(index) {
    var textColor = projectsList[index].textColor;
    $('.canvas').css('color', textColor);
    $('.prev-btn').css('color', textColor);
    $('.next-btn').css('color', textColor);
    $('.desc-dismiss-btn').css('color', textColor);
};

function autoSlideImg(index){
    var project = projectsList[index];
    var targetProject = `#project_0${index+1} .canvas`;
    projectProp.imgLength = project.imgSrc.length;
    projectProp.currentProjectIndex = index+1;
    /*for(var n=0; n < projectsList.length; n++){
        if (n!==index) {
            $(`#project_0${n+1} .canvas`).css('background-image', `url(${projectsList[n].imgSrc[0]})`);
        }
    }*/
    if (project.imgSrc.length > 1) {
        projectProp.imgTimer = setInterval(()=>{
            if ( projectProp.currentImgIndex < projectProp.imgLength ) {
                //displayImgNum(index, projectProp.currentImgIndex);
                var attr = `url(${project.imgSrc[projectProp.currentImgIndex]})`;
                $(targetProject).css('background-image', attr);
                var c = (projectProp.currentImgIndex+1)===projectProp.imgLength?projectProp.currentImgIndex=0:projectProp.currentImgIndex++;
            } else {
                //displayImgNum(index, 0);
                var attr = `url(${project.imgSrc[0]})`;
                $(targetProject).css('background-image', attr);
                projectProp.currentImgIndex = 0;
            }
        }, 4000);
    } else {
        //displayImgNum(index, 0);
        var attr = `url(${project.imgSrc[0]})`;
        $(targetProject).css('background-image', attr);
    }
};
function displayImgNum(proIndex, index) {
    var target = `#project_0${proIndex+1} .canvas`;
    var imgSlideNum = `0${index+1}/0${projectsList[proIndex].imgSrc.length}`;
    $(target).text(imgSlideNum);
};

function translate_project_list() {
    clearInterval(projectProp.imgTimer);
    var projects_left = $('.projects').offset().left; //0
    var projects_width = $('.projects').outerWidth();
    var projects_mid_line = projects_left + (projects_width / 2);
    var projects_each_left = [];
    var object = $(this).hasClass('next-btn');
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
            //displayImgNum(projectIndex, 0);
            autoSlideImg(projectIndex);
            $('.projects-list').css(
                'transform', "translate("+translateX+"%, 0)"
            );
            return
        } else if (projects_mid_line > projects_each_left[i] && i===projects_each_left.length-1 && object ) {
            btnColor(0);
            //displayImgNum(0, 0);
            autoSlideImg(0);
            $('.projects-list').css(
                'transform', "translate(0%, 0)"
            );
            return
        } else if (projects_mid_line > projects_each_left[i] && i===0 && !object) {
            //displayImgNum(projects_each_left.length-1, 0);
            btnColor(projects_each_left.length-1);
            autoSlideImg(projects_each_left.length-1);
            $('.projects-list').css(
                'transform', "translate("+ ((projects_each_left.length-1)*(-100)) +"%, 0)"
            );
            return
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
