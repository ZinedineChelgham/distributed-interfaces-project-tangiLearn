using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

//Class used in the cylinder of virtual object, it is used to instantiate buttons in the cylinder and handle the events
public class CarrousselCylindre : MonoBehaviour
{
    private string[] categories = { "Chair", "Food", "Table", "Vegetation" };
    public GameObject prefabButton;
    public string pathModel3D = "Catalog/3DModels";
    public string pathIcon = "Catalog/Previews";
    public Transform gridObjectCollection;
    ModeController _modeController;

    private void Start()
    {
        LoadModelsAndIcons();
        gameObject.SetActive(false);
        _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        _modeController.OnModeChanged += _modeController_OnModeChanged;
    }

    private void _modeController_OnModeChanged(Mode mode)
    {
        gameObject.SetActive(false);
    }

    private void OnEnable()
    {
        CoroutineUpdateGridCollection();
    }

    //Instantiate all the buttons it needed
    private void LoadModelsAndIcons()
    {
        // Utiliser les catégories prédéfinies
        foreach (var categoryName in categories)
        {
            string categoryModelPath = $"{pathModel3D}/{categoryName}";
            string categoryIconPath = $"{pathIcon}/{categoryName}";

            GameObject[] models = Resources.LoadAll<GameObject>(categoryModelPath);
            foreach (GameObject model in models)
            {
                string modelName = model.name;
                Texture2D texture = Resources.Load<Texture2D>($"{categoryIconPath}/{modelName}");
                Sprite spriteIcon = null;
                if (texture != null)
                {
                    spriteIcon = Texture2DToSprite(texture);
                }

                GameObject newButton = Instantiate(prefabButton, gridObjectCollection);
                CarrousselButton carrousselButton = newButton.GetComponent<CarrousselButton>();
                carrousselButton.ButtonClicked += OnButtonClicked;
                carrousselButton.Initialize(categoryName, modelName, spriteIcon, model, categoryModelPath);
            }
        }
        CoroutineUpdateGridCollection();
    }

    //Handle click on a button in the cylinder virtual object
    private void OnButtonClicked(object sender, EventArgs e)
    {
        CarrousselButton button =  (CarrousselButton) sender; 
        StartCoroutine(PerformClickButton(button));
    }

    private IEnumerator PerformClickButton(CarrousselButton carrousselButton)
    {
        yield return new WaitForSeconds(0.3f);
        carrousselButton.PerformClickButton();
        carrousselButton.TempModelInstance.transform.position = transform.position;
        this.gameObject.SetActive(false);
    }

    private void CoroutineUpdateGridCollection()
    {
        StartCoroutine(UpdateGridCollection());
    }

    public Sprite Texture2DToSprite(Texture2D texture)
    {
        Rect rect = new Rect(0, 0, texture.width, texture.height);
        Vector2 pivot = new Vector2(0.5f, 0.5f); // Pivot au centre
        return Sprite.Create(texture, rect, pivot);
    }

    private IEnumerator UpdateGridCollection()
    {
        yield return new WaitForSeconds(0.2f);
        gridObjectCollection.GetComponent<GridObjectCollection>().UpdateCollection();
    }
}