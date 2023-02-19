import '../css/explore.css'
import { PageProps } from '../functions/types';

const Explore = (props: PageProps) => {
  return (
    <div className="explore-container">
      <div className="explore-header">
        Explore By
      </div>
      <div className="explore-body">
        <div className="explore-option">
          <div>Insert logo here</div>
          <div>Price Range</div>
          <div className="explore-description">
            View and compare flats within your budget
          </div>
        </div>
        <div className="explore-option">
          <div>Insert logo here</div>
          <div>Flat Type</div>
          <div className="explore-description">
          View and compare flats of different room types
          </div>
        </div>
        <div className="explore-option">
          <div>Insert logo here</div>
          <div>Location</div>
          <div className="explore-description">
          View and compare flats within the different areas of Singapore
          </div>
        </div>
      </div>
    </div>
  )
}

export { Explore }