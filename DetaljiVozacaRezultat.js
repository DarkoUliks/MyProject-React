import React from 'react';
import history from './history';
import Flag from 'react-world-flags';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            Teams: [],
            ZastaveDva: [],
        };
        this.getData = this.getData.bind(this);  
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let driverId = this.props.match.params.id;
        fetch(`http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Teams: result.MRData.RaceTable.Races,
                        isLoaded: true,
                    });
                    return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    ZastaveDva: result
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
                        error: error
                    });
                }
            )
    };
    render() {
        //console.log(this.state.ZastaveDva)
        //console.log( this.state.Teams)
        const { error, isLoaded, Teams, ZastaveDva } = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div></div>;
        } else {
            return (
                <div>
                    <div id="Main22">
                        <div id="konstruktor22">
                            <div className="flex-container">
                                <button id="dugme">F-1 Feeder</button>
                                <button id="dugme2">Teams</button>
                                <button id="dugme4">{Teams[0].Results[0].Driver.familyName}</button>
                            </div>
                        </div>
                        <div id="tabelaGlavna22">
                            <table id="tabelaDva22">
                                <tbody>
                                    <th>Round</th>
                                    <th colSpan='2'>Grand Prix </th>
                                    <th> Team </th>
                                    <th> Grid </th>
                                    <th>Race</th>
                                    {Teams.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{textAlign:'center'}}>{item.round}</td>
                                            <td>
                                                &nbsp;&nbsp;      {ZastaveDva.map((zastavaa, i) => {
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
                                            <td> {item.raceName} </td>
                                            <td>{item.Results[0].Constructor.name}</td>
                                            <td>{item.Results[0].grid}</td>
                                            <td style={{ color:'black', textAlign:'center',
                                                backgroundColor: (() => {
                                                    switch (item.Results[0].position) {
                                                        case "1": return "yellow";
                                                        case "2": return "grey";
                                                        case "3": return "orange";
                                                        case "4": return "lightGreen";
                                                        case "5": return "lightblue";
                                                        case "6": return "pink";
                                                        case "7": return "green";
                                                        case "8": return "brown";
                                                        case "9": return "blue";
                                                        case "10": return "red";
                                                        default: return "darkgrey";
                                                    }
                                                })()
                                            }} >{item.Results[0].position}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default App;



