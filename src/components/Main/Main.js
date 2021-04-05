import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import Items from '../Items/Items'
import moment from 'moment';
import { Button } from '@material-ui/core';
//import { useDispatch , useSelector} from 'react-redux';
//import { celsiusCalculation, selectWeather } from '../../features/weatherSlice' ;




function Main() {
	const [ weatherInfo, setWeatherInfo ] = useState(null);
	const [ weatherTemp, setWeatherTemp ] = useState(null);
    const [ feelsLike, setFeelsLike ] = useState(null);
	const [ itemsTemp, setItemsTemp] = useState(false);
	
	const [ city, setCity ] = useState(" ");
	let itemsCTemp = null;
	
	const fetchData = () => {
		const options = {
			method: 'GET',
			url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
			params: { q: city === " "? 'London': city , days: '3' },
			headers: {
				'x-rapidapi-key': '5d5a7a020emsh8ea4d9a121a3775p1e51b2jsnbfa6c5a873af',
				'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
			}
		};
		axios
			.request(options)
			.then((response) => {
				setWeatherInfo(response.data);
				setWeatherTemp(Math.round(response.data.current.temp_f));
                setFeelsLike(Math.round(response.data.current.feelslike_f))
				console.log(response.data);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchData();	
	}, []);


	const celsiusHandler = () => {
		setWeatherTemp(Math.round(weatherInfo.current.temp_c));
        setFeelsLike(Math.round(weatherInfo.current.feelslike_c));
        setItemsTemp(true)
		 
	}

	const fahrenheitHandler = (temp) => {
		console.log(temp);
		setWeatherTemp(Math.round(weatherInfo.current.temp_f));
		setFeelsLike(Math.round(weatherInfo.current.feelslike_f));
        setItemsTemp(false)
	}

	const cityHandler = (e) => {
		setCity(e.target.value);
		e.preventDefault();
	}

	const locationHandler = (e) => {
		fetchData()
        setCity(" ");
		e.preventDefault();
	}

	return (
		<div className="main">
            
			<div className="main__changeLocation">
<form>
	<input placeholder="city........" onChange={cityHandler} value={city}/>
	<Button type="submit" onClick={locationHandler}>Change location</Button>
</form>
			</div>
			<div className="main__headerCity">
                <div className="main__headerCityInfo">
                <h3>{weatherInfo.location.name}, {weatherInfo.location.country}</h3>
                </div>
			
            <h4>{moment(weatherInfo.location.localtime).format('LLLL')}</h4>
			</div>
			<div className="main__temp">
				<div className='main__tempCondition'>
				{console.log(weatherInfo)}
				<img src={weatherInfo.current.condition.icon} alt=''/>
				<h4>{weatherInfo.current.condition.text}</h4>
				</div >
                <div className='main__tempInfo'>
				<p>Feels like........................................ <span>{feelsLike}°</span></p>
				<p>Humidity........................................ <span>{weatherInfo?.current.humidity}%</span></p>

                </div>
				<div className='main__tempTemp'>
					<div className='main__tempTempDegree'>
						<p onClick={celsiusHandler}>C</p>
						<p onClick={fahrenheitHandler}>F</p>
					</div>
				<h1>{(weatherTemp)}°</h1>
				</div>
			</div>
			<div className='main__items'>
			<Items weatherInfo={weatherInfo} itemsTemp={itemsTemp}/>
				</div>
		</div>
	);
}

export default Main;
