import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  public geoLayer: L.LayerGroup | undefined;
  public incidentLayer: L.LayerGroup | undefined;

  public options: any;
  public layersControl: any;

  public showIncidents: boolean | undefined;
  public showRadius: boolean | undefined;

  @ViewChild('mapbox')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  publicKey: string | undefined;
  mapStyle: string | undefined;

  constructor() {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
    this.showIncidents = true;
    this.showRadius = true;
    this.publicKey = 'pk.eyJ1IjoiYXBsb3NjcmVhdGl2ZSIsImEiOiJja3ZiYjJvZ3UydnpvMzBxcGZ3YzN6N3I2In0.Ar71ffX_k8thvpo_eWK2Qw';
    this.mapStyle = 'mapbox://styles/aploscreative/ckzw85yzr000x15p85ldtcqtm';

    this.incidentLayer = L.layerGroup();
    this.geoLayer = L.layerGroup();
  }

  ngOnInit(): void {
    this.options= {
      layers: [
        L.mapboxGL({
          accessToken: this.publicKey!,
          style: this.mapStyle!
        })
      ],
      zoom: 12,
      center: L.latLng(32.7767, -96.7970)
    };
  }
  ngAfterViewInit() {


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
      style: `${this.mapStyle}`,
      accessToken: this.publicKey!,
    }).addTo(this.map);

    this.geoLayer = L.layerGroup().addTo(this.map);
    this.incidentLayer = L.layerGroup().addTo(this.map);
  }
}
