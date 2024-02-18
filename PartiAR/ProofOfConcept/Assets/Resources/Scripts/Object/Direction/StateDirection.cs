using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateDirection : MonoBehaviour
{
    public StateMachineDirection _stateMachineDirection;

    public StateDirection(StateMachineDirection stateMachine)
    {
        _stateMachineDirection = stateMachine;
    }

    public virtual void Enter()
    {
    }

    public virtual void UpdateMachine()
    {
    }

    public virtual void OnTouchSphere(Vector3 handPosition)
    {
    }

    public virtual void OnManipulationStarted()
    {
    }   

    public virtual void Exit()
    {
    }
}
