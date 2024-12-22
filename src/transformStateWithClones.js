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

  for (const step of actions) {
    switch (step.type) {
      case 'addProperties':
        Object.assign(stateClone, step.extraData);
        break;
      case 'removeProperties':
        for (const key of step.keysToRemove) {
          delete stateClone[key];
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
