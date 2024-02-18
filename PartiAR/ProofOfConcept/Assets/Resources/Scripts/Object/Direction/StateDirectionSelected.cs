using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateDirectionSelected : StateDirection
{
    public StateDirectionSelected(StateMachineDirection stateMachine) : base(stateMachine)
    {
    }

    public override void Enter()
    {
        Debug.Log("STATE SPHERE SELECTED");
        _stateMachineDirection._directionObject.SelectSphere();   
    }

    public override void Exit()
    {
        base.Exit();
    }

    public override void OnTouchSphere(Vector3 handPosition)
    {
        _stateMachineDirection.ChangeState(new StateDirectionUnselected(_stateMachineDirection));
    }

    public override void OnManipulationStarted()
    {
        base.OnManipulationStarted();
    }

    public override void UpdateMachine()
    {
        base.UpdateMachine();
    }
}
