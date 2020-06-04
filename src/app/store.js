import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import rootSaga from './sagas/index';
import rootReducer from './reducers/index';

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: { rootReducer },
  middleware: [logger, sagaMiddleware]
});

//run saga
sagaMiddleware.run(rootSaga);