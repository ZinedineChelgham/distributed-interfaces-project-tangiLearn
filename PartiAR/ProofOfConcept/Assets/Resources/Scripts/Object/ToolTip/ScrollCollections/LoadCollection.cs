using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;

public class LoadCollection : Collection
{
    protected override void AddNewButtons()
    {
        foreach (string file in FileManager.RetrieveSaveFiles())
        {
            GameObject save = Instantiate(buttonPrefab, transform);
            string filename = file.Substring(FileManager.saveDirectory.Length);
            save.GetComponentInChildren<ButtonConfigHelper>().OnClick.AddListener(() =>
            {
                GameObject.Find(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>()
                    .LoadJsonData(filename);
            });
            save.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = filename;
        }
        GetComponent<GridObjectCollection>().UpdateCollection();
    }
}
