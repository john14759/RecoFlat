import { LocationProps} from '../functions/types';
import { useState, useContext } from 'react';
import '../css/filterByLocation.css'
import { FlatContext } from '../components/context';
import BigNumber from 'bignumber.js';

const FilterByLocation = (props: LocationProps) => {
  const [drop, setDrop] = useState<boolean>(false);

  const handleDropdown = () => {
    setDrop(!drop)
  }

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
    if (filteredGroups.length === 0) {
      if (location) {
        return (
          <div className="empty-table">
            Sorry, there are no flats found for the selected town option. :(
          </div>
        )
      }
      return (
        <div className="empty-table">
          Select a town to see the list of flat types!
        </div>
      )
    }

    return filteredGroups.map((group : any, i : any) => {
      const averagePrice = group.totalPrice.dividedBy(group.count).toFormat(0);
      return (
        <div className='table-content' key={i}>
          <div>{group.flatType}</div>
          <div>{group.count}</div>
          <div>{averagePrice}</div>
        </div>
      );
    });
   }

  //clicking on dropdown
  const [location, setLocation] = useState("");

  //to display dropdown
  const listItems = props.locationList.map((newLocation) =>
    <div className={newLocation === location ? "filter-option selected" : "filter-option"} onClick={() => { setLocation(newLocation); handleDropdown(); }}>{newLocation}</div>
  );

  return (
    <div className="filter-container">
      <div className='filter-header'>
        <div>
          You selected the <b>{props.region}</b> region
        </div>
        <div className="filter-town">
          <div>Town</div>
          <div className="filter-dropdown" onClick={() => handleDropdown()}>
            {location ? <div className="filter-input">{location}</div> : <div className="filter-input default">Select Town</div>}
            {drop && <div className='filter-menu'>{listItems}</div>}
            <img className="btn-dropdown" src='img/dropdown.png' alt=''></img>
          </div>
        </div>
      </div>
      <div className='filter-body'>
        <div className='table-header'>
          <div>Flat types</div>
          <div>Count</div>
          <div>Average Resale Price (S$)</div>
        </div>
        <div className='filter-content'>
          {displayTable(location)}
        </div>
      </div>
    </div>
  )
}
export { FilterByLocation }