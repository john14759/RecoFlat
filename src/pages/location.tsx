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
        <div onClick={() => setView("filter")} className={view === "filter" ? "location-tab active" : "location-tab"}>Filter!</div>
        <div onClick={() => setView("nearby")} className={view === "nearby" ? "location-tab active" : "location-tab"}>Nearby!</div>
        <div onClick={() => setView("map")} className="location-tab">Back to Map!</div>
      </div>}
      <div className="location-body">
        {LocationView}
      </div>
    </div>
  )
}

export { Location }