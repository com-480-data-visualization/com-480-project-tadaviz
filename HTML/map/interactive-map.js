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
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
  function text_to_show(count){
    if (count>200){
      return count + ' respondents'
    } else {
      return 'Not enough data'
    }
  }
    this._div.innerHTML = '<h4>Country respondents count</h4>' +  (props ?
        '<b>' + props.ADMIN + '</b><br />' + text_to_show(props.n_respondents)
        : 'Hover over a state');

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
