using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Microsoft.MixedReality.Toolkit.Utilities;
using TMPro;
using System;
using System.Linq;
using Microsoft.MixedReality.Toolkit.UI;

// Good luck. This script is a mess. I'm sorry.
public class ObjectCaroussel : MonoBehaviour
{
    public Transform cylinder;
    public GameObject prefabButton;
    public List<ButtonInfo> buttons;
    private float initialRotationY;
    private GridObjectCollection gridObjectCollection;
    private float anglePerButton;
    private float accumulatedRotationY;
    private float tempRotationY;
    private int numberOfTurn;
    private int lastAngleUpdate;
    private int nbButton;
    private int maxButtonInRow;
    private int maxNumberOfTurn;
    private int buttonsPerFullRotation;
    private float rightEnd;
    [SerializeField]
    private float tempangle; //0.89 le meilleur angle ?
    private Dictionary<string, List<string>> ontologies;
    public GameObject realObjectObject;
    private RealObject realObject;

    [SerializeField]
    public Material _materialButton;
    [SerializeField]
    public Material _materialButtonSelected;

    [SerializeField]
    private GridObjectCollection _gridObjectCollectionSelectedButton;
    public float distanceFromCylinder = 0.05f; // Définir à quelle distance vous souhaitez positionner le _gridObjectCollectionSelectedButton du cylindre

    [System.Serializable]
    public class ButtonInfo
    {
        public GameObject button;
        public float startAngle;
        public float endAngle;
        public int row;
        public string keyOntology;
        public string valueOntology;
        public bool selected;
        public MeshRenderer meshButton;

        public ButtonInfo(GameObject button, float startAngle, float endAngle, int row, string keyOntology, string valueOntology, MeshRenderer meshButton)
        {
            this.button = button;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.row = row;
            this.keyOntology = keyOntology;
            this.valueOntology = valueOntology;
            this.selected = false;
            this.meshButton = meshButton;
        }
    }

    private void Start()
    {
        realObject = realObjectObject.GetComponent<RealObject>();
        realObject._ontology.RemoveEvent += OnRealObjectOntologyRemoved;
        ontologies = new Dictionary<string, List<string>>();
        InitializeOntologie();
        buttons = new List<ButtonInfo>();

        int rowIndex = 0;
        foreach (var entry in ontologies)
        {
            CreateButtons(rowIndex, entry.Key, entry.Value);
            rowIndex++;
        }
        InitializeButton();
        cylinder.localRotation = Quaternion.Euler(0, anglePerButton / 2, 0);
        UpdateButtonVisibility();
        StartCoroutine(WaitForUpdateCollection());
    }

    public void InitializeButton()
    {
        Dictionary<string, List<string>> realObjectOntologies = realObject._ontology.ontologiesCategories;

        // Marquez les boutons comme "cliqués" si l'ontologie correspondante est présente dans realObjectOntologies
        foreach (var ontology in realObjectOntologies)
        {
            string category = ontology.Key;
            foreach (var value in ontology.Value)
            {
                ButtonInfo buttonInfo = buttons.Find(b => b.keyOntology == category && b.valueOntology == value);
                if (buttonInfo != null)
                {
                    buttonInfo.selected = true;

                    MeshRenderer meshRendererButton = buttonInfo.meshButton;
                    Material[] mats = meshRendererButton.materials;
                    mats[0] = _materialButtonSelected;
                    meshRendererButton.materials = mats;
                }
            }
        }
        StartCoroutine(WaitForUpdateCollection());
    }

    private void Awake()
    {
        gridObjectCollection = GetComponent<GridObjectCollection>();
    }

