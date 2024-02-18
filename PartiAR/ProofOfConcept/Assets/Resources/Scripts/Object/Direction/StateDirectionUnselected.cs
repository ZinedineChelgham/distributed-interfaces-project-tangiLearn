using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateDirectionUnselected : StateDirection
{
    public StateDirectionUnselected(StateMachineDirection stateMachine) : base(stateMachine)
    {
    }

    public override void Enter()
    {
        Debug.Log("STATE SPHERE UNSELECTED");
        _stateMachineDirection._directionObject.DeselectSphere();
    }

    public override void Exit()
    {
        base.Exit();
    }

    public override void OnManipulationStarted()
    {
        Debug.Log("UNSELECTED MANIPULATION STARTED");
        _stateMachineDirection.ChangeState(new StateDirectionSelected(_stateMachineDirection));
    }

    public override void OnTouchSphere(Vector3 handPosition)
    {
        _stateMachineDirection.ChangeState(new StateDirectionSelected(_stateMachineDirection));
    }

    public override void UpdateMachine()
    {
        base.UpdateMachine();
    }
}
