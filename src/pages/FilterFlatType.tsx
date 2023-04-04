import {useContext, useState} from 'react';
import { Flat, PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import '../css/filterflat.css'
import BigNumber from 'bignumber.js';
import DropdownMenu from '../components/dropdown';

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

      if (!flatTypePriceByTown[town]) {
        flatTypePriceByTown[town] = new BigNumber(0);
      }
      flatTypePriceByTown[town] = flatTypePriceByTown[town].plus(price);
      flatTypeCountByTown[town] = count + 1;
    });

    
      const rows = Object.keys(flatTypeCountByTown).map((town) => {
        const count = flatTypeCountByTown[town];
        const totalPrice = flatTypePriceByTown[town] || 0;
        const averagePrice = count ? totalPrice.dividedBy(count) : 0;

        return(
          <tr className='flat-table'>
            <td>{town}</td>
            <td>{count}</td>
            <td>${averagePrice.toFixed(0)}</td>
          </tr>
        );
       
    });

  return (
    <div className="page">
      <div className = 'header-container'>
        <div className = 'title'>Filter selected: Flat Type</div>
        <div className = 'header-body'>
        <div>Flat Type selected:</div>
        <DropdownMenu
  selectedOption={flatType}
  options={[
    { value: '1 ROOM', label: '1 Room' },
    { value: '2 ROOM', label: '2 Room' },
    { value: '3 ROOM', label: '3 Room' },
    { value: '4 ROOM', label: '4 Room' },
    { value: '5 ROOM', label: '5 Room' },
    { value: 'EXECUTIVE', label: 'Executive' },
    { value: 'MULTI-GENERATION', label: 'Generation' },
  ]}
  onOptionSelect={handleFlatTypeChange}
/>

        <div>Now displaying the flats in the flat type you have selected</div>
        </div>
      </div>
      <div className= 'search-box'>Search Results:</div>
      <table className= 'table'>
        <tr className= 'table-header'>
          <th className='location'>Location:</th>
          <th className='count'>Count:</th>
          <th className='resale'>Average Resale Price ($):</th>
        </tr>
        <tbody className='table-body'>
        <div>
        {rows}
        </div>
        </tbody>
        </table>
      </div>
  );
}

export { FilterFlatType }