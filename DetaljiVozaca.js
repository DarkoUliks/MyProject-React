import React from 'react';
import Flag from 'react-world-flags';
import SlikeVozaca from './SlikeVozaca';

class DetaljiVozaca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      DetaljiVozaca: [],
      ZastaveVozaci: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let driverId = this.props.match.params.id;
    fetch(`http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            DetaljiVozaca: result.MRData.StandingsTable.StandingsLists,
          });
          return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  ZastaveVozaci: result
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
    //console.log(this.state.DetaljiVozaca);
    const { error, isLoaded, DetaljiVozaca, ZastaveVozaci } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div id="loadd"><img id="pauza" src="../app/Components/slike/giphy (1).gif" /> </div>;
    } else {
      return (
        <div id="podaciVozaca">

          <div id="untrasnjiPodaciVozaca">

            <div id="slikeVozaca">
              <SlikeVozaca url={this.state.DetaljiVozaca[0].DriverStandings[0].Driver.url} />
            </div>

            <div id="slikeZastavaVozaca">
              {ZastaveVozaci.map((zastava3, i) => {
                if ((zastava3.nationality) === (DetaljiVozaca[0].DriverStandings[0].Driver.nationality)) {
                  return <Flag code={zastava3.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                } else if ((zastava3.nationality === "British, UK") && (DetaljiVozaca[0].DriverStandings[0].Driver.nationality) === "British") {
                  return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                } else if ((zastava3.nationality === "Dutch, Netherlandic") && (DetaljiVozaca[0].DriverStandings[0].Driver.nationality) === "Dutch") {
                  return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                }
              })
              }
              <h2>{this.state.DetaljiVozaca[0].DriverStandings[0].Driver.givenName} {this.state.DetaljiVozaca[0].DriverStandings[0].Driver.familyName}</h2>
            </div>
            <div id="tekst">
              <p>Country:&nbsp;&nbsp; {this.state.DetaljiVozaca[0].DriverStandings[0].Driver.nationality}</p>
              <p>Tim:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.DetaljiVozaca[0].DriverStandings[0].Constructors[0].name}</p>
              <p>Birth:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.DetaljiVozaca[0].DriverStandings[0].Driver.dateOfBirth}</p>
              <p>Biography:&nbsp;<a style={{ color: 'white', textDecoration: 'none' }} href={this.state.DetaljiVozaca[0].DriverStandings[0].Driver.url} target="_blank">Link</a> </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DetaljiVozaca;
