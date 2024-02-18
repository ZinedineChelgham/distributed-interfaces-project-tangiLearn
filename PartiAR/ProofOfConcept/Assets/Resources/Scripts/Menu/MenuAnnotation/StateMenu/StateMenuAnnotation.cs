using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateMenuAnnotation
{ 
    public StateMachineMenuAnnotation _stateMachine;
    public StateMenuType _stateMenuType;

    public StateMenuAnnotation(StateMachineMenuAnnotation stateMachine)
    {
        _stateMachine = stateMachine;
    }

    public virtual void Enter()
    {
    }

    public virtual void OnManipulatorMenuStarted()
    {
    }
    public virtual void OnManipulatorMenuEnded()
    {
    }

    public virtual void UpdateMachine()
    {
    }

    public virtual void OnClickFollow()
    {
    }

    public virtual void Exit()
    {
    }
}
