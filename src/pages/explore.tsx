import '../css/explore.css'
import { BodyProps, PageProps } from '../functions/types';

const SearchBtn = (props: BodyProps) => {
  return (
    <div className="search-btn" onClick={() => props.switchTo(props.page)}>
      <img className="search-logo" src='/img/explore/searchlogo.png' alt='searchlogo'></img>
      <div >Search</div>
    </div>
  )

}

const Explore = (props: PageProps) => {
  return (
    <div className="explore-container">
      <div className="explore-header">
        Explore flats by:
      </div>
      <div className="explore-body">
        <div className="explore-option">
          <img className='explore-image' src='/img/explore/price.png' alt='price'/>
          <div className="explore-title">Price Range</div>
          <div>View and compare flats within your budget</div>
          <SearchBtn switchTo={props.switchTo} page="filterPrice"></SearchBtn>
        </div>
        <div className="explore-option">
          <img className="explore-image" src='/img/explore/location.png' alt='location'/>
          <div className="explore-title">Location</div>
          <div>View and compare flats within the different areas of Singapore</div>
          <SearchBtn switchTo={props.switchTo} page="location"></SearchBtn>
        </div>
        <div className="explore-option">
          <img className='explore-image' src='/img/explore/flat.png' alt='flat'/>
          <div className="explore-title">Flat Type</div>
          <div>View and compare flats within the different room types</div>
          <SearchBtn switchTo={props.switchTo} page="filterFlatType"></SearchBtn>
        </div>
      </div>
    </div>
  )
}

export { Explore }