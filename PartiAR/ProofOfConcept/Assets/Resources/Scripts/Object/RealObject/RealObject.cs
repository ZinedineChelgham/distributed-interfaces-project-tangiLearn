using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Animations;

public class RealObject : Object
{
    public int _id;
    public EventHandler OnConfirmCreateRealObject;
    public EventHandler OnDeleteObject;
    public EventHandler OnTouchBox;
    public EventHandler OnObjectManipulator;
    public bool hasBeenConfirmed = false;
    public bool transformConfirmed = false;
    public ObjectOntology _ontology;
    public GameObject _cylinderObject;
    public event EventHandler OnStateChange;
    private bool _isManipulatorStarted = false;
    private long _manipulatorStartedTime;
    private Vector3 localScale;
    private Vector3 localPosition;
    [SerializeField]
    public MenuAnnotation _menuAnnotation;
    ModeController _modeController;
    public string _currentPhotoPath;


    private void Awake()
    {
        _ontology = gameObject.AddComponent<ObjectOntology>();
    }
    // Start is called before the first frame update
    void Start()
    {
        _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        _modeController.OnModeChanged += _modeController_OnModeChanged;
    }

    private void _modeController_OnModeChanged(Mode mode)
    {
        _cylinderObject.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        //if the object is not in a transform state, we force the local scale and position of the object so it doesn't change.
        if (localScale != Vector3.zero && transformConfirmed)
        {
            transform.GetChild(0).localScale = localScale;
            transform.GetChild(0).localPosition = localPosition;
        }
        //if the object is in a transform state, we save the new local scale and position of the object.
        if (!transformConfirmed)
        {
            localScale = transform.GetChild(0).localScale;
            localPosition = transform.GetChild(0).localPosition;

        }
        //if the cube is being manipulated and the mode is edition, we check if the transform has been started for more than 1 second.
        //If it is the case, we activate the transform.
        if (_isManipulatorStarted && _modeController.actualMode == Mode.Edition)
        {
            DateTime currentTime = DateTime.UtcNow;
            long currentTimeMilli = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
            if(currentTimeMilli - _manipulatorStartedTime > 1000)
            {
                ActivateTransform();
                _isManipulatorStarted = false;
            }
        }
    }

    //Activate the transform mode of the object
    //The cube can be scaled and moved, and it becomes green.
    public void ActivateTransform()
    {
        transformConfirmed = false;
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigTransform");
        transform.GetChild(0).GetComponent<MoveAxisConstraint>().enabled = false;
        GameObject.Destroy(transform.GetChild(0).GetComponent<ScaleConstraint>());
        transform.GetChild(0).gameObject.AddComponent<NearInteractionGrabbable>();
    }

    //End the transform mode of the object
    public void EndTransform()
    {
        transformConfirmed = true;
        transform.GetChild(0).GetComponent<MoveAxisConstraint>().enabled = true;
        ActivateBoxCollider();
    }

    //When the object is confirmed (first touch after the invocation), this function is called.
    public void OnConfirm()
    {
        GameObject.Find("PhotoManager").GetComponent<CameraAccess>().TakePhoto(gameObject.name + ".png");
        hasBeenConfirmed = true;
        OnConfirmCreateRealObject?.Invoke(this, EventArgs.Empty);
        Select();
        StateMachine stateMachine = GameObject.Find("StateController").GetComponent<HandleStateMode>().modeStateMachine;
        stateMachine.ChangeState(new StateFreeEdition(stateMachine));
        StartCoroutine(addToPathList());
    }

    //Add the photo taken to the path list so the menu annotation display it.
    public IEnumerator addToPathList()
    {
        yield return new WaitForSeconds(4f);
        gameObject.GetComponent<SceneObject>().AddToPathList(FileManager.photoDirectory + gameObject.name + ".png");
    }

    //When the object is selected, this function is called.
    public void Select()
    {
        Debug.Log("SELECT OBJECT " + gameObject.name);
        //Set the box display configuration to selected
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigSelected");
        transform.GetChild(0).gameObject.AddComponent<NearInteractionGrabbable>();
        if (hasBeenConfirmed)
        {
            transformConfirmed = true;
            transform.GetChild(0).GetComponent<MoveAxisConstraint>().enabled = true;
            transform.GetChild(0).GetComponent<BoxCollider>().enabled = true;
        }
    }

