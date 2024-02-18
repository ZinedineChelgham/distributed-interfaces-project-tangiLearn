using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Object : MonoBehaviour
{
    public Object parentObject;
    private List<Vector3> positionHistory;
    private GameObject ToolTipPrefab;
    public GameObject tooltips;
    public GameObject virtualObjects;

    //When the user add a virtual object to an real object, this function is called.
    //You can add one by clicking the attach button on a virtual object or if you invoke a virtual object in the cylinder while a real object is selected
    public void AddVirtualObject(GameObject virtualObject)
    {
        if (virtualObjects == null)
        {
            virtualObjects = new GameObject();
            virtualObjects.name = "virtualObjects";
            virtualObjects.transform.parent = transform;
            virtualObjects.transform.localPosition = new Vector3(0, 0, 0);
            virtualObjects.transform.localRotation = Quaternion.identity;
        }
        virtualObject.transform.parent = virtualObjects.transform;
        virtualObject.GetComponent<VirtualObject>().parentObject = this;
    }
}