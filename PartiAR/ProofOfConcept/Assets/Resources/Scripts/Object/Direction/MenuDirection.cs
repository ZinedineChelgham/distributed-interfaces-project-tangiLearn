using Microsoft.MixedReality.Toolkit.Rendering;
using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.InputSystem.Controls;

public class MenuDirection : MonoBehaviour
{
    [SerializeField]
    private GameObject directionButtonPrefab;

    private DirectionObjectManager directionObjectManager;

    [SerializeField]
    private GameObject _gridCollectionCategory;
    [SerializeField]
    private GameObject _scrollCollectionCategory;

    public List<string> selectedDirections = new List<string>();
    private List<GameObject> directionButtons = new List<GameObject>();

    private Color selectedColor = Color.yellow; // La couleur pour indiquer que la direction est sélectionnée.
    private Color buttonColor; // La couleur d'origine des boutons.

    [SerializeField]
    private Mode currentMode = Mode.Edition;

    [SerializeField]
    GameObject buttonClose;
    [SerializeField]
    GameObject buttonDelete;

    [SerializeField]
    Material materialButtonDefault;
    [SerializeField]
    Material materialButtonSelected;


    private Dictionary<GameObject, TextMeshPro> buttonToTextMeshPro = new Dictionary<GameObject, TextMeshPro>();

    void Start()
    {
        // Obtenir la couleur d'origine des boutons.
        directionObjectManager = GameObject.Find("DirectionController").GetComponent<DirectionObjectManager>();
        CreateDirectionMenu();
        UpdateGridAndScrollCollection();
    }

    void OnEnable()
    {
        // Assurez-vous que les boutons aient la couleur appropriée lors de la réactivation
        if (currentMode == Mode.Edition)
        {
            // Montrez tous les boutons et remettez-les dans l'état approprié.
            foreach (GameObject button in directionButtons)
            {
                button.SetActive(true);
                string direction = button.transform.GetChild(0).GetComponentInChildren<TextMeshPro>().text;
                Color newColor = selectedDirections.Contains(direction) ? selectedColor : buttonColor;
                StartCoroutine(ChangeButtonColorCoroutine(button, newColor));
            }
        }
        else
        {
            // Cachez les boutons qui ne sont pas dans selectedDirections.
            foreach (GameObject button in directionButtons)
            {
                string direction = button.transform.GetChild(0).GetComponentInChildren<TextMeshPro>().text;
                Color newColor = buttonColor;
                ChangeButtonColor(button, newColor);
                button.SetActive(selectedDirections.Contains(direction));
                StartCoroutine(ChangeButtonColorCoroutine(button, newColor));
            }
        }
        UpdateGridAndScrollCollection();
    }

    public void CreateDirectionMenu()
    {
        foreach (string direction in directionObjectManager.directionsPossible)
        {
            GameObject directionButton = Instantiate(directionButtonPrefab, _gridCollectionCategory.transform);
            TextMeshPro textMeshPro = directionButton.transform.GetChild(0).GetComponentInChildren<TextMeshPro>();
            textMeshPro.text = direction;
            directionButton.transform.GetChild(0).GetComponent<ButtonConfigHelper>().OnClick.AddListener(() => ToggleDirection(direction, directionButton));
            directionButtons.Add(directionButton);
            buttonToTextMeshPro.Add(directionButton, textMeshPro);
            ChangeButtonColor(directionButton, buttonColor);
        }
    }

    public void ToggleDirection(string direction, GameObject button)
    {
        // Seulement actif en mode édition.
        if (currentMode == Mode.Edition)
        {
            if (selectedDirections.Contains(direction))
            {
                selectedDirections.Remove(direction);
                ChangeButtonColor(button, buttonColor);
            }
            else
            {
                selectedDirections.Add(direction);
                ChangeButtonColor(button, selectedColor);
            }
            UpdateGridAndScrollCollection();
        }
    }

    [ContextMenu("Switch Mode")]
    public void ChangeMode(Mode mode)
    {
        if (mode == Mode.Edition)
        {
            SwitchToEditionMode();
            UpdateGridAndScrollCollection();
        }
        else
        {
            SwitchToVisualisationMode();
            UpdateGridAndScrollCollection();
        }
    }

    private void SwitchToVisualisationMode()
    {
        gameObject.SetActive(true);
        currentMode = Mode.Visualization;
        buttonClose.SetActive(false);
        buttonDelete.SetActive(false);
        // Cachez les boutons qui ne sont pas dans selectedDirections.
        foreach (GameObject button in directionButtons)
        {
            button.SetActive(true);
            StartCoroutine(ChangeButtonCoroutineVisualisation(button));
        }
    }

