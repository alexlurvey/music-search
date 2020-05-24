import React from 'react';
import { OrderByOption } from '../api';

export interface IFiltersProps {
    selection: OrderByOption | undefined;
    onOrderByClick(option?: OrderByOption): void;
}

const radioname = 'artist-order-by';

export const Filters = React.memo(({ selection, onOrderByClick }: IFiltersProps) => (
    <div className='filters'>
        <div>Order by:</div>
        <div className='control'>
            <label className='radio' onClick={_ => onOrderByClick(OrderByOption.Listeners)}>
                <input type='radio' checked={selection === OrderByOption.Listeners} name={radioname} />
                Listeners
            </label>
            <label className='radio' onClick={_ => onOrderByClick(OrderByOption.Name)}>
                <input type='radio' checked={selection === OrderByOption.Name} name={radioname} />
                Name
            </label>
        </div>
        <img src='x-icon.png' onClick={_ => onOrderByClick()} />
    </div>
))