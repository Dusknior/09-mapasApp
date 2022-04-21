import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .map-container {
        witdh: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
        color: #fff;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;

  map!: mapboxgl.Map;
  zoom: number = 16;
  lnglat: [number, number] = [-74.83138655559114, 11.01651426727422];

  markers: MarkerColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.loadFromLocal();
  }

  addMarker() {
    const color = `#${crypto
      .getRandomValues(new Uint32Array(1))[0]
      .toString(16)
      .padStart(8, '0')
      .slice(-6)}`;

    const _newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.lnglat)
      .addTo(this.map);

    this.markers.push({ color, marker: _newMarker });
    this.saveOnLocal();

    _newMarker.on('dragend', () => {
      this.saveOnLocal();
    });
  }

  goMarker(marker: mapboxgl.Marker): void {
    this.map.flyTo({ center: marker.getLngLat() });
  }

  saveOnLocal() {
    const lnglatArr: MarkerColor[] = [];

    this.markers.forEach((marker) => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lnglatArr.push({ color, center: [lng, lat] });

      localStorage.setItem('markers', JSON.stringify(lnglatArr));
    });
  }

  loadFromLocal() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const lnglatArr: MarkerColor[] = JSON.parse(
      localStorage.getItem('markers')!
    );

    lnglatArr.forEach((marker) => {
      const { color, center } = marker;

      const _newMarker = new mapboxgl.Marker({
        draggable: true,
        color,
      })
        .setLngLat(center!)
        .addTo(this.map);

      this.markers.push({ color, marker: _newMarker });

      _newMarker.on('dragend', () => {
        this.saveOnLocal();
      });
    });
  }

  deleteMarker(i: number) {
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.saveOnLocal();
  }
}
