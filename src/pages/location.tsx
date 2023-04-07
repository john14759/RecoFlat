import { PageProps } from '../functions/types';
import { MapView } from './map';
import { useState } from 'react';
import { FilterByLocation } from './filterByLocation';
import { Nearby } from './nearby';
import '../css/location.css'

const Location = (props: PageProps) => {
  const [view, setView] = useState("map");
  const [region, setRegion] = useState("");

  //create arrays for each region
  const eastLoc: Array<string> = ["BEDOK", "PASIR RIS", "TAMPINES"];
  const northLoc: Array<string> = ["SEMBAWANG", "WOODLANDS", "YISHUN"];
  const centralLoc: Array<string> = ["BISHAN", "BUKIT MERAH", "BUKIT TIMAH", "CENTRAL AREA", "GEYLANG", "KALLANG/WHAMPOA", "MARINE PARADE", "QUEENSTOWN", "TOA PAYOH"];
  const northELoc: Array<string> = ["ANG MO KIO", "HOUGANG", "PUNGGOL", "SENGKANG", "SERANGOON"];
  const westLoc: Array<string> = ["BUKIT BATOK", "BUKIT PANJANG", "CHOA CHU KANG", "CLEMENTI", "JURONG EAST", "JURONG WEST", "TENGAH"];
  let locationList: Array<string> = [];
  switch (region) {
    case "East":
      locationList = eastLoc;
      break;
    case "North":
      locationList = northLoc;
      break;
    case "Central":
      locationList = centralLoc;
      break;
    case "Northeast":
      locationList = northELoc;
      break;
    case "West":
      locationList = westLoc;
      break;
    default:
      locationList = [];
      break;
  }

  let LocationView = <div></div>;
  switch (view) {
    case "map":
      LocationView = <MapView locationList={locationList} region={region} setView={setView} setRegion={setRegion}></MapView>
      break;
    case "filter":
      LocationView = <FilterByLocation locationList={locationList} region={region} setView={setView} setRegion={setRegion}></FilterByLocation>
      break;
    case "nearby":
      LocationView = <Nearby locationList={locationList} region={region} setView={setView} setRegion={setRegion}></Nearby>
  }

  return (
    <div className="location-container">
      {view !== "map" &&
      <div className="location-tabs">
        <div className="location-tabs-group">
          <div onClick={() => setView("filter")} className={view === "filter" ? "location-tab active" : "location-tab"}>
          <img className="location-tab-icon" src="/img/location/filter.png" alt="map-logo"></img>
            <div>Filter!</div>
          </div>
          <div onClick={() => setView("nearby")} className={view === "nearby" ? "location-tab active" : "location-tab"}>
            <img className="location-tab-icon" src="/img/location/nearby.png" alt="map-logo"></img>
            <div>Nearby!</div>
          </div>
        </div>
        <div className="location-tabs-group">
          <div onClick={() => setView("map")} className="location-tab">
            <img className="location-tab-icon" src="/img/location/map.png" alt="map-logo"></img>
            <div>Back to Map!</div>
          </div>
        </div>
      </div>}
      <div className="location-body">
        {LocationView}
      </div>
    </div>
  )
}

export { Location }