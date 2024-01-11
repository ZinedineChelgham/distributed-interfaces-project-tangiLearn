import "./TowerGameCell.css";

function TowerGameCell({size, x, y, value, isGameCase, isParamCase}) {

    const getClass = () => {
        if (isGameCase) {
            switch (value) {
                case 1:
                    return 'color-1'; // Classe pour la valeur 1
                case 2:
                    return 'color-2'; // Classe pour la valeur 2
                case 3:
                    return 'color-3'; // Classe pour la valeur 3
                case 4:
                    return 'color-4'; // Classe pour la valeur 4
                default:
                    return 'color-default'; // Classe par défaut si aucune valeur ou valeur non reconnue

            }
        } else if (isParamCase) {
            return "numero";
        } else {
            return "";
        }
    };

    return (
        <div
            className={"cell"}
            style={{
                width: size + "px",
                height: size + "px",
                top: y * size + "px",
                left: x * size + "px",
                textAlign: "center",
            }}
        >
        <span style={{
            height: size + "px",
            width: size + "px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

        }}
        className={getClass()}
        >
            {value && value}
        </span>

        </div>
    );
}

export default TowerGameCell;
