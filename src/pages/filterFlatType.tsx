import {useContext, useState} from 'react';
import * as React from 'react';
import { Flat, PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import '../css/filterFlatType.css'
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


      const table = Object.keys(flatTypeCountByTown).map((town, index) => {
        const count = flatTypeCountByTown[town];
        const totalPrice = flatTypePriceByTown[town] || 0;
        const averagePrice = count ? totalPrice.dividedBy(count) : 0;

        if (index === 0) {
          return (
            <React.Fragment key="table-headers">
              <tr className='flat-table'>
                <td className="town-entry">{town}</td>
                <td className="count-entry">{count}</td>
                <td className="averageprice-entry">${averagePrice.toFixed(0)}</td>
              </tr>
            </React.Fragment>
          );
        } else {
          return (
            <tr className='flat-table' key={town}>
              <td className="town-entry">{town}</td>
              <td className="count-entry">{count}</td>
              <td className="averageprice-entry">${averagePrice.toFixed(0)}</td>
            </tr>
          );
        }
      });

  return (
    <div className="page">
      <div className = 'header-container'>
        <div className = 'title'>Filter selected: Flat Type</div>
        <div className = 'header-body'>
          <div className="header-filter">
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
          </div>

        </div>
      </div>
      <div className = "table-container">
      <table className = 'filter-table'>
        <thead className="filter-table-head">
          <tr>
            <th>Location</th>
            <th>Count</th>
            <th>Average Resale Price ($)</th>
          </tr>
        </thead>
        <tbody className="filter-table-body">
          {table}
        </tbody>
       </table>
       </div>
       </div>
  );
}

export { FilterFlatType }