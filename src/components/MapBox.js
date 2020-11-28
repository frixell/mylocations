import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
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
  let startZoom = windowWidth < 768 ? 0.6 : 0.8;
  let itemZoom = 6;
  let startX = 0;
  let startY = 30;

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [locationFeatures, setLocationFeatures] = useState([]);
  
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
  
  
  
  const addLocationClick = (e) => {
    let location = {
      name: `name`,
      address: `address`,
      location: {
        lon: e.lngLat.wrap().lng,
        lat: e.lngLat.wrap().lat,
      },
      categories: []
    };
    props.addLocationFromMap(location);
  }
  
  
  useEffect(() => {
    if (map) {
      if (props.selectedProject && props.isView) {
        map.flyTo({
          center: [props.selectedProject.location.lon, props.selectedProject.location.lat],
          zoom: itemZoom
        });
      } else {
        map.flyTo({
          center: [startX, startY],
          zoom: startZoom
        });
      }
      
    }
  }, [map, props.selectedProject, props.isView, itemZoom, startX, startY, startZoom]);

  const newLocations = useSelector(state => state.currentLocations);
  
 //const newLocations = props.locations;
  
  useEffect(() => {
    let locationsArray = [];
    newLocations?.map(location => {
      locationsArray.push({
        'type': 'Feature',
        'properties': {
          'item': location,
          'id': location.name,
          'color': 'green'
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': circleToPolygon([Number(location.location.lon), Number(location.location.lat)], 20000, 64).coordinates
        },
      });
      return null;
    });
    setLocationFeatures(locationsArray);
  }, [newLocations]);
  
  useEffect(() => {
    if (map) {
      if (props.allowAddLocation) {
        map.once('click', addLocationClick);
      }
    }
  }, [map, props.allowAddLocation, newLocations]);
  
  
  
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
            //let outerRadius = locationSize * 0.4 * t + radius;
            let outerRadius = locationSize / 16;
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
            //map.triggerRepaint();
            
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
        // map.on('click', 'locationsLayer', function (e) {
        //   props.handleExpandLocation(JSON.parse(e.features[0].properties.item));
        // });
      });
    };
    
    if (map && locationFeatures) {
      map.getSource('locationsSource').setData({
        'type': 'FeatureCollection',
        'features': locationFeatures
      });
      map.triggerRepaint();
    }
    
    if (!map) initializeMap({ setMap, mapContainer });
    
  }, [map, locationFeatures, startX, startY, startZoom]);

  return <div ref={el => (mapContainer.current = el)} style={styles.map} />;
};

export default MapBox;
