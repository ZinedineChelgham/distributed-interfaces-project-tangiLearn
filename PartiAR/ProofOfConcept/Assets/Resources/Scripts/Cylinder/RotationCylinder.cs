using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.Utilities;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Microsoft.MixedReality.Toolkit;
using System;
using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;

//Used to perform a custom rotation on the cylinder thanks to the pinch gesture
public class RotationCylinder : MonoBehaviour
{
    [SerializeField]
    CapsuleCollider _cylinderCapsuleCollider;
    [SerializeField]
    GameObject objectToMove;
    [SerializeField]
    GameObject objectToRotate;
    [SerializeField]
    MoveAxisConstraint _moveAxisConstraint;
    DyiPinchGrab dyiPinchGrab;

    private Vector3 startHandPosition;
    private bool isManipulating;
    private Handedness handTracked;
    IMixedRealityHandJointService handJointService;
    private Quaternion initialRotation;
    private Vector3 initialDirection;

    public GameObject centerObject; // l'objet au centre
    private float cubeWidth = 0.45f; // la largeur du cube
    private float cubeHeight = 0.6f; // la hauteur du cube
    private GameObject[] cubeCorners = new GameObject[8];
    private LineRenderer lineRenderer;

    private BoundsControl _boundsControl;
    private BoxCollider _boxCollider;

    void Start()
    {
        dyiPinchGrab = GameObject.Find("GestureController").GetComponent<DyiPinchGrab>();
        handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>();
        _boundsControl = GetComponent<BoundsControl>();
        _boxCollider = GetComponent<BoxCollider>();
        cubeWidth = _boxCollider.size.x;
        cubeHeight = _boxCollider.size.y;
        CreateCube();
        //DrawCubeEdges();
    }

    void Update()
    {
        // Mise à jour de la position du cube
        //UpdateLineRenderer();

        // Initialiser la main suivie à aucun
        Handedness trackedHand = Handedness.None;

        // Si la main gauche est suivie, définir trackedHand à gauche
        if (handJointService.IsHandTracked(Handedness.Left))
        {
            trackedHand = Handedness.Left;
        }
        // Si la main droite est suivie, définir trackedHand à droite
        else if (handJointService.IsHandTracked(Handedness.Right))
        {
            trackedHand = Handedness.Right;
        }

        // Si aucune main n'est suivie, arrêter la manipulation et activer le BoxCollider
        if (trackedHand == Handedness.None)
        {
            isManipulating = false;
            _boxCollider.enabled = true;
            return;
        }

        // Obtenir la position de la main suivie
        startHandPosition = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, trackedHand).position;
        handTracked = trackedHand;

        // Obtenir la position actuelle de la main suivie
        Vector3 currentHandPosition = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, handTracked).position;
        bool isInsideCube = IsInsideCube(startHandPosition);
        bool isInsideCapsule = _cylinderCapsuleCollider.bounds.Contains(currentHandPosition);
        if (isInsideCapsule)
        {
            _moveAxisConstraint.enabled = false;
        }
        else
        {
            _moveAxisConstraint.enabled = true;
        }

        // Si la main n'est pas à l'intérieur du cube, arrêter la manipulation et activer le BoxCollider
        if (!isInsideCube)
        {
            Debug.Log("NOT INSIDE CUBE");
            isManipulating = false;
            _boxCollider.enabled = true;
            return;
        }

        // Désactiver le BoxCollider si la main est à l'intérieur du cube
        _boxCollider.enabled = false;

        // Si la main n'est pas en train de pincer, arrêter la manipulation
        if (!dyiPinchGrab.IsPinching(handTracked))
        {
            isManipulating = false;
            return;
        }

        // Si on commence la manipulation, initialiser la rotation et la direction
        if (!isManipulating)
        {
            isManipulating = true;
            initialRotation = objectToRotate.transform.rotation;
            initialDirection = Vector3.ProjectOnPlane(startHandPosition - objectToRotate.transform.position, transform.up).normalized;
            return;
        }

        // Si la main n'est pas dans le CylinderCapsuleCollider et que la direction initiale n'est pas zéro, effectuer une rotation
        if (!_cylinderCapsuleCollider.bounds.Contains(currentHandPosition) && initialDirection != Vector3.zero)
        {
            Vector3 directionCurrent = Vector3.ProjectOnPlane(currentHandPosition - objectToRotate.transform.position, objectToRotate.transform.up).normalized;
            float angle = Vector3.SignedAngle(initialDirection, directionCurrent, objectToRotate.transform.up);
            Quaternion rotation = Quaternion.Euler(0, angle, 0);
            objectToRotate.transform.rotation = initialRotation * rotation;
        }

        // Mettre à jour la position de départ de la main pour le prochain frame
        startHandPosition = currentHandPosition;
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
            cubeCorners[i].transform.parent = transform;

            // Transform local position to global position, taking into account parent's position, rotation, and scale
            cubeCorners[i].transform.position = transform.TransformPoint(positions[i]);
        }
    }

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

    private bool IsInsideCube(Vector3 point)
    {
        float halfWidth = cubeWidth / 2;
        float halfHeight = cubeHeight / 2;

        if (point.x >= transform.position.x - halfWidth && point.x <= transform.position.x + halfWidth &&
            point.y >= transform.position.y - halfHeight && point.y <= transform.position.y + halfHeight &&
            point.z >= transform.position.z - halfWidth && point.z <= transform.position.z + halfWidth)
        {
            return true;
        }

        return false;
    }

}
    