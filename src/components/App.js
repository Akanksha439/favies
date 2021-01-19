import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,setShowFavourites} from '../actions';
import {data} from '../data';

class App extends React.Component{
  componentDidMount(){
    //make api call
    //dispatch action
    const {store}=this.props;
    store.subscribe(()=>{
      //console.log('UPDATE');
      //updated app component
      this.forceUpdate();
    });
    store.dispatch(addMovies(data));
    console.log('STATE',this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{
    const { movies } = this.props.store.getState();

    const index =movies.favourites.indexOf(movie);
    if (index !==-1) {
      return true;
    }

    return false;
  };

  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val));
  }
  render(){
    const {movies}=this.props.store.getState();
    const {list,favourites,showFavourites}=movies;
    const dispalyMovies=showFavourites?favourites:list;
    console.log('RENDER',this.props.store.getState());
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch}/>
        <div className="main">
          <div className="tabs">
            <div 
              className={`tab ${showFavourites?'':'active-tabs'}`} 
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {dispalyMovies.map((movie, index)=>(
              <MovieCard movie={movie}
               key={`movies-${index}`} 
               dispatch={this.props.store.dispatch}
               isFavourite={this.isMovieFavourite(movie)}
               />
            ))}
          </div>
          {dispalyMovies.length===0?<div className="no movies">No movies to dispaly!!</div> : null}
        </div>
      </div>
    );
  } 
}

export default App;