    //Create all the buttons for the caroussel
    private void CreateButtons(int row, string key, List<string> buttonLabels)
    {
        float cylinderRadius = gridObjectCollection.Radius;
        float buttonDistance = gridObjectCollection.CellWidth;
        buttonsPerFullRotation = Mathf.FloorToInt(2 * Mathf.PI * cylinderRadius / buttonDistance);
        gridObjectCollection.Columns = buttonsPerFullRotation + 1;
        anglePerButton = 360.0f / buttonsPerFullRotation;
        float verticalSpacing = gridObjectCollection.CellHeight;
        if(buttonLabels.Count > maxButtonInRow)
        {
            maxButtonInRow = buttonLabels.Count;
        }
        for (int i = 0; i < buttonLabels.Count; i++)
        {
            GameObject button = Instantiate(prefabButton, gameObject.transform);
            button.name = row + "_" + i;
            button.SetActive(false);
            float startAngle = i * anglePerButton;
            float endAngle = (i + 1) * anglePerButton;
            Debug.Log(row + "_" + i + " : " + startAngle + "|" + endAngle);
            TextMeshPro textmesh = button.GetComponentInChildren<TextMeshPro>();
            textmesh.text = buttonLabels[i];
            button.transform.localPosition += new Vector3(0, row * verticalSpacing, 0);
            MeshRenderer mesh = button.transform.GetChild(4).GetChild(0).GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
            buttons.Add(new ButtonInfo(button, startAngle, endAngle, row, key, buttonLabels[i],mesh));
            if (buttonLabels[i] != "")
            {
                ButtonConfigHelper buttonComponent = button.GetComponentInChildren<ButtonConfigHelper>();
                buttonComponent.OnClick.AddListener(() => OnButtonClick(button));
            }
        }
    }

    //Depending of the angle of the rotation we show or hide buttons, we do this so the rotation can be infinite (if we have infinite amount of buttons)
    //At some point we force the rotation (if we are far left or far right) so we doesn't loop
    //I don't know how it really works anymore honestly, but it kinda work.
    void Update()
    {

        gameObject.transform.parent.localPosition = cylinder.localPosition;

        float currentRotationY = cylinder.rotation.eulerAngles.y;
        if (!(accumulatedRotationY >= rightEnd + anglePerButton))
        {
           gameObject.transform.localRotation = Quaternion.Euler(0, cylinder.rotation.eulerAngles.y - (nbButton * anglePerButton * tempangle), 0);
        } else
        {
            gameObject.transform.localRotation = Quaternion.Euler(0, cylinder.rotation.eulerAngles.y + (3 * anglePerButton * tempangle), 0);
        }
        if(numberOfTurn == -1)
        {
            cylinder.localRotation = Quaternion.Euler(0, 0, 0);
        }
        if(accumulatedRotationY > (maxButtonInRow - 2) * anglePerButton)
        {
            cylinder.localRotation = Quaternion.Euler(0, (maxButtonInRow - 2) * anglePerButton, 0);
        }
        if(currentRotationY < tempRotationY && Mathf.Abs(currentRotationY - tempRotationY) > 200)
        {
            numberOfTurn += 1;
        }
        if (currentRotationY > tempRotationY && Mathf.Abs(currentRotationY - tempRotationY) > 200)
        {
            numberOfTurn -= 1;
        }
        accumulatedRotationY = numberOfTurn * 360 + currentRotationY;
        tempRotationY = currentRotationY;
        if (nbButton != ((int)Math.Floor(accumulatedRotationY / anglePerButton)))
        {
            initialRotationY = currentRotationY;
            UpdateButtonVisibility();
            StartCoroutine(WaitForUpdateCollection());
        }
    }

    //Handle the press on the cloned button (the selected button in a vertical list at the right of the cylinder)
    //It deletes the ontology from the realObject and the vertical list
    public void OnClonedButtonClick(GameObject clonedButton, ButtonInfo buttonInfo)
    {
        // Handle the deselection
        buttonInfo.selected = false;
        MeshRenderer meshRendererButton = buttonInfo.meshButton;
        Material[] mats = meshRendererButton.materials;
        mats[0] = _materialButton;
        meshRendererButton.materials = mats;

        // Remove the cloned button from _gridObjectCollectionSelectedButton
        Destroy(clonedButton);

        // Reflect the changes on the original button as well
        realObject._ontology.RemoveCategory(buttonInfo.keyOntology, buttonInfo.valueOntology);
        StartCoroutine(WaitForUpdateCollection());
        StartCoroutine(WaitForUpdateCollectionBttonSelected());
    }

    private IEnumerator WaitForUpdateCollectionBttonSelected()
    {
        yield return null;
        _gridObjectCollectionSelectedButton.UpdateCollection();
    }

