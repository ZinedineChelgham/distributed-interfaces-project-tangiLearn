using Microsoft.MixedReality.QR;
using Microsoft.MixedReality.Toolkit.UI;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using TMPro;
using UnityEditor;
using UnityEngine;
using QRCode = Microsoft.MixedReality.SampleQRCodes.QRCode;

//Class attached to each object in the scene (tooltip, real object, virtual object, direction object)
public class SceneObject : MonoBehaviour
{
    public static int global_id = 0;
    public string nameObject;
    [SerializeField] public int my_id;
    public GameObject parentObject;
    [SerializeField] public List<string> filepathList = new List<string>();

    public void Start()
    {
        my_id = global_id;
        global_id++;
    }

    //Add the file/annotation to the real object
    public void AddToPathList(string filePath)
    {
        //If this script is attached to the HandButton, we add the file to the selected real object (when we make an annotation with the hand)
        if (gameObject.name == "HandButton")
        {
            GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject.GetComponent<SceneObject>().AddToPathList(filePath);
            return;
        }
        filepathList.Add(filePath);
        RealObject selectedRealObject = GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject;
        selectedRealObject.transform.Find("tooltips").GetComponent<TooltipsFollower>().AddToPathList(filePath);
        
    }

    //Remove the file/annotation to the real object
    public void RemoveToPathList(string filePath)
    {
        if (gameObject.name == "HandButton")
        {
            GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject.GetComponent<SceneObject>().RemoveToPathList(filePath);
            return;
        }
        if (transform.parent.name == "tooltips")
        {
            transform.parent.GetComponent<TooltipsFollower>().RemoveToPathList(filePath);
        }

        filepathList.Remove(filePath);
    }

    //Called when we save the scene and this script is attached to a tooltip
    public void PopulateSaveToolTipData(SaveData a_SaveData)
    {
        SaveData.ToolTipData toolTipObject = SaveToolTipData(gameObject);
        SaveOrReplaceToolTipData(a_SaveData, toolTipObject);
    }

    //Called when we save the scene and this script is attached to a tooltip, save the data of the tooltip
    public SaveData.ToolTipData SaveToolTipData(GameObject gameObject)
    {
        SaveData.ToolTipData toolTipObject = new SaveData.ToolTipData();
        toolTipObject.id = my_id;
        Debug.Log("Pivot : " + gameObject.GetComponent<ToolTip>());
        GameObject pivot = gameObject.GetComponent<ToolTip>().Pivot;
        toolTipObject.text = pivot.GetComponent<ColorEditorText>().GetText();
        toolTipObject.toolTipPosition = new SaveData.Position(gameObject.GetComponent<ToolTip>().transform);
        toolTipObject.pivotPosition = new SaveData.Position(pivot.transform);
        toolTipObject.spherePosition = new SaveData.Position(gameObject.GetComponent<ToolTipConnector>().Target.transform);
        toolTipObject.color = pivot.GetComponent<ColorEditorText>().GetColor();
        toolTipObject.parentObject = parentObject == null ? -1 : parentObject.GetComponent<SceneObject>().my_id;
        if (filepathList.Count !=0)
        {
            toolTipObject.filepathList = filepathList;
        } else
        {
            toolTipObject.filepathList = null;
        }
        Debug.Log("Filepathlist : " + toolTipObject.filepathList);
        return toolTipObject;
    }

