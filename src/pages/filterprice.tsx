import '../css/filterprice.css'
import { PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import BigNumber from 'bignumber.js';
import React, { useState, useContext } from 'react';


const FilterPrice = (props: PageProps) => {
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);
    const [drop, setDrop] = useState<boolean>(false);
    const [filteredGroups, setFilteredGroups] = useState<
        Array<{
            town: string;
            flatType: string;
            count: number;
            totalPrice: BigNumber;
        }>
    >([]);
    const flats = useContext(FlatContext);
    const handleDropdown = () => {
        if (drop) {
            setDrop(false);
        } else {
            const groups = flats.reduce(
                (result, flat) => {
                    const key = `${flat.town}-${flat.flat_type}`;
                    if (!result[key]) {
                        result[key] = {
                            town: flat.town,
                            flatType: flat.flat_type,
                            count: 0,
                            totalPrice: new BigNumber(0),
                        };
                    }
                    result[key].count++;
                    result[key].totalPrice = result[key].totalPrice.plus(flat.resale_price);
                    return result;
                },
                {} as Record<string, { town: string; flatType: string; count: number; totalPrice: BigNumber }>
            );
            const filtered = Object.values(groups)
                .filter((group) => {
                    const averagePrice = group.totalPrice.dividedBy(group.count).toNumber();
                    return averagePrice > minVal() && averagePrice < maxVal();
                })
                .sort((a, b) => {
                    const avgPriceA = a.totalPrice.dividedBy(a.count).toNumber();
                    const avgPriceB = b.totalPrice.dividedBy(b.count).toNumber();
                    return avgPriceA - avgPriceB;
                });
            setFilteredGroups(filtered);
            setDrop(true);
        }
    };
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = /^\d+$/.test(inputValue) ? parseInt(inputValue, 10) : undefined;
        setMin(parsedValue);
        setFilteredGroups([]);
    };
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = /^\d+$/.test(inputValue) ? parseInt(inputValue, 10) : undefined;
        setMax(parsedValue);
        setFilteredGroups([]);
    };
    const displayPrice = () => {
        return filteredGroups.map((group, i) => {
            const averagePrice = group.totalPrice.dividedBy(group.count).toFormat(0);
            return (
                <div className='tablecontent' key={i}>
                    <div>{group.flatType}</div>
                    <div>{group.town}</div>
                    <div>{averagePrice}</div>
                </div>
            );
        });
    };

    const minVal = () => min ?? 0;
    const maxVal = () => max ?? 3000000;
    return (
        <div className='container price'>
            <div className='price-filter'>
                <div className='pricehead'>
                    <div className='price-header'>Filter selected
 Price Range</div>
                <label htmlFor="min-input">Price Range</label>
                <img onClick={handleDropdown}src='/img/explore/searchlogo.png' alt='searchbutton'></img>
                <br />
                
                <div className='price-input'>
                  <input type="text" id="min-input" name="min" value={min ?? ""} onChange={handleMinChange} style={{ marginRight: '15px' }}/>
                  to
                  <input type="text" id="max-input" name="max" value={max ?? ""} onChange={handleMaxChange} style={{ marginLeft: '15px' }}/> 
                  <p>Now displaying the flats in the price range that you have selected</p>
                </div>
             
              </div>
            </div>
            <div className='priceResults'>
            <div className='search-area'>Search Results:</div>
            <div className='tableheader'>
                <div>Flat types</div>
                <div>Location</div>
                <div>Average sale price</div>
            </div>
            <div className='price-content'>{displayPrice()}</div>
          </div>
  
        </div>
    )
}



export { FilterPrice };
