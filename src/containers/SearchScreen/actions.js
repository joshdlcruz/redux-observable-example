import {ofType} from 'redux-observable';
import {mapTo, mergeMap, debounceTime, delay, switchMap, catchError, map} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {Observable, of} from 'rxjs';

import {
    FETCH_USER_REPO,
    FETCH_USER_REPO_FULFILLED,
    FETCH_USER_REPO_REJECTED,
    CLEAR_TEXT_INPUT,
    SORTED_USER_REPO
} from './constants';

export const fetchUserRepos = username => ({
    type   : FETCH_USER_REPO,
    payload: username
});

export const fetchUserReposFullfilled = payload => ({
    type: FETCH_USER_REPO_FULFILLED,
    payload
});

export const fetchUserReposRejected = payload => ({
    type : FETCH_USER_REPO_REJECTED,
    payload,
    error: true
});

export const sortUserRepos = payload => ({
    type: SORTED_USER_REPO,
    payload
});

export const clearTextInput = () => ({
    type: CLEAR_TEXT_INPUT
});

export const fetchUserReposEpic = (action$: Observable) => action$.pipe(
    ofType(FETCH_USER_REPO),
    debounceTime(200),
    switchMap(action =>
        ajax
            .getJSON(`https://api.github.com/search/users?q=${action.payload}&sort=repositories`)
            .pipe(
                map(response => fetchUserReposFullfilled(response)),
                catchError(error =>
                    of(fetchUserReposRejected(error.xhr))
                )
            )
    )
);