    //Called when we save the scene and this script is attached to a real object, save the data of the real object
    internal void PopulateSaveRealObject(SaveData aSaveData)
    {
        SaveData.RealObjectData realObjectData = new SaveData.RealObjectData();
        realObjectData.parentPosition = new SaveData.Position(transform);
        realObjectData.parentLocalPosition = transform.localPosition;
        realObjectData.parentLocalRotation = transform.localRotation;
        realObjectData.boxPosition = new SaveData.Position(transform.GetChild(0).transform);
        realObjectData.id = my_id;
        realObjectData.objectName = gameObject.name;
        realObjectData.annotations = filepathList;
        List<string> ontologieValue = new List<string>();
        List<string> ontologieCategorie = new List<string>();
        foreach (var entry in transform.GetComponent<RealObject>()._ontology.ontologiesCategories) { 
            foreach(string value in entry.Value)
            {
                ontologieValue.Add(value);
                ontologieCategorie.Add(entry.Key);
            }
        }
        realObjectData.ontologiesCategorie = ontologieCategorie;
        realObjectData.ontologiesValue = ontologieValue;
        realObjectData.pathImage = transform.GetComponent<RealObject>()._currentPhotoPath;
        realObjectData.localScale = transform.localScale;
        realObjectData.boxLocalScale= transform.GetChild(0).localScale;
        SaveOrReplaceRealObjectData(aSaveData, realObjectData);
    }

    //Called when we save the scene and this script is attached to a virtual object, save the data of the virtual object
    public void PopulateSaveObjectData(SaveData a_SaveData)
    {
        SaveData.ObjectData objectData = new SaveData.ObjectData();
        objectData.parentPosition = new SaveData.Position(transform);
        objectData.boxPosition = new SaveData.Position(transform.Find(StringResources.OBJECT_BOX).transform);
        objectData.parentLocalPosition = transform.localPosition;
        objectData.parentRotation = transform.localRotation;
        objectData.id = my_id;
        objectData.parentId = gameObject.GetComponent<VirtualObject>().parentObject == null ? -1 : gameObject.GetComponent<VirtualObject>().parentObject.GetComponent<SceneObject>().my_id;
        string[] names = transform.name.Split('_');
        objectData.objectName = transform.Find(StringResources.OBJECT_BOX).GetChild(1).gameObject.name;
        objectData.category = names[0];
        Transform toolsTips = transform.Find("tooltips");
        for (int i = 0; i < toolsTips.childCount; i++)
        {
            GameObject gameObject = toolsTips.GetChild(i).gameObject;
            if (gameObject.tag == StringResources.TAG_TOOLTIP)
            {
                objectData.toolTipList.Add(SaveToolTipData(gameObject));
            }
        }
        SaveOrReplaceObjectData(a_SaveData, objectData);
    }

    //Called when we save the scene and this script is attached to a direction object, save the data of the direction object
    internal void PopulateSaveDirectionObject(SaveData aSaveData)
    {
        SaveData.DirectionData directionData = new SaveData.DirectionData();
        directionData.id = my_id;
        directionData.objectPosition = new SaveData.Position(transform);
        List<SaveData.ArrowData> arrowDataList = new List<SaveData.ArrowData>();
        foreach (Arrow arrow in gameObject.GetComponent<DirectionObject>().arrowList)
        {
            SaveData.ArrowData arrowData = new SaveData.ArrowData();
            // This gives you the position in world coordinates
            Vector3 pointOfTouchWorldCoordinate = arrow.rotationSphere.transform.position;

            // Now transform this position to local coordinates of the bigSphere
            GameObject bigSphere = arrow.bigSphere;
            Vector3 pointOfTouchLocalCoordinate = bigSphere.transform.InverseTransformPoint(pointOfTouchWorldCoordinate);
            arrowData.localPosition = pointOfTouchLocalCoordinate;
            arrowDataList.Add(arrowData);
            arrowData.directionsSelected = arrow.menu.GetComponent<MenuDirection>().selectedDirections;
        }
        directionData.arrows = arrowDataList;
        SaveOrReplaceDirectionData(aSaveData, directionData);
    }

    //Called when we save the QRCode
    public void PopulateSaveQRCode(SaveData a_SaveData)
    {
        SaveData.QRData qrData = new SaveData.QRData();
        qrData.id = my_id;
        qrData.objectName = nameObject;
        qrData.guid = gameObject.GetComponent<QRCode>().qrCode.Id.ToString();
        qrData.qrPosition = new SaveData.Position(transform);
        SaveOrReplaceQRData(a_SaveData, qrData);
    }

