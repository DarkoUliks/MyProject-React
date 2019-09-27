import React from 'react';
import history from './history';
import Flag from 'react-world-flags';


class Vozaci extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      PozicijeVozaca: [],
      Zastave: [],
      Pozicija:[]

    };
    this.getData = this.getData.bind(this);
  }

  onClickDetailsOfRequest = (e) => {
    let linkTo = "/driverDetails/" + e.target.dataset.itemid;
    history.push(linkTo)
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    fetch("http://ergast.com/api/f1/2013/driverStandings.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            PozicijeVozaca: result.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            Pozicija:result.MRData.StandingsTable.StandingsLists[0]
          });
          return fetch("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  Zastave: result
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
    const { error, isLoaded, PozicijeVozaca, Zastave, Pozicija } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div id="loadd"><img id="pauza" src="./app/Components/slike/giphy (1).gif" /> </div>;
    } else {
      return (
        <div id="Main3">
          <div id="konstruktor">
            <div class="flex-container">
              <button id="dugme">F-1 Feeder</button>
              <button id="dugme2" style={{ backgroundColor: 'rgb(50, 137, 192)' }}>Drivers</button>
              <input id="dugme3" placeholder="Search..." />
            </div>
            <div id="ispod3">
              <h2>Drivers Championship</h2>
            </div>
          </div>
          <div id="tabela">
            <table id="tabelaVozaci">
              <tbody>
                <tr>
                  <th id="naslov" colSpan="5">Drivers Championship Standings - {Pozicija.season}</th>
                </tr>
                {PozicijeVozaca.map((item, i) => (
                  <tr key={i}>
                    <td style={{textAlign:'center'}}>{item.position}</td>
                    <td style={{textAlign:'center'}}>
                      {Zastave.map((zastava, i) => {
                        if ((zastava.nationality) === (item.Driver.nationality)) {
                          return <Flag code={zastava.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                        } else if ((zastava.nationality === "British, UK") && (item.Driver.nationality) === "British") {
                          return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                        } else if ((zastava.nationality === "Dutch, Netherlandic") && (item.Driver.nationality) === "Dutch") {
                          return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                        }
                      })
                      }</td>
                     <td> <button onClick={this.onClickDetailsOfRequest} data-itemid={item.Driver.driverId}>{item.Driver.givenName} {item.Driver.familyName}</button>
                    </td>
                    <td>{item.Constructors[0].name}</td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      );
    }
  }
}

export default Vozaci;



