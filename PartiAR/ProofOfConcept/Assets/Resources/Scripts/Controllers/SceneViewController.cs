using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class SceneViewController : MonoBehaviour
{
    public GameObject QRManager;
    public List<SceneObject> objects = new List<SceneObject>();
    public List<SceneObject> toolTips = new List<SceneObject>();
    public List<SceneObject> realObjects = new List<SceneObject>();
    public List<SceneObject> qrCodes = new List<SceneObject>();
    public List<SceneObject> directionObjects = new List<SceneObject>();
    public ObjectCreator creator;
    public string saveFilePath;

    void Start()
    {
        FileManager.createSaveDirectory();
    }

    //quand on veut enregistrer au format json, on crée une instance de notre json class
    public void SaveJsonData(string filename = StringResources.DEFAULT_SAVE_FILE)
    {
        SaveData data = new SaveData();
        PopulateSaveData(data);
        if (FileManager.WriteToFile(filename, data.ToJson()))
        {
            Debug.Log("Save successful.");
        }
    }

    public void SaveJsonData()
    {
        saveFilePath = (saveFilePath == "" || saveFilePath == ".dat") ? StringResources.DEFAULT_SAVE_FILE : saveFilePath;
        SaveJsonData(saveFilePath);
    }
    public void LoadJsonData()
    {
        saveFilePath = (saveFilePath == "" || saveFilePath == ".dat") ? StringResources.DEFAULT_SAVE_FILE : saveFilePath;
        LoadJsonData(saveFilePath);
    }


    public void LoadJsonData(string Jsonfile)
    {
        try
        { //si un fichier json de data existe déjà, on le charge
            //QRManager.GetComponent<QRInstantiate>().ResetClass();
            if (FileManager.LoadFromFile(Jsonfile, out var json))
            {
                DestroyObjects();
                objects = new List<SceneObject>();
                toolTips = new List<SceneObject>();
                qrCodes = new List<SceneObject>();
                realObjects = new List<SceneObject>();
                directionObjects = new List<SceneObject>();
                Debug.Log(json.ToString());
                SaveData data = new SaveData();
                data.LoadFromJson(json);
                data.CreateFromSavedData(creator);
                Debug.Log("Load complete.");
              //  _modeSelection = GameObject.FindWithTag(StringResources.TAG_MENU_BUTTONS).GetComponent<ModeSelection>();
              //  _modeSelection.SwitchToVisualizationMode();
            }
        }
        catch (FileNotFoundException)
        {
            //sinon on fait rien du tout
        }
    }

    private void DestroyObjects()
    {
        foreach (SceneObject sceneObject in objects)
        {
            Destroy(sceneObject.gameObject);
        }
        foreach (SceneObject sceneObject in toolTips)
        {
            Destroy(sceneObject.gameObject);
        }
        //foreach (SceneObject sceneObject in qrCodes)
        //{
        //    Destroy(sceneObject.gameObject);
        //}
    }
    private void PopulateSaveData(SaveData aSaveData)
    {
       // GameObject[] toolTipObjects = GameObject.FindGameObjectsWithTag("Tooltip");
        GameObject[] realObjectsLocal = GameObject.FindGameObjectsWithTag("RealObject");
        GameObject[] directionObjectsLocal = GameObject.FindGameObjectsWithTag("DirectionObject");
        directionObjects = new List<SceneObject>();
        // Parcourir chaque GameObject
        realObjects = new List<SceneObject>();
        // Parcourir chaque GameObject
        foreach (GameObject obj in realObjectsLocal)
        {
            // Récupérer le composant SceneObject
            realObjects.Add(obj.GetComponent<SceneObject>());
        }
        foreach (GameObject obj in directionObjectsLocal)
        {
            // Récupérer le composant SceneObject
            directionObjects.Add(obj.GetComponent<SceneObject>());
        }



        foreach (SceneObject sceneObject in objects)
        {
            sceneObject.PopulateSaveObjectData(aSaveData);
        }
        foreach (SceneObject toolTip in toolTips)
        {

            toolTip.PopulateSaveToolTipData(aSaveData);
        }
        foreach (SceneObject qrCode in qrCodes)
        {
            qrCode.PopulateSaveQRCode(aSaveData);
        }
        foreach (SceneObject realObject in realObjects)
        {
            realObject.PopulateSaveRealObject(aSaveData);
        }
        foreach (SceneObject directionObject in directionObjects)
        {
            directionObject.PopulateSaveDirectionObject(aSaveData);
        }
    }
}
