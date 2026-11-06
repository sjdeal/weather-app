import { useState } from 'react'
import { Button, Container, Row, Col, Image, Stack } from 'react-bootstrap';

export default function CurrentConditions() {
    const [zip, setZip] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [lat, setLat] = useState<string>('');
    const [lon, setLon] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);

    function zipClick() {
        setWeatherData(null);
        if(zip.trim().length > 0){
            fetch(`/api/weather/current/zip/${zip}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => console.error(error));
        }
    }

    function cityClick() {
        setWeatherData(null);
        if(city.trim().length > 0){
            fetch(`/api/weather/current/city/${city}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => console.error(error));
        }
    }

    function coordsClick() {
        setWeatherData(null);
        if(lat.trim().length > 0 && lon.trim().length > 0){
            fetch(`/api/weather/current/geo/${lat}/${lon}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => console.error(error));
        }
    }

    return (
        <Container>
            <div>
                <div>
                    <input name='zip' value={zip} onChange={e => setZip(e.target.value)}></input>
                    <Button variant="primary" onClick={zipClick}>Get Weather by ZIP</Button>
                </div>
                <div>
                    <input name='city' value={city} onChange={e => setCity(e.target.value)}></input>
                    <button onClick={cityClick}>Get Weather by City</button>
                </div>
                <div>
                    <input name='lat' value={lat} onChange={e => setLat(e.target.value)}></input>
                    <input name='lon' value={lon} onChange={e => setLon(e.target.value)}></input>
                    <button onClick={coordsClick}>Get Weather by Coords</button>
                </div>
            </div>
            {weatherData && (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Stack>
                                <Image width="100" src={weatherData.iconUrl} ></Image>
                                <div>{weatherData.condition}</div>
                            </Stack>
                        </Col>
                        <Col>
                            <Stack>
                                <div>{weatherData.temp.current.f}</div>
                                <div>Feels like {weatherData.temp.feelsLike.f}</div>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    )
}