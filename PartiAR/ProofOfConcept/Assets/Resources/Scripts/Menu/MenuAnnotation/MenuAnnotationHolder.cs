using Microsoft.MixedReality.Toolkit.Utilities.Solvers;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MenuAnnotationHolder : MonoBehaviour
{
    public RealObject _currentObject;
    public MenuAnnotation _menuAnnotation;
    [SerializeField]
    private RealObjectManager _realObjectManager;
    public bool isPalmUp;

    void Start()
    {
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        SetHandsPreference();
    }


    void Update()
    {
        _currentObject = _realObjectManager.selectedRealObject;
        _menuAnnotation = _realObjectManager.selectedRealObject?._menuAnnotation;
        //If the palm is up and the menu annotation is not null, the menu annotation is moved to the palm position each frame
        if(isPalmUp && _menuAnnotation != null)
        {
            _menuAnnotation.transform.position = transform.position;
        }
    }

    //Set the hand which will be used to invoke the menu
    public void SetHandsPreference()
    {
        GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuAnnotation;
    }

    //Set the current object and the menu annotation
    public void setCurrentObject(RealObject realObject, MenuAnnotation  menuAnnotation)
    {
        _currentObject = realObject;
        _menuAnnotation = menuAnnotation;
    }

    //When palm up is started, the menu annotation is notified
    public void OnPalmUpStarted()
    {
        isPalmUp = true;
        if (_menuAnnotation != null)
        {
            _menuAnnotation.OnPalmUp();
        }
    }

    public void OnPalmUpEnded()
    {
        isPalmUp = false;
    }
}
