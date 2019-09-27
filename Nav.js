import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import AllTeams from './AllTeams';
import Vozaci from './Vozaci';
import DetaljiVozaca from './DetaljiVozaca';
import DetaljiVozacaRezultat from './DetaljiVozacaRezultat';
import TeamDetails from './TeamDetails';
import TeamResults from './TeamResults';
import RaceCalendar from './RaceCalendar';
import RaceDetails from './RaceDetails';
import './main.css';


class App extends React.Component {
    constructor() {
        super();
        this.State = {

        }
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <img id="back" src="./app/Components/slike/formula-1.jpg" />

                    <div id="levo">
                        <img id="iconF" src="./app/Components/slike/f1.jpg" alt="slika" />
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/" className="brisanje"> <img className="ikonice" src="./app/Components/slike/kacigaaa.png" /><p className="ikonicePara">&nbsp;&nbsp;&nbsp;&nbsp;Drivers</p></Link>
                                </li>
                                <li>
                                    <Link to="/drugi" className="brisanje"><img className="ikonice" src="./app/Components/slike/bolid.png" /><p className="ikonicePara">&nbsp;&nbsp;Teams</p></Link>
                                </li>
                                <li>
                                    <Link to="/treci" className="brisanje"><img className="ikonice" src="./app/Components/slike/zastavaa.png" /><p className="ikonicePara">&nbsp;&nbsp;Races</p></Link>
                                </li>

                            </ul>
                        </nav>

                        <Route path="/" exact component={Soferi} />
                        <Route path="/drugi" component={Timovi} />
                        <Route path="/treci" component={Trke} />
                        <Route path="/driverDetails/:id" component={DetaljiVozaca} />
                        <Route path="/driverDetails/:id" component={DetaljiVozacaRezultat} />
                        <Route path="/constructorDetails/:id" component={TeamDetails} />
                        <Route path="/constructorDetails/:id" component={TeamResults} />  
                        <Route path="/trkaDetails/:id" component={RaceDetails} />
                       
                    </div>
                </div>
            </Router>
        )
    }

}
class Soferi extends React.Component {
    render() {
        return (
            <div>
                <Vozaci />

            </div>
        )
    }
}


class Timovi extends React.Component {
    render() {
        return (

            <AllTeams />


        )
    }
}



class Trke extends React.Component {
    render() {
        return (
            <RaceCalendar />
        )
    }
}



export default App;


