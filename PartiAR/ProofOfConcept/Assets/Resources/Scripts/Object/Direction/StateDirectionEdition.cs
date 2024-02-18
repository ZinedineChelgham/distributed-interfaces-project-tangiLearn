using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateDirectionEdition : StateDirection
{
    public StateDirectionEdition(StateMachineDirection stateMachine) : base(stateMachine)
    {
    }

    public override void Enter()
    {
        Debug.Log("STATE SPHERE EDITION");
        _stateMachineDirection._directionObject.disableManipulator();
    }

    public override void Exit()
    {
        _stateMachineDirection._directionObject.enableManipulator();
    }

    public override void OnManipulationStarted()
    {
        base.OnManipulationStarted();
    }

    public override void OnTouchSphere(Vector3 handPosition)
    {
        _stateMachineDirection._directionObject.TouchSphereAddArrow(handPosition);
    }

    public override void UpdateMachine()
    {
        base.UpdateMachine();
    }
}
