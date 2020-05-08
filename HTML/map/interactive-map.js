var mapboxAccessToken = 'pk.eyJ1IjoiZ3VpbGhlbTAxIiwiYSI6ImNrOW54czJzMjA2aXQzaHBweWU4am43MzIifQ.Vd6MuN_xonNgovvUSfGBQw';
var map = L.map('mapid').setView([37.8, 0.0], 2.5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			//'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

L.geoJson(countriesData).addTo(map);

function getColor(d) {
    return d > 100000 ? '#800026' :
           d > 50000  ? '#E31A1C' :
           d > 25000  ? '#FC4E2A' :
           d > 10000  ? '#FD8D3C' :
           d > 5000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
           d > 200   ? '#FFEDA0' :
                      '#f0f0f0';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.n_respondents),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

L.geoJson(countriesData, {style: style}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


var geojson;


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(countriesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



var info = L.control();

info.onAdd = function (map) {
    //create the control container
    this._div = L.DomUtil.create('div', 'info');

    // add a radio container as attribute to info and create the checkbox
    this._radiodiv = L.DomUtil.create('radio');
    this._div.appendChild(this._radiodiv)

    let checkbox1 = document.createElement("input")
    checkbox1.setAttribute('type','radio')
    checkbox1.setAttribute('name','checkbox')
    let label1 = document.createElement('label')
    label1.innerHTML = 'Number of respondents by country <br>'
    this._radiodiv.appendChild(checkbox1)
    this._radiodiv.appendChild(label1)

    //this._radiodiv.appendChild(document.createElement("input"))

    let checkbox2 = document.createElement("input")
    checkbox2.setAttribute('type','radio')
    checkbox2.setAttribute('name','checkbox')
    let label2 = document.createElement('label')
    label2.innerHTML = 'Radio graph by country<br>'
    this._radiodiv.appendChild(checkbox2)
    this._radiodiv.appendChild(label2)

    let checkbox3 = document.createElement("input")
    checkbox3.setAttribute('type','radio')
    checkbox3.setAttribute('name','checkbox')
    let label3 = document.createElement('label')
    label3.innerHTML = 'Score by country<br>'
    this._radiodiv.appendChild(checkbox3)
    this._radiodiv.appendChild(label3)

    // add a container to display Data
    this._datadiv = L.DomUtil.create('div');
    this._div.appendChild(this._datadiv)




    this.update();
    return this._div;
};

info.update = function (props) {

  // find the checked radio and save its index into a new info attribute

  Array.prototype.forEach.call(this._radiodiv.getElementsByTagName('input'),
  (item, i) => {
    if (item.checked){
      this.current_choice = i
    }
  });

  // check the right checkbox
  if(this.current_choice){
    this._radiodiv.getElementsByTagName('input')[this.current_choice].checked=true
  }


  //empty the data div from previous content
  this._datadiv.innerHTML = ''

  // display data according to the current choice
  switch(this.current_choice){
    case 0:

      show_respondents(this._datadiv)
      break;
    case 1:
      show_graph(this._datadiv)
      break;
    case 2:
      show_score(this._datadiv)
      break;
    default:

  }


  function show_respondents(container) {
    function text_to_show(count){
      if (count>200){
        return count + ' respondents'
      } else {
        return 'Not enough data'
      }
    }
    container.innerHTML = ''
    container.innerHTML = (props ?
        '<b>' + props.ADMIN + '</b><br />' + text_to_show(props.n_respondents)
        : 'Hover over a state');
  }
  function show_graph(container) {
    container.innerHTML = ''
    if (props){
      container.innerHTML +='<b>' + props.ADMIN + '</b> <br />'
      let svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "100");
      cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      cir.setAttribute("cx", 50 );
      cir.setAttribute("cy", 50 );
      cir.setAttribute("r", 50);
      cir.setAttribute("fill", "blue");
      text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", '50%' );
      text.setAttribute("y", '50%' );
      text.setAttribute("text-anchor", 'middle' )
      text.innerHTML = props.ADMIN;
      svg.appendChild(cir)
      svg.appendChild(text)
      container.appendChild(svg)
    } else {
      container.innerHTML = 'Hover over a state';
    }
  }

  function show_score(container){
    container.innerHTML = ''
    country_code=''
    if (props){
      ISO2_code.forEach((item, i) => {
        if (item['Name']==props.ADMIN){
          country_code =item['Code']
        }
      });
      if (country_score[country_code]){
        container.innerHTML ='<b>' + props.ADMIN + '</b> <br /><b> EST </b>: '
        + country_score[country_code]['EST'] + '<br /><b> EXT </b>: '
        + country_score[country_code]['EXT'] + '<br /><b> CSN </b>: '
        + country_score[country_code]['CSN'] + '<br /><b> AGR </b>: '
        + country_score[country_code]['AGR'] + '<br /><b> OPN </b>: '
        + country_score[country_code]['OPN']  
      }else {
        container.innerHTML ='No data'
      }

    } else {
      container.innerHTML = 'Hover over a state';
    }
  }

};

info.addTo(map);




var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [200, 1000, 5000, 10000, 25000, 50000, 100000],
        labels = ['no data'];
    div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) +
    '"></i> ' +'No or not enough data' + '<br>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
