import { GoogleMap, LoadScript } from "@react-google-maps/api"
import "../css/nearby.css"
import { useRef, useState } from "react"

type Place = {
  id: string;
  name: string;
}

// Nearby
// https://developers.google.com/maps/documentation/places/web-service/search-nearby

// Places
// https://developers.google.com/maps/documentation/places/web-service/search-find-place

// Geocoder
// https://developers.google.com/maps/documentation/javascript/geocoding

const Nearby = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? ""

  const [places, setPlaces] = useState<Place[]>([]);

  // TODO find lat, long of center of sg

  // const handlePlacesSearch = (service: google.maps.places.PlacesService, map:google.maps.Map) => {
  //   const request = {
  //     location: map.getCenter(),
  //     radius: 500, // Search radius in meters
  //     input: '1600 Amphitheatre Parkway, Mountain View, CA', // Address to search for
  //     inputType: 'textquery', // Specify that the input is an address
  //   };

  //   service.findPlaceFromQuery(request, (results, status) => {
  //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //       const hasResults = (results: unknown): results is google.maps.places.PlaceResult[] => {
  //         return Boolean(results && Array.isArray(results));
  //       };

  //       if (hasResults(results)) {
  //         const formattedPlaces = results.map(({ place_id: id, name = '' }) => ({
  //           id: id || '',
  //           name,
  //         }));

  //         setPlaces(formattedPlaces);
  //       }
  //     }
  //   });
  // };
  // interface GeocodeResult {
  //   location: {
  //     lat: number;
  //     lng: number;
  //   };
  //   address: string;
  // }

  // const [query, setQuery] = useState<string>('');
  // const [result, setResult] = useState<GeocodeResult | null>(null);

  // const geocoderRef = useRef<google.maps.Geocoder>();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Create the Geocoder instance if it doesn't exist yet
  //   if (!geocoderRef.current) {

  //   }

  //   // Define the request object with the query
  //   const request = {
  //     address: query,
  //   };

  //   // Call the geocode method with the request
  //   (geocoderRef.current ?? new google.maps.Geocoder()).geocode(request, (results, status) => {
  //     if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
  //       const { lat, lng } = results[0].geometry.location;
  //       const address = results[0].formatted_address;

  //       // Set the result in the state
  //       setResult({ location: { lat: lat(), lng: lng() }, address });
  //     } else {
  //       // Show an error message if geocoding fails
  //       alert('Geocoding failed. Please try again.');
  //     }
  //   });
  // };

  return (
    <div className="nearby-container">
        {/* <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {result && (
        <div>
          <p>Location: {result.location.lat}, {result.location.lng}</p>
          <p>Address: {result.address}</p>
        </div>
      )} */}
        {/* <LoadScript
          googleMapsApiKey={apiKey}
          libraries={["places"]}
        >
          <GoogleMap
            center={{ lat: 1.3147, lng: 103.8454 }}
            zoom={15}
            onClick={(e) => console.log(e.latLng?.toJSON())}
            onLoad={(map) => {
              const service = new window.google.maps.places.PlacesService(map);
              handlePlacesSearch(service, map);
            }}
          >
          {places.map((place) => (
            <div key={place.id}>{place.name}</div>
          ))}
        </GoogleMap>
      </LoadScript> */}
      {/* <iframe
        title="nearby-location"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={"https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=Space+Needle,Seattle+WA"}>
      </iframe> */}
    </div>
  )
}

export {Nearby}