using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateAddNewObject : State
{
    private RealObject _realObject;
    private long lastTimeAddGesture;

    public StateAddNewObject(StateMachine _stateMachine, RealObject realObject) : base(_stateMachine)
    {
        _realObject = realObject;
        stateName = StateName.StateAddNewObject;
    }

    //On enter we activate the transform of the real object (move, scale, etc)
    public override void Enter()
    {
        DateTime currentTime = DateTime.UtcNow;
        lastTimeAddGesture = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
        _realObject.ActivateTransform();
    }

    //On exit, if the real object has not been confirmed, we delete it
    public override void Exit()
    {
        if (_realObject.gameObject.activeSelf && !_realObject.hasBeenConfirmed)
        {
            GameObject.Find("ObjectController").GetComponent<RealObjectManager>().DeleteRealObject(_realObject);
        }
    }

    public override void HandleGesture(GestureCombination gesture)
    {
        if (_realObject != null)
        {
            //If the real object is deleted/desactivate, we change the state
            if (!_realObject.gameObject.activeSelf)
            {
                stateMachine.ChangeState(new StateFreeEdition(stateMachine));
            }
            DateTime currentTime = DateTime.UtcNow;
            //When the real object is confirmed, we change the state
            if (_realObject.transformConfirmed) //toucher le cube pour confirmer (voir cube tap handler)
            {
                _realObject.OnConfirm();
            }
            bool isFirstGesture = gesture.FirstGesture.Type == GestureType.PalmUp && gesture.FirstGesture.Hand == HandsPreference.handInvokeObject;
            bool isSecondGesture = gesture.SecondGesture.Type == GestureType.PalmUp && gesture.SecondGesture.Hand == HandsPreference.handInvokeObject;
            //If palm up gesture with the appropriate hand, we move the object to the hand
            if (isFirstGesture || isSecondGesture)
            {
                Vector3 newPosition = isFirstGesture ? gesture.FirstGesture.Position : gesture.SecondGesture.Position;
                _realObject.transform.position = newPosition;
                lastTimeAddGesture = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
            }
        }
    }

    public override void HandleInput()
    {
        base.HandleInput();
    }

    public override void LogicUpdate()
    {
        base.LogicUpdate();
    }

    public override void PhysicsUpdate()
    {
        base.PhysicsUpdate();
    }
}
