var first = {
    question: "Where did hamburgers believed to have been originated from?",
    answer: "Germany",
    opt1: "Spain",
    opt2: "Japan",
    opt3: "Sweden"
},
second = {
    question: "What's the most popular topping in a burger?",
    answer: "Bacon",
    opt1: "Hopes and Dreams",
    opt2: "Guacamole",
    opt3: "Onion Strings"
},
third = {
    question: "Who made the first hamburger?",
    answer: "Louis Lassen",
    opt1: "Louis Armstrong",
    opt2: "Stevie Wonder",
    opt3: "William Mckinley"
},
fourth = {
    question: "Which chain was the first to serve French Fries with the hamburger?",
    answer: "White Castle",
    opt1: "McDonalds",
    opt2: "Burger King",
    opt3: "Jack in the Forest"
},
fifth = {
    question: "Who invented the Cheeseburger?",
    answer: "Lionel Sternberger",
    opt1: "Lionel Messi",
    opt2: "Julia Child",
    opt3: "Bob Ross"
},
questions = [first, second, third, fourth, fifth],
answers = [first, second, third, fourth, fifth],
score = 0,
page = 1;

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        // }). remove().appendTo(this); // 2014-05-24: Removed `random` but leaving for reference. See notes under 'ANOTHER EDIT'
        }).detach().appendTo(this);
    });

    return this;
};

function questionMaker(arr) {
    var shifted = arr.shift(),
        pageC = $('.page-current');
    pageC.append("<h2 class='pt-page-moveFromRight'>" + shifted.question + "</h2>");
    pageC.append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt1 + "</a></li>");
    pageC.append("<li class='guess-box pt-page-moveFromRight CA'><a>" + shifted.answer + "</a></li>");
    pageC.append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt3 + "</a></li>");
    pageC.append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt2 + "</a></li>");
    $('div').randomize('li');
}

function checkLast() {
    if (page == 6 && score < 5) {
        var pMain = $('#pt-main');
        pMain.find('.btn-pink').hide();
        pMain.find('h2').hide();
        pMain.find('li').hide();
        pMain.find('.page-current').append("<h1 class='pt-page-moveFromRight' style='color:black;margin-top:10%'>No burger here! Please hit the button below to refresh the page and try again!</h1><button class='btn-blue pt-page-moveFromRight' style='margin-top:5%'>Refresh</button>");
    }
}

function finishedQuiz() {
    if (page == 6 && score == 5) {
        var pMain = $('#pt-main');
        pMain.find('.btn-pink').hide();
        pMain.find('h2').hide();
        pMain.find('li').hide();
        pMain.find('.page-current').append("<h1 class='pt-page-moveFromRight'>Congrats on finishing with a perfect score! Enjoy your burger!</h1>");
        pMain.find('.page-current').append("<img class='pt-page-moveFromRight' src='../images/burger.svg' style='height:auto;width:80%;margin-left:7%'>");

    }
}

$(document).ready(function() {

    questionMaker(questions);

	$(".btn-pink").on("click", function() {
        page += 1;
		pc = $('.page-current');
        listItems = $('ul');
        pc.addClass('pt-page-moveToLeft');
        listItems.addClass('pt-page-moveToLeft');
        pc.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            pc.removeClass('pt-page-moveToLeft');
            listItems.removeClass('pt-page-moveToLeft');
            pc.hide();
            questionMaker(questions);
        })

		var current = $(".page-current").removeClass('page-current');
        	if(current.next() && current.next().length){
                current.next().addClass('page-current');
	    } else {
	      current.siblings(":first").addClass('page-current');
		}

        checkLast();
        finishedQuiz();

	});
    
});

$(document).on('click', 'li', function() {
    
    $(this).addClass('selected');
    for (var i = 0; i <= answers.length; i++) {
        if ($(this).text() === answers[i].answer) {
            $(this).addClass('correct');
            score += 1;
            $('li').not(this).addClass('wrong');
            if (score == 1) {
                $('.burger-box').append('<img src="../images/top-bun.svg" style="height:100px;width:100px;float:right"></img>');
        }
            else if (score == 2) {
                $('.burger-box').prepend('<img src="../images/lettuce.svg" style="height:100px;width:100px;float:right"></img>');
            }
            else if (score == 3) {
                $('.burger-box').prepend('<img src="../images/tomatoes.svg" style="height:100px;width:100px;float:right"></img>');
            }
            else if (score == 4) {
                $('.burger-box').prepend('<img src="../images/patty.svg" style="height:100px;width:100px;float:right"></img>');
            }
            else if (score == 5) {
                $('.burger-box').prepend('<img src="../images/bottom-bun.svg" style="height:100px;width:100px;float:right"></img>');
            }
        } else {
            $('li').click(false);
            $('li').not('.CA').addClass('wrong');
            $('.CA').addClass('correct');
        }
    }

});

$(document).on('click', '.btn-blue', function() {
    location.reload(true);
});