    private IEnumerator WaitForUpdateCollection()
    {
        yield return null;
        gridObjectCollection.GetComponent<GridObjectCollection>().UpdateCollection();
        nbButton = ((int)Math.Floor(accumulatedRotationY / anglePerButton));
       //gameObject.transform.rotation = Quaternion.Euler(0, cylinder.rotation.eulerAngles.y + ((int)Math.Floor(accumulatedRotationY / anglePerButton) * anglePerButton), 0);
    }

    private void UpdateButtonVisibility()
    {
        rightEnd = (maxButtonInRow * anglePerButton) - ((buttonsPerFullRotation + 1) * anglePerButton);
        Debug.Log(rightEnd);
        foreach (ButtonInfo buttonInfo in buttons)
        {
            if ((buttonInfo.startAngle <= accumulatedRotationY + 360 && buttonInfo.endAngle > accumulatedRotationY) ||  (buttonInfo.startAngle >= rightEnd && accumulatedRotationY >= rightEnd))
            {
                buttonInfo.button.SetActive(true);
            }
            else
            {
                buttonInfo.button.SetActive(false);
            }
        }
    }

    //Handle the press on the button (on the cylinder)
    //It deletes or add the ontology depending if it was selected or not
    public void OnButtonClick(GameObject button)
    {
        Debug.Log("click");
        ButtonInfo buttonInfo = buttons.Find(b => b.button == button);
        string category = buttonInfo.keyOntology;
        string ontologyToAdd = buttonInfo.valueOntology;
        buttonInfo.selected = !buttonInfo.selected;
        Debug.Log(buttonInfo.button.name);
        MeshRenderer meshRendererButton = buttonInfo.meshButton;
        Material[] mats = meshRendererButton.materials;
        if (buttonInfo.selected)
        {
            realObject._ontology.AddOntology(category, ontologyToAdd);
            mats[0] = _materialButtonSelected;

            // Create a new button from the prefab and assign relevant data to it
            GameObject newButton = Instantiate(prefabButton, _gridObjectCollectionSelectedButton.transform);
            newButton.name = button.name + "_clone";  // Give it a unique name

            TextMeshPro textmesh = newButton.GetComponentInChildren<TextMeshPro>();
            textmesh.text = buttonInfo.valueOntology;

            MeshRenderer newMesh = newButton.transform.GetChild(4).GetChild(0).GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
            newMesh.materials = mats;

            ButtonConfigHelper newButtonComponent = newButton.GetComponentInChildren<ButtonConfigHelper>();
            newButtonComponent.OnClick.AddListener(() => OnClonedButtonClick(newButton, buttonInfo));
            StartCoroutine(WaitForUpdateCollectionBttonSelected());
        }
        else
        {
            realObject._ontology.RemoveCategory(category, ontologyToAdd);
            mats[0] = _materialButton;

            // Remove the new button from _gridObjectCollectionSelectedButton
            GameObject newButtonToRemove = _gridObjectCollectionSelectedButton.transform.Find(button.name + "_clone").gameObject;
            if (newButtonToRemove)
            {
                Destroy(newButtonToRemove);
            }
        }
        meshRendererButton.materials = mats;
        StartCoroutine(WaitForUpdateCollection());
    }

    //When an ontology is removed elsewhere than from the cylinder (for example in the menu annotation), this function is called
    //Removes the ontology from the vertical list and deselect the button on the cylinder
    private void OnRealObjectOntologyRemoved(object sender, ObjectOntology.OntologyChangedEventArgs e)
    {
        if (ontologies.ContainsKey(e.Key))
        {
            ButtonInfo buttonInfo = buttons.Find(b => b.keyOntology == e.Key && b.valueOntology == e.Value);

            if (buttonInfo != null)
            {
                buttonInfo.selected = false;
                MeshRenderer meshRendererButton = buttonInfo.meshButton;
                Material[] mats = meshRendererButton.materials;
                mats[0] = _materialButton;
                meshRendererButton.materials = mats;
                // Remove the cloned button as well.
                GameObject newButtonToRemove = _gridObjectCollectionSelectedButton.transform.Find(buttonInfo.button.name + "_clone").gameObject;
                if (newButtonToRemove)
                {
                    Destroy(newButtonToRemove);
                }
                StartCoroutine(WaitForUpdateCollection());
                StartCoroutine(WaitForUpdateCollectionBttonSelected());
            }
        }
    }

