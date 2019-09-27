import React from 'react';

class SlikeVozaca extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            SlikeVozaca: []
        }
        this.getDriversPictrues.bind(this);
    }

    componentDidMount() {
        this.getDriversPictrues();
      }
    
    getDriversPictrues() {
        var DriverName = this.props.url;
        var response = DriverName.slice(29);
        console.log("DETALJI", response);
        fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&origin=*&prop=pageimages&titles=${response}&pithumbsize=120`)
        .then(res => res.json())
        .then((result) => {
              console.log(result);
            this.setState({
                slikaVozaca: result.query.pages[0].thumbnail.source
            })
                console.log(slikaVozaca)
              });     
      }  
    
    render() {      
      return (
          <div>
          <img src = {this.state.slikaVozaca} />  
          </div>        
      ) 
    }                
}

export default SlikeVozaca;