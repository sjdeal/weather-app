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
    // const [tempSystem, setTempSystem] = useState<string>('F');
    const [errorMsg, setErrorMsg] = useState<string>('');

    function doSearch(){
        setErrorMsg("");
        let url : string = '';
        if(searchMode == "zip"){
            if(zip.trim().length > 0){
                url = `/api/weather/current/zip/${encodeURIComponent(zip)}`;
            }else{
                setErrorMsg("Please enter a ZIP code.");
                return;
            }
        }else if(searchMode == "city"){
            if(city.trim().length > 0){
                url = `/api/weather/current/city/${encodeURIComponent(city)}`
            }else{
                setErrorMsg("Please enter a city.");
                return;
            }
        }else if(searchMode == "geo"){
            if(lat.trim().length > 0 && lon.trim().length > 0){
                url = `/api/weather/current/geo/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`;
            }else{
                setErrorMsg("Please enter a latitude and longitude.");
                return;
            }
        }
        
        if(url !== ''){
            setLoading(true);
            setWeatherData(null);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if(data.cod){
                        throw new Error(`An error occurred. ${data.cod} - ${data.message}`);
                    }
                    setWeatherData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                    setErrorMsg(error.message);
                });
        }else{
            setErrorMsg(`Unable to get weather - unknown searchMode '${searchMode}'`);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Select onChange={e => {setSearchMode(e.target.value); setErrorMsg("");}}>
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
                                        <div className="display-5 font-weight-bold">{weatherData.temp.current.f + "°F"}</div>
                                        <div>Feels like {weatherData.temp.feelsLike.f + "°F"}</div>
                                        {/* <div className="display-5 font-weight-bold">{tempSystem == "F" && weatherData.temp.current.f + "°F" || weatherData.temp.current.c + "°C"}</div>
                                        <div>Feels like {tempSystem == "F" && weatherData.temp.feelsLike.f + "°F" || weatherData.temp.current.c + "°C"}</div> */}
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