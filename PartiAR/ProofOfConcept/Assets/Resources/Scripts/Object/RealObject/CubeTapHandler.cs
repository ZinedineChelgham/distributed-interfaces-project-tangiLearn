using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.Examples.Demos;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using System.Reflection.Emit;
using UnityEngine;

//This class is used to handle the "touch" gesture on the cube of the real object
public class CubeTapHandler : MonoBehaviour, IMixedRealityTouchHandler
{
    [SerializeField]
    private float maxInteractionDistance = 0.0001f;
    [SerializeField]
    private BoxCollider boxCollider;
    [SerializeField]
    private long touchDelay = 1;
    private long lastTouchTime;
    private long lastTouchSelect = 0;
    private GameObject[] cubeCorners = new GameObject[8];
    IMixedRealityHandJointService handJointService;
    private LineRenderer lineRenderer;
    RealObjectManager _realObjectManager;
    Transform handTransformRight;
    Transform handTransformLeft;
    void Start()
    {
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        // Register the script to the Input System
        CoreServices.InputSystem?.RegisterHandler<IMixedRealityTouchHandler>(this);
        handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>();
        CreateCube();
        // DrawCubeEdges();
    }


    private void Update()
    {
        //  UpdateLineRenderer();
        if (!boxCollider.enabled)
        {
            if (handTransformRight == null)
            {
                handTransformRight = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, Handedness.Right);
            }
            if (handTransformLeft == null)
            {
                handTransformLeft = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, Handedness.Left);
            }
            if (!IsInsideCube(handTransformRight.position) && !IsInsideCube(handTransformLeft.position))
            {
                gameObject.transform.parent.GetComponent<RealObject>().ActivateBoxCollider();
            } 
        }
    }

    void OnDestroy()
    {
        CoreServices.InputSystem?.UnregisterHandler<IMixedRealityTouchHandler>(this);
    }

    private void CreateCube()
    {
        GameObject center = new GameObject();
        center.transform.parent = transform;
        center.transform.localPosition = Vector3.zero;

        // Get the BoxCollider
        BoxCollider boxCollider = GetComponent<BoxCollider>();

        // Use the extents of the BoxCollider to get the half-width, half-height, and half-depth
        Vector3 halfSize = boxCollider.size / 2.0f;

        Vector3[] positions = new Vector3[8]
        {
        new Vector3(-halfSize.x, -halfSize.y, -halfSize.z),
        new Vector3(-halfSize.x, -halfSize.y, halfSize.z),
        new Vector3(halfSize.x, -halfSize.y, halfSize.z),
        new Vector3(halfSize.x, -halfSize.y, -halfSize.z),
        new Vector3(-halfSize.x, halfSize.y, -halfSize.z),
        new Vector3(-halfSize.x, halfSize.y, halfSize.z),
        new Vector3(halfSize.x, halfSize.y, halfSize.z),
        new Vector3(halfSize.x, halfSize.y, -halfSize.z)
        };

        for (int i = 0; i < 8; i++)
        {
            cubeCorners[i] = new GameObject();
            cubeCorners[i].name = "objet " + i;
            cubeCorners[i].transform.parent = transform;

            // Transform local position to global position, taking into account parent's position, rotation, and scale
            cubeCorners[i].transform.position = transform.TransformPoint(positions[i]);
        }
    }

    private bool IsInsideCube(Vector3 point)
    {
        // Get the minimum and maximum corners of the cube
        Vector3 minCorner = cubeCorners[0].transform.position;
        Vector3 maxCorner = cubeCorners[6].transform.position;

        // Ensure that minCorner really contains the minimum values and maxCorner contains the maximum values
        for (int i = 1; i < 8; i++)
        {
            minCorner = Vector3.Min(minCorner, cubeCorners[i].transform.position);
            maxCorner = Vector3.Max(maxCorner, cubeCorners[i].transform.position);
        }

        // Check if the point is inside the bounding box
        if (point.x >= minCorner.x && point.x <= maxCorner.x &&
            point.y >= minCorner.y && point.y <= maxCorner.y &&
            point.z >= minCorner.z && point.z <= maxCorner.z)
        {
            return true;
        }

        return false;
    }


    //When the first touch is detected on the cube, we look if if it was a touch gesture.
    //If it was a touch gesture, we do the appropriate thing depending of the context.
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
            if (Vector3.Distance(handPosition, boxCollider.bounds.ClosestPoint(handPosition)) <= maxInteractionDistance && currentMillisecond - lastTouchTime > touchDelay)
            {
                lastTouchTime = currentMillisecond;
                DyiPinchGrab gestureClass = GameObject.Find("GestureController").GetComponent<DyiPinchGrab>();
                if ((gestureClass.IsTouch(Handedness.Right) || gestureClass.IsTouch(Handedness.Left)))
                {
                    lastTouchSelect = currentMillisecond;
                    if (gameObject.transform.parent.GetComponent<RealObject>().transformConfirmed)
                    {
                        gameObject.transform.parent.GetComponent<RealObject>().TouchBox();
                    } else
                    {
                        gameObject.transform.parent.GetComponent<RealObject>().EndTransform();
                    }
                }
            }
        }
    }


