function make_graph(id){
  //let time=data[id].time;
  //let data_point=data[id].answers;
  let data_point = [0.1,0.1,0.2,0.3,0.4,0.5];
  let time = 10.3;
  let xticks=["NA",1,2,3,4,5];
  let h=250;
  let w=300;
  let space_between_bars=w/50;
  let margin=w/10;
  let bar_width=(w-margin-space_between_bars*7)/6;

  let graph_questions=d3.select('#stat'+id);

  const y_scale = d3.scaleLinear()
        .range([h, margin])
        .domain([0, 100]);

  const x_scale = d3.scaleBand()
        .range([0, w-margin])
        .domain(xticks)
        .padding(0.2);

  /*const svg=d3.select(".stats")
        .append("svg")
        .attr("class","graph")
        .attr("height",h+h/10)
        ;*/
  //graph_questions=d3.select(".stats");
  const svg = graph_questions
        .append("svg")
        .attr("class","graph")
        .attr("height",h+h/10)
        ;
  const info_box = d3.select(".stats")
        .append("div")
        .attr("class","info_box")
        ;

  info_box.append('p')
    .text(time +"s")
    .attr("class","text-time")
  ;
  info_box.append('p')
    .text("Average time taken to answer the question")
    .attr("class","text-time-explanation")
  ;


  svg.append('g')
    .attr('transform', `translate(30, 0)`)
    .call(d3.axisLeft(y_scale))
   ;

  svg.append('g')
    .attr('transform', `translate(30, 0)`)
    .attr('class', 'grid')
    .attr("class","custom_grid")
    .call(d3.axisLeft()
        .scale(y_scale)
        .tickSize(-w+margin , 0, 0)
        .tickFormat(''))
       ;

  svg.append('g')
    .attr('transform', `translate(30, ${h})`)
    .call(d3.axisBottom()
         .scale(x_scale))
        ;


  let h_graph = h - margin;
  svg.selectAll("rect")
    .data(data_point)
    .enter()
    .append("rect")
    .attr("height",(d) => h_graph*d)
    .attr("x",(d,i) => margin+i*bar_width+(i+1)*space_between_bars)
    .attr("y",(d,i)=> h-d*h_graph)
    .attr("width",bar_width)
    .attr("class","bar")
   ;


  svg.append("text")
    .attr('x', w / 2 + margin)
    .attr('y', margin/2)
    .attr('text-anchor', 'middle')
    .text('Answers of the other participants')
  ;
  svg.append("text")
    .attr('x',  margin/2)
    .attr('y', margin/2)
    .attr('text-anchor', 'middle')
    .text('[%]')
  ;
  /*
  svg.data(data_point)
    .enter()
    .append("text")
    .attr("x",(d,i) => margin+i*bar_width+(i+1)*space_between_bars)
    //.attr("y",(d,i)=> h-d*h_graph-4)
    .text((d)=>d)
    .attr('text-anchor', 'middle')
   ;*/
  /*
    svg
       .data(data_point)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (d * 3 + 3))
  ;
  */

}
