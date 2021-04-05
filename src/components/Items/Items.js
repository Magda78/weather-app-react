import React,{ useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import Item from '../Item/Item';
import './Items.css';
import moment from 'moment';


function Items({weatherInfo, itemsTemp }) {

	const [element, setElement] = useState(null);
	const[ loaded, setLoaded] = useState(false)
    const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
		{ width: 768, itemsToShow: 6},
		{ width: 1200, itemsToShow: 12 }
	  ];

    const a = (a) => (
		a?.forecast.forecastday.map(items=> (
			items.date === weatherInfo?.location.localtime.slice(0,10) ? 
				(items.hour.map(item=> {
			 		let idx = items.hour.indexOf(item);
			 		if (weatherInfo.location.localtime.slice(11,14) === items.hour[idx].time.slice(11,14)){
			 		setElement(idx)  ;
			 		setLoaded(true)
		   			}
		   		}
	   		)) 
			: 
			null
	   )
	))

	useEffect(() => {
		a(weatherInfo)
	}, [weatherInfo]);
	
    return (	
        <div className="items">
          { loaded ? 
		 	<Carousel breakPoints={breakPoints} initialActiveIndex={element}>
			{
			 	weatherInfo.forecast.forecastday.map(items=> ( 
				 	items.date === weatherInfo.location.localtime.slice(0,10) ? 
				 	items.hour.map(item=> {
					 return <Item item={item} itemsTemp={itemsTemp}/>
				 	}) : null
			 	))
			}
			 </Carousel> 
		  : null 
		  }  
        </div>
    )
}

export default Items