    private void OnDestroy()
    {
        if (realObject != null && realObject._ontology != null)
        {
            realObject._ontology.RemoveEvent -= OnRealObjectOntologyRemoved;
        }
    }

    private void InitializeOntologie()
    {
        // Couleur
        List<string> couleurs = new List<string>
{
    "couleur: Aqua", "couleur: Argent", "couleur: Beige", "couleur: Blanc",
    "couleur: Bleu", "couleur: Bordeaux", "couleur: Cyan", "couleur: Gris",
    "couleur: Indigo", "couleur: Jaune", "couleur: Marron", "couleur: Noir",
    "couleur: Olive", "couleur: Orange", "couleur: Or", "couleur: Rose",
    "couleur: Rouge", "couleur: Turquoise", "couleur: Vert", "couleur: Violet"
};
        ontologies.Add("couleur", couleurs);

        // Hauteur
        ontologies.Add("hauteur", new List<string>
{
    "hauteur: 0-5cm", "hauteur: 5-6cm", "hauteur: 6-20cm", "hauteur: 20-21cm",
    "hauteur: 21-50cm", "hauteur: 50-51cm", "hauteur: 51-100cm",
    "hauteur: 100-101cm", "hauteur: 101-1000cm", "hauteur: 1000cm-2m",
    "hauteur: 1-2m", "hauteur: 2m", "hauteur: >2m", "hauteur: >3m",
    "hauteur: >4m", "hauteur: >5m", "hauteur: >6m", "hauteur: >7m",
    "hauteur: 8-9m", "hauteur: >10m"
});

        // Largeur
        ontologies.Add("largeur", new List<string>
{
    "largeur: 0-5cm", "largeur: 5-6cm", "largeur: 6-20cm", "largeur: 20-21cm",
    "largeur: 21-50cm", "largeur: 50-51cm", "largeur: 51-100cm",
    "largeur: 100-101cm", "largeur: 101-1000cm", "largeur: 1000cm-2m",
    "largeur: 1-2m", "largeur: 2m", "largeur: >2m", "largeur: >3m",
    "largeur: >4m", "largeur: >5m", "largeur: >6m", "largeur: >7m",
    "largeur: 8-9m", "largeur: >10m"
});

        // Propriété
        List<string> proprietes = new List<string>
{
    "propriété: abordable", "propriété: déplaçable", "propriété: durable",
    "propriété: éco-responsable", "propriété: extensible", "propriété: fragile",
    "propriété: imperméable", "propriété: inflammable", "propriété: jetable",
    "propriété: léger", "propriété: lourd", "propriété: moyennement cher",
    "propriété: moyennement léger", "propriété: moyennement lourd",
    "propriété: opaque", "propriété: périssable", "propriété: recyclable",
    "propriété: rétractable", "propriété: transparent", "propriété: très cher"
};
        ontologies.Add("propriété", proprietes);

        // Meuble
        List<string> meubles = new List<string>
{
    "meuble: armoire", "meuble: bibliothèque", "meuble: bureau",
    "meuble: canapé", "meuble: chaise", "meuble: coiffeuse",
    "meuble: commode", "meuble: console", "meuble: étagère",
    "meuble: fauteuil", "meuble: lit", "meuble: meuble TV",
    "meuble: ottomane", "meuble: porte-manteau", "meuble: pouf",
    "meuble: table à manger", "meuble: table basse", "meuble: table de chevet",
    "meuble: vaisselier", "meuble: buffet"
};

        // Trouver la taille maximale de liste dans le dictionnaire
        int maxSize = ontologies.Values.Max(list => list.Count);

        // Ajouter des chaînes vides aux listes qui ont une taille inférieure à la taille maximale
        foreach (List<string> list in ontologies.Values)
        {
            while (list.Count < maxSize)
            {
                list.Add("");
            }
        }
    }

}
   

