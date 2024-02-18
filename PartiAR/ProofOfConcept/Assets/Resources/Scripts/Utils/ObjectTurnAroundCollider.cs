using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//Class used by the annotation menu to turn around the cube depending on the camera position
public class ObjectTurnAroundCollider : MonoBehaviour
{
    [SerializeField]
    private BoxCollider _colliderToTurnAround;
    [SerializeField]
    private GameObject _objectToMove;
    private Camera _cameraMain;
    [SerializeField]
    private float _distanceToPlaceFromCollider;

    void Start()
    {
        _cameraMain = Camera.main;
    }

    void Update()
    {
        if (_colliderToTurnAround.enabled == true)
        {
            Vector3 closestPointOnBound = _colliderToTurnAround.ClosestPoint(_cameraMain.transform.position);
            // Calculate the direction from the collider to the camera
            Vector3 directionToCamera = (_cameraMain.transform.position - closestPointOnBound).normalized;

            // Position the object at a specific distance from the collider along this direction
            _objectToMove.transform.position = closestPointOnBound + directionToCamera * _distanceToPlaceFromCollider;
        }
    }
}