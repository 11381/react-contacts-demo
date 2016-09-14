// This is a adaptation of https://github.com/alanrubin/redux-simple-promise (Licensed MIT. Copyright 2015 Alan Rubin.)

function isPromise(val) {
    return val && isFunction(val.then);
}

function isFunction(val) {
    return val && typeof val === 'function';
}

let [RESOLVED_NAME, REJECTED_NAME] = ['_RESOLVED', '_REJECTED'];

export function resolve(actionName) {
    return actionName + RESOLVED_NAME;
}

export function reject(actionName) {
    return actionName + REJECTED_NAME;
}

export default function promiseMiddleware(resolvedName, rejectedName) {
    [RESOLVED_NAME, REJECTED_NAME] = [resolvedName || RESOLVED_NAME, rejectedName || REJECTED_NAME];

    return ({ dispatch }) => next => action => {

        var isPromiseFunction = (action.payload && isFunction(action.payload.promise));

        if (!action.payload || (!isPromise(action.payload.promise) && !isPromiseFunction)) {
            return next(action);
        }

        // (1) Dispatch actionName with payload with arguments apart from promise

        // Clone original action
        let newAction = {
            type: action.type,
            payload: {
                ...action.payload
            },
            meta: {
                ...action.meta
            }
        };

        if (Object.keys(newAction.payload).length === 1) {
            // No arguments beside promise, remove all payload
            delete newAction.payload;
        } else {
            // Other arguments, delete promise only
            delete newAction.payload.promise;
        }

        dispatch(newAction);

        var promise = isPromiseFunction ? action.payload.promise() : action.payload.promise;

        // (2) Listen to promise and dispatch payload with new actionName
        return promise.then(
            (result) => {
                dispatch({
                    type: resolve(action.type, resolvedName),
                    payload: result,
                    meta: {
                        ...newAction.payload,
                        ...newAction.meta
                    }
                });
                return result;
            },
            (error) => {
                dispatch({
                    type: reject(action.type, rejectedName),
                    payload: error,
                    meta: {
                        ...newAction.payload,
                        ...newAction.meta
                    }
                });
                throw error;
            }
        );
    };
}