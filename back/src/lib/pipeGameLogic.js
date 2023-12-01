/**
 *
 * @param {number[][][]} state
 * @param {PipeGameAction} action
 */
export function updateGameState(state, action) {
  const { x, y } = action.position;
  const newState = [...state];
  if (action.type === "rotate") {
    newState[x][y][1] = action.rotation;
  } else {
    newState[x][y][0] = [action.pipeType, action.rotation];
  }
  return newState;
}
