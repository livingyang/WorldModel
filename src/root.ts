declare function require(string);

export = {
  World: require('./common/World'),
  GameObject: require('./common/GameObject'),
  Component: require('./common/Component'),
  EventDispatcher: require('./common/EventDispatcher'),
};
