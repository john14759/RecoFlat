import { PageProps } from '../functions/types';
import { Map } from './map';
import { useState } from 'react';
import { FilterByLocation } from './filterByLocation';
import { Nearby } from './nearby';
import '../css/location.css'

const Location = (props: PageProps) => {
  const [view, setView] = useState("map");
  const [region, setRegion] = useState("");

  let LocationView = <div></div>;
  switch (view) {
    case "map":
      LocationView = <Map region={region} setView={setView} setRegion={setRegion}></Map>
      break;
    case "filter":
      LocationView = <FilterByLocation region={region} setView={setView} setRegion={setRegion}></FilterByLocation>
      break;
    case "nearby":
      LocationView = <Nearby></Nearby>
  }

  return (
    <div className="location-container">
      {view !== "map" && <div className="location-tabs">
        <div onClick={() => setView("filter")} className="location-tab">Filter!</div>
        <div onClick={() => setView("nearby")} className="location-tab">Nearby!</div>
        <div onClick={() => setView("map")} className="location-tab">Back to Map!</div>
      </div>}
      <div className="location-body">
        {LocationView}
      </div>
    </div>
  )
}

export { Location }