using UnityEngine;
using UnityEngine.InputSystem;

public class State
{
    public StateMachine stateMachine;
    public StateName stateName;

    public State(StateMachine _stateMachine)
    {
        stateMachine = _stateMachine;
    }

    public virtual void Enter()
    {
        Debug.Log("enter state: " + this.ToString());
    }

    public virtual void HandleInput()
    {
    }

    public virtual void HandleGesture(GestureCombination gesture)
    {
    }

    public virtual void LogicUpdate()
    {
    }

    public virtual void PhysicsUpdate()
    {
    }

    public virtual void Exit()
    {
    }
}