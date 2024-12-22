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
    if (actions[step].type === 'addProperties') {
      Object.assign(oneState, actions[step].extraData);
    } else if (actions[step].type === 'removeProperties') {
      for (const key in actions[step].keysToRemove) {
        const removeKey = actions[step].keysToRemove[key];

        delete oneState[removeKey];
      }
    } else {
      for (const key in oneState) {
        delete oneState[key];
      }
    }

    stateClone.push(Object.assign({}, oneState));
  }

  return stateClone;
}

module.exports = transformStateWithClones;
