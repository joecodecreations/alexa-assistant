var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define our pplication
var app = new alexa.app('nauvi');

/* What happens during the initial launch of the program */
app.launch(function(req,res) {
	greetings(req,res);
});

app.intent('who',{
	"slots":{"NAME":"LITERAL"},
	"utterances": [
      "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
    ]
},
function(req,res) {
		var yourname = req.slot('NAME');

    /* we have received a name */
		if (yourname) {

			if(yourname==req.session('yourname')){
				console.log("the names are the same");
				res.say("I actually already knew your name was "+yourname);
				res.shouldEndSession(false);
				return;
	    }

			if(req.session('yourname')!=null && yourname!=req.session('yourname')){
				console.log("the names are the same");
				res.say("Wait, I thought you said your name was "+req.session('yourname')+", not "+yourname);
				res.shouldEndSession(false);
				return;
			}

			/* we didn't have a name already */
			res.session('yourname',yourname); //store the name for use
			res.say("I will remember your name is "+yourname+" from now on.");
		}
		else {
			res.reprompt("Sorry, I didn't hear a name. Please tell me your name");
		}

		res.shouldEndSession(false);
	}

);

app.intent('best',{
	
	"utterances": [
      "{whos|Who is} {the best|coolest|most amazing} person in the world?"
    ]
},
function(req,res) {
	   res.say("Thats simple. Michelle is.");
		 res.shouldEndSession(false);

);


/* Functions */

/* DEALING WITH INTRODUCTIONS */
function greetings(req,res){
	var currentTimeofDay = getTimeOfDay();
	var prompt = "Good "+currentTimeofDay;
	if(req.session('yourname')){
		prompt = prompt+req.session('yourname');
	}
	prompt = prompt+". How can I help you today?";
	res.say(prompt).reprompt("I am waiting on your response").shouldEndSession(false);
}


function helpful(req,res){
	var prompt = "How can I help you today";
	if(req.session('yourname')){
		prompt = prompt + req.session('yourname');
	}
	res.say(prompt).shouldEndSession(false);
}


/* DEALING WITH NAMES  */

/* Do we know the name and they are different  */
function changedName(req,res){
	if(req.session('yourname')!=null && yourname != req.session('yourname')){
		res.say("Have you changed your name? I thought your name was "+req.session("yourname")+" not "+yourname);
		return true;
	} else {
		return false;
	}
}

/* Do we already know the name, and is it the same */
function haveName(req,res){
	if(yourname==req.session('yourname')){
		res.say("I actually already knew your name was "+yourname);
		return true;
	} else {
		return false;
	}
}


/* DEALING WITH TIME */
function getTimeOfDay(time){

	var today = new Date(),
	currentHour = today.getHours(),
	timeofday= '';

	switch(true) {
	    case (currentHour > 18):
	        timeofday = "evening";
	        break;
			case (currentHour > 12):
	        timeofday = "afternoon";
	        break;
	    default:
	        timeofday = "morning";
	}
	return(timeofday);
}




module.exports = app;
