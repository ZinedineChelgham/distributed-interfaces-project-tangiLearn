using UnityEngine;
using TMPro;
using System.Net.Http.Headers;
using UnityEngine.Video;
using Microsoft.MixedReality.Toolkit.UI;
using System.Collections.Generic;

public class Instantiate : MonoBehaviour
{
    public SceneViewController SceneViewController;
    public GameObject ToolTip;
    public GameObject Pillar;

    //Add general tooltip
    public GameObject AddGeneralToolTip() //creation ToolTip dans la scene quand on cree une annotation
    {
        Transform camera = Camera.main.transform;
        GameObject currentToolTip = Instantiate(ToolTip, camera.position + camera.forward * 0.5f, camera.rotation);
        currentToolTip.transform.localPosition = new Vector3(currentToolTip.transform.localPosition.x,camera.position.y - 0.2f , currentToolTip.transform.localPosition.z);
        SceneViewController.toolTips.Add(currentToolTip.gameObject.AddComponent<SceneObject>());
        return currentToolTip;
    }

    //Add tooltip to a virtual object
    public void AddToolTipToObject()
    {
        GameObject toolTip = Instantiate(ToolTip, transform.parent.parent.parent.parent.GetChild(2));
        toolTip.gameObject.AddComponent<SceneObject>();
    }

    public void DestroyToolTip()
    {
        Transform tooltipObject = transform.parent.parent.parent;
        List<string> fileList = tooltipObject.GetComponent<SceneObject>().filepathList;
        List<string> cloneFileList = new List<string>(fileList);
        foreach (string path in cloneFileList)
        {
            tooltipObject.GetComponent<SceneObject>().RemoveToPathList(path);
        }
        GameObject.FindWithTag(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>().toolTips.Remove(transform.gameObject.GetComponent<SceneObject>());
        Destroy(ToolTip);
    }
}