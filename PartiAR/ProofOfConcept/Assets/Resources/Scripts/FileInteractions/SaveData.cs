using UnityEngine;
using System.Collections.Generic;

public class SaveData
{
    [System.Serializable]
    public class DataModel
    {
        public List<ObjectData> objectList = new List<ObjectData>();
        public List<ToolTipData> toolTipList = new List<ToolTipData>();
        public List<PillarData> pillarList = new List<PillarData>();
        public List<QRData> qrList = new List<QRData>();
        public List<RealObjectData> realObjectList = new List<RealObjectData>();
        public List<DirectionData> directionObjectList = new List<DirectionData>();
    }

    [System.Serializable]
    public class DirectionData
    {
        public int id;
        public Position objectPosition;
        public List<ArrowData> arrows;
    }

    [System.Serializable]
    public class ArrowData
    {
        public int id;
        public Vector3 localPosition;
        public List<string> directionsSelected;
    }

    [System.Serializable]
    public class PillarData
    {
        public int id;
        public Position pillarPosition;
    }

    [System.Serializable]
    public class ObjectData
    {
        public int parentId;
        public int id;
        public string category;
        public string objectName;
        public Position parentPosition;
        public Position boxPosition;
        public Quaternion parentRotation;
        public Vector3 parentLocalPosition;
        public Vector3 boxLocalScale;
        public List<ToolTipData> toolTipList = new List<ToolTipData>();
    }

    [System.Serializable]
    public class RealObjectData
    {
        public int id;
        public string objectName;
        public string pathImage;
        public Position parentPosition;
        public Vector3 parentLocalPosition;
        public Quaternion parentLocalRotation;
        public Position boxPosition;
        public Vector3 localScale;
        public Vector3 boxLocalScale;
        public List<string> annotations;
        public List<string> ontologiesValue;
        public List<string> ontologiesCategorie;
    }


    [System.Serializable]
    public class ToolTipData
    {
        public int id;
        public string text;
        public Position toolTipPosition;
        public Position pivotPosition;
        public Position spherePosition;
        public Color32 color;
        public List<string> filepathList;
        public int parentObject;
    }


    [System.Serializable]
    public class QRData
    {
        public int id;
        public string guid;
        public string objectName;
        public List<ToolTipData> toolTipList = new List<ToolTipData>();
        public Position qrPosition;
    }

    [System.Serializable]
    public class Position
    {
        public Vector3 world_position;
        public Quaternion world_rotation;
        public Vector3 scale;

        public Position(Transform transform)
        {
            world_position = transform.localPosition;
            world_rotation = transform.localRotation;
            scale = transform.localScale;
        }

        public void setTransform(Transform transform)
        {
            transform.localPosition = world_position;
            transform.localRotation = world_rotation;
            transform.localScale = scale;
        }
    }

    //on doit mettre en attributs les éléments à save
    public DataModel dataModel = new DataModel();
        
    public string ToJson()
    {
        return JsonUtility.ToJson(dataModel);
    }

    public void LoadFromJson(string a_Json)
    {
        JsonUtility.FromJsonOverwrite(a_Json, dataModel);
    }
    
    public void CreateFromSavedData(ObjectCreator creator)
    {
        int maxId = -1;
        foreach (RealObjectData realObjectData in dataModel.realObjectList)
        {
            maxId = realObjectData.id > maxId ? realObjectData.id : maxId;
            creator.CreateRealObject(realObjectData);
        }
        foreach (ObjectData objectData in dataModel.objectList)
        {
            maxId = objectData.id > maxId ? objectData.id : maxId;
            creator.CreateObjectFromType(objectData);
        }
        foreach (ToolTipData toolTipData in dataModel.toolTipList)
        {
            maxId = toolTipData.id > maxId ? toolTipData.id : maxId;
            creator.CreateGeneralToolTip(toolTipData);
        }
        foreach (DirectionData directionData in dataModel.directionObjectList)
        {
            maxId = directionData.id > maxId ? directionData.id : maxId;
            creator.CreateDirectionObject(directionData);
        }
        foreach (QRData qrData in dataModel.qrList)
        {
            maxId = qrData.id > maxId ? qrData.id : maxId;
        }
        SceneObject.global_id = maxId;
    }
}
