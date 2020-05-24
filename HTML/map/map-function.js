
function getSensColor(t) {
    return t == 'EXT' ? '#b71540' :
           t == 'OPN'  ? '#e58e26' :
           t == 'AGR'  ? '#079992' :
           t == 'CSN'  ? '#1e3799' :
           t == 'EST'   ? '#0a3d62' :
           '#f0f0f0';
}

function getRespColor(d) {
    return d > 100000 ? '#800026' :
           d > 50000  ? '#E31A1C' :
           d > 25000  ? '#FC4E2A' :
           d > 10000  ? '#FD8D3C' :
           d > 5000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
           d > 200   ? '#FFEDA0' :
                      '#f0f0f0';
}

function respondentstyle(feature) {
    return {
        fillColor: getRespColor(respondents_by_country[feature.properties.iso_a2]),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function sensitivitystyle(feature) {
    item = country_sensitive_trait[feature.properties.iso_a2]
    trait = (item? item["Trait associated to longest response time"]:undefined)
    return {
        fillColor: getSensColor(trait),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function defaultstyle() {
    return {
        fillColor: '#f0f0f0',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

codebook = {'EXT':'extraversion','EST':'emotional stability','CSN':'consciousness','AGR':'agreeableness','OPN':'openness'};

function show_instruction(container,props) {
  container.innerHTML = (props ?
    '<b>' + props.name + '</b><br /> Select what the map should display <br />'+
    'in the option panel on the left' :
    'Select what the map should display <br />'+
    'in the option panel on the left <br />'+
    'and click on a country');
}

function show_respondents(container,props) {
  function text_to_show(count){
    if (count>200){
      return count + ' respondents'
    } else {
      return 'Not enough data'
    }
  }
  container.innerHTML = (props ?
      '<b>' + props.name + '</b><br />' + text_to_show(respondents_by_country[props.iso_a2])
      : 'Click on a country');
}
function show_graph(container,props,acc) {

  if (props){
    ISO2_code.forEach((item, i) => {
      if (item['Name']==props.name){
        country_code = item['Code']
      }
    });
    if (country_score[country_code]){

      // Load data
      var data = [
            [//Global
              {axis:"EXT",value:Math.round(global_score['EXT']*1000)/1000},
              {axis:"EST",value:Math.round(global_score['EST']*1000)/1000},
              {axis:"AGR",value:Math.round(global_score['AGR']*1000)/1000},
              {axis:"CSN",value:Math.round(global_score['CSN']*1000)/1000},
              {axis:"OPN",value:Math.round(global_score['OPN']*1000)/1000},
            ],
            [//Country
            {axis:"EXT",value:Math.round(country_score[country_code]['EXT']*1000)/1000},
            {axis:"EST",value:Math.round(country_score[country_code]['EST']*1000)/1000},
            {axis:"AGR",value:Math.round(country_score[country_code]['AGR']*1000)/1000},
            {axis:"CSN",value:Math.round(country_score[country_code]['CSN']*1000)/1000},
            {axis:"OPN",value:Math.round(country_score[country_code]['OPN']*1000)/1000},
            ]
          ];

      var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = Math.min(300, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

      // Draw the chart
      var color = d3.scale.ordinal()
        .range(["#D041A1","#30C0D0","#EDC951","#CC333F"]);

      var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 1,
        levels: 5,
        roundStrokes: false,
        color: color
      };

      //Call function to draw the Radar chart
      //container.innerHTML = '<div class="radarChart"></div>';
      RadarChart(".radarChart", data, radarChartOptions);

    } else {
      container.innerHTML = '<b>' + props.name + '</b> <br />' + 'No data'
    }

  } else {
    container.innerHTML = 'Click on a country';
  }
}

function show_score(container, props){
  country_code=''
  if (props){

    ISO2_code.forEach((item, i) => {
      if (item['Name']==props.name){
        country_code =item['Code']
      }
    });
    if (country_score[country_code]){
      container.innerHTML ='<b>' + props.name + '</b> <br /><b>' +
      codebook['EST'] + '</b>: ' + country_score[country_code]['EST'] + '<br /><b> '+
      codebook['EXT']+' </b>: '  + country_score[country_code]['EXT'] + '<br /><b>' +
      codebook['CSN']+' </b>: '  + country_score[country_code]['CSN'] + '<br /><b> '+
      codebook['AGR']+' </b>: '  + country_score[country_code]['AGR'] + '<br /><b> '+
      codebook['OPN']+' </b>: '  + country_score[country_code]['OPN']
    } else {
      container.innerHTML = '<b>' + props.name + '</b> <br />' + 'No data'
    }

  } else {
    container.innerHTML = 'Click on a country';
  }
}

function show_sensitive_trait(container, props){
  country_code=''
  if (props){
    ISO2_code.forEach((item, i) => {
      if (item['Name']==props.name){
        country_code =item['Code']
      }
    });
    if (country_sensitive_trait[country_code]){
      trait = country_sensitive_trait[country_code]["Trait associated to longest response time"]
      container.innerHTML ='<b>' + props.name + '</b> <br />'+
      'This country is marked by strong ' + codebook[trait];
    }else {
      container.innerHTML = '<b>' + props.name + '</b> <br />' + 'No information'
    }

  } else {
    container.innerHTML = 'Click on a country';
  }
}



function respondents_legend(container) {
  let grades = [200, 1000, 5000, 10000, 25000, 50000, 100000];
  container.innerHTML = '<b>Number of respondents</b><br/><br/>'
  container.innerHTML += '<i style="background:' + getRespColor(grades[i] + 1) +
  '"></i> ' +'No information' + '<br>'
  for (var i = 0; i < grades.length; i++) {
    container.innerHTML +=
      '<i style="background:' + getRespColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] +'<br>':'+');
  }

}

function sentitivity_legend(container) {
  let labels = ['EXT','OPN','AGR','CSN','EST'];
  container.innerHTML = '<b>Sensitive Trait</b><br/><br/> '
  container.innerHTML += '<i style="background:' + getSensColor() +
  '"></i> ' +'No information' + '<br>'
  for (var i = 0; i < labels.length; i++) {
    container.innerHTML +=
      '<i style="background:' + getSensColor(labels[i] ) + '"></i>' +
      codebook[labels[i]] +'<br/>';
  }

}
