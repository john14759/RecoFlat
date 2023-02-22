import '../css/explore.css'
import { PageProps } from '../functions/types';

const Explore = (props: PageProps) => {
  return (
    <div className="explore-container">
      <div className="text">
        Choose filters:
      </div>
      <div className="explore-body">
        <div className="explore-option">
          <div className='explore-images'><img src='/img/explore/price.png'/></div>
          <div>Filter by Price Range
            <ul>
              <li>
                This filter allows you to view and compare flats within your budget
                </li>
              </ul>
          </div>
          <div className='searchlogo'>
            <span>Search</span>
          <img src='/img/explore/searchlogo.png'></img>
          </div>
        </div>
        <div className="explore-option">
          <div className='explore-images'><img src='/img/explore/location.png'/></div>
          <div>Filter by Location
          <ul>
              <li>
              This filter allows you to view and compare flats within the different areas of Singapore
                </li>
              </ul>
          </div>
          <div className='searchlogo'>Search
          <img src='/img/explore/searchlogo.png'></img>
          </div>
        </div>
        <div className="explore-option">
          <div className='explore-images'><img src='/img/explore/flat.png'/></div>
          <div>Filter By Flat Type
          <ul>
              <li>
              This filter allows you to view and compare flats within the different areas of Singapore
                </li>
              </ul>
          </div>
          <div className='searchlogo'>Search
          <img src='/img/explore/searchlogo.png'></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Explore }