    private void SaveOrReplaceQRData(SaveData aSaveData, SaveData.QRData dataToAdd)
    {
        SaveData.QRData objectToReplace = new SaveData.QRData();
        objectToReplace.id = -1; //id impossible pour voir si l'élément a été remplacé
        foreach (SaveData.QRData objectData in aSaveData.dataModel.qrList)
        {
            if (objectData.id == dataToAdd.id)
            {
                objectToReplace = objectData;
                break;
            }
        }
        if (objectToReplace.id != -1) //si l'élément est déjà dans la liste
        {
            aSaveData.dataModel.qrList.Remove(objectToReplace); //on l'enlève de la liste
        }
        aSaveData.dataModel.qrList.Add(dataToAdd); //on ajoute
    }

    private void SaveOrReplaceRealObjectData(SaveData aSaveData, SaveData.RealObjectData realObjectData)
    {
        SaveData.RealObjectData objectToReplace = new SaveData.RealObjectData();
        objectToReplace.id = -1; //id impossible pour voir si l'élément a été remplacé
        foreach (SaveData.RealObjectData realObjectDataLocal in aSaveData.dataModel.realObjectList)
        {
            if (realObjectDataLocal.id == realObjectData.id)
            {
                objectToReplace = realObjectDataLocal;
                break;
            }
        }
        if (objectToReplace.id != -1) //si l'élément est déjà dans la liste
        {
            aSaveData.dataModel.realObjectList.Remove(objectToReplace); //on l'enlève de la liste
        }
        aSaveData.dataModel.realObjectList.Add(realObjectData); //on ajoute
    }

    private void SaveOrReplaceObjectData(SaveData aSaveData, SaveData.ObjectData dataToAdd)
    {
        SaveData.ObjectData objectToReplace = new SaveData.ObjectData();
        objectToReplace.id = -1; //id impossible pour voir si l'élément a été remplacé
        foreach (SaveData.ObjectData objectData in aSaveData.dataModel.objectList)
        {
            if (objectData.id == dataToAdd.id)
            {
                objectToReplace = objectData;
                break;
            }
        }
        if (objectToReplace.id != -1) //si l'élément est déjà dans la liste
        {
            aSaveData.dataModel.objectList.Remove(objectToReplace); //on l'enlève de la liste
        }
        aSaveData.dataModel.objectList.Add(dataToAdd); //on ajoute
    }

    private void SaveOrReplaceToolTipData(SaveData aSaveData,SaveData.ToolTipData dataToAdd)
    {
        SaveData.ToolTipData objectToReplace = new SaveData.ToolTipData();
        objectToReplace.id = -1; //id impossible pour voir si l'élément a été remplacé
        foreach (SaveData.ToolTipData toolTipData in aSaveData.dataModel.toolTipList)
        {
            if (toolTipData.id == dataToAdd.id)
            {
                objectToReplace = toolTipData;
                break;
            }
        }
        if (objectToReplace.id != -1) //si l'élément est déjà dans la liste
        {
            aSaveData.dataModel.toolTipList.Remove(objectToReplace); //on l'enlève de la liste
        }
        aSaveData.dataModel.toolTipList.Add(dataToAdd); //on ajoute
    }

    private void SaveOrReplaceDirectionData(SaveData aSaveData, SaveData.DirectionData dataToAdd)
    {
        SaveData.DirectionData objectToReplace = new SaveData.DirectionData();
        objectToReplace.id = -1; //id impossible pour voir si l'élément a été remplacé
        foreach (SaveData.DirectionData directionObject in aSaveData.dataModel.directionObjectList)
        {
            if (directionObject.id == dataToAdd.id)
            {
                objectToReplace = directionObject;
                break;
            }
        }
        if (objectToReplace.id != -1) //si l'élément est déjà dans la liste
        {
            aSaveData.dataModel.directionObjectList.Remove(objectToReplace); //on l'enlève de la liste
        }
        aSaveData.dataModel.directionObjectList.Add(dataToAdd); //on ajoute
    }
}