import { PageProps } from '../functions/types';
import '../css/map.css'

const Map = (props: PageProps) => {
  return (
    <div className="map-container">
      <div className="map-view">
        <div className="region-west"></div>
        <div className="region-north"></div>
        <div className="region-central"></div>
        <div className="region-north-east"></div>
        <div className="region-east"></div>
      </div>
    </div>
  )
}

export { Map }

