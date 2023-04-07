import '../css/filterPrice.css'
import { PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import BigNumber from 'bignumber.js';
import React, { useState, useContext } from 'react';

const FilterPrice = (props: PageProps) => {
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);
    const [filteredGroups, setFilteredGroups] = useState<
        Array<{
            town: string;
            flatType: string;
            count: number;
            totalPrice: BigNumber;
        }>
    >([]);
    const flats = useContext(FlatContext);
    const validateMinMax = (minValue: number | undefined, maxValue: number | undefined): boolean => {
        if (minValue && maxValue && (minValue >= maxValue)) {
            window.alert('Minimum price should be less than maximum price');
            return false;
        }
        else if(maxValue && (maxValue>=9999999)){
            window.alert('Maximum price out of range');
            return false;
        }
        else {
            return true;
        }
    };
    const handleDropdown = () => {
            if(validateMinMax(minVal(),maxVal())){
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
            setFilteredGroups(filtered);}
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
        <div className='price-container'>
            <div className='price-filter'>
                <div className='pricehead'>
                    <div className='price-header'>Filter selected: Price Range</div>
                <div className='price-input'>
                    <label className="price-input-label" htmlFor="min-input">Price Range</label>
                  <input type="text" id="min-input" name="min" value={min ?? ""} onChange={handleMinChange} style={{ marginRight: '15px' }}/>
                  to
                  <input type="text" id="max-input" name="max" value={max ?? ""} onChange={handleMaxChange} style={{ marginLeft: '15px' }}/>
                </div>
                <div className="price-search" onClick={handleDropdown}>
                    <img src='/img/explore/searchlogo.png' alt='searchbutton'></img>
                    <div>Search</div>
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
