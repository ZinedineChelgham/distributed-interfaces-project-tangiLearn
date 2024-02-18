using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateFreeEdition : State
{
    private long lastTimeAddGesture;
    GameObject objectInvoked;
    RealObjectManager _realObjectManager;
    HandButtonHandler handButtonHandler;
    GameObject cylindre;
    ModeController modeController;

    public StateFreeEdition(StateMachine _stateMachine) : base(_stateMachine)
    {
        stateName = StateName.StateFreeEdition;
    }

    public override void Enter()
    {
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        handButtonHandler = GameObject.Find("HandButton").GetComponent<HandButtonHandler>();
        cylindre = handButtonHandler.cylindreVirtualObject;
        modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        //TODO activer le déplacement des objets et autres
    }

    public override void Exit()
    {
        base.Exit();
    }

    public override void HandleInput()
    {
        base.HandleInput();
    }

    public override void HandleGesture(GestureCombination gesture)
    {
        if(modeController.actualMode == Mode.Visualization)
        {
            return;
        }
        bool isFirstGesture = gesture.FirstGesture.Type == GestureType.PalmUp && gesture.FirstGesture.Hand == HandsPreference.handInvokeObject;
        bool isSecondGesture = gesture.SecondGesture.Type == GestureType.PalmUp && gesture.SecondGesture.Hand == HandsPreference.handInvokeObject;

        //If the gesture is a palm up gesture and the object to invoke is a cube, we invoke a cube
        if ((isFirstGesture || isSecondGesture) && stateMachine.objectToInvoke == "cube")
        {
            handButtonHandler.OnObjectInvoked();
            GameObject.Find("ObjectController").GetComponent<RealObjectManager>().AddRealObject();
        }

        //If the gesture is a palm up gesture and the object to invoke is a direction object, we invoke a direction object
        if (stateMachine.objectToInvoke == "direction")
        {
            DateTime currentTime = DateTime.UtcNow;
            if ((isFirstGesture || isSecondGesture))
            {
                if (objectInvoked == null)
                {
                    objectInvoked = GameObject.Find("DirectionController").GetComponent<DirectionObjectManager>().AddDirectionObject();
                }
                lastTimeAddGesture = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
                Vector3 newPosition = isFirstGesture ? gesture.FirstGesture.Position : gesture.SecondGesture.Position;
                objectInvoked.transform.position = newPosition;
            }
            if (((DateTimeOffset)currentTime).ToUnixTimeMilliseconds() - lastTimeAddGesture > 1000)
            {
                objectInvoked = null;
            }
        }

        //If the gesture is a palm up gesture and the object to invoke is a tooltip, we invoke a tooltip
        if (stateMachine.objectToInvoke == "tooltip")
        {
            DateTime currentTime = DateTime.UtcNow;
            if ((isFirstGesture || isSecondGesture))
            {
                if (objectInvoked == null)
                {
                    objectInvoked = GameObject.Find("ObjectCreator").GetComponent<Instantiate>().AddGeneralToolTip();
                    objectInvoked.transform.parent = GameObject.Find("VirtualObjectHolder").transform;
                }
                lastTimeAddGesture = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
                Vector3 newPosition = isFirstGesture ? gesture.FirstGesture.Position : gesture.SecondGesture.Position;
                objectInvoked.transform.position = newPosition;
            }
            if (((DateTimeOffset)currentTime).ToUnixTimeMilliseconds() - lastTimeAddGesture > 1000)
            {
                objectInvoked = null;
            }
        }

        //If the gesture is a palm up gesture and the object to invoke is the cylinder virtual object, we invoke the cylinder.
        if (stateMachine.objectToInvoke == "virtualObject")
        {
            DateTime currentTime = DateTime.UtcNow;
            if ((isFirstGesture || isSecondGesture))
            {
                if (objectInvoked == null)
                {
                    objectInvoked = cylindre;
                }
                objectInvoked.SetActive(true);
                lastTimeAddGesture = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
                Vector3 newPosition = isFirstGesture ? gesture.FirstGesture.Position : gesture.SecondGesture.Position;
                objectInvoked.transform.position = newPosition;
            }
            if (((DateTimeOffset)currentTime).ToUnixTimeMilliseconds() - lastTimeAddGesture > 1000)
            {
                objectInvoked = null;
            }
        }
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
