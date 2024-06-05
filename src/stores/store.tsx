import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { rootReducer, persistedReducer } from './reducer';
//import { TypeName } from 'features/types';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['payload.err', 'err'],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

// export type UpToTwoAction = PayloadAction<string>;
// export type OffenseCalAction = PayloadAction<OffenseCalState>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<unknown>>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// NOTE
// void: thunk 함수가 완료되었음을 알리는 프로미스를 반환하지만, 그 결과 값 자체는 중요하지 않음을 의미
// ㅇㅇ
