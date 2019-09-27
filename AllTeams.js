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
      TeamsStandings: [],
      Zastave: [],

    };
    this.getData = this.getData.bind(this);
  }

  onClickDetails = (e) => {
    let linkTo = "/constructorDetails/" + e.target.dataset.itemid;
    history.push(linkTo)
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    fetch("http://ergast.com/api/f1/2013/constructorStandings.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            TeamsStandings: result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
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
    //console.log(this.state.Zastave)
    const { error, isLoaded, TeamsStandings, Zastave } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div id="loadd"><img id="pauza" src="./app/Components/slike/giphy (1).gif" /> </div>;
    } else {
      return (
        <div id="Main" >
          <div id="konstruktor">
            <div className="flex-container">
              <button id="dugme">F-1 Feeder</button>
              <button id="dugme2" style={{ backgroundColor: 'rgb(50, 137, 192)' }}>Teams</button>
              <input id="dugme3" placeholder="Search..." />
            </div>
            <div id="ispod">
              <h2>Constructor Championship</h2>
            </div>
          </div>
          <div id="tabela">
            <table id="tabelaPrva">
              <tbody>
                <td id="naslov" colSpan="5" >Constructor Championship Standings - 2013</td>
                {TeamsStandings.map((item, i) => (
                  <tr key={i}>
                    <td style={{textAlign:'center'}}>{item.position}</td>
                    <td style={{textAlign:'center'}}>
                    {Zastave.map((zastava, i) => {
                      if ((zastava.nationality) === (item.Constructor.nationality)) {
                        return <Flag code={zastava.alpha_3_code} height="18" fallback={<span>Unknown</span>} />
                      } else if ((zastava.nationality === "British, UK") && (item.Constructor.nationality) === "British") {
                        return <Flag code="GBR" height="18" fallback={<span>Unknown</span>} />
                      } else if ((zastava.nationality === "Dutch, Netherlandic") && (item.Constructor.nationality) === "Dutch") {
                        return <Flag code="NLD" height="18" fallback={<span>Unknown</span>} />
                      }
                    })
                      }</td>
                    <td> <button style={{ cursor: 'pointer' }} onClick={this.onClickDetails} data-itemid={item.Constructor.constructorId}>{item.Constructor.name}</button> </td>
                    <td><a style={{ color: 'white' }} href={item.Constructor.url} target="_blank">Details</a></td>
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

export default App;











