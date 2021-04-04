import React,{ useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import Item from '../Item/Item';
import './Items.css';
import moment from 'moment';

//let element = null;


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
			//console.log("items================>", items)
			items?.date === weatherInfo?.location.localtime.slice(0,10) ? 
			//console.log("items================>", items)
			(items?.hour.map(item=> {
			 //console.log('===="""""""""""""""""""""""=>',items.hour.indexOf(item))
			 let idx = items.hour.indexOf(item);
	
			 //console.log('time=====>',weatherInfo?.location.localtime.slice(11,14))
			 //console.log('sec time========>', items?.hour[idx].time.slice(11,14))
	   
			console.log('item===========================>',idx)
			console.log('oooooo',moment(items?.hour[idx].time.slice(11,13)).format('LT'))
			 if (weatherInfo?.location.localtime.slice(11,14) === items?.hour[idx].time.slice(11,14)){
			   //console.log('itemxxxxxxxxxxxx=========>',items.hour.indexOf(item))
			 setElement(idx)  ;
			 setLoaded(true)
			   //element = idx
			   console.log('type=========>',typeof(idx))
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
			{
				console.log('ttttttttttttt',element,loaded)
			}
          { loaded ? 
		 <Carousel breakPoints={breakPoints} initialActiveIndex={element}>
			
		 {console.log(element)}
						 {
			 
			 weatherInfo?.forecast.forecastday.map(items=> (
				 
				 items?.date === weatherInfo?.location.localtime.slice(0,10) ? 
				 
				 
				 items?.hour.map(item=> {
					 return <Item item={item} itemsTemp={itemsTemp}/>
				 }) : null
			 ))
		 
			 }
			 </Carousel> 
		  : null }

            
        </div>
    )
}

export default Items