    private void SwitchToEditionMode()
    {
        currentMode = Mode.Edition;
        buttonClose.SetActive(true);
        buttonDelete.SetActive(true);
        // Montrez tous les boutons et remettez-les dans l'état approprié.
        foreach (GameObject button in directionButtons)
        {
            button.SetActive(true);
            StartCoroutine(ChangeButtonCoroutineEdition(button));
        }
    }

    private IEnumerator ChangeButtonCoroutineEdition(GameObject button)
    {
        yield return new WaitForSeconds(0.1f); // Ici vous pouvez utiliser 'yield return new WaitForSeconds(x)' pour attendre x secondes avant de continuer l'exécution
        string direction = button.transform.GetChild(0).GetChild(3).GetChild(3).GetComponent<TextMeshPro>().text;
        Color newColor = selectedDirections.Contains(direction) ? selectedColor : buttonColor;
        StartCoroutine(ChangeButtonColorCoroutine(button, newColor));
    }

    private IEnumerator ChangeButtonCoroutineVisualisation(GameObject button)
    {
        yield return new WaitForSeconds(0.1f); // Ici vous pouvez utiliser 'yield return new WaitForSeconds(x)' pour attendre x secondes avant de continuer l'exécution
        string direction = button.transform.GetChild(0).GetChild(3).GetChild(3).GetComponent<TextMeshPro>().text;
        Color newColor = selectedDirections.Contains(direction) ? selectedColor : buttonColor;
        StartCoroutine(ChangeButtonColorCoroutine(button, newColor));
        button.SetActive(selectedDirections.Contains(direction));
    }

    private void ChangeButtonColor(GameObject button, Color color)
    {
        if (button.activeSelf)
        {
            MeshRenderer meshRendererButton = button.transform.GetChild(0).GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
            Material[] mats = meshRendererButton.materials;
            mats[0] = color == selectedColor ? materialButtonSelected : materialButtonDefault;
            meshRendererButton.materials = mats;
        }
    }

    private IEnumerator ChangeButtonColorCoroutine(GameObject button, Color color)
    {
        if (button.activeSelf)
        {
            yield return new WaitForSeconds(0.1f); // Ici vous pouvez utiliser 'yield return new WaitForSeconds(x)' pour attendre x secondes avant de continuer l'exécution
            MeshRenderer meshRendererButton = button.transform.GetChild(0).GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
            Material[] mats = meshRendererButton.materials;
            mats[0] = color == selectedColor ? materialButtonSelected : materialButtonDefault;
            meshRendererButton.materials = mats;
        }
    }

    public void AddDirection(string direction)
    {
        directionObjectManager.directionsPossible.Add(direction);
        GameObject directionButton = Instantiate(directionButtonPrefab, transform);
        directionButton.transform.GetChild(0).GetComponentInChildren<TextMeshPro>().text = direction;
        directionButton.transform.GetChild(0).GetComponent<ButtonConfigHelper>().OnClick.AddListener(() => ToggleDirection(direction, directionButton));
        directionButtons.Add(directionButton);
    }

    // Assurez-vous de nettoyer lorsque l'objet est détruit.
    private void OnDestroy()
    {
        foreach (GameObject directionButton in directionButtons)
        {
            Destroy(directionButton);
        }
    }

    private void UpdateGridAndScrollCollection()
    {
        StartCoroutine(MenuUtils.WaitForUpdateGridCollection(_gridCollectionCategory));
        StartCoroutine(MenuUtils.WaitForScrollingCollection(_scrollCollectionCategory));
    }

    public IEnumerator LoadDirections(List<string> savedDirections)
    {
        yield return new WaitForSeconds(0.3f);
        // Mettre à jour la liste des directions sélectionnées
        selectedDirections = savedDirections;
        Debug.Log("LOAD DIRECTION");
        // Mettre à jour les couleurs des boutons
        foreach (GameObject button in directionButtons)
        {
            string direction = buttonToTextMeshPro[button].text;
            Debug.Log(direction);
            if (selectedDirections.Contains(direction))
            {
                Debug.Log("SELECTED COLOR");
                StartCoroutine(ChangeButtonColorCoroutine(button, selectedColor));
            }
            else
            {
                Debug.Log("NOT SELECTED COLOR");
                StartCoroutine(ChangeButtonColorCoroutine(button, buttonColor));
            }
        }
        // Commencez une coroutine qui mettra à jour les couleurs des boutons et ensuite mettra à jour les collections
        UpdateGridAndScrollCollection();
    }
}