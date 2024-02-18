using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClipToolTip : MonoBehaviour
{
    public Material materialEnter;
    public Material materialExit;
    SceneViewController controller;

    private bool isAttached = false;
    private Transform att;

    void Start()
    {
        DeactivateBoxCollider();
        controller = GameObject.FindWithTag(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>();
    }

    void OnTriggerEnter(Collider other)
    {
        if(other.transform.name == StringResources.OBJECT_BOX)
        {
            SceneObject sceneObject = transform.parent.gameObject.GetComponent<SceneObject>();
            Debug.Log("OTHER " + other.transform.name);
            Debug.Log("other parent " + other.transform.parent.name);
            sceneObject.parentObject = other.transform.parent.gameObject;
           // controller.toolTips.Remove(sceneObject);
            isAttached = true;
            Debug.Log("onTriggerEnter " + other.transform.name);
            Transform toolTipParent = other.transform.parent.Find("tooltips");
            transform.parent.parent = toolTipParent;
            att = toolTipParent;
            GetComponent<Renderer>().material = materialEnter;
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.transform.name == StringResources.OBJECT_BOX && isAttached && other.transform.parent.Find("tooltips") == att)
        {
            isAttached = false;
            Debug.Log("onTriggerExit " + other.transform.name);
            att = null;
            GetComponent<Renderer>().material = materialExit;
            transform.parent.parent = GameObject.Find("VirtualObjectHolder").transform;
            // SceneObject sceneObject = transform.root.gameObject.GetComponent<SceneObject>();
            // controller.toolTips.Add(sceneObject);
        }
    }

    public void ReactivateBoxCollider()
    {
        foreach(GameObject annotation in GameObject.FindGameObjectsWithTag(StringResources.TAG_OBJECT_ANNOTATION))
        {
            annotation.transform.Find(StringResources.OBJECT_BOX).GetComponent<BoxCollider>().enabled = true;
        }
    }

    public void DeactivateBoxCollider()
    {
        foreach (GameObject annotation in GameObject.FindGameObjectsWithTag(StringResources.TAG_OBJECT_ANNOTATION))
        {
            annotation.transform.Find(StringResources.OBJECT_BOX).GetComponent<BoxCollider>().enabled = false;
        }
    }
}
