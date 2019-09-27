import React from 'react';
import './main.css';
import Flag from 'react-world-flags';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            TeamsStandings3: [],
            Zastave3: [],
        };
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    getData() {
        let constructorId = this.props.match.params.id;
        fetch(`http://ergast.com/api/f1/2013/constructors/${constructorId}/constructorStandings.json`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        TeamsStandings3: result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
                    });
                    return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    Zastave3: result
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
        // console.log(this.state.TeamsStandings3)
        const { error, isLoaded, TeamsStandings3, Zastave3 } = this.state;   
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div id="loadd"><img id="pauza" src="../app/Components/slike/giphy (1).gif" /> </div>;
        } else {
            return (
                <div id="podaci">
                    <div id="UnutrasnjiPodaci">
                        <div>
                            <img id="slikaKonstruktor" src=
                                {(() => {
                                    switch (TeamsStandings3[0].Constructor.constructorId) {
                                        case "red_bull": return "../app/Components/slike/red.png";
                                        case "mercedes": return "../app/Components/slike/mec.png";
                                        case "ferrari": return "../app/Components/slike/fer.png";
                                        case "lotus_f1": return "../app/Components/slike/lotus.png";
                                        case "mclaren": return "../app/Components/slike/meclaren.png";
                                        case "force_india": return "../app/Components/slike/india.png";
                                        case "sauber": return "../app/Components/slike/sauber.png";
                                        case "toro_rosso": return "../app/Components/slike/toro.png";
                                        case "williams": return "../app/Components/slike/wili.jpg";
                                        case "marussia": return "../app/Components/slike/Marussia.png";
                                        case "caterham": return "../app/Components/slike/cata.jpg";
                                        default: return "../app/Components/slike/image-not-found.jpg";
                                    }
                                })()} />
                        </div>
                        <div id="slikeZastava">
                            {Zastave3.map((zastava3, i) => {
                                if ((zastava3.nationality) === (TeamsStandings3[0].Constructor.nationality)) {
                                    return <Flag code={zastava3.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                                } else if ((zastava3.nationality === "British, UK") && (TeamsStandings3[0].Constructor.nationality) === "British") {
                                    return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                                } else if ((zastava3.nationality === "Dutch, Netherlandic") && (TeamsStandings3[0].Constructor.nationality) === "Dutch") {
                                    return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                                }
                            })
                            }
                            <h3 style={{ letterSpacing: '1px' }}>{this.state.TeamsStandings3[0].Constructor.name}</h3>
                        </div>
                        <div id="okvirResult">
                            <p style={{ marginTop: '60px' }}>Country: &nbsp;&nbsp;{this.state.TeamsStandings3[0].Constructor.nationality}</p>
                            <p>Position:&nbsp;&nbsp; {this.state.TeamsStandings3[0].position}</p>
                            <p>Points:&nbsp;&nbsp; {this.state.TeamsStandings3[0].points}</p>
                            <p>History:&nbsp;&nbsp; <a href={this.state.TeamsStandings3[0].Constructor.url} style={{ color: 'white', textDecoration:'none' }} target="_blank">Link</a></p>
                        </div>
                    </div>
                </div>


            );
        }
    }
}

export default App;

