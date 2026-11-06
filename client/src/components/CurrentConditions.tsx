import { useState } from 'react'
import { Button, Container, Row, Col, Image, Stack, Form } from 'react-bootstrap';

export default function CurrentConditions() {
    const [searchMode, setSearchMode] = useState<string>('zip');
    const [zip, setZip] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [lat, setLat] = useState<string>('');
    const [lon, setLon] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tempSystem, setTempSystem] = useState<string>('F');
    const [errorMsg, setErrorMsg] = useState<string>('');

    function doSearch(){
        setLoading(true);
        setErrorMsg("");
        setWeatherData(null);
        if(searchMode == "zip"){
            zipClick();
        }else if(searchMode == "city"){
            cityClick();
        }else if(searchMode == "geo"){
            coordsClick();
        }
    }

    function zipClick() {
        if(zip.trim().length > 0){
            fetch(`/api/weather/current/zip/${zip}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setErrorMsg(error.message);
            });
        }
    }

    function cityClick() {
        if(city.trim().length > 0){
            fetch(`/api/weather/current/city/${city}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
            });
        }
    }

    function coordsClick() {
        if(lat.trim().length > 0 && lon.trim().length > 0){
            fetch(`/api/weather/current/geo/${lat}/${lon}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
            });
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Select onChange={e => setSearchMode(e.target.value)}>
                        <option value="zip">ZIP Code</option>
                        <option value="city">City Name</option>
                        <option value="geo">Latitude/Longitude</option>
                    </Form.Select>
                </Col>
                <Col>
                    {searchMode == "zip" && <Form.Control value={zip} type="text" placeholder="ZIP Code..." onChange={e => setZip(e.target.value)}></Form.Control>}
                    {searchMode == "city" && <Form.Control value={city} type="text" placeholder="City Name..." onChange={e => setCity(e.target.value)}></Form.Control>}
                    {searchMode == "geo" && (
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Control value={lat} type="text" placeholder="Latitude..." onChange={e => setLat(e.target.value)}></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control value={lon} type="text" placeholder="Longitude..." onChange={e => setLon(e.target.value)}></Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Col>
                <Col>
                    <Button onClick={doSearch}>Go</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {loading && (
                        <div>Loading...</div>
                    )}
                    {errorMsg && (
                        <div className="alert alert-danger mt-2" role="alert">{errorMsg}</div>
                    )}
                    {weatherData && (
                        <Container>
                            <Row className="justify-content-md-center pt-4 display-6">Current Weather for {weatherData.city}</Row>
                            <Row className="justify-content-md-center pt-2">
                                <Col xs lg="2" className="text-center">
                                    <Stack>
                                        <Image width="100" src={weatherData.iconUrl} className="m-auto"></Image>
                                        <div>{weatherData.condition}</div>
                                    </Stack>
                                </Col>
                                <Col xs lg="2" className='text-center align-center'>
                                    <Stack className="align-center">
                                        <div className="display-5 font-weight-bold">{tempSystem == "F" && weatherData.temp.current.f + "°F" || weatherData.temp.current.c + "°C"}</div>
                                        <div>Feels like {tempSystem == "F" && weatherData.temp.feelsLike.f + "°F" || weatherData.temp.current.c + "°C"}</div>
                                    </Stack>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center pt-2">
                                <Col xs lg="2" className='text-center'>{weatherData.humidity}% Humidity</Col>
                                <Col xs lg="2" className='text-center'>Wind: {weatherData.wind.speed.f} mph {weatherData.wind.dir}</Col>
                            </Row>
                        </Container>
                    )}
                </Col>
            </Row>
        </Container>
    )
}