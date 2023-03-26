import { PageProps } from '../functions/types';
import React, { useState, useContext } from 'react';
import '../css/location.css'
import { FlatContext } from '../components/context';
import ReactDOM from 'react-dom';
import BigNumber from 'bignumber.js';

const Location = (props: PageProps) => {
  const [drop, setDrop] = useState<boolean>(false);

  const handleDropdown = () => {
    if (drop) {
      setDrop(false);
    }
    else { setDrop(true); }
  }

  //create arrays for each location
  let eastloc: Array<string>;
  eastloc = ["SERANGOON", "PUNGGOL", "HOUGANG", "TAMPINES", "PASIR RIS", "LOYANG", "SIMEI", "KALLANG", "KATONG", "EAST COAST", "MACPHERSON", "BEDOK", "CHANGI"];
  let northloc: Array<string>;
  northloc = ["ADMIRALTY", "KRANJI", "WOODLANDS", "SEMBAWANG", "YISHUN", "YIO CHU KANG", "SELETAR", "SENGKANG"];
  let centralloc: Array<string>;
  centralloc = ["THOMSON", "MARYMOUNT", "ANG MO KIO", "BISHAN", "MACRITCHIE", "TOA PAYOH"];
  let southloc: Array<string>;
  southloc = ["HOLLAND", "QUEENSTOWN", "BUKIT MERAH", "TELOK BLANGAH", "PASIR PANJANG", "SENTOSA", "BUKIT TIMAH", "NEWTON", "ORCHARD", "MARINA SOUTH"];
  let westloc: Array<string>;
  westloc = ["LIM CHU KANG", "CHOA CHU KANG", "BUKIT PANJANG", "TUAS", "JURONG EAST", "JURONG WEST", "BUKIT BATOK", "HILLVIEW", "WEST COAST", "CLEMENTI"];

  //group by each location
  const flats = useContext(FlatContext);
  const Group = (name: string) => {
    const group = flats.filter((entry)=>{
      return name === entry['town'];
    })
    return group;
  }

  const Count = (types : any) => {
    const group = types.reduce((result : any, flat : any)=> {
      const key = `${flat.flat_type}`;
      if (!result[key]) {
        result[key] = {
          flatType: flat.flat_type,
          count: 0,
          totalPrice: new BigNumber(0),
        };
      }
      result[key].count++;
      result[key].totalPrice = result[key].totalPrice.plus(flat.resale_price);
      return result;
    }, {} as Record<string, { flatType: string; count: number; totalPrice: BigNumber }>);
    return group;
  }

   // Calculate the average price for each group and render the result
   const displayTable = (place: string) => {
    const filteredGroups = Object.values(Count(Group(place)))
    .sort((a : any, b : any) =>{
      const nameA :string = a.flatType;
      const nameB :string = b.flatType;
      if(nameA>nameB) return 1;
      if(nameA<nameB) return -1;
      return 0;
    });
    return filteredGroups.map((group : any, i : any) => {
      const averagePrice = group.totalPrice.dividedBy(group.count).toFormat(0);
      return (
        <div className='tablecontent' key={i}>
          <div>{group.flatType}</div>
          <div>{group.count}</div>
          <div>{averagePrice}</div>
        </div>
        );
      });
   }

  //clicking on dropdown
  const [locations, setLocation] = useState("");

  //to display dropdown
  const listItems = eastloc.map((location) =>
    <li onClick={() => { setLocation(location); handleDropdown(); }}>{location}</li>
  );

  return (
    <div className='container price'>
      <div className='price-filter'>
        <div className='pricehead'>
          <div className='price-header'>Location selected: {/*link from map page*/}
          </div>
          <label className='subheader'>Location selected</label>
          <img onClick={handleDropdown} src='img/dropdownlogo.png'></img>
          <br />
          {drop && (
            <div className='dropdown'>
              <button className='dropbtn'>{locations}</button>
              <ul className='dropdown-content'>{listItems}</ul>
            </div>
          )}
          {!drop && 
          
          locations !== "" && (
            <div className='dropdown'>
            <button className='dropbtn'>{locations}</button>
            <br></br>
            <br></br>
            <br></br>
            <p>Now displaying the flats in the price range that you have selected</p>
            </div>
          )}

        </div>
      </div>
      <div className='priceResults'>
        <div className='search-area'>Search Results:</div>
        <div className='tableheader'>
          <div>Flat types</div>
          <div>Location</div>
          <div>Average sale price</div>
        </div>
        <div className='price-content'>
        {displayTable(locations)}
        </div>
      </div>
    </div>
  )
}
export { Location }