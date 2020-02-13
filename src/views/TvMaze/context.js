import React from 'react';
import reducer from './reducer';
import model from './model';

const TvMazeContext = React.createContext();
const TvMazeDispatchContext = React.createContext();

const withTvMazeProvider = Component => {
  const TvMazeProvider = props => {
    const [state, dispatch] = React.useReducer(reducer, model);

    return (
      <TvMazeContext.Provider value={state}>
        <TvMazeDispatchContext.Provider value={dispatch}>
          <Component {...props} />
        </TvMazeDispatchContext.Provider>
      </TvMazeContext.Provider>
    );
  };
  return TvMazeProvider;
};

const useTvMazeState = () => {
  const context = React.useContext(TvMazeContext);
  if (context === undefined) {
    throw new Error('useTvMazeState must be used within a TvMaze Provider');
  }
  return context;
};

const useTvMazeDispatch = () => {
  const context = React.useContext(TvMazeDispatchContext);
  if (context === undefined) {
    throw new Error('useTvMazeDispatch must be used within a TvMaze Provider');
  }
  return context;
};

export { withTvMazeProvider, useTvMazeState, useTvMazeDispatch };
