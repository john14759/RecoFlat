import {useContext, useState} from 'react';
import { Flat, PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import '../css/filterflat.css'
import DropdownButton from '../components/dropdown';
import BigNumber from 'bignumber.js';

const FilterFlatType = (props: PageProps) => {
    const flats:Flat[] = useContext(FlatContext)

    const [flatType, setFlatType] = useState<string>("3 ROOM");

    const handleFlatTypeChange = (value: string) => {
      setFlatType(value);
    };

    const flatTypePriceByTown: {[key: string]: BigNumber} = {};
    const flatTypeCountByTown: {[key: string]: number} = {};

    flats.filter((item) => item.flat_type === flatType).forEach((item) => {
      const town = item.town;
      const price = item.resale_price;
      const count = flatTypeCountByTown[town] || 0;      
      flatTypePriceByTown[town].plus(price);
      flatTypeCountByTown[town] = count + 1;
    });
    
    //console.log(`Count and Average Resale Price for ${flatType} by Town:`);
      const rows = Object.keys(flatTypeCountByTown).map((town) => {
        const count = flatTypeCountByTown[town];
        const totalPrice = flatTypePriceByTown[town] || 0;
        const averagePrice = count ? totalPrice.dividedBy(count) : 0;

        return(
          <tr id='town' key ={town}>
            <td>{town}</td>
            <td>{count}</td>
            <td>${averagePrice.toFixed(0)}</td>
          </tr>
        );
        //console.log(`${town}: ${count} flats, Average Rrice $${averagePrice.toFixed(0)}`);
    });

  return (
    <div className="page">
      <div className = 'header-container'>
        <div className = 'title'>Filter selected: Flat Type</div>
        <div className = 'header-body'>
        <div>Flat Type selected:</div>
        <div className = 'flat-type'>{flatType.toLowerCase()} <DropdownButton handleFlatTypeChange={handleFlatTypeChange} /></div>
        <div>Now displaying the flats in the flat type you have selected</div>
        </div>
      </div>
      <div className= 'search-box'>Search Results:</div>
      <div className='table-container'>
        <table>
          <thead className='table-header'>
            <tr>
              <th>Town</th>
              <th>Count</th>
              <th>Average Resale Price ($)</th>
            </tr>
          </thead>
        
          <tbody className= 'table-body'>
            {rows}
          </tbody>

          </table>
        </div>
      </div>
      
  );
}

export { FilterFlatType }