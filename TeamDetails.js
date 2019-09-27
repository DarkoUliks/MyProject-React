import React from 'react';
import history from './history';
import Flag from 'react-world-flags';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            TeamsStandings2: [],
            Zastave1: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let constructorId = this.props.match.params.id;
        fetch(`http://ergast.com/api/f1/2013/constructors/${constructorId}/results.json`)     
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        TeamsStandings2: result.MRData.RaceTable.Races,
                        isLoaded: true,

                    });
                    return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    Zastave1: result
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
        // console.log("TimDetalji:", this.state.Zastave1)
        //console.log("Zastave:", this.state.TeamsStandings2)
        const { error, isLoaded, TeamsStandings2, Zastave1 } = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div></div>
        } else {
            return (
                <div>
                    <div id="Main2">
                        <div id="konstruktor2">
                            <div className="flex-container">
                                <button id="dugme">F-1 Feeder</button>
                                <button id="dugme2">Teams</button>
                                <button id="dugme4">{this.state.TeamsStandings2[0].Results[0].Constructor.name}</button>

                            </div>
                        </div>
                        <div id="tabelaGlavna">
                            <table id="tabelaDva">
                                <tbody>
                                    <th>Round</th>
                                    <th colSpan='2'>Grand Prix </th>
                                    <th> {this.state.TeamsStandings2[0].Results[0].Driver.familyName} </th>
                                    <th> {this.state.TeamsStandings2[0].Results[1].Driver.familyName} </th>
                                    <th>Points</th>
                                    {TeamsStandings2.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{textAlign:'center'}}>{item.round}</td>
                                            <td>
                                                &nbsp;&nbsp;      {Zastave1.map((zastavaa, i) => {
                                                    if ((zastavaa.en_short_name) === (item.Circuit.Location.country)) {
                                                        return <Flag code={zastavaa.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                                    } else if ((zastavaa.en_short_name === "United Kingdom of Great Britain and Northern Ireland") && (item.Circuit.Location.country) === "UK") {
                                                        return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                                    } else if ((zastavaa.en_short_name === "Korea (Republic of)") && (item.Circuit.Location.country) === "Korea") {
                                                        return <Flag code="KOR" height="18" fallback={<span>Unknown</span>} />
                                                    }
                                                })
                                                }
                                                &nbsp;&nbsp; </td>
                                            <td> {item.raceName} </td>
                                            <td style={{ textAlign:'center', color:'black',
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
                                            }} >{item.Results[0].position}  </td>
                                            <td style={{textAlign:'center', color:'black',
                                                backgroundColor: (() => {
                                                    switch (item.Results[1].position) {
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
                                            }}
                                            >{item.Results[1].position}</td>
                                            <td style={{textAlign:'center'}}>{Number(item.Results[0].points) + Number(item.Results[1].points)}</td>
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























