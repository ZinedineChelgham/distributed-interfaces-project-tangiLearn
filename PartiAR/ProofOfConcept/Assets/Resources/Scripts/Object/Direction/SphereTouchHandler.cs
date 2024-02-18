using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.Examples.Demos;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using UnityEngine;

public class SphereTouchHandler : MonoBehaviour, IMixedRealityTouchHandler
{
    private ObjectManipulator objectManipulator;
    [SerializeField]
    private float maxInteractionDistance = 0.0001f;
    [SerializeField]
    private SphereCollider sphereCollider;
    [SerializeField]
    private long touchDelay = 1;
    private long lastTouchTime;
    //[SerializeField]
    //DirectionObject directionObject;

    [SerializeField]
    public UnityEngine.Events.UnityEvent<Vector3> onSphereTouch;

    void Start()
    {
        objectManipulator = GetComponent<ObjectManipulator>();

        if (objectManipulator != null)
        {
            objectManipulator.OnManipulationStarted.AddListener(OnMoveStarted);
            objectManipulator.OnManipulationEnded.AddListener(OnMoveEnded);
        }
        else
        {
            Debug.LogError("ObjectManipulator component is missing!");
        }

        // Register the script to the Input System
        CoreServices.InputSystem?.RegisterHandler<IMixedRealityTouchHandler>(this);
    }

    void OnDestroy()
    {
        if (objectManipulator != null)
        {
            objectManipulator.OnManipulationStarted.RemoveListener(OnMoveStarted);
            objectManipulator.OnManipulationEnded.RemoveListener(OnMoveEnded);
        }

        // Unregister the script from the Input System
        CoreServices.InputSystem?.UnregisterHandler<IMixedRealityTouchHandler>(this);
    }

    private void OnMoveStarted(ManipulationEventData eventData)
    {
        Debug.Log("Move started!");
        CustomFunctionOnMove();
    }

    private void OnMoveEnded(ManipulationEventData eventData)
    {
        Debug.Log("Move ended!");
        // Perform any action when the move is ended
    }

    public void OnTouchStarted(HandTrackingInputEventData eventData)
    {
        DateTime currentTime = DateTime.UtcNow;
        long currentMillisecond = ((DateTimeOffset)currentTime).ToUnixTimeSeconds();
        IMixedRealityHandJointService handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>();
        if (handJointService != null)
        {
            Transform handTransform = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, eventData.Controller.ControllerHandedness);
            Vector3 handPosition = handTransform.position;
            // Vérifiez si la distance entre la main et le BoxCollider est inférieure à la distance maximale
            if (Vector3.Distance(handPosition, sphereCollider.bounds.ClosestPoint(handPosition)) <= maxInteractionDistance && currentMillisecond - lastTouchTime > touchDelay)
            {
                lastTouchTime = currentMillisecond;
                DyiPinchGrab gestureClass = GameObject.Find("GestureController").GetComponent<DyiPinchGrab>();
                if ((gestureClass.IsTouch(Handedness.Right) || gestureClass.IsTouch(Handedness.Left)))
                {
                    onSphereTouch.Invoke(handPosition);
                }
            }
        }
    }


    public void OnTouchCompleted(HandTrackingInputEventData eventData)
    {
    }

    public void OnTouchUpdated(HandTrackingInputEventData eventData)
    {
        // Perform any action when the touch is updated (optional)
    }

    private void CustomFunctionOnMove()
    {
        // Your custom function for moving the cube
        Debug.Log("Custom function executed on move!");
    }

    private void CustomFunctionOnPress()
    {
        // Your custom function for pressing the cube
        Debug.Log("Custom function executed on press!");
    }
}