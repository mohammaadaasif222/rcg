import { createStore, applyMiddleware, combineReducers, compose } from 'redux'; // Import 'compose'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk'; // Correct import statement

import { studentReducer, authReducer, studentMarksReducer, teacherReducer, classesReducer, selectReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['marks', 'student', 'Allteachers', 'Allclasses', 'selectedValues']
};

const rootReducer = combineReducers({
  marks: studentMarksReducer,
  student: studentReducer,
  auth: authReducer,
  Allteachers: teacherReducer,
  Allclasses: classesReducer,
  selectedValues: selectReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Enable Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Applying middleware properly with composeEnhancers
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
