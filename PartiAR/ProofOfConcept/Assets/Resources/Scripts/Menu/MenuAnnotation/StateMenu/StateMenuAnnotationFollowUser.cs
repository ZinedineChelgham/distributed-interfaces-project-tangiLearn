using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities.Solvers;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateMenuAnnotationFollowUser : StateMenuAnnotation
{

    public StateMenuAnnotationFollowUser(StateMachineMenuAnnotation _stateMachine) : base(_stateMachine)
    {
        _stateMenuType = StateMenuType.FollowUser;
    }

    public override void Enter()
    {
        Debug.Log("State Follow");
        _stateMachine._menu.GetComponent<ObjectTurnAroundCollider>().enabled = false;
        _stateMachine._menu.transform.GetChild(0).GetComponent<FollowMeToggle>().AutoFollowAtDistance = true;
        _stateMachine._menu.transform.GetChild(0).GetComponent<RadialView>().enabled = true;
    }

    public override void Exit()
    {
        _stateMachine._menu.GetComponent<ObjectTurnAroundCollider>().enabled = false;
        _stateMachine._menu.transform.GetChild(0).GetComponent<FollowMeToggle>().AutoFollowAtDistance = false;
        _stateMachine._menu.transform.GetChild(0).GetComponent<RadialView>().enabled = false;
    }

    public override void UpdateMachine()
    {
        //If it's being manipulated, we change the state to Free
        if (_stateMachine._isManipulatorMenuStarted)
        {
            _stateMachine.ChangeState(new StateMenuAnnotationFree(_stateMachine));
        }
    }

}
