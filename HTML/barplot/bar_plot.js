
class Barplot{

  // data must be smth like : 0: x0, 1:x1, 2:x2, ...
  constructor(data, margin, width, height){

    this.svg = d3.select('svg');
    this.svgContainer = d3.select('#container');

    this.margin = margin;
    this.width = width - 2 * this.margin;
    this.height = height - 2 * this.margin;
    this.name = data["name"];
    this.id = data["id"];
    this.distribution = data["distribution"];
    this.pair_distribution = data["distribution"].map(function(e,i) {
      return [e, data["x"][i]];
    });
    //console.log(this.pair_distribution);

    this.chart = this.svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    this.xScale = d3.scaleBand()
      .range([0, width])
      .domain(data["x"])
      .padding(0.3)

    this.yScale = d3.scaleLinear()
      .range([height-160, 0])
      .domain([0, Math.max(...this.distribution)]);

    /*
    // vertical grid lines
    this.makeXLines = () => d3.axisBottom()
      .scale(this.xScale)
    */

    this.makeYLines = () => d3.axisLeft()
      .scale(this.yScale)
  }

  make_plot(){

    const xScale = this.xScale;
    const yScale = this.yScale;
    const chart = this.chart;
    const width = this.width;
    const height = this.height;
    const margin = this.margin;
    const total = this.distribution.reduce(function(total,x){return total+x},0);

    chart.append('g')
      .attr('class', 'axisBottom')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .attr('class', 'axisLeft')
      .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart.append('g')
      .attr('class', 'grid')
      .call(this.makeYLines()
        .tickSize( - width - 2 * margin, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(this.pair_distribution)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g[1]))
      .attr('y', (g) => yScale(0))
      .attr('height', (g) =>  0)
      .attr('width',  xScale.bandwidth())

      .transition()
      .duration(600)
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g[1]))
      .attr('y', (g) => yScale(g[0]))
      .attr('height', (g) =>  height - yScale(g[0]))
      .attr('width',  xScale.bandwidth());

    barGroups
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) =>  xScale(a[1]) - 5)
          .attr('width',  xScale.bandwidth() + 10)

        const y =  yScale(actual[0])

        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width + 2*margin)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) =>  xScale(a[1]) +  xScale.bandwidth() / 2)
          .attr('y', (a) =>  yScale(a[0]) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (Math.round((a[0]-actual[0])/total*10000)/100).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })

      })


      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a[1]))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a[1]) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a[0]) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${Math.round(a[0]/total*10000)/100}%`)

    this.svg.append('text')
      .attr('class', 'label')
      .attr('x', - (height / 2) - margin)
      .attr('y', margin / 10)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Number of answers')

    this.svg.append('text')
      .attr('class', 'label')
      .attr('x', height / 2 + 2.6*margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Answer')

    this.svg.append('text')
      .attr('class', 'title')
      .attr('x', height / 2 + 2.6*margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(this.name)

    /**
    this.svg.append('text')
      .attr('class', 'source')
      .attr('x', height - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: Stack Overflow, 2018')
      **/
  }




  update_plot(data){

    this.name = data["name"];
    this.id = data["id"];
    this.distribution = data["distribution"];
    this.pair_distribution = data["distribution"].map(function(e,i) {
      return [e, data["x"][i]];
    });
    this.yScale = d3.scaleLinear()
      .range([this.height, 0]) // TODO -160 ?
      .domain([0, Math.max(...this.distribution)]);

    this.makeYLines = () => d3.axisLeft()
      .scale(this.yScale)

    const xScale = this.xScale;
    const yScale = this.yScale;
    const chart = this.chart;
    const width = this.width;
    const height = this.height;
    const margin = this.margin;
    const total = this.distribution.reduce(function(total,x){return total+x},0);


    chart.selectAll(".axisLeft")
      .transition()
      .call(d3.axisLeft(yScale));

    console.log("okok");

    chart.selectAll(".grid")
      .transition()
      .attr('class', 'grid')
      .call(this.makeYLines()
        .tickSize( - width - 2 * margin, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(this.pair_distribution)
      .enter()
      .append('g')

    this.svg.selectAll(".bar").remove();

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g[1]))
      .attr('y', (g) => yScale(0))
      .attr('height', (g) =>  0)
      .attr('width',  xScale.bandwidth())

      .transition()
      .duration(600)
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g[1]))
      .attr('y', (g) => yScale(g[0]))
      .attr('height', (g) =>  height - yScale(g[0]))
      .attr('width',  xScale.bandwidth());

    barGroups
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) =>  xScale(a[1]) - 5)
          .attr('width',  xScale.bandwidth() + 10)

        const y =  yScale(actual[0])

        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width + 2*margin)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) =>  xScale(a[1]) +  xScale.bandwidth() / 2)
          .attr('y', (a) =>  yScale(a[0]) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (Math.round((a[0]-actual[0])/total*10000)/100).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })

      })


      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a[1]))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    this.svg.selectAll(".value").remove();

    barGroups
      .append('text')
      .transition()
      .attr('class', 'value')
      .attr('x', (a) => xScale(a[1]) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a[0]) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${Math.round(a[0]/total*10000)/100}%`)

    this.svg.selectAll(".title").remove();

    this.svg.append('text')
      .transition()
      .attr('class', 'title')
      .attr('x', height / 2 + 2*margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(this.name)
  }

  /**
  update_plot(data){
    d3.select("svg").remove();
    this.name = data["name"];
    this.id = data["id"];
    this.distribution = data["distribution"];
    this.pair_distribution = data["distribution"].map(function(e,i) {
      return [e, data["x"][i]];
    });
    this.yScale = d3.scaleLinear()
      .range([this.height-160, 0])
      .domain([0, Math.max(...this.distribution)]);

    this.makeYLines = () => d3.axisLeft()
      .scale(this.yScale)
    this.svgContainer.innerHTML = "<svg viewBox='0 0 800 600'/>";
    console.log(this.svgContainer.innerHTML);
    this.svg = d3.select('svg');
    console.log(this.svg);
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
    this.make_plot();
    console.log(this.svg);

  }**/

}
