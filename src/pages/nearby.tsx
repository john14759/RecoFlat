import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import "../css/nearby.css"
import { useRef, useState } from "react"
import Geocode from "react-geocode"
import { LocationProps } from "../functions/types";

type LibrariesType = "places" | "drawing" | "geometry" | "localContext" | "visualization";

type GeocodeResult = {
  location: {
    lat: number;
    lng: number;
  };
  address: string;
}

// TODO add more attributes if needed
type Facility = {
  lat: number;
  lng: number;
  name?: string;
}

const libraries: LibrariesType[] = ['places'];
const placeTypes = "hospital,restaurant,train_station,shopping_mall"

const Nearby = (props: LocationProps) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? ""
  Geocode.setApiKey(apiKey)

  const [query, setQuery] = useState<string>('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [result, setResult] = useState<GeocodeResult | null>(null);
  const [location, setLocation] = useState<string>('')
  const [dropdownLocation, setDropdownLocation] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Geocode.fromAddress(query).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location
        const address = response.results[0].formatted_address;

        console.log(lat, lng);
        // Set the result in the state
        setResult({ location: { lat: lat, lng: lng }, address });
      },
      (err) => {
        console.error(err)
      });
  };

  const handleLoad = (map: google.maps.Map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: map.getCenter(),
      type: placeTypes,
      rankBy: google.maps.places.RankBy.DISTANCE,
      maxResults: 10
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setFacilities(
          results.map((place) => ({
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            name: place.name,
          }))
        );
      }
    });
  }

  const handleDropdown = () => {
    setDropdownLocation(!dropdownLocation);
  }

  const dropdownLocationItems = props.locationList.map((newLocation) =>
    <div className={newLocation === location ? "nearby-option selected" : "nearby-option"} onClick={() => { setLocation(newLocation); handleDropdown(); }}>{newLocation}</div>
  );

  const FacilitiesList = facilities.map((facility) =>
    <div className = "nearby-location">
      {facility.name}
    </div>
  )

  return (
    <div className="nearby-container">
      <div className="nearby-header">
        <div>Choose</div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          {/* <div className="nearby-menu">
            {dropdownLocation && dropdownLocationItems}
          </div> */}
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="nearby-body">
        {/* {result && (
          <div>
            <p>Location: {result.location.lat}, {result.location.lng}</p>
            <p>Address: {result.address}</p>
        </div>
        )} */}
        {result &&
        <div className="nearby-map">
          <LoadScript
            googleMapsApiKey={apiKey}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={{width: "100%", height: "100%"}}
              center={{ lat: result.location.lat, lng: result.location.lng }}
              zoom={17}
              onLoad={(map) => handleLoad(map)}
            >
              {facilities.map((facility, index) => (
                <Marker key={index} position={{ lat: facility.lat, lng: facility.lng }} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        }
        { result &&
        <div className="nearby-locations">
          {FacilitiesList}
        </div>
        }
      </div>
    </div>
  )
}

export {Nearby}