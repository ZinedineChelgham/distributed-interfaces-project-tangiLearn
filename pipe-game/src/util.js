/**
 * Adds a pipe on the board.
 * @param {PipeElementWidget} pipe The pipe to add.
 * @param {{x: number, y: number}} position The position of the pipe.
 * @param {HTMLElement} board The board where the pipe is added.
 */
export const addPipe = (pipe, position, board) => {
  pipe.addTo(board);
  pipe.domElem.get(0).style.left = `${position.x}px`;
  pipe.domElem.get(0).style.top = `${position.y}px`;
};