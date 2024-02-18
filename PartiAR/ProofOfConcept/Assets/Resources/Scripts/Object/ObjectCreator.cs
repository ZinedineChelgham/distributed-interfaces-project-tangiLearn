using UnityEngine;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using Microsoft.MixedReality.Toolkit.UI.BoundsControlTypes;
using UnityEngine.Animations;
using Microsoft.MixedReality.Toolkit.UI;
using TMPro;
using System;
using System.Collections;
using System.Collections.Generic;

//Legacy script used to instantiate objects in the scene
public class ObjectCreator : MonoBehaviour
{
    public Material newMaterialRef;
    public SceneViewController controller;
    public GameObject annotation;
    public GameObject toolTipPrefab;
    public GameObject pillarPrefab;
    public GameObject QRCodeManager;
    public GameObject directionPrefab;
    public GameObject realObjectPrefab;

    private GameObject GetManipulatorObject()
    {
        GameObject parent = Instantiate(annotation); //le contour manipulable de l'objet
        GameObject box = parent.transform.Find(StringResources.OBJECT_BOX).gameObject;
        box.GetComponent<BoundsControl>().ScaleHandlesConfig.ScaleBehavior = HandleScaleMode.NonUniform; //type de manipulation
        box.GetComponent<BoundsControl>().LinksConfig.ShowWireFrame = false;
        SetCenterRotation(box);
        return parent;
    }

    private void SetName(GameObject instance, GameObject parent, string categoryName, string objectName)
    {
        instance.name = objectName; //on sauvegarde le nom de l'objet choisi
        parent.name = categoryName + "_" + instance.name; //on sauvegarde le nom du parent
    }

    private void SetPositionToParent(GameObject instance, GameObject parent)
    {
        //on positionne correctement l'objet choisi dans le contour manipulable
        float scale = parent.transform.localScale.y;
        float yMesh = scale * instance.GetComponent<MeshFilter>().mesh.bounds.size.y / 2;
        instance.transform.position = new Vector3(0, -yMesh, 0);
        //on update le box collider pour prendre celui de l'enfant
        parent.transform.GetChild(0).GetComponent<BoundsControl>().enabled = false;
        parent.transform.GetChild(0).GetComponent<BoundsControl>().enabled = true;
    }

    private void AddParentToSceneViewController(GameObject parent)
    {
        parent.AddComponent<SceneObject>();
        controller.objects.Add(parent.GetComponent<SceneObject>());
        parent.GetComponent<SceneObject>().nameObject = parent.name;
    }

    private void SetCenterRotation(GameObject parent)
    {
        LookAtConstraint component = parent.transform.Find("center").gameObject.GetComponent<LookAtConstraint>();
        ConstraintSource constraint = new ConstraintSource();
        constraint.sourceTransform = Camera.main.transform;
        constraint.weight = 1;
        component.AddSource(constraint);
    }

    //Instantiate a virtual object (called when the user click on a virtual object in the cylinder)
    public GameObject AddObject(string path, string prefabName)
    {
        Debug.Log(path);
        Debug.Log(prefabName);
        GameObject manipulatorObject = GetManipulatorObject();
        Transform box = manipulatorObject.transform.Find(StringResources.OBJECT_BOX);
        GameObject instance = Instantiate(Resources.Load(path + "/" + prefabName) as GameObject, box); //l'objet à manipuler
        string[] splitPath = path.Split('/');
        SetName(instance, manipulatorObject, splitPath[splitPath.Length-1].Split('\\')[0] , prefabName);
        SetPositionToParent(instance, manipulatorObject);
        AddParentToSceneViewController(manipulatorObject);
        Vector3 boundMesh = instance.GetComponent<MeshFilter>().mesh.bounds.size;
        box.gameObject.GetComponent<BoxCollider>().size = new Vector3(boundMesh.x, boundMesh.y, boundMesh.z);
        StartCoroutine(OnObjectAddedCoroutine(manipulatorObject));
        return manipulatorObject;
    }

    public IEnumerator OnObjectAddedCoroutine(GameObject manipulatorObject)
    {
        yield return new WaitForSeconds(0.5f);
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject?.AddVirtualObject(manipulatorObject);
    }

    //Instantiate a virtual object (used when loading a scene)
    public void CreateObjectFromType(SaveData.ObjectData objectData)
    {
        //avant on doit placer le cube d'annotation autour
        GameObject parent = GetManipulatorObject();
        string objectName = objectData.objectName;
        string objectCategory = objectData.category;
        GameObject instance;
        if (objectName == StringResources.PRIMITIVE_CUBE && objectCategory == StringResources.PRIMITIVE_CATEGORY)
        {
            //on fait un cube
            instance = GameObject.CreatePrimitive(PrimitiveType.Cube); //l'objet à manipuler
            instance.transform.parent = parent.transform;
            instance.transform.localScale = new Vector3(0.7f, 0.7f, 0.7f);
            Renderer rend = instance.GetComponent<Renderer>();
            rend.sharedMaterial = newMaterialRef;
        }
        else
        {
        
            string path = StringResources.MODELS_PATH_FROM_RESOURCES + objectCategory + "/" + objectName;
            instance = Instantiate(Resources.Load(path) as GameObject, parent.transform.Find(StringResources.OBJECT_BOX));
            SetPositionToParent(instance, parent);
        }
        
        foreach(SaveData.ToolTipData toolTip in objectData.toolTipList)
        {
            GameObject toolTipObject = Instantiate(toolTipPrefab, parent.transform.Find("tooltips"));
            SetToolTipParam(toolTip, toolTipObject);
        }

        SetName(instance, parent, objectCategory, objectName);

        //on setup l'objet dans l'espace selon ce qui a été sauvegardé
        objectData.boxPosition.setTransform(parent.transform.Find(StringResources.OBJECT_BOX).transform);
        parent.name = objectCategory + "_" + objectData.objectName;
        instance.name = objectData.objectName;

        AddParentToSceneViewController(parent);
        parent.GetComponent<SceneObject>().my_id = objectData.id;
        if (objectData.parentId != -1)
        {
            foreach (GameObject gameObject in GameObject.FindGameObjectsWithTag("RealObject"))
            {
                if (gameObject.GetComponent<SceneObject>().my_id == objectData.parentId)
                {
                    gameObject.GetComponent<RealObject>().AddVirtualObject(parent);
                    break;
                }
            }
        } else
        {
            parent.transform.parent = GameObject.Find("VirtualObjectHolder").transform;
        }
        parent.transform.localPosition = objectData.parentLocalPosition;
        parent.transform.localRotation = objectData.parentRotation;

    }

