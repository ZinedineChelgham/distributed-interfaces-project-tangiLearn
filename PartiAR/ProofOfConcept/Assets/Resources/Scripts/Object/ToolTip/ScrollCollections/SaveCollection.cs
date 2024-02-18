using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using TMPro;
using UnityEngine;

public class SaveCollection : Collection
{
    public GameObject menu;

    void Start()
    {
        addListenerToSave();
    }

    protected override void AddNewButtons()
    {
        foreach (string file in FileManager.RetrieveSaveFiles())
        {
            GameObject save = Instantiate(buttonPrefab, transform);
            string filename = file.Substring(FileManager.saveDirectory.Length);
            save.GetComponentInChildren<ButtonConfigHelper>().OnClick.AddListener(() =>
            {
                menu.transform.Find("background").Find("filename").GetComponent<TextMeshPro>().text = filename;
                addListenerToSave(filename);
            });
            save.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = filename;
        }
        GetComponent<GridObjectCollection>().UpdateCollection();
    }

    private void addListenerToSave(string filename = null)
    {
        PressableButtonHoloLens2 component = menu.transform.Find("SavingButton").GetComponent<PressableButtonHoloLens2>();
        component.ButtonReleased.RemoveAllListeners();
        component.ButtonReleased.AddListener(() =>
        {
            if(filename == null)
                GameObject.Find(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>().SaveJsonData();
            else
                GameObject.Find(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>().SaveJsonData(filename);
        });
    }
}
