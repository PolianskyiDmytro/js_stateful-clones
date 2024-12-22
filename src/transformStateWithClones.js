'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalStates = [];
  const stateClone = {};

  Object.assign(stateClone, state);

  for (const step in actions) {
    switch (actions[step].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[step].extraData);
        break;
      case 'removeProperties':
        for (const key in actions[step].keysToRemove) {
          const removeKey = actions[step].keysToRemove[key];

          delete stateClone[removeKey];
        }
        break;

      default:
        for (const key in stateClone) {
          delete stateClone[key];
        }
    }

    finalStates.push(Object.assign({}, stateClone));
  }

  return finalStates;
}

module.exports = transformStateWithClones;
