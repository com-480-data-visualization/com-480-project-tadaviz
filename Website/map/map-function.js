
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

function getHappyColor(d) {
    return d > 7 ? '#0868ac' :
           d > 6  ? '#43a2ca' :
           d > 5  ? '#7bccc4' :
           d > 4  ? '#bae4bc' :
           d > 0   ? '#f0f9e8' :
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

function dominantstyle(feature) {
    item = country_trait[feature.properties.iso_a2]
    trait = (item? item["dominant trait"]:undefined)
    return {
        fillColor: getSensColor(trait),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function happystyle(feature) {
  let score;
  if (country_happiness_level[feature.properties.iso_a2]){
    score = country_happiness_level[feature.properties.iso_a2]['score'];
  }
    return {
        fillColor: getHappyColor(score),
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

codebook = {'EXT':'Extraversion','EST':'Emotional Stability','CSN':'Conscientiousness','AGR':'Agreeableness','OPN':'Openness to Experience'};

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
      container.innerHTML = '<b>' + props.name + '</b> <br />'
      container.setAttribute('class','radarChart')
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
        w: width/1.5,
        h: height/1.5,
        margin: margin,
        maxValue: 1,
        levels: 5,
        roundStrokes: false,
        color: color
      };

      //Call function to draw the Radar chart
      RadarChart(".radarChart", data, radarChartOptions);
      trait = country_trait[country_code]["dominant trait"]
      container.innerHTML +=
      '<br />Respondents from this country show a <br /> strong ' +
      codebook[trait]+'<br />';
    } else {
      container.innerHTML = '<b>' + props.name + '</b> <br />' + 'No data'
    }

  } else {
    container.innerHTML = 'Click on a country';
  }
}

function show_happy(container, props){
  country_code=''
  if (props){

    ISO2_code.forEach((item, i) => {
      if (item['Name']==props.name){
        country_code =item['Code']
      }
    });
    if (country_happiness_level[country_code]){
      container.innerHTML ='<b>' + props.name + '</b> <br /><b>' +
      'Happiness level</b>: ' + country_happiness_level[country_code]['score']
    } else {
      container.innerHTML =  '<b>' + props.name + '</b> <br />No data'
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

function trait_legend(container) {
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

function happy_legend(container) {
  let grades = [0, 4,5, 6, 7];
  container.innerHTML = '<b>Happiness level</b><br/><br/>'
  container.innerHTML += '<i style="background:' + getHappyColor(grades[i] + 1) +
  '"></i> ' +'No information' + '<br>'
  for (var i = 0; i < grades.length; i++) {
    container.innerHTML +=
      '<i style="background:' + getHappyColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] +'<br>':'+');
  }
}
