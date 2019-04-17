import {ofType} from 'redux-observable';
import {mergeMap, map} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {Observable} from 'rxjs';

import {FETCH_USER, FETCH_USER_FULFILLED} from './constants';

export const fetchUsers = () => ({type: FETCH_USER});

export const fetchUserFulfilled = payload => ({
    type: FETCH_USER_FULFILLED,
    payload
});

export const fetchUsersEpic = (action$: Observable) => action$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
        ajax.getJSON(`https://api.github.com/users`).pipe(
            map(response => fetchUserFulfilled(response))
        )
    )
);
