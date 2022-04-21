import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `,
  ],
})
export class MiniMapaComponent implements AfterViewInit {
  @Input() lnglat: [number, number] = [0, 0];
  @ViewChild('map') mapDiv!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 16, // starting zoom
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.lnglat).addTo(map);
  }
}
