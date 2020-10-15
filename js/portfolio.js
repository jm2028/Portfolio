$(document).ready(function () {
    var headerheight = $('.headerTitle').outerHeight();
    $('body').css('padding-top',headerheight - 2);
    window.addEventListener('resize', function(){
        var headerheight = $('.headerTitle').outerHeight();
        $('body').css('padding-top',headerheight - 2);
    })
    $(window).scroll(function () {
        var windowTop = $(window).scrollTop();
        if (windowTop > 0) {
            $('.ulBG').css('box-shadow', '0px 5px 3px -3px #000');
        } else {
            $('.ulBG').css('box-shadow', 'none');
        }

        /*scroll Event*/
        var bt_window = $(window).scrollTop() + $(window).height();
        $('.sectionTitleStart').each(function () {
            var section_object = $(this).offset().top + $(this).outerHeight()  + 100 ;
            if (bt_window > section_object) {
                $(this).css('letter-spacing','1vw');
            } else {
                $(this).css('letter-spacing', '0');
            }
        });
        $('.sectionTitle').each(function (i) {
            var bt_of_object = $(this).offset().top + $(this).outerHeight() * 0.75;
            if (bt_window > bt_of_object) {
                changeBgColor(i);
                $('.liBG').stop().animate({
                    left: i * 20 + '%'
                }, 550, 'easeOutCirc');
            }; // header 움직이는 백그라운드
        });
        $('.skillList').each(function (i) {
            var skill_object = $(this).offset().top;
            if ($(window).width() > 768) {
                if (bt_window > skill_object * 1.08) {
                    $(this).addClass('on');
                } else {
                    $(this).removeClass('on');
                }
            }
            if ($(window).width() <= 767) {
                if (bt_window > skill_object + 65) {
                    $(this).addClass('on');
                } else {
                    $(this).removeClass('on');
                }
            }
        }); // skill 슬라이드다운
        
        if (windowTop <= 0) {
            $('.headerTitle').removeClass('on');
            $('.introBtn').addClass('on');
            $('.liBG').stop().animate({left:0},550, 'easeOutCirc');
        } // header css
    })
    /*scroll Event END*/
    
    /*nav btn*/
    function changeBgColor(i) {
        $('.headerTitle[data-index=' + i + ']').addClass('on');
        $('.headerTitle[data-index!=' + i + ']').removeClass('on').css('letter-spacing', '0');
    }

    $('.sectionTitle').each(function (i) {
        $(this).attr('data-index', i);
    });

    $('.headerTitle').each(function (i) {
        $(this).attr('data-index', i);
        var i = $(this).attr('data-index');
    }).click(function (i) {
        var i = $(this).attr('data-index');
        $('.headerTitle').css('letter-spacing', '0');
        $(this).css('letter-spacing', '0.5vw');
        if ( $(window).width() > 1024 ) {
            $('html').stop().animate({
                scrollTop: $('.sectionTitle[data-index=' + i + ']').offset().top
            }, 450, 'easeOutCirc');
        } else if ( $(window).width() <= 1024 ){
            $('html').stop().animate({
                scrollTop: ($('.sectionTitle[data-index=' + i + ']').offset().top) - (($('.sectionTitle[data-index=' + i + ']').parent().height()) * 0.1)
            }, 450, 'easeOutCirc');
            console.log($('.sectionTitle[data-index=' + i + ']').innerHeight());
        }
    });
    /*nav btn END*/

    /*slide*/
    $('.SlideBtn').each(function (i) {
        $(this).attr('data-index', i);
    }).click(function () {
        var i = $(this).attr('data-index');
        $('.desktopInImageWrap').css('margin-left', i * -92 + '%');
        $('.padInImageWrap').css('margin-left', i * -88.6 + '%');
        $('.mobileInImageWrap').css('margin-left', i * -88.6 + '%');
    })
    /*slide END*/

    /*텍스트 변경*/
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }
        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 80);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 80));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 2000);
    /*텍스트 변경*/

    /*skill animation*/
    var skill = $('.skillList');
    var height = skill.scrollHeight;
    skill.css('--dl-height', height + 'px');

    $('.tabBtn').each(function(i){
        $(this).attr('data-index',i)
    }).click(function(){
        var i = $(this).attr('data-index');
        console.log(i);
        $('.tabBg').css('left',i * 50 + '%');
        $('.contentsSlideBox').css('marginLeft' , i * -100 + '%');
    });
    $('.tabBtn.travelerTab').click(function(){
        $('.desktopInImageWrap').css('margin-left' , 0);
        $('.padInImageWrap').css('margin-left' , 0);
        $('.mobileInImageWrap').css('margin-left' , 0);
    });
    $('.tabBtn.batTab').click(function(){
        $('.desktopInImageWrap').css('margin-left' , -276 + '%'); // 1page = 92%
        $('.padInImageWrap').css('margin-left' , -265.8 + '%'); // 1page = 88.6%
        $('.mobileInImageWrap').css('margin-left' , -265.8 + '%'); // 1page = 88.6%
    });
});