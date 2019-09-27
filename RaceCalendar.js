import React from 'react';
import './main.css';
import history from './history';
import Flag from 'react-world-flags';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            Race: [],
            ZastaveRace: [],
            ZastaveRace2: [],
        };
        this.getData = this.getData.bind(this);
    }

    onClickTrka = (e) => {
        let linkTo = "/trkaDetails/" + e.target.dataset.itemid;
        history.push(linkTo)
    };

    componentDidMount() {
        this.getData();
    };

    getData() {
        fetch("http://ergast.com/api/f1/2013/results/1.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Race: result.MRData.RaceTable.Races,
                    });
                    return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    ZastaveRace: result,
                                    ZastaveRace2: result,
                                });
                            },
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error
                                });
                            }
                        )
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    render() {
       // console.log("TRECA TABELA", this.state.Race)
        const { error, isLoaded, Race, ZastaveRace, ZastaveRace2 } = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div id="loadd"><img id="pauza" src="./app/Components/slike/giphy (1).gif" /> </div>;
        } else {
            return (
                <div id="Main4" >
                    <div id="konstruktor4">
                        <div className="flex-container">
                            <button id="dugme">F-1 Feeder</button>
                            <button id="dugme2" style={{ backgroundColor: 'rgb(50, 137, 192)' }}>Races</button>
                            <input id="dugme3" placeholder="Search..." />
                        </div>
                        <div id="ispod4">
                            <h2>Race Calendar</h2>
                        </div>
                    </div>
                    <div id="tabela">
                        <table id="tabela4">
                            <td id="naslov4" colSpan="7" > &nbsp;&nbsp;Race Calendar - 2013</td>
                            <tr>
                                <th>Round</th>
                                <th colSpan="2">Grand Prix </th>
                                <th>Circuit</th>
                                <th>Date</th>
                                <th colSpan="2">Winner</th>
                            </tr>
                            {Race.map((item, i) => (
                                <tr key={i}>
                                    <td style={{textAlign:'center'}}>{item.round}</td>
                                    <td> &nbsp;&nbsp;   {ZastaveRace.map((zastavaa, i) => {
                                        if ((zastavaa.en_short_name) === (item.Circuit.Location.country)) {
                                            return <Flag code={zastavaa.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastavaa.en_short_name === "United Kingdom of Great Britain and Northern Ireland") && (item.Circuit.Location.country) === "UK") {
                                            return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastavaa.en_short_name === "Korea (Republic of)") && (item.Circuit.Location.country) === "Korea") {
                                            return <Flag code="KOR" height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastavaa.en_short_name === "United States of America") && (item.Circuit.Location.country) === "USA") {
                                            return <Flag code="USA" height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastavaa.en_short_name === "United Arab Emirates") && (item.Circuit.Location.country) === "UAE") {
                                            return <Flag code="ARE" height="18" fallback={<span>Unknown</span>} />
                                        }
                                    })
                                    }
                                    </td>
                                    <td><button style={{ cursor: 'pointer' }} onClick={this.onClickTrka} data-itemid={item.round}>{item.raceName}</button></td>
                                    <td> &nbsp;&nbsp;{item.Circuit.circuitName}</td>
                                    <td>{item.date}</td>
                                    <td> {ZastaveRace2.map((zastava2, i) => {
                                        if ((zastava2.nationality) === (item.Results[0].Driver.nationality)) {
                                            return <Flag code={zastava2.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastava2.nationality === "British, UK") && (item.Results[0].Driver.nationality) === "British") {
                                            return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                        } else if ((zastava2.nationality === "Dutch, Netherlandic") && (item.Results[0].Driver.nationality) === "Dutch") {
                                            return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                                        }
                                    })
                                    }</td>
                                    <td>{item.Results[0].Driver.givenName}  {item.Results[0].Driver.familyName}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default App;