public void OnTouchCompleted(HandTrackingInputEventData eventData)
    {

    }

    //After the first touch, we look if the hand is still inside the BoxCollider.
    //If it is, and it's inside more than X seconds, the cube become yellow and his BoxCollider is disabled. 
    //We do this to let the user manipulate the object inside.
    public void OnTouchUpdated(HandTrackingInputEventData eventData)
    {
        Transform handTransform = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, eventData.Controller.ControllerHandedness);
        Vector3 handPosition = handTransform.position;
        if(Vector3.Distance(handPosition, boxCollider.bounds.ClosestPoint(handPosition)) > 0.01)
        {
            return;
        }
        RealObject realObject = gameObject.transform.parent.GetComponent<RealObject>();
        DateTime currentTime = DateTime.UtcNow;
        long currentMillisecond = ((DateTimeOffset)currentTime).ToUnixTimeSeconds();
        if (boxCollider.enabled && currentMillisecond - lastTouchSelect > 1 && _realObjectManager.selectedRealObject == realObject && realObject.transformConfirmed)
        {
            gameObject.transform.parent.GetComponent<RealObject>().DesactivateBoxCollider();
        }
    }

    //Debug function to see if the cube created is well positionned. (call this in Start())
    private void DrawCubeEdges()
    {
        lineRenderer = gameObject.AddComponent<LineRenderer>();
        lineRenderer.useWorldSpace = true;
        lineRenderer.positionCount = 16;
        lineRenderer.startWidth = 0.01f;
        lineRenderer.endWidth = 0.01f;

        Vector3[] edgesOrder = new Vector3[16]
        {
            cubeCorners[0].transform.position,
            cubeCorners[1].transform.position,
            cubeCorners[2].transform.position,
            cubeCorners[3].transform.position,
            cubeCorners[0].transform.position,
            cubeCorners[4].transform.position,
            cubeCorners[5].transform.position,
            cubeCorners[1].transform.position,
            cubeCorners[5].transform.position,
            cubeCorners[6].transform.position,
            cubeCorners[2].transform.position,
            cubeCorners[6].transform.position,
            cubeCorners[7].transform.position,
            cubeCorners[3].transform.position,
            cubeCorners[7].transform.position,
            cubeCorners[4].transform.position
        };

        lineRenderer.SetPositions(edgesOrder);
    }

    //Debug function to see if the cube created is well positionned. (call this in Update())
    private void UpdateLineRenderer()
    {
        Vector3[] edgesOrder = new Vector3[16]
        {
        cubeCorners[0].transform.position,
        cubeCorners[1].transform.position,
        cubeCorners[2].transform.position,
        cubeCorners[3].transform.position,
        cubeCorners[0].transform.position,
        cubeCorners[4].transform.position,
        cubeCorners[5].transform.position,
        cubeCorners[1].transform.position,
        cubeCorners[5].transform.position,
        cubeCorners[6].transform.position,
        cubeCorners[2].transform.position,
        cubeCorners[6].transform.position,
        cubeCorners[7].transform.position,
        cubeCorners[3].transform.position,
        cubeCorners[7].transform.position,
        cubeCorners[4].transform.position
        };

        lineRenderer.SetPositions(edgesOrder);
    }
}