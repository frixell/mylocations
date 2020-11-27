import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import circleToPolygon from 'circle-to-polygon';
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  map: {
    width: "76vw",
    height: "calc(100vh - 64px - 64px)",
    marginTop: "64px"
  }
};

const MapBox = (props) => {
  let windowWidth   = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;
  let startZoom = windowWidth < 768 ? 1 : 2;
  let itemZoom = 18;
  let startX = 20;
  let startY = 22;

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [locationFeatures, setLocationFeatures] = useState(props.locations);
  
  const locationSize = 100;
  
  if (map) {
    if (props.allowAddLocation) {
      map.getCanvas().style.cursor = 'crosshair';
      map.on('mouseenter', 'locationsLayer', function () {
        map.getCanvas().style.cursor = 'crosshair';
      });
      map.on('mouseleave', 'locationsLayer', function () {
        map.getCanvas().style.cursor = 'crosshair';
      });
    } else {
      map.getCanvas().style.cursor = '';
      map.on('mouseenter', 'locationsLayer', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'locationsLayer', function () {
        map.getCanvas().style.cursor = '';
      });
    }
  }
  
  
  
  // const addBolardClick = (e) => {
  //   let bolard = {
  //     title: `Bolard`,
  //     type: 'bolard',
  //     x: e.lngLat.wrap().lng,
  //     y: e.lngLat.wrap().lat,
  //     z: 500,
  //     content: '',
  //     guide: false,
  //     id: '',
  //     number: '',
  //     port: '',
  //     role: '',
  //     status: 'Ok'
  //   };
  //   //console.log('in add bolard click');
  //   props.addBolard(bolard);
  // }
  
  // const addDivingClick = (e) => {
  //   let diving = {
  //     title: `Diving`,
  //     type: 'diving',
  //     x: e.lngLat.wrap().lng,
  //     y: e.lngLat.wrap().lat,
  //     z: 500,
  //     id: '',
  //     role: '',
  //     status: 'Ok',
  //     bakar: '',
  //     company: 'Namal',
  //     email: 'namal@wizeport.net',
  //     phone: '',
  //     radius: 50
  //   };
  //   props.addDiving(diving);
  // }
  
  useEffect(() => {
    // if (map) {
    //   if (props.selectedProject) {
    //     map.flyTo({
    //       center: [props.selectedProject.x, props.selectedProject.y],
    //       zoom: itemZoom
    //     });
    //   } else {
    //     map.flyTo({
    //       center: [startX, startY],
    //       zoom: startZoom
    //     });
    //   }
      
    // }
  }, [map, props.selectedProject, itemZoom, startX, startY, startZoom]);

  useEffect(() => {
    //console.log('props.allowAddBolard change', props.allowAddBolard);
    if (map) {
      // if (props.allowAddBolard) {
      //   //console.log('props.allowAddBolard doing bolard', props.allowAddBolard);
      //   map.once('click', addBolardClick);
      // } else if (props.allowAddDiving) {
      //   //console.log('props.allowAddBolard doing diving', props.allowAddBolard);
      //   map.once('click', addDivingClick);
      // }
      
    }
  }, [map]);
  
 
  
  useEffect(() => {
    let locationsArray = [];
    props.locations?.map(location => {
      console.log(location);
      locationsArray.push({
        'type': 'Feature',
        'properties': {
          'item': location,
          'id': location.name,
          'color': 'green'
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': circleToPolygon([Number(location.location.lon), Number(location.location.lat)], 2, 64).coordinates
        },
      });
    });
    console.log(locationsArray);
    setLocationFeatures(locationsArray);
  }, [props.locations]);
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJpeGVsbCIsImEiOiJja2Z4dTl6bGwwMDU4MnVueTl1cjN1bGRnIn0.MuLsYBiSd3vHIYxU5NX25A';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [startX, startY],
        zoom: startZoom
      });
      
      map.addControl(new mapboxgl.NavigationControl());

      map.on("load", () => {
        setMap(map);
        map.resize();
        
        map.addImage('location', {
          width: locationSize,
          height: locationSize,
          data: new Uint8Array(locationSize * locationSize * 4),
          // get rendering context for the map canvas when layer is added to the map
          onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d'); 
          },
          // called once before every frame where the icon will be used
          render: function () {
            let duration = 3000;
            let t = (performance.now() % duration) / duration;
            
            let radius = locationSize / 16;
            let outerRadius = locationSize * 0.4 * t + radius;
            let context = this.context;
            
            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
            );
            context.fillStyle = 'rgba(191, 0, 0,' + (1 - t) + ')';
            context.fill();
            
            // draw inner circle
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            context.fillStyle = 'rgba(191, 0, 0, 1)';
            context.strokeStyle = 'rgba(191, 0, 0, 1)';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
            
            // update this image's data with data from the canvas
            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height
            ).data;
            
            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();
            
            // return `true` to let the map know that the image was updated
            return true;
          }
        }, { pixelRatio: 2 });
        map.addSource('locationsSource', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': locationFeatures
          }
        });
        map.addLayer({
          'id': 'locationsLayer',
          'type': 'symbol',
          'source': 'locationsSource',
          'layout': {
            'icon-image': 'location',
            'text-allow-overlap': true,
            'icon-allow-overlap': true
          }
        });
        map.on('click', 'locationsLayer', function (e) {
          props.handleExpandBolard(JSON.parse(e.features[0].properties.item));
        });
        
        
        map.addImage('divingDenied', {
          width: locationSize,
          height: locationSize,
          data: new Uint8Array(locationSize * locationSize * 4),
          // get rendering context for the map canvas when layer is added to the map
          onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d'); 
          },
          // called once before every frame where the icon will be used
          render: function () {
            let duration = 2000;
            let t = (performance.now() % duration) / duration;
            
            let radius = locationSize / 12;
            let outerRadius = locationSize * 0.4 * t + radius;
            let context = this.context;
            
            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
            );
            context.fillStyle = 'rgba(0, 0, 0,' + (1 - t) + ')';
            context.fill();
            
            // draw inner circle
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.strokeStyle = 'black';
            context.lineWidth = 1 + 3 * (1 - t);
            context.fill();
            context.stroke();
            
            // update this image's data with data from the canvas
            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height
            ).data;
            
            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();
            
            // return `true` to let the map know that the image was updated
            return true;
          }
        }, { pixelRatio: 2 });
        map.addSource('divingsDeniedSource', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': locationFeatures
          }
        });
        map.addLayer({
          'id': 'divingsDeniedLayer',
          'type': 'symbol',
          'source': 'divingsDeniedSource',
          'layout': {
            'icon-image': 'divingDenied',
            'text-allow-overlap': true,
            'icon-allow-overlap': true
          }
        });
        map.on('click', 'divingsDeniedLayer', function (e) {
          props.handleExpandBolard(JSON.parse(e.features[0].properties.item));
        });
        
        
      });
    };
    
    if(map) {
      console.log('locationFeatures', locationFeatures);
      map.getSource('locationsSource').setData({
        'type': 'FeatureCollection',
        'features': locationFeatures
      });
      map.triggerRepaint();
      
      map.getSource('divingsDeniedSource').setData({
        'type': 'FeatureCollection',
        'features': locationFeatures
      });
      map.triggerRepaint();
    }
    
    if (!map) initializeMap({ setMap, mapContainer });
    
  }, [map, locationFeatures, startX, startY, startZoom, props]);

  return <div ref={el => (mapContainer.current = el)} style={styles.map} />;
};

export default MapBox;
