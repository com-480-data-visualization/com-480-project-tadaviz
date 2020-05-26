// Global variables
var bar_plot;

//// ON LOAD
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

function udpate_bar_plot(question_id){
	// Load the new Data for the barplot
	let distribution = [];
	for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
		distribution.push(global_distributions[question_id][n.toString()+".0"]);
	}
	bar_plot.update_plot({"name": questions_corpus[question_id], "id": question_id, "distribution": distribution, "x": ["0", "1", "2", "3", "4", "5"]});
}

whenDocumentLoaded(() => {

	// Load the dropdown menu
	let question_menu = document.getElementById("question");
	//let criterion_menu = document.getElementById("criterion");

	// Questions dropdown menu
	const personalities = ["EXT", "EST", "AGR", "CSN", "OPN"];
	let question_HTML = '<menu>';
	let sub_HTML = '';
	for (p in personalities){
		sub_HTML = '<menuitem><a>' + personalities[p] + '</a><menu>';
		for(let i = 1; i < 11; i++){
			sub_HTML += '<menuitem id = ' + personalities[p] + i.toString() +
			' onclick = udpate_bar_plot("' + personalities[p] + i.toString() + '")><a>' +
			personalities[p] + i.toString() + '</a></menuitem>';
		}
		sub_HTML += '</menu></menuitem>';
		question_HTML += sub_HTML;
	}
	question_HTML +='</menu>';
	question_menu.innerHTML += question_HTML;

	// Criterion dropdown menu
	/*
	let criterion_HTML = '<menu><menuitem><a>Answer Distribution</a></menuitem><menuitem><a>Response Time</a></menuitem></menu>'
	criterion_menu.innerHTML += criterion_HTML;
	*/

	// Load the country search
	let country_data = [];
	let country_names = new Set([]);
	for (c in country_distributions){
		// Parse elements
		const els = c.substring(1, c.length - 1).split(",");
		const question_id = els[0].substring(1, els[0].length - 1);
		const country_name = els[1].substring(2, els[1].length - 1);
		const country_code = els[2].substring(2, els[2].length - 1);
		// Get Distribution
		let distribution = [];
		for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
			distribution.push(country_distributions[c][n.toString()+".0"]);
		}
		country_names = country_names.add(country_name);
		country_data.push({"id": question_id, "country": country_name, "country_code": country_code,
		"distribution": distribution, "x": ["0", "1", "2", "3", "4", "5"]});
	}
	// Load the search dropdown menu and fill it
	let country_menu = document.getElementById("country_list");
	let country_menu_HTML = "";
	for (let c_name of country_names){
		console.log(c_name);
		country_menu_HTML += "<li>"+c_name+"</li>";
	}
	country_menu.innerHTML += country_menu_HTML;

/*	for (k in question_corpus){

	}*/

	// Load data in the bar plot
	let data = [];
	for (k in questions_corpus){
		let distribution = [];
		for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
			distribution.push(global_distributions[k][n.toString()+".0"]);
		}
		data.push({"name": questions_corpus[k], "id": k, "distribution": distribution, "x": ["0", "1", "2", "3", "4", "5"]});
	}
	// Barplot for EXT1
	bar_plot = new Barplot(data[0], 80, 700, 600);
	bar_plot.make_plot();
});
