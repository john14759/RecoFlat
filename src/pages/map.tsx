import { LocationProps } from '../functions/types';
import '../css/map.css'
import { centralPath, eastPath, northEastPath, northPath, westPath } from '../functions/constants';

const Map = (props: LocationProps) => {
  const selectRegion = (region: string) => {
    props.setRegion(region);
    props.setView("filter");
  }

  const west = 2;
  const east = 3;
  const north = 4, central = 5, northeast = 6;

  return (
    <div className="map-container">
      <div className="map-header">
        Select the region that you would like to explore!
      </div>
      <div className="map-view">
        <div className="map">
          <div className="map-region-container map-west">
            <svg onClick={() => selectRegion("West")} className="map-region region-west" width="359" height="409">
              <path d={westPath} fill="#74bd43" stroke="black" strokeWidth="2"></path>
            </svg>
            <div className="region-info region-info-west">
              <div className="region-info-header region-info-west">West</div>
              <div className="region-info-body">
                <ul>
                  <li>Boon Lay</li>
                  <li>Jurong East</li>
                  <li>Clementi</li>
                  <li>And More...</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="map-region-container map-north">
            <svg onClick={() => selectRegion("North")} className="map-region region-north" width="230" height="285">
              <path d={northPath} fill="#8eb4e3" stroke="black" strokeWidth="2"></path>
            </svg>
            <div className="region-info region-info-north">
              <div className="region-info-header region-info-north">North</div>
              <div className="region-info-body">
                <ul>
                  <li>Sembawang</li>
                  <li>Yishun</li>
                  <li>Woodlands</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="map-region-container map-central">
            <svg onClick={() => selectRegion("Central")} className="map-region region-central" width="245" height="289">
              <path d={centralPath} fill="#f5b90f" stroke="black" strokeWidth="2"></path>
            </svg>
            <div className="region-info region-info-central">
              <div className="region-info-header region-info-central">Central</div>
              <div className="region-info-body">
                <ul>
                  <li>Toa Payoh</li>
                  <li>Novena</li>
                  <li>Queenstown</li>
                  <li>And More...</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="map-region-container map-north-east">
            <svg onClick={() => selectRegion("Northeast")} className="map-region region-north-east" width="208" height="191">
              <path d={northEastPath} fill="#0070c0" stroke="black" strokeWidth="2"></path>
            </svg>
            <div className="region-info region-info-north-east">
              <div className="region-info-header region-info-north-east">Northeast</div>
              <div className="region-info-body">
                <ul>
                  <li>Ang Mo Kio</li>
                  <li>Serangoon</li>
                  <li>Hougang</li>
                  <li>And More...</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="map-region-container map-east">
            <svg onClick={() => selectRegion("East")} className="map-region region-east" width="348" height="227">
              <path d={eastPath} fill="#c00000" stroke="black" strokeWidth="2"></path>
            </svg>
            <div className="region-info region-info-east">
              <div className="region-info-header region-info-east">East</div>
              <div className="region-info-body">
                <ul>
                  <li>Bedok</li>
                  <li>Changi</li>
                  <li>Pasir Ris</li>
                  <li>And More...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cost-container">
          <div className="cost-header">Average Cost</div>
          <div className="cost-region">
            <div className="cost-label label-west"></div>
            West: ${west}
          </div>
          <div className="cost-region">
            <div className="cost-label label-north"></div>
            North: ${north}
          </div>
          <div className="cost-region">
            <div className="cost-label label-central"></div>
            <div>Central: ${central}</div>
          </div>
          <div className="cost-region">
            <div className="cost-label label-northeast"></div>
            <div>Northeast: ${northeast}</div>
          </div>
          <div className="cost-region">
            <div className="cost-label label-east"></div>
            <div>East: ${east}</div>
          </div>
        </div>
    </div>
  )
}

export { Map }

