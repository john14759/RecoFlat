import { LocationProps } from '../functions/types';
import '../css/map.css'
import { centralPath, eastPath, northEastPath, northPath, westPath } from '../functions/constants';

const Map = (props: LocationProps) => {
  const selectRegion = (region: string) => {
    props.setRegion(region);
    props.setView("filter");
  }

  return (
    <div className="map-container">
      <div className="map-header">
        Select the region that you would like to explore!
      </div>
      <div className="map-view">
        <div className="map">

          <svg onClick={() => selectRegion("West")} className="map-region region-west" width="359" height="409">
            <path d={westPath} fill="#74bd43" stroke="black" strokeWidth="2"></path>
          </svg>

          <svg onClick={() => selectRegion("North")} className="map-region region-north" width="230" height="285">
            <path d={northPath} fill="#8eb4e3" stroke="black" strokeWidth="2"></path>
          </svg>

          <svg onClick={() => selectRegion("Central")} className="map-region region-central" width="245" height="289">
            <path d={centralPath} fill="#f5b90f" stroke="black" strokeWidth="2"></path>
          </svg>

          <svg onClick={() => selectRegion("Northeast")} className="map-region region-north-east" width="208" height="191">
            <path d={northEastPath} fill="#0070c0" stroke="black" strokeWidth="2"></path>
          </svg>

          <svg onClick={() => selectRegion("East")} className="map-region region-east" width="348" height="227">
            <path d={eastPath} fill="#c00000" stroke="black" strokeWidth="2"></path>
          </svg>

        </div>

      </div>
    </div>
  )
}

export { Map }

