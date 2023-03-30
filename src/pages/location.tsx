import { PageProps } from '../functions/types';
import React, { useState, useContext } from 'react';
import '../css/location.css'
import { FlatContext } from '../components/context';
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
  eastloc = ["BEDOK", "PASIR RIS", "TAMPINES"];
  let northloc: Array<string>;
  northloc = ["SEMBAWANG", "WOODLANDS", "YISHUN"];
  let centralloc: Array<string>;
  centralloc = ["BISHAN", "BUKIT MERAH", "BUKIT TIMAH", "CENTRAL AREA", "GEYLANG", "KALLANG/WHAMPOA", "MARINE PARADE", "QUEENSTOWN", "TOA PAYOH"];
  let northEloc: Array<string>;
  northEloc = ["ANG MO KIO", "HOUGANG", "PUNGGOL", "SENGKANG", "SERANGOON"];
  let westloc: Array<string>;
  westloc = ["BUKIT BATOK", "BUKIT PANJANG", "CHOA CHU KANG", "CLEMENTI", "JURONG EAST", "JURONG WEST", "TENGAH"];

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
          <div className='price-headerr'>Location selected: {/*link from map page*/}
          </div>
          <label className='subheaderr'>Select Town:</label>
          <img onClick={handleDropdown} src='img/dropdownlogo.png' alt=''></img>
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
            <div className ="dropbtn-result">Now displaying the flats in the region that you have selected</div>
            </div>
          )}

        </div>
      </div>
      <div className='priceResults'>
        <div className='search-area'>Search Results:</div>
        <div className='tableheader'>
          <div>Flat types</div>
          <div>Count</div>
          <div>Average Resale Price ($)</div>
        </div>
        <div className='price-contents'>
        {displayTable(locations)}
        </div>
      </div>
    </div>
  )
}
export { Location }