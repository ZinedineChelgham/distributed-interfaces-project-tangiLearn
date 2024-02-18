using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using Microsoft.MixedReality.Toolkit.UI;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Collections;

public class VirtualObject : Object
{
    GameObject box;
    LineRenderer lineRenderer;
    [SerializeField]
    GameObject detachButtonText;
    [SerializeField]
    GameObject ButtonAttach;
    bool attach = false;
    private RealObjectManager _realObjectManager;
    ModeController _modeController;
    AnnotationActions annotationActions;

    // Start is called before the first frame update
    void Start()
    {
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectSelected += OnRealObjectSelected;
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectDeselected += OnRealObjectDeselected;
        box = transform.GetChild(0).gameObject;
        annotationActions= transform.GetChild(1).gameObject.GetComponent<AnnotationActions>();
        // Initialize the LineRenderer
        lineRenderer = this.gameObject.AddComponent<LineRenderer>();
        Material lineMaterial = Resources.Load<Material>("Materials/TransparentLinesMaterial");
        lineRenderer.material = lineMaterial;
        lineRenderer.positionCount = 2; // There are two points: parent and this object
        lineRenderer.enabled = false; // Initially disable the LineRenderer

        // Set the width of the line
        lineRenderer.startWidth = 0.007f; // The width at the start of the line
        lineRenderer.endWidth = 0.007f; // The width at the end of the line

        // Set the color of the line
        lineRenderer.startColor = Color.red; // The color at the start of the line
        lineRenderer.endColor = Color.red; // The color at the end of the line
        lineRenderer.enabled = false;
        //disableSelection();
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        StartCoroutine(coroutineInitializeAttachOrDetach());
    }

    //If the object is attached to a real object, and the real object is deselected, we hide this virtual object.
    private void OnRealObjectDeselected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if (e.SelectedRealObject == parentObject)
        {
            gameObject.SetActive(false);
        } 
    }

    //If the object is attached to a real object, and the real object is selected, we show this virtual object.
    private void OnRealObjectSelected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if (e.SelectedRealObject == parentObject)
        {
            gameObject.SetActive(true);
        }
    }

    private void OnDestroy()
    {
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectSelected -= OnRealObjectSelected;
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectDeselected -= OnRealObjectDeselected;
    }

    // Update is called once per frame
    void Update()
    {
        HandleLineRendering();
        HandleSelectionAndControls();
    }

    //Handle the lineRenderer if this virtual object is attached to a real object
    private void HandleLineRendering()
    {
        if (parentObject != null && parentObject == _realObjectManager.selectedRealObject && _realObjectManager.selectedRealObject.transformConfirmed)
        {
            lineRenderer.SetPosition(0, parentObject.transform.GetChild(0).GetChild(0).position);
            lineRenderer.SetPosition(1, box.transform.position);
            lineRenderer.enabled = true; //_modeController.actualMode == Mode.Edition;
        }
        else
        {
            lineRenderer.enabled = false;
        }
    }

    //Handle the selection and the controls of this virtual object (move, scale, etc)
    //For example if we are in edition mode, we enable the controls and the selection, otherwise we disable them.
    private void HandleSelectionAndControls()
    {
        bool shouldEnableControls = _modeController.actualMode == Mode.Edition;

        if (parentObject != null)
        {
            if (parentObject == _realObjectManager.selectedRealObject && _realObjectManager.selectedRealObject.transformConfirmed)
            {
                SetControlsEnabled(shouldEnableControls);
                ButtonAttach.SetActive(shouldEnableControls);
            }
            else
            {
                SetControlsEnabled(false);
            }
        }
        else
        {
            SetControlsEnabled(shouldEnableControls);
            ButtonAttach.SetActive(shouldEnableControls && _realObjectManager.selectedRealObject != null && _realObjectManager.selectedRealObject.transformConfirmed);
        }
    }

    //Enable or disable the controls of this virtual object (move, scale, etc)
    private void SetControlsEnabled(bool enabled)
    {
        box.GetComponent<ObjectManipulator>().enabled = enabled;
        box.GetComponent<BoundsControl>().enabled = enabled;
        if (!enabled)
        {
            annotationActions.ActivateMenu(enabled);
        }
    }

    //Enable the selection of this virtual object
    public void enableSelection()
    {
        box.GetComponent<ObjectManipulator>().enabled = true;
        box.GetComponent<BoundsControl>().enabled = true;
        lineRenderer.enabled = true; // Enable the LineRenderer when the selection is enabled
    }

    //Disable the selection of this virtual object
    public void disableSelection()
    {
        box.GetComponent<ObjectManipulator>().enabled = false;
        box.GetComponent<BoundsControl>().enabled = false;
        lineRenderer.enabled = false; // Disable the LineRenderer when the selection is disabled
    }

    //Detach this virtual object from its parent real object
    public void detachObject()
    {
        if (parentObject != null && attach == false)
        {
            attach = true;
            lineRenderer.enabled = false;
            transform.parent = GameObject.Find("VirtualObjectHolder").transform;
            //   GameObject.Find("ObjectController").GetComponent<RealObjectManager>().SelectRealObject((RealObject) parentObject);
            parentObject = null;
            detachButtonText.GetComponent<TextMeshPro>().text = "Attach";
        } else
        {
            attachObject(GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject);
        }
    }

    //Attach this virtual object to the real object in parameter
    public void attachObject(Object parent)
    {
        attach = false;
        lineRenderer.enabled = true;
        parentObject = parent;
        detachButtonText.GetComponent<TextMeshPro>().text = "Detach";
        parent.AddVirtualObject(gameObject);
    }

    //Initialize the attach/detach button
    public IEnumerator coroutineInitializeAttachOrDetach()
    {
        yield return new WaitForSeconds(0.5f);
        if(parentObject != null)
        {
            detachButtonText.GetComponent<TextMeshPro>().text = "Detach";
        } else
        {
            transform.parent = GameObject.Find("VirtualObjectHolder").transform;
            detachButtonText.GetComponent<TextMeshPro>().text = "Attach";
        }
    }
}