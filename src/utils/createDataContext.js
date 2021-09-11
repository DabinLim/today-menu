import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext(undefined);

  // eslint-disable-next-line react/prop-types
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in actions) {
      // eslint-disable-next-line no-prototype-builtins
      if (actions.hasOwnProperty(key)) {
        boundActions[key] = actions[key](dispatch);
      }
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return {
    Context,
    Provider,
  };
};
