using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static UnityEngine.GraphicsBuffer;

public class StateMachineMenuAnnotation : MonoBehaviour
{
    public StateMenuAnnotation _currentState;
    public GameObject _menu;
    public GameObject _buttonFollowMe;
    public BoxCollider _currentObjectSelectedCollider;
    public RealObject realObject;
    public RealObjectManager _realObjectManager;
    public MenuAnnotationHolder _menuAnnotationHolder;
    public float _distanceAttachToObject = 0.2f;
    public float _distanceFollowUser = 1f;
    public bool _isManipulatorMenuStarted = false;
    public bool followUser = false;
    public ProximityDisplay proximityDisplay;

    //Change the state of the state machine
    public void ChangeState(StateMenuAnnotation newState)
    {
        Debug.Log("CHANGE STATE TO "  + newState._stateMenuType.ToString());
        followUser = newState._stateMenuType == StateMenuType.FollowUser && followUser == true;
        if(followUser || newState._stateMenuType == StateMenuType.FollowUser)
        {
            _buttonFollowMe.GetComponent<ButtonConfigHelper>().SetQuadIconByName("ButtonDontFollowMe");
        } else
        {
            _buttonFollowMe.GetComponent<ButtonConfigHelper>().SetQuadIconByName("ButtonFollowMe");
        }
        _currentState?.Exit();
        _currentState = newState;
        newState.Enter();
    }

    //Handle the click on the button follow me of the Menu annotation (change the state to follow user if it wasn't in this state, otherwise change it to free)
    public void OnClickFollow()
    {
        if(_currentState._stateMenuType == StateMenuType.Free || _currentState._stateMenuType == StateMenuType.FollowObject)
        {
            followUser = true;
            ChangeState(new StateMenuAnnotationFollowUser(this));
        } else
        {
            ChangeState(new StateMenuAnnotationFree(this));
        }
    }

    //Handle the On Palm Up event (change the state to free), this event is triggered when the user put his palm up (the menu annotation go to the user hand)
    public void OnPalmUp()
    {
       ChangeState(new StateMenuAnnotationFree(this));
    }

    public void UpdateCurrentState()
    {
        //Default state if null is follow object
        if (_currentState == null)
        {
            ChangeState(new StateMenuAnnotationFollowObject(this));
        }
        //If the current state is not follow object and the real object of the menu annotation isn't selected, change the state to follow object
        if (_currentState._stateMenuType != StateMenuType.FollowObject && _menuAnnotationHolder._currentObject != realObject)
        {
            ChangeState(new StateMenuAnnotationFollowObject(this));
        }
        _currentState.UpdateMachine();
    }

    //Get the distance of the menu from the cube of the real object
    public float getDistanceMenuFromBox()
    {
        Vector3 boxCenter = _currentObjectSelectedCollider.transform.position;
        Vector3 boxSize = _currentObjectSelectedCollider.size;
        Vector3 boxHalfExtents = boxSize * 0.5f;
        Vector3 closestPoint = ClosestPointOnBox(_menu.transform.position, boxCenter, boxHalfExtents);
        return Vector3.Distance(closestPoint, _menu.transform.position);
    }

    //Get the distance of the camera from the cube of the real object
    public float getDistanceCameraFromBox()
    {
        Vector3 boxCenter = _currentObjectSelectedCollider.transform.position;
        Vector3 boxSize = _currentObjectSelectedCollider.size;
        Vector3 boxHalfExtents = boxSize * 0.5f;
        Vector3 closestPoint = ClosestPointOnBox(Camera.main.transform.position, boxCenter, boxHalfExtents);
        return Vector3.Distance(closestPoint, Camera.main.transform.position);
    }

    //When the menu annotation is stopping being manipulated, this function is called (Gesture pinch on the Title bar)
    public void OnManipulatorMenuEnded()
    {
        _isManipulatorMenuStarted = false;
    }

    //When the menu annotation is being manipulated, this function is called (Gesture pinch on the Title bar)
    public void OnManipulatorMenuStarted()
    {
        _isManipulatorMenuStarted = true;
    }

    //calculate th closest point on the box
    public static Vector3 ClosestPointOnBox(Vector3 point, Vector3 boxCenter, Vector3 boxHalfExtents)
    {
        Vector3 relativePoint = point - boxCenter;
        Vector3 closestPoint = Vector3.zero;

        // For each axis (x, y, z)
        for (int i = 0; i < 3; ++i)
        {
            // Get relative coordinate in this axis
            float dist = relativePoint[i];

            // Clamp to box extents
            if (dist > boxHalfExtents[i]) dist = boxHalfExtents[i];
            if (dist < -boxHalfExtents[i]) dist = -boxHalfExtents[i];

            // Add to closest point
            closestPoint[i] = boxCenter[i] + dist;
        }

        return closestPoint;
    }

}
