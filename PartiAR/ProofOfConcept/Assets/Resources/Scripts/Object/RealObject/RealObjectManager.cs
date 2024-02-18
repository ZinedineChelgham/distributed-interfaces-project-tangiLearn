using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RealObjectManager : MonoBehaviour
{
    public List<RealObject> _realObjects = new List<RealObject>();
    [SerializeField]
    private GameObject _realObjectPrefab;
    private GameObject _currentRealObject;
    public RealObject selectedRealObject;
    private int _currentRealObjectIndex = 0;
    public event EventHandler<RealObjectEventArgs> OnRealObjectSelected;
    public event EventHandler<RealObjectEventArgs> OnRealObjectDeselected;
    public GameObject modeController;
    public GameObject realObjectHolder;
    public HandButtonHandler handButton;

    public class RealObjectEventArgs : EventArgs
    {
        public RealObject SelectedRealObject { get; }

        public RealObjectEventArgs(RealObject selectedRealObject)
        {
            SelectedRealObject = selectedRealObject;
        }
    }

    public class RealObjectDeselectEventArgs : EventArgs
    {
        public RealObject DeselectedRealObject { get; }

        public RealObjectDeselectEventArgs(RealObject deselectedRealObject)
        {
            DeselectedRealObject = deselectedRealObject;
        }
    }

    void Start()
    {
        FileManager.createSaveDirectory();
        FileManager.initFileManager();
    }

    // Update is called once per frame
    void Update()
    {

    }

    //Add a real object to the scene and change the state to StateAddNewObject
    public void AddRealObject()
    {
        Debug.Log("Add real object");
        _currentRealObject = Instantiate(_realObjectPrefab);
        _currentRealObject.name = "RealObject" + _currentRealObjectIndex;
        _currentRealObjectIndex++;
        RealObject realObject = _currentRealObject.GetComponent<RealObject>();
        SelectOrDeselectRealObject(realObject);
        realObject.OnConfirmCreateRealObject += OnRealObjectConfirmed;
        realObject.OnDeleteObject += OnDeleteRealObject;
        realObject.OnTouchBox += OnTouchBox;
        realObject.OnObjectManipulator += OnObjectManipulator;
        StateMachine stateMachine = GameObject.Find("StateController").GetComponent<HandleStateMode>().modeStateMachine;
        stateMachine.ChangeState(new StateAddNewObject(stateMachine, realObject));
        _currentRealObject.transform.parent = realObjectHolder.transform;
    }

    //Add a real object to the scene (used when loading a scene)
    public GameObject InstantiateRealObject()
    {
        GameObject realObject = Instantiate(_realObjectPrefab);
        realObject.name = "RealObject" + _currentRealObjectIndex;
        _currentRealObjectIndex++;
        RealObject realObjectClass = realObject.GetComponent<RealObject>();
        SelectOrDeselectRealObject(realObjectClass);
        realObjectClass.OnConfirmCreateRealObject += OnRealObjectConfirmed;
        realObjectClass.OnDeleteObject += OnDeleteRealObject;
        realObjectClass.OnTouchBox += OnTouchBox;
        realObjectClass.OnObjectManipulator += OnObjectManipulator;
        realObject.transform.parent = realObjectHolder.transform;
        _realObjects.Add(realObjectClass);
        realObjectClass.hasBeenConfirmed = true;
        return realObject;
    }

    //When the real object is confirmed (first touch after the invocation), this function is called.
    private void OnRealObjectConfirmed(object sender, EventArgs e)
    {
        Debug.Log("ON REAL OBJECT CONFIRMED");
        RealObject realObject = (RealObject)sender;
        _currentRealObject = null;
        _realObjects.Add(realObject);
        OnRealObjectSelected?.Invoke(this, new RealObjectEventArgs(realObject));
    }

    //When the user want to delete the real object, this function is called.
    private void OnDeleteRealObject(object sender, EventArgs e)
    {
        Debug.Log("ON DELETE REAL OBJECT");
        RealObject realObject = (RealObject)sender;
        DeleteRealObject(realObject);
    }

    //Delete the real object
    public void DeleteRealObject(RealObject realObject)
    {
        Debug.Log("Delete real object");
        if(selectedRealObject == realObject)
        {
            if(realObject.hasBeenConfirmed)
            {
                SelectOrDeselectRealObject(realObject);
            } else
            {
                OnRealObjectDeselected?.Invoke(this, new RealObjectEventArgs(selectedRealObject));
                selectedRealObject = null;
            }
        }
        _realObjects.Remove(realObject);
        // Destroy(realObject.gameObject);
        realObject.gameObject.SetActive(false);
        realObject.transform.parent = GameObject.Find("DeletedObject").transform;

    }

    //Select or deselect the real object depending of the context
    public void SelectOrDeselectRealObject(RealObject realObject)
    {
        //If in link mode, we link the two objects if the real object select is not the current selected real object
        if (handButton.inLinkMode && selectedRealObject != realObject)
        {
            selectedRealObject.GetComponent<LinkObject>().OnTouch(realObject.GetComponent<SceneObject>());
            return;
        }
        //Else we stop the link mode (because the current selected real object will be deselected)
        else
        {
            handButton.StopLinkMode();
        }

        //If no real object is selected, we select the real object
        if (selectedRealObject == null)
        {
            selectedRealObject = realObject;
            realObject.Select();
            OnRealObjectSelected?.Invoke(this, new RealObjectEventArgs(realObject));
            return;
        }
        //If the real object is already selected, we deselect the real object
        if (selectedRealObject == realObject && realObject.hasBeenConfirmed)
        {
            selectedRealObject.Deselect();
            OnRealObjectDeselected?.Invoke(this, new RealObjectEventArgs(selectedRealObject));
            selectedRealObject = null;
            return;
        }
        //If the real object is not the current selected real object, we deselect the current selected real object and select the new one
        selectedRealObject.Deselect();
        OnRealObjectDeselected?.Invoke(this, new RealObjectEventArgs(selectedRealObject));
        realObject.Select();
        selectedRealObject = realObject;
        OnRealObjectSelected?.Invoke(this, new RealObjectEventArgs(realObject));
    }

    //This function is called when the user touch the cube or press the confirm button on the hand
    private void OnTouchBox(object sender, EventArgs e)
    {
        Debug.Log("TOUCH BOX");
        RealObject realObject = (RealObject)sender;
        if (realObject.hasBeenConfirmed)
        {
            SelectOrDeselectRealObject(realObject);
        }
    }

    //This function is called when the user manipulate the cube (move, rotate, scale)
    private void OnObjectManipulator(object sender, EventArgs e)
    {
        Debug.Log("MANIPULATE OBJECT");
        RealObject realObject = (RealObject)sender;
        Debug.Log("SELECTED REAL OBJECT LE MEME ? " + (selectedRealObject == realObject));
        if (selectedRealObject != realObject)
        {
            SelectOrDeselectRealObject(realObject);
        }
    }

}
