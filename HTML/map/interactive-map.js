//options to desactivate zoom and navigation
let mapoptions = {
  boxZoom: false,
  dragging: false,
  doubleClickZoom: false,
  zoomControl:false,
  minZoom: 2,
  maxZoom: 2
}
// set the map element
let map = L.map('mapid',mapoptions).setView([37.8, 0.0], 2);
// will contain the layer of the countries
let geojson;
// will point to the current layer selected, aka a country
let current_layer;
// will point to the layer previously selected
let old_layer;
// will be set to true if we click again on the same country
let second_click = false;
// interactive panel:
// panel where user can choose what to show on the map
let selection = L.control({position: 'topleft'});
// panel that will show data about the country
let info = L.control({position: 'topright'});
// panel that will show the legend of selected option, if there is one
let legend = L.control({position: 'bottomleft'});



//Interactive layer
////////////////////////////////////////////////////////////////////////////////




function highlightFeature(e) {
    current_layer = e.target;
    second_click = false

    //check if the selected country is the same as previous selection
    if (old_layer){
      //resetHighlight(old_layer)
      let current_country= current_layer.feature.properties.admin
      let old_country = old_layer.feature.properties.admin
      if ( current_country == old_country){
        second_click = true
      }
    }


    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        current_layer.bringToFront();
    }
    //update if a new country is clicked on or reset the layer if the same
    //country is selected
    if (second_click){
      info.update();
      old_layer = undefined;
      current_layer = undefined;
    }else{
      info.update(current_layer.feature.properties);
      old_layer = current_layer;
    }
    legend.update()

}

function onEachFeature(feature, layer) {
    layer.on({
        // call highlightFeature() when a country is clicked on
        click: highlightFeature,
    });
}

geojson= L.geoJson(countries_shape, {
    style: defaultstyle,
    onEachFeature: onEachFeature
}).addTo(map);
////////////////////////////////////////////////////////////////////////////////

//selection panel
////////////////////////////////////////////////////////////////////////////////


selection.onAdd = function (map) {
    // define the option of the selection element here
    this._div = L.DomUtil.create('div', 'selection');
    this._select = document.createElement('SELECT');

    //this._select.setAttribute('onchange','hideinfocase(info)')
    option0 = document.createElement('OPTION');
    option0.innerHTML = '-';
    option0.setAttribute('value','none');
    option1 = document.createElement('OPTION');
    option1.innerHTML = 'Respondents';
    option1.setAttribute('value','resp');
    option2 = document.createElement('OPTION');
    option2.innerHTML = 'Radio graph';
    option2.setAttribute('value','rgraph');
    option3 = document.createElement('OPTION');
    option3.innerHTML = 'Medium of trait';
    option3.setAttribute('value','mtrait');
    option4 = document.createElement('OPTION');
    option4.innerHTML = 'Sensitive trait';
    option4.setAttribute('value','strait');

    this._select.appendChild(option0);
    this._select.appendChild(option1);
    this._select.appendChild(option2);
    this._select.appendChild(option3);
    this._select.appendChild(option4);

    this._div.appendChild(this._select);

    // store the current option choice
    this._option= 'none'
    // event listener of selection, induce change in legend and data panel
    //depending on the option selected
    L.DomEvent.on(this._select,'click',function(){
      if (selection._select){
        selection._option= selection._select.value;
      };
      if (current_layer !=undefined){
        info.update(current_layer.feature.properties)
      }else {
        info.update()
      }
      legend.update()
    })



    return this._div
}

selection.addTo(map)
////////////////////////////////////////////////////////////////////////////////

//Data panel
////////////////////////////////////////////////////////////////////////////////


info.onAdd = function (map) {
    //create the data container
    this._div = L.DomUtil.create('div', 'info');
    this._datadiv = L.DomUtil.create('div');
    this._div.appendChild(this._datadiv)


    this.update();

    return this._div;
};

info.update = function (props) {
  this._datadiv.innerHTML = ''
  // display data according to the current choice
  switch(selection._option){
    case 'none':
      show_instruction(this._datadiv,props)
      break;
    case 'resp':
      show_respondents(this._datadiv, props)
      break;
    case 'rgraph':
      show_graph(this._datadiv, props)
      break;
    case 'mtrait':
      show_score(this._datadiv, props)
      break;
    case 'strait':
    show_sensitive_trait(this._datadiv, props)
      break
    default:
  }




};


// a method to display or hide element of info panel element
info._display = function (options) {
/*
  if (options == 'none') {
    this._div.style.display = "none";
    if (current_layer !=undefined){
      this.update(current_layer.feature.properties)
    }else {
      this.update()
    }
  } else {
    this._div.style.display = "block";

    if (current_layer !=undefined){
      this.update(current_layer.feature.properties)
    }else {
      this.update()
    }
  }
  */
}

info.addTo(map);
////////////////////////////////////////////////////////////////////////////////

//Legend panel
////////////////////////////////////////////////////////////////////////////////


legend.onAdd = function (map) {

    this._div = L.DomUtil.create('div', 'info legend');
    this._div.style.display = "none";
    return this._div;
};


legend.update = function () {
  switch(selection._option){
    case 'none':
      geojson.setStyle(defaultstyle)
      this._div.style.display = "none";
      break;
    case 'resp':
      geojson.setStyle(respondentstyle);
      this._div.style.display = "block"
      respondents_legend(this._div);
      break;
    case 'rgraph':
      geojson.setStyle(defaultstyle)
      this._div.style.display = "none";
      break;
    case 'mtrait':
      geojson.setStyle(defaultstyle)
      this._div.style.display = "none";
      break;
    case 'strait':
      geojson.setStyle(sensitivitystyle);
      this._div.style.display = "block"
      sentitivity_legend(this._div);
      break;
    default:
  }
  /*style of current selected layer is defined here because a change of option induce
  a change of style of all the map and so if it was define above highlight feature
  will be erased*/
  if (current_layer) {
    current_layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  }

};

legend.addTo(map);
