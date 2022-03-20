import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private map: L.Map | undefined;
  private geoLayer: L.LayerGroup | undefined;
  private incidentLayer: L.LayerGroup | undefined;

  @ViewChild('mapbox')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  constructor() {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }


  ngAfterViewInit() {
    const apiKey = 'pk.eyJ1IjoiYXBsb3NjcmVhdGl2ZSIsImEiOiJja3ZiYjJvZ3UydnpvMzBxcGZ3YzN6N3I2In0.Ar71ffX_k8thvpo_eWK2Qw';
    const mapStyle = 'mapbox://styles/aploscreative/ckzw85yzr000x15p85ldtcqtm';

    this.map = new L.Map(this.mapContainer!.nativeElement).setView(
      [32.7767, -96.7970],
      12
    );;

    this.map.attributionControl
    .setPrefix('')
    .addAttribution(
      'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
    );

    this.map.zoomControl.setPosition('bottomright');

    L.mapboxGL({
      style: `${mapStyle}`,
      accessToken: apiKey,
    }).addTo(this.map);

    this.geoLayer = L.layerGroup().addTo(this.map);
    this.incidentLayer = L.layerGroup().addTo(this.map);
  }
}
