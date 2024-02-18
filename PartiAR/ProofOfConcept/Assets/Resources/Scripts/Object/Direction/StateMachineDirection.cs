using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static UnityEngine.GraphicsBuffer;

public class StateMachineDirection : MonoBehaviour
{
    public StateDirection _currentState;
    public DirectionObject _directionObject;

    public void ChangeState(StateDirection newState)
    {
        _currentState?.Exit();
        _currentState = newState;
        newState.Enter();
    }


    public void UpdateCurrentState()
    {
        {
            _currentState.UpdateMachine();
        }
    }

    public void OnTouchSphere(Vector3 handPosition)
    {
        _currentState.OnTouchSphere(handPosition);
    }

    public void OnManipulationStarted()
    {
        _currentState.OnManipulationStarted();
    }
}
