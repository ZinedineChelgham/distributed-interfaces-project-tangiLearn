using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.Utilities;
using MRTKExtensions.Gesture;
using System;
using UnityEngine;
using UnityEngine.XR;


    //Class used to detect custom gestures
    public class DyiPinchGrab : MonoBehaviour
    {

    private const float PinchThreshold = 0.7f;
    private const float GrabThreshold = 0.4f;
    private Camera mainCamera;
    private StateMachine modeStateMachine;
    private GestureType previousGesture;
    private long gestureFirstCall;
    private long sameGestureForThreshold = 300;

    [SerializeField]
        private TrackedHandJoint trackedHandJoint = TrackedHandJoint.IndexMiddleJoint;

        [SerializeField]
        private float grabDistance = 0.1f;

        [SerializeField]
        private Handedness trackedHand = Handedness.Both;

        [SerializeField]
        private bool trackPinch = true;

        [SerializeField]
        private bool trackGrab = true;

        private IMixedRealityHandJointService handJointService;

        private IMixedRealityHandJointService HandJointService =>
            handJointService ??
            (handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>());

    private void Start()
    {
        mainCamera = Camera.main;
        modeStateMachine = GameObject.Find("StateController").GetComponent<HandleStateMode>().modeStateMachine;
    }

    //Feed the state machine with the detected gesture
    private void Update()
    {
        Gesture gestureLeftHand = new Gesture(GestureType.None, Handedness.Left, Vector3.zero, Quaternion.identity);
        Gesture gestureRightHand = new Gesture(GestureType.None, Handedness.Right, Vector3.zero, Quaternion.identity);
        GestureCombination gesture;
        if (HandJointService.IsHandTracked(Handedness.Left))
        {
            gestureLeftHand = new Gesture(GestureRecognition(Handedness.Left), Handedness.Left, GetHandPos(Handedness.Left), GetHandRotation(Handedness.Left));
        }
        if (HandJointService.IsHandTracked(Handedness.Right))
        {
            gestureRightHand = new Gesture(GestureRecognition(Handedness.Right), Handedness.Right, GetHandPos(Handedness.Right), GetHandRotation(Handedness.Right));
        }
        gesture = GetHandInView() == Handedness.Left ? 
            new GestureCombination(gestureLeftHand, gestureRightHand) :
            new GestureCombination(gestureRightHand, gestureLeftHand);
        DateTime currentTime = DateTime.UtcNow;
        long currentMillisecond = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
        if (gesture.FirstGesture.Type == previousGesture)
        {
            if(currentMillisecond - gestureFirstCall > sameGestureForThreshold)
            {
                modeStateMachine.currentState.HandleGesture(gesture);
            } 
        } else
        {
            gestureFirstCall = currentMillisecond;
        }
        previousGesture = gesture.FirstGesture.Type;
    }

    private GestureType GestureRecognition(Handedness trackedHand)
    {
        {
            if (IsPinching(trackedHand))
            {
                return GestureType.Pinch;
            }

            if (IsGrabbing(trackedHand))
            {
                return GestureType.Grab;
            }

            if (IsThumbUp(trackedHand))
            {
                return GestureType.ThumbUp;
            }
            if(IsVictory(trackedHand))
            {
               return GestureType.Victory;
            }
            if(IsPalmUp(trackedHand))
            {
               return GestureType.PalmUp;
            }

            return GestureType.None;
        }
    }

    public Handedness GetHandInView()
    {
        if (!HandJointService.IsHandTracked(Handedness.Left) && !HandJointService.IsHandTracked(Handedness.Right))
        {
            return Handedness.None;
        }

        if (HandJointService.IsHandTracked(Handedness.Left) && !HandJointService.IsHandTracked(Handedness.Right))
        {
            return Handedness.Left;
        }

        if (!HandJointService.IsHandTracked(Handedness.Left) && HandJointService.IsHandTracked(Handedness.Right))
        {
            return Handedness.Right;
        }

        Vector3 leftHandPosition = HandJointService.RequestJointTransform(TrackedHandJoint.Palm, Handedness.Left).position;
        Vector3 rightHandPosition = HandJointService.RequestJointTransform(TrackedHandJoint.Palm, Handedness.Right).position;

        Vector3 leftHandDirection = leftHandPosition - mainCamera.transform.position;
        Vector3 rightHandDirection = rightHandPosition - mainCamera.transform.position;

        float leftHandAngle = Vector3.Angle(mainCamera.transform.forward, leftHandDirection);
        float rightHandAngle = Vector3.Angle(mainCamera.transform.forward, rightHandDirection);

        return leftHandAngle < rightHandAngle ? Handedness.Left : Handedness.Right;
    }

    public Vector3 GetHandPos(Handedness hand)
    {
        Transform palmTransform = HandJointService.RequestJointTransform(TrackedHandJoint.Palm, hand);
        return palmTransform.position;
    }

    public Quaternion GetHandRotation(Handedness hand)
    {
        Transform palmTransform = HandJointService.RequestJointTransform(TrackedHandJoint.Palm, hand);
        return palmTransform.rotation;
    }

    public bool IsPinching(Handedness trackedHand)
    {
        return HandPoseUtils.CalculateIndexPinch(trackedHand) > PinchThreshold;
    }

    public bool IsGrabbing(Handedness trackedHand)
    {
        return !IsPinching(trackedHand) &&
               HandPoseUtils.MiddleFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.RingFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.PinkyFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.ThumbFingerCurl(trackedHand) > GrabThreshold;
    }

    public bool IsThumbUp(Handedness trackedHand)
    {
        return HandPoseUtils.ThumbFingerCurl(trackedHand) < 0.2f &&
               HandPoseUtils.IndexFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.MiddleFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.RingFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.PinkyFingerCurl(trackedHand) > GrabThreshold;
    }

    public bool IsTouch(Handedness trackedHand)
    {
        return HandPoseUtils.ThumbFingerCurl(trackedHand) > 0.3f &&
               HandPoseUtils.IndexFingerCurl(trackedHand) < 0.2f &&
               HandPoseUtils.MiddleFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.RingFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.PinkyFingerCurl(trackedHand) > GrabThreshold;
    }

    public bool IsVictory(Handedness trackedHand)
    {
        return HandPoseUtils.ThumbFingerCurl(trackedHand) > GrabThreshold &&
               HandPoseUtils.IndexFingerCurl(trackedHand) < 0.1 &&
               HandPoseUtils.MiddleFingerCurl(trackedHand) < 0.1 &&
               HandPoseUtils.RingFingerCurl(trackedHand) > 0.3 &&
               HandPoseUtils.PinkyFingerCurl(trackedHand) > 0.3;
    }

    public bool IsPalmUp(Handedness trackedHand)
    {
        // Get the palm transform
        Transform palmTransform = HandJointService.RequestJointTransform(TrackedHandJoint.Palm, trackedHand);

        // Calculate the angle between the palm's up direction and the world's Y axis
        float angle = Vector3.Angle(palmTransform.up, Vector3.up);
        return angle > 125.0f && 
            HandPoseUtils.ThumbFingerCurl(trackedHand) < 0.4f &&
            HandPoseUtils.IndexFingerCurl(trackedHand) < 0.1f &&
            HandPoseUtils.MiddleFingerCurl(trackedHand) < 0.1f &&
            HandPoseUtils.RingFingerCurl(trackedHand) < 0.1f &&
            HandPoseUtils.PinkyFingerCurl(trackedHand) < 0.1f;
    }
}
