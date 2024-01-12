import TowerGameCell from "./TowerGameCell";
import "./TowerGameCell.css"
import "../PipeGameBoard.css";

function TowerGameBoard({gameState, dimensions, cellSize, paramToCaseMapping}) {

    console.log(gameState)

    const isGameSquare = (x, y) => {
        if (x < 1 || x > 3) return false;
        if (y < 1 || y > 3) return false;
        return true;

    };

    const getValue = (x, y) => {
        const mapping = paramToCaseMapping[x.toString() + y.toString()];
        if (!mapping) {
            if (isGameSquare(x, y)) {
                return gameState[x - 1][y - 1]
            }
        }
        return paramToCaseMapping[x.toString() + y.toString()]

    }

    return (
        <div
            id="board"
            style={{
                width: dimensions.columns * cellSize + "px",
                height: dimensions.rows * cellSize + "px",
            }}
        >
            {[...Array(dimensions.rows)].map((_, row) =>
                [...Array(dimensions.columns)].map((_, column) => (
                    <TowerGameCell
                        key={row * 100 + column}
                        size={cellSize}
                        x={column}
                        y={row}
                        value={getValue(row, column)}
                        isGameCase={isGameSquare(row, column)}
                        isParamCase={paramToCaseMapping[row.toString() + column.toString()] !== undefined}
                    />
                )),
            )}
        </div>
    );
}

export default TowerGameBoard;