    //Set the box display configuration when in link mode
    //This function is called if this real object is the current selected object.
    public void BoxConfigLinked()
    {
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigLinked");
    }

    //Set the box display configuration when in link mode
    //This function is called if this real object is NOT the current selected object.
    public void BoxConfigNotLinked()
    {
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigDesactivateVirtualObject");
    }

    //Set the box display configuration to deselected
    public void BoxConfigDeselected()
    {
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigNotSelected");
    }

    //When the object is deselected, this function is called.
    public void Deselect()
    {
        if(!hasBeenConfirmed)
        {
            OnDeleteObject?.Invoke(this, EventArgs.Empty);
            return;
        }
        Debug.Log("DESELECT OBJECT" + gameObject.name);
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigNotSelected");
        transform.GetChild(0).gameObject.AddComponent<NearInteractionGrabbable>();
        _cylinderObject.SetActive(false);
        transform.GetChild(0).GetComponent<BoxCollider>().enabled = true;
        DeselectAllTooltips();
        DeselectAllVirtualObjects();
    }

    //Deselect all the tooltips of the object
    public void DeselectAllTooltips()
    {
        Selection[] childSelections = GetComponentsInChildren<Selection>();
        foreach (Selection childSelection in childSelections)
        {
            childSelection.DeselectToolTip();
        }
    }

    //When the cube is being manipulated, this function is called.
    //Object using this : box of the real object
    public void OnManipulationBox()
    {
        Debug.Log("MANIPULATION STARTED");
        DateTime currentTime = DateTime.UtcNow;
        long currentTimeMilli = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
        _manipulatorStartedTime = currentTimeMilli;
        _isManipulatorStarted = true;
        OnObjectManipulator?.Invoke(this, EventArgs.Empty);
        localScale = transform.GetChild(0).localScale;
        if (GameObject.Find("HandButton").GetComponent<HandButtonHandler>().inLinkMode)
        {
            OnManipulationEnded();
        }
    }

    //Deselect all the virtual objects of the real object
    public void DeselectAllVirtualObjects()
    {
        VirtualObject[] virtualObjects = GetComponentsInChildren<VirtualObject>();
        foreach (VirtualObject virtualObject in virtualObjects)
        {
            virtualObject.transform.GetChild(1).GetComponent<AnnotationActions>().ActivateMenu(false);
            virtualObject.disableSelection();
        }
    }

    //When the cube stop being manipulated, this function is called.
    //Object using this : box of the real object
    public void OnManipulationEnded()
    {
        Debug.Log("MANIPULATION ENDED");
        _isManipulatorStarted = false;
        if (transformConfirmed)
        {
            transform.GetChild(0).GetComponent<MoveAxisConstraint>().enabled = true;
            if (transform.GetChild(0).GetComponent<ScaleConstraint>() != null)
            {
                transform.GetChild(0).GetComponent<ScaleConstraint>().constraintActive = true;
            }
        }
    }

    //When the user use the "touch" to the cube of the real object, this function is called.
    public void TouchBox()
    {
        OnTouchBox?.Invoke(this, EventArgs.Empty);
    }


    //When the hand of the user is inside the cube, this function is called.
    //It desactivate the box collider and change the box display configuration.
    //It enables the user to manipulate all the object inside the cube.
    public void DesactivateBoxCollider()
    {
        transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigDesactivate");
        transform.GetChild(0).GetComponent<BoxCollider>().enabled = false;
    }


    //Activate the box collider and change the box display configuration.
    public void ActivateBoxCollider()
    {
        if (GameObject.Find("ObjectController").GetComponent<RealObjectManager>().selectedRealObject == this)
        {
            transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigSelected");
        } else
        {
            transform.GetChild(0).GetComponent<BoundsControl>().BoxDisplayConfig = Resources.Load<BoxDisplayConfiguration>("Prefabs/BoxConfigNotSelected");
        }
        transform.GetChild(0).GetComponent<BoxCollider>().enabled = true;
    }

    //Handle the "remove ontology" called from the menu annotation.
    public void RemoveOntologyButtonClicked(string key, string value)
    {
        _ontology.RemoveCategory(key, value);
        ObjectStateChanged();
    }

   
    public void ObjectStateChanged()
    {
        OnStateChange?.Invoke(this, EventArgs.Empty);
    }

    //Send an event to notify the real object manager to delete this real object.
    public void DeleteMe()
    {
        OnDeleteObject?.Invoke(this, EventArgs.Empty);
    }
}
