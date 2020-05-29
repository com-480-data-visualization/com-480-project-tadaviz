//// VARIABLES

var bar_plot;
var country_data;
var current_question_id;
const personalities = ["EXT", "EST", "AGR", "CSN", "OPN"];
const xAxis = ["No answer", "Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

//// ON LOAD

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

whenDocumentLoaded(() => {
	// Load the search bar & country data
	country_data = load_country_data();
	// Load the dropdown menu
	load_dropdown_menu();

	// Load the bar plot
	load_bar_plot();
});


////FUNCTIONS

// Loads the dropdown_menu
async function load_dropdown_menu(){

	// Wait for the search bar & country data to be loaded
	await new Promise(r => setTimeout(r, 50));

	let question_menu = document.getElementById("question");

	// Questions dropdown menu
	let question_HTML = '<menu>';
	let sub_HTML = '';
	for (p in personalities){
		sub_HTML = '<menuitem><a>' + personalities[p] + '</a><menu>';
		for(let i = 1; i < 11; i++){
			sub_HTML += '<menuitem id = ' + personalities[p] + i.toString() +
						' onclick = update_bar_plot("' + personalities[p] + i.toString()+'")'+
						' onmouseleave=expand_not("' + personalities[p] + i.toString()+'")' +
						' onmouseenter=expand("' + personalities[p] + i.toString() +
						'")><a' +
						' class="fixed"' +
						 ' id="text'+personalities[p] + i.toString()+'">' +
						personalities[p] + i.toString() + '</a></menuitem>';
		}
		sub_HTML += '</menu></menuitem>';
		question_HTML += sub_HTML;
	}
	question_HTML +='</menu>';
	question_menu.innerHTML += question_HTML;
}

// Loads the search bar and the country data
function load_country_data(){
	// Load the country data for the search
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
	let country_menu_HTML = "<li id=statsli>"+"GLOBAL"+"</li>";
	for (let c_name of country_names){
		country_menu_HTML += "<li id=statsli>"+c_name+"</li>";
	}
	country_menu.innerHTML += country_menu_HTML;
	refresh();
	return country_data;
}

// Loads the bar plot
function load_bar_plot(){
	let data = [];
	for (k in questions_corpus){
		let distribution = [];
		for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
			distribution.push(global_distributions[k][n.toString()+".0"]);
		}
		data.push({"name": questions_corpus[k], "id": k, "distribution": distribution, "x": xAxis});
	}
	// Barplot for EXT1
	current_question_id = "EXT1";
	bar_plot = new Barplot(data[0], 80, 700, 600);
	bar_plot.make_plot();
}

function update_bar_plot(question_id){
	const country_name = get_search_value();

	// If the user wants to display the global data
	if (country_name.toUpperCase()=="GLOBAL"){
		// Load the new Data for the barplot
		current_question_id = question_id;
		let distribution = [];
		for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
			distribution.push(global_distributions[question_id][n.toString()+".0"]);
		}
		bar_plot.update_plot({"name": questions_corpus[question_id], "id": question_id, "distribution": distribution, "x": xAxis});
	}

	// If the user wants to display the data of a specific country
	else{
		// Load the new Data for the barplot
		current_question_id = question_id;
		const data = country_data.find(dict =>
			(dict["id"]==question_id)&&(dict["country"]==country_name));
		bar_plot.update_plot({"name": questions_corpus[data['id']], "id": data['id'], "distribution": data['distribution'], "x": xAxis});
	}
}

function expand(question_id){
	 let to_change_text=document.getElementById("text"+question_id);
	 to_change_text.classList.remove("fixed");
	 to_change_text.classList.add("expand");
	 if (to_change_text.classList.contains("unexpand")){
		 to_change_text.classList.remove("unexpand");
	 }

	 to_change_text.textContent=questions_corpus[question_id];
	 if (to_change_text.classList.contains("unexpand")){
		 to_change_text.classList.remove("unexpand");
	 }
}

function expand_not(question_id){
	// let to_change_text=document.getElementById("text"+question_id);
 	 // to_change_text.classList.add("fixed");
 	 // to_change_text.classList.add("unexpand");
 	 // to_change_text.classList.remove("expand");
 	 // to_change_text.textContent=question_id;
}

function keep_fixed(question_id){
	question_id = ques
	for(i=1;i<11;i++){
		i
		document.getElementById("text"+question_id)
	}
}
