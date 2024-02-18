using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

public class StateMenuAnnotationFree : StateMenuAnnotation
{
    public StateMenuAnnotationFree(StateMachineMenuAnnotation _stateMachine) : base(_stateMachine)
    {
        _stateMenuType = StateMenuType.Free;
    }

    public override void Enter()
    {
        Debug.Log("State Free");
        _stateMachine._menu.transform.GetChild(0).GetComponent<FollowMeToggle>().AutoFollowAtDistance = false;
    }

    public override void Exit()
    {

    }

    public override void UpdateMachine()
    {
        //If it's being manipulated and the user move the menu close enough to the cube, we change the state to Follow Object (attach the menu to the cube)
        if (_stateMachine._isManipulatorMenuStarted)
        {
            if (_stateMachine.getDistanceMenuFromBox() < _stateMachine._distanceAttachToObject)
            {
                _stateMachine.ChangeState(new StateMenuAnnotationFollowObject(_stateMachine));
            }
        }
    }
}
