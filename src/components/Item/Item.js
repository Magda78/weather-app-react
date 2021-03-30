import React from 'react';
import './Item.css';
import moment from 'moment';

function Item({ item, itemsTemp }) {
	const { condition: { icon }, chance_of_rain, feelslike_f, feelslike_c, temp_f, time, temp_c } = item;
	return (
		<div className="item">
			<img src={icon} alt="" />
			<p>{moment(time).format('LT')} </p>
			<div className="item__info">
				<div className="item__infoElement">
					<p>Temp</p>
					<p>..................</p>
					<p id="item__infoElement">{itemsTemp ? temp_c : temp_f}°</p>
				</div>
				<div className="item__infoElement">
					<p>Feels like</p>
					<p>..................</p>
					<p id="item__infoElement">{itemsTemp ? feelslike_c : feelslike_f}°</p>
				</div>
				<div className="item__infoElement">
					<p>Chance of rain</p>
					<p>..................</p>
					<p id="item__infoElement">{chance_of_rain} </p>
				</div>
			</div>
		</div>
	);
}

export default Item;
