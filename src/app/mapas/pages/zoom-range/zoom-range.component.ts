import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        witdh: 100%;
        height: 100%;
      }

      .row {
        background-color: #fff;
        position: fixed;
        width: 600px;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        z-index: 9999;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapContainer!: ElementRef;

  map!: mapboxgl.Map;
  zoom: number = 16;
  lnglat: [number, number] = [-74.83138655559114, 11.01651426727422];

  constructor() {}

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.map.on('zoom', () => {
      this.zoom = this.map.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.lnglat = [lng, lat];
    });
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  onZoomChange(inputValue: string) {
    this.zoom = parseFloat(inputValue);
    this.map.zoomTo(this.zoom);
  }
}
