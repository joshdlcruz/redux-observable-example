import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer } from './reducerEpics';

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(logger, epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
