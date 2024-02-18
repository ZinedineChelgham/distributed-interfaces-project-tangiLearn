using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PrefabCollection : Collection
{
    public ObjectCreator objectCreator;
    public string modelFile = "Vegetation"; //a set depuis les autres objets
    protected override void AddNewButtons()
    {
        ButtonIconSet iconSet = Resources.Load(StringResources.IMAGE_PATH_FROM_RESOURCES + modelFile + "/" + modelFile + "IconSet") as ButtonIconSet;

        string path = StringResources.MODELS_PATH_FROM_RESOURCES + modelFile;
        var objectsFiles = Resources.LoadAll(path);
        foreach (GameObject obj in objectsFiles)
        {
            string prefabName = obj.name;
            GameObject button = Instantiate(buttonPrefab, transform);
            button.tag = StringResources.TAG_BUTTON_CREATE_OBJECT;
            ButtonConfigHelper component = button.GetComponentInChildren<ButtonConfigHelper>();
            component.MainLabelText = prefabName;
            component.OnClick.AddListener(() =>
            {
                //on cr�e l'objet physiquement
                if(objectCreator == null)
                {
                    objectCreator = GameObject.Find("ObjectCreator").GetComponent<ObjectCreator>();
                }
                objectCreator.AddObject(path, prefabName);
            });
            component.IconSet = iconSet;
            foreach (Texture2D quad in iconSet.QuadIcons)
            {
                if (quad.name == prefabName)
                {
                    component.SetQuadIcon(quad);
                }
            }
        }
        GetComponent<GridObjectCollection>().UpdateCollection();
    }
    private void OnDisable()
    {
        DestroyChildren();
    }
    private void DestroyChildren()
    {
        foreach (Transform child in transform)
        {
            GameObject.Destroy(child.gameObject);
        }
    }
}