    //Instantiate a tooltip (used when loading a scene)
    public void CreateGeneralToolTip(SaveData.ToolTipData toolTip)
    {
        GameObject toolTipObject = Instantiate(toolTipPrefab);
        toolTipObject.transform.parent = GameObject.Find("VirtualObjectHolder").transform;
        SetToolTipParam(toolTip, toolTipObject);
        SceneObject sceneObject = toolTipObject.AddComponent<SceneObject>();
        sceneObject.my_id = toolTip.id;
        controller.toolTips.Add(sceneObject);
        StartCoroutine(coroutineAddFile(toolTip, sceneObject));
    }

    public IEnumerator coroutineAddFile(SaveData.ToolTipData toolTip, SceneObject sceneObject)
    {
        yield return new WaitForSeconds(1);
        foreach (string path in toolTip.filepathList)
        {
            sceneObject.AddToPathList(path);
        }
    }


    public void SetToolTipParam(SaveData.ToolTipData toolTip, GameObject toolTipObject)
    {
        if (toolTip.parentObject != -1)
        {
            foreach (GameObject gameObject in GameObject.FindGameObjectsWithTag("RealObject"))
            {
                if (gameObject.GetComponent<SceneObject>().my_id == toolTip.parentObject)
                {
                    Debug.Log("PARENT FOUND");
                    toolTipObject.transform.parent = gameObject.transform.Find("tooltips");
                    break;
                }
            }
        }
        GameObject pivot = toolTipObject.GetComponent<ToolTip>().Pivot;
        toolTip.toolTipPosition.setTransform(toolTipObject.transform);
        toolTip.pivotPosition.setTransform(pivot.transform);
        toolTip.spherePosition.setTransform(toolTipObject.GetComponent<ToolTipConnector>().Target.transform);
        toolTipObject.GetComponent<ToolTip>().ToolTipText = toolTip.text;
        pivot.GetComponent<ColorEditorText>().ChangeColor(toolTip.color);
    }

    //Instantiate the Real Object (used when loading a scene)
    internal void CreateRealObject(SaveData.RealObjectData realObjectData)
    {
        GameObject realObject = GameObject.Find("ObjectController").GetComponent<RealObjectManager>().InstantiateRealObject();
        realObject.transform.localPosition = realObjectData.parentLocalPosition;
        realObject.transform.localRotation = realObjectData.parentLocalRotation;
        realObject.transform.GetChild(0).localScale = realObjectData.boxLocalScale;
        realObject.transform.GetChild(0).localPosition = realObjectData.boxPosition.world_position;
        RealObject realObjectClass = realObject.GetComponent<RealObject>();
        realObjectClass._currentPhotoPath = realObjectData.pathImage;
        realObjectClass.hasBeenConfirmed = true;
        realObjectClass.transformConfirmed = true;
        realObject.GetComponent<SceneObject>().my_id = realObjectData.id;
        foreach (string path in realObjectData.annotations)
        {
            realObject.GetComponent<SceneObject>().AddToPathList(path);
        }
        for(int i = 0; i < realObjectData.ontologiesValue.Count; i++)
        {
            realObjectClass._ontology.AddOntology(realObjectData.ontologiesCategorie[i], realObjectData.ontologiesValue[i]);
        }
    }

    //Instantiate the Direction Object (used when loading a scene)
    internal void CreateDirectionObject(SaveData.DirectionData directionData)
    {
        GameObject direction = Instantiate(directionPrefab);
        direction.transform.parent = GameObject.Find("DirectionObjectHolder").transform;
        direction.transform.position = directionData.objectPosition.world_position;
        DirectionObject directionObject = direction.GetComponent<DirectionObject>();
        foreach (SaveData.ArrowData arrow in directionData.arrows)
        {
            Vector3 pointOfTouchWorldCoordinate = directionObject._sphereGlobal.transform.TransformPoint(arrow.localPosition);
            direction.GetComponent<DirectionObject>().TouchSphereAddArrow(pointOfTouchWorldCoordinate);
            StartCoroutine(directionObject.arrowList[directionObject.arrowList.Count - 1].GetComponent<Arrow>().menu.GetComponent<MenuDirection>().LoadDirections(arrow.directionsSelected));
        }
    }
}
