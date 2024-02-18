using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LinkObject : MonoBehaviour
{
    [SerializeField] private Material lineMaterial; // matériel pour LineRenderer
    private List<SceneObject> objectsLinkedTo;
    private List<LineRenderer> lineRenderers; // liste des LineRenderers pour chaque lien
    private RealObjectManager _realObjectManager;
    private bool inLinkMode = false;
    private HandButtonHandler HandButtonHandler;

    void Start()
    {
        objectsLinkedTo = new List<SceneObject>();
        lineRenderers = new List<LineRenderer>();
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        HandButtonHandler = GameObject.Find("HandButton").GetComponent<HandButtonHandler>();
    }

    void Update()
    {
        //If not in link mode, we exit the function
        if (!inLinkMode) return;
        // Mettre à jour la position de chaque LineRenderer
        for (int i = 0; i < objectsLinkedTo.Count; i++)
        {
            if (lineRenderers.Count > i)
            {
                lineRenderers[i].SetPosition(0, this.transform.position);
                lineRenderers[i].SetPosition(1, objectsLinkedTo[i].transform.position);
            }
        }
        //If no real object is selected, we exit the link mode
        if (_realObjectManager.selectedRealObject == null)
        {
            inLinkMode = false;
            HideLink();
        }
    }

    //Change the box configuration of all the real object depending on if they are linked or not (except the selected one)
    public void ShowBoxColorLink()
    {
        foreach (RealObject realObject in _realObjectManager._realObjects)
        {
            if (realObject != GetComponent<RealObject>())
            {
                if (objectsLinkedTo.Contains(realObject.GetComponent<SceneObject>()))
                {
                    realObject.BoxConfigLinked();
                }
                else
                {
                    realObject.BoxConfigNotLinked();
                }
            }
        }
    }

    //Change the box configuration of all the real object on deselected (except the selected one)
    public void HideBoxColorLink()
    {
        foreach (RealObject realObject in _realObjectManager._realObjects)
        {
            if (realObject != _realObjectManager.selectedRealObject)
            {
                realObject.BoxConfigDeselected();
            }
        }
    }



    //Handle the touch event on a cube of a real object when in link mode
    public void OnTouch(SceneObject sceneObject)
    {
        if(objectsLinkedTo.Contains(sceneObject))
        {
            RemoveLink(sceneObject);
        } else
        {
            AddLink(sceneObject);
        }
        ShowBoxColorLink();
    }

    //Link the selected real object to the real object
    public void AddLink(SceneObject sceneObject, bool currentlySelected = true)
    {
        if (!objectsLinkedTo.Contains(sceneObject))
        {
            objectsLinkedTo.Add(sceneObject);
            // Créer un nouveau LineRenderer pour le lien
            LineRenderer lr = new GameObject("LineRenderer_" + sceneObject.name).AddComponent<LineRenderer>();
            lr.material = lineMaterial;
            lr.startWidth = 0.01f;
            lr.endWidth = 0.01f;
            lr.positionCount = 2;
            lr.SetPosition(0, this.transform.position);
            lr.SetPosition(1, sceneObject.transform.position);
            lr.transform.SetParent(this.transform); // le rendre enfant de cet objet pour une meilleure organisation
            lineRenderers.Add(lr);
            if (currentlySelected)
            {
                sceneObject.GetComponent<LinkObject>().AddLink(GetComponent<SceneObject>(), false);
            } else
            {
                lr.gameObject.SetActive(false);
            } 
        }
    }

    //Remove the link of the selected real object to the real object
    public void RemoveLink(SceneObject sceneObject, bool currentlySelected = true)
    {
        int index = objectsLinkedTo.IndexOf(sceneObject);
        if (index != -1)
        {
            objectsLinkedTo.RemoveAt(index);

            // Supprimer le LineRenderer associé
            if (lineRenderers.Count > index)
            {
                Destroy(lineRenderers[index].gameObject);
                lineRenderers.RemoveAt(index);
            }
            if(currentlySelected)
            {
                sceneObject.GetComponent<LinkObject>().RemoveLink(GetComponent<SceneObject>(), false);
            }
        }
    }

    // Activate the Link mode
    public void ShowLink()
    {
        inLinkMode = true;
        foreach (LineRenderer lr in lineRenderers)
        {
            lr.gameObject.SetActive(true);
        }
        ShowBoxColorLink();
    }

    // Desactivate the Link mode
    public void HideLink()
    {
        inLinkMode = false;
        foreach (LineRenderer lr in lineRenderers)
        {
            lr.gameObject.SetActive(false);
        }
        HideBoxColorLink();
    }
}