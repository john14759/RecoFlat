import React, { useContext } from 'react';
import { Flat, PageProps } from '../functions/types';
import { FlatContext } from '../components/context';

const FilterFlatType = (props: PageProps) => {
    const flats:Flat[] = useContext(FlatContext)

    const flatType = "4 ROOM"; // replace with desired flat type
    const flatTypeCountByTown: {[key: string]: number} = {};
    const flatTypePriceByTown: {[key: string]: number} = {};
    
    flats.filter((item) => item.flat_type === flatType).forEach((item) => {
      const town = item.town;
      const price = parseFloat(item.resale_price);
      const count = flatTypeCountByTown[town] || 0;
      const total = flatTypePriceByTown[town] || 0;
      flatTypePriceByTown[town] = total + price;
      flatTypeCountByTown[town] = count + 1;
    });
    
    //console.log(`Count and Average Resale Price for ${flatType} by Town:`);
      const rows = Object.keys(flatTypeCountByTown).map((town) => {
        const count = flatTypeCountByTown[town];
        const totalPrice = flatTypePriceByTown[town] || 0;
        const averagePrice = count ? totalPrice / count : 0;

        return(
          <tr key ={town}>
            <td>{town}</td>
            <td>{count}</td>
            <td>${averagePrice.toFixed(0)}</td>
          </tr>
        );
        //console.log(`${town}: ${count} flats, Average Rrice $${averagePrice.toFixed(0)}`);
    });
    
  return (
        <table className= "Table">
          <thead>
            <tr>
              <th>Town</th>
              <th>Count</th>
              <th>Average Resale Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
  );
}
export { FilterFlatType }