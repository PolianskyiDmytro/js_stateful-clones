'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  const oneState = {};

  Object.assign(oneState, state);

  for (const step in actions) {
    switch (actions[step].type) {
      case 'addProperties':
        Object.assign(oneState, actions[step].extraData);
        break;
      case 'removeProperties':
        for (const key in actions[step].keysToRemove) {
          const removeKey = actions[step].keysToRemove[key];

          delete oneState[removeKey];
        }
        break;

      case 'clear':
        for (const key in oneState) {
          delete oneState[key];
        }
    }

    stateClone.push(Object.assign({}, oneState));
  }

  return stateClone;
}

module.exports = transformStateWithClones;
