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
questions = [first, second, third, fourth, fifth];

function questionMaker(arr) {
    var shifted = arr.shift();
    $('.page-current').append("<h2 class='pt-page-moveFromRight'>" + shifted.question + "</h2>");
    $('.page-current').append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt1 + "</a></li>");
    $('.page-current').append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt3 + "</a></li>");
    $('.page-current').append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.opt2 + "</a></li>");
    $('.page-current').append("<li class='guess-box pt-page-moveFromRight'><a>" + shifted.answer + "</a></li>");
}

$(document).ready(function() {

    questionMaker(questions);

	$(".btn-pink").on("click", function() {
		pc = $('.page-current');
        listItems = $('ul');
        pc.addClass('pt-page-moveToLeft');
        listItems.addClass('pt-page-moveToLeft');
        pc.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            pc.removeClass('pt-page-moveToLeft');
            listItems.removeClass('pt-page-moveToLeft');
            pc.remove();
            questionMaker(questions);
        })
		var current = $(".page-current").removeClass('page-current');
        	if(current.next() && current.next().length){
                current.next().addClass('page-current');
	    } else {
	      current.siblings(":first").addClass('page-current');
		}

	});



});

$(document).on('click', 'li', function() {
    $(this).addClass('selected');
});