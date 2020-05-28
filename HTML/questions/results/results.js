// min and max score for each trait to apply min max normalization to the user scores
let mmTrait = {"EXT": {"min": -25, "max": 25}, "EST": {"min": -40, "max": 10}, "OPN": {"min": -15, "max": 35}, "AGR": {"min": -20, "max": 30}, "CSN": {"min": -20, "max": 30}}
//Bar chart
var data = []

// get the user trait scores
keys =['EXT', 'EST', 'AGR', 'CSN', 'OPN'];
keys.forEach((item, i) => {
  score = parseInt(localStorage.getItem(item))
  score =(score-mmTrait[item]['min'])/(mmTrait[item]['max']-mmTrait[item]['min'])
  data[i] = {
    'name':item,
    'value':score*100
  }
});

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 15,
    right: 200,
    bottom: 15,
    left: 200
};

var width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select("#graphic").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style({'display': 'block','margin': '0 auto'})
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0,height], .4)
    .domain(data.map(function (d) {
        return d.name;
    }));

//make y axis to show bar names
var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g");

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", 0)
    .attr('id',function (d) {
        return d.name;
    });

bars.append("text")
    .attr("class", "label")
    .attr("y", function (d) {
        return y(d.name) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d.value) + 3;
    });

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("width", function(d) {return x(d.value); })
  .delay(function(d,i){return(i*100)});

svg.selectAll(".label")
  .transition()
  .duration(800)
  .text(function (d) {
      return d.value+'%';
  })
  .delay(function(d,i){return( 800+i*100)});



// tab part
function openTrait(evt, traitName) {
  console.log(traitName)
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(traitName).style.display = "block";
  console.log(document.getElementById(traitName))
  evt.currentTarget.className += " active";
}
