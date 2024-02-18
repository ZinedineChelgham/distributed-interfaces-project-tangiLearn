using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CarrousselButton : MonoBehaviour
{
    public string Category { get; private set; }
    public string ModelName { get; private set; }

    public string Path { get; private set; }

    [SerializeField]
    private GameObject button;
    [SerializeField]
    private SpriteRenderer icon;
    [SerializeField]
    private TextMeshPro textMesh;

    private GameObject associated3DModel;
    public GameObject TempModelInstance;

    // D�clarez un �v�nement
    public event EventHandler ButtonClicked;

    public void Initialize(string category, string modelName, Sprite spriteIcon, GameObject model, string path)
    {
        this.Category = category;
        this.ModelName = modelName;
        this.icon.sprite = spriteIcon;
        this.associated3DModel = model;
        this.textMesh.text = modelName;
        this.Path = path;

        button.GetComponent<PressableButton>().ButtonPressed.AddListener(OnButtonClicked);
    }

    void OnButtonClicked()
    {
        // Soulevez l'�v�nement
        ButtonClicked.Invoke(this, EventArgs.Empty);
        // Si vous voulez cacher les autres mod�les 3D, assurez-vous de le g�rer ici
    }

    // Instancie le mod�le 3D associ� lorsque le bouton est cliqu����
    public void PerformClickButton()
    {
        TempModelInstance = GameObject.Find("ObjectCreator").GetComponent<ObjectCreator>().AddObject(Path, ModelName);
    }
}