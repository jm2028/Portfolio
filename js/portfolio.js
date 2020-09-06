$(document).ready(function () {
    $(window).scroll(function () {
        var windowS = $(window).scrollTop();
        if (windowS > 0) {
            $('.ulBG').css('box-shadow', '0px 5px 3px -3px #000');
        } else {
            $('.ulBG').css('box-shadow', 'none');
        }

        /*scroll Event*/
        var bt_window = $(window).scrollTop() + $(window).height();
        $('.sectionTitleStart').each(function () {
            var section_object = $(this).offset().top + 100;
            if (bt_window > section_object) {
                /*$(this).css('letter-spacing','1vw');*/
            } else {
                $(this).css('letter-spacing', '0');
            }
        });
        $('.sectionTitle').each(function (i) {
            var bt_of_object = $(this).offset().top + $(this).outerHeight() * 0.4;
            /*console.log(scrollValue);*/
            if ($(window).scrollTop() <= 0) {
                $('.headerTitle').removeClass('on');
                $('.introBtn').addClass('on');
            } // header css
            if (bt_window > bt_of_object) {
                var scrollValue = ($(window).scrollTop() / ($(document).outerHeight() - $(window).height())) * 80;
                changeBgColor(i);
                /*$('.liBG').stop().animate({
                  left: scrollValue + '%'
                }, 550, 'easeOutCirc');*/
                $('.liBG').stop().animate({
                    left: i * 20 + '%'
                }, 550, 'easeOutCirc');
                $(this).children('.sectionTitleStart').css('letter-spacing', '1vw');
                /*console.log(i);*/
            }; // header 움직이는 백그라운드
        });
        $('.skillList').each(function (i) {
            var skill_object = $(this).offset().top * 1.1;
            if (bt_window > skill_object) {
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        }); // skill 슬라이드다운
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
        $('html').stop().animate({
            scrollTop: $('.sectionTitle[data-index=' + i + ']').offset().top
        }, 450, 'easeOutCirc');
        /*console.log(i);*/
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
});