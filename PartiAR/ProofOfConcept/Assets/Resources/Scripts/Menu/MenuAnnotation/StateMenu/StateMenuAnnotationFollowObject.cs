using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateMenuAnnotationFollowObject : StateMenuAnnotation
{
    ObjectTurnAroundCollider objectTurnAroundCollider;
    public StateMenuAnnotationFollowObject(StateMachineMenuAnnotation _stateMachine) : base(_stateMachine)
    {
        _stateMenuType = StateMenuType.FollowObject;
    }

    public override void Enter()
    {
        Debug.Log("State Follow Object");
        _stateMachine._menu.transform.GetChild(0).GetComponent<FollowMeToggle>().AutoFollowAtDistance = false;
        objectTurnAroundCollider = _stateMachine._menu.GetComponent<ObjectTurnAroundCollider>();
        objectTurnAroundCollider.enabled = true;
        _stateMachine._menu.GetComponent<Billboard>().enabled = true;
    }

    public override void Exit()
    {
        _stateMachine._menu.GetComponent<ObjectTurnAroundCollider>().enabled = false;
    }

    public override void UpdateMachine()
    {
        //If it's being manipulated and the user move the menu far enough, we change the state to free
        if (_stateMachine._isManipulatorMenuStarted)
        {
            objectTurnAroundCollider.enabled = false;
            if (_stateMachine.getDistanceMenuFromBox() > _stateMachine._distanceAttachToObject)
            {
                _stateMachine.ChangeState(new StateMenuAnnotationFree(_stateMachine));
            }
        } else
        {
            objectTurnAroundCollider.enabled = true;
        }
    }

}
