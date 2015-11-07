function BurgerQuestion(question, answer) {
	this.question = question;
	this.answer = answer;
}

var first = new BurgerQuestion("Where did hamburgers get their name?", "From German Immigrants who brought Hamburg steak in the 1700s/1800s."),
    second = new BurgerQuestion("What's the most popular topping in a burger?", "Bacon"),
    third = new BurgerQuestion("Who made the first hamburger?", "Louis Lassen"),
    fourth = new BurgerQuestion("Which chain was the first to serve French Fries with the hamburger?", "White Castle"),
    fifth = new BurgerQuestion("Who invented the Cheeseburger?", "Lionel Sternberger");

$(document).ready(function() {

	$(".pt-page-1").append("<h2>" + first.question + "</h2>");

	$(".btn-pink").on("click", function() {
		pc = $('.page-current');
        pc.addClass('pt-page-moveToLeft');
        pc.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            pc.removeClass('pt-page-moveToLeft');
            pc.remove();
        })
		var current = $(".page-current").removeClass('page-current');
        	if(current.next() && current.next().length){
                current.next().addClass('page-current');
	    } else {
	      current.siblings(":first").addClass('page-current');
		}

	});

});