import React from 'react';
import './main.css';
import Flag from 'react-world-flags';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            Tim: [],
            Tim2: [],
            ZastaveTrke: [],
            TimD: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let roundR = this.props.match.params.id;

        fetch(`http://ergast.com/api/f1/2013/${roundR}/results.json`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        Tim: result.MRData.RaceTable.Races[0].Results,
                        Tim2: result.MRData.RaceTable.Races,
                    });
                    return fetch(`http://ergast.com/api/f1/2013/${roundR}/qualifying.json`)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                console.log(result);
                                this.setState({
                                    isLoaded: true,
                                    TimD: result.MRData.RaceTable.Races[0].QualifyingResults,
                                });
                                return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                isLoaded: true,
                                                ZastaveTrke: result
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
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        console.log('TABELE', this.state.Tim);
        const { error, isLoaded, Tim, Tim2, ZastaveTrke, TimD } = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div id="loadd"><img id="pauza" src="../app/Components/slike/giphy (1).gif" /> </div>;
        } else {
            return (
                <div>
                    <div id="podaciTrke">
                        <div>
                            <div id="TRzastave">
                                &nbsp;&nbsp; {ZastaveTrke.map((zastavaa, i) => {
                                    if ((zastavaa.en_short_name) === (Tim2[0].Circuit.Location.country)) {
                                        return <Flag code={zastavaa.alpha_3_code} height="62" fallback={<span>Unknown</span>} />
                                    } else if ((zastavaa.en_short_name === "United Kingdom of Great Britain and Northern Ireland") && (Tim2[0].Circuit.Location.country) === "UK") {
                                        return <Flag code="GBR" height="62" fallback={<span>Unknown</span>} />
                                    } else if ((zastavaa.en_short_name === "Korea (Republic of)") && (Tim2[0].Circuit.Location.country) === "Korea") {
                                        return <Flag code="KOR" height="62" fallback={<span>Unknown</span>} />
                                    } else if ((zastavaa.en_short_name === "United States of America") && (Tim2[0].Circuit.Location.country) === "USA") {
                                        return <Flag code="USA" height="62" fallback={<span>Unknown</span>} />
                                    } else if ((zastavaa.en_short_name === "United Arab Emirates") && (Tim2[0].Circuit.Location.country) === "UAE") {
                                        return <Flag code="ARE" height="62" fallback={<span>Unknown</span>} />
                                    }
                                })
                                }
                                <h3>&nbsp;&nbsp;{Tim2[0].raceName}</h3>
                            </div>

                            <div id="tekstTrke">
                                <p>Country:  &nbsp;&nbsp;&nbsp; {Tim2[0].Circuit.Location.country}</p>
                                <p>Location:  &nbsp;&nbsp; {Tim2[0].Circuit.Location.locality}</p>
                                <p>Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{Tim2[0].date}</p>
                                <p>Full Report:&nbsp;<a style={{ color: 'white', textDecoration: 'none' }} href={Tim2[0].Circuit.url} target="_blank">Link</a></p>
                            </div>
                        </div>
                    </div>
                    <div id="Main32">
                        <div id="konstruktor32">
                            <div className="flex-container">
                                <button id="dugme">F-1 Feeder</button>
                                <button id="dugme2">Teams</button>
                                <button id="dugme4">{Tim2[0].raceName}</button>
                            </div>
                        </div>
                        <div id="DveTabele">
                            <div id="tabelaTrke1">
                                <table id="tabelaRez1">
                                    <th>Pos</th>
                                    <th colSpan="2">Driver</th>
                                    <th>Team</th>
                                    <th>Best Time</th>

                                    {TimD.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center' }}>{item.position}</td>
                                            <td>{ZastaveTrke.map((zastava2, i) => {
                                                if ((zastava2.nationality) === (item.Driver.nationality)) {
                                                    return <Flag code={zastava2.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                                } else if ((zastava2.nationality === "British, UK") && (item.Driver.nationality) === "British") {
                                                    return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                                } else if ((zastava2.nationality === "Dutch, Netherlandic") && (item.Driver.nationality) === "Dutch") {
                                                    return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                                                }
                                            })
                                            }</td>
                                            <td>{item.Driver.familyName}</td>
                                            <td>{item.Constructor.name}</td>
                                            <td>{item.Q3}</td>
                                        </tr>
                                    ))}
                                </table>

                            </div>
                            <div id="tabelaTrke2">
                                <table id="tabelaRez2">
                                    <th>Pos</th>
                                    <th colSpan="2">Driver</th>
                                    <th>Team</th>
                                    <th>Results</th>
                                    <th>Points</th>
                                    {Tim.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center' }}>{item.position}</td>
                                            <td>{ZastaveTrke.map((zastava2, i) => {
                                                if ((zastava2.nationality) === (item.Driver.nationality)) {
                                                    return <Flag code={zastava2.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                                } else if ((zastava2.nationality === "British, UK") && (item.Driver.nationality) === "British") {
                                                    return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                                } else if ((zastava2.nationality === "Dutch, Netherlandic") && (item.Driver.nationality) === "Dutch") {
                                                    return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                                                }
                                            })
                                            }</td>
                                            <td>{item.Driver.familyName}</td>
                                            <td>{item.Constructor.name}</td>
                                            <td >{(() => {
                                                switch (item.status) {
                                                    case "Finished": return item.Time.time;
                                                    default: return item.status
                                                }
                                            })()}</td>
                                            <td style={{ textAlign: 'center' }}>{item.points}</td>
                                        </tr>
                                    ))}
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default App;



//Tim2[0].Results[0].Time.time