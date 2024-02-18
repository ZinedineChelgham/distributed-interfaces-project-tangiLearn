using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;

public class DirectionObject : MonoBehaviour
{
    [SerializeField]
    public GameObject _sphereGlobal;
    [SerializeField]
    GameObject arrowObjectPrefab;
    [SerializeField]
    GameObject arrows;

    [SerializeField]
    public Material _materialSelected;
    [SerializeField]
    public Material _materialUnselected;
    [SerializeField]
    public Material _materialEdition;
    [SerializeField]
    public Material _wireframeEdition;
    [SerializeField]
    public Material wireframeNotEdition;
    public List<Arrow> arrowList = new List<Arrow>();
    StateMachineDirection stateMachineDirection;

    [SerializeField]
    GameObject menuSphere;
    [SerializeField]
    GameObject editButton;
    [SerializeField]
    GameObject returnButton;

    //TODO faire que si grabb sphere ça selectionne

    // Start is called before the first frame update
    void Start()
    {
        stateMachineDirection = new StateMachineDirection();  
        stateMachineDirection._directionObject = this;
        stateMachineDirection.ChangeState(new StateDirectionSelected(stateMachineDirection));
        OnClickEdit();
        ModeController modeController = FindObjectOfType<ModeController>();
        modeController.OnModeChanged += HandleModeChanged;
    }

    // Update is called once per frame
    void Update()
    {
        stateMachineDirection.UpdateCurrentState();
    }

    private void HandleModeChanged(Mode mode)
    {
        switch(mode)
        {
            case Mode.Edition:
                _sphereGlobal.gameObject.SetActive(true);
                menuSphere.SetActive(true);
                foreach (Arrow arrow in arrowList)
                {
                    arrow.menu.GetComponent<MenuDirection>().ChangeMode(mode);
                    arrow.rotationSphere.SetActive(true);
                }
                break;
            case Mode.Visualization:
                _sphereGlobal.gameObject.SetActive(false);
                menuSphere.SetActive(false);
                foreach (Arrow arrow in arrowList)
                {
                    arrow.menu.GetComponent<MenuDirection>().ChangeMode(mode);
                    arrow.RotationSphereUnselected();
                    arrow.rotationSphere.SetActive(false);
                    arrow.menu.SetActive(true);
                }
                break;
        }
    }

    private void OnDestroy()
    {
        ModeController modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        modeController.OnModeChanged -= HandleModeChanged;
    }

    public void TouchSphere(Vector3 touchPosition)
    {
        stateMachineDirection.OnTouchSphere(touchPosition); 
    }

    public void OnManipulationStarted()
    {
        Debug.Log("MANIPULATOR STARTED");
        stateMachineDirection.OnManipulationStarted();
    }

    public void SelectSphere()
    {
        ShowEditButton();
        HideReturnButton();
        menuSphere.SetActive(true);
        foreach (Arrow arrow in arrowList)
        {
            arrow.RotationSphereSelected();
            arrow.rotationSphere.SetActive(true);
        }
        Material[] mats = _sphereGlobal.GetComponent<MeshRenderer>().materials;
        mats[0] = _materialSelected;  // Replace 'index' with the index of the material you want to replace
        mats[1] = wireframeNotEdition;
        _sphereGlobal.GetComponent<MeshRenderer>().materials = mats;
    }

    public void DeselectSphere()
    {
        menuSphere.SetActive(false);
        foreach (Arrow arrow in arrowList)
        {
            arrow.RotationSphereUnselected();
            arrow.rotationSphere.SetActive(false);
        }
        Material[] mats = _sphereGlobal.GetComponent<MeshRenderer>().materials;
        mats[0] = _materialUnselected;  // Replace 'index' with the index of the material you want to replace
        mats[1] = wireframeNotEdition;
        _sphereGlobal.GetComponent<MeshRenderer>().materials = mats;
    }

    public void TouchSphereAddArrow(Vector3 touchPosition)
    {
       foreach(Arrow arrow in arrowList)
        {
            GameObject rotationSphere = arrow.rotationSphere;
            if (Vector3.Distance(rotationSphere.transform.position, touchPosition) < 0.1)
            {
                return;
            }
        }
       GameObject currentArrow = Instantiate(arrowObjectPrefab, arrows.transform);
       arrowObjectPrefab.transform.position = transform.position;
       currentArrow.GetComponent<Arrow>().bigSphere = gameObject;
       currentArrow.GetComponent<Arrow>().OnArrowDelete += DeleteArrow;  // Subscribe to the event
       currentArrow.GetComponent<Arrow>().RotateToTouch(touchPosition);
       currentArrow.SetActive(true);
       arrowList.Add(currentArrow.GetComponent<Arrow>());
    }

    public void DeleteArrow(Arrow arrow)
    {
        arrow.OnArrowDelete -= DeleteArrow;  // Unsubscribe from the event
        arrowList.Remove(arrow);
        Destroy(arrow.gameObject);
    }

    public void OnClickDelete()
    {
        Destroy(gameObject);
    }

    public void OnClickDeselect()
    {
        stateMachineDirection.ChangeState(new StateDirectionUnselected(stateMachineDirection));
    }

    public void OnClickEdit()
    {
        stateMachineDirection.ChangeState(new StateDirectionEdition(stateMachineDirection));
        Material[] mats = _sphereGlobal.GetComponent<MeshRenderer>().materials;
        mats[0] = _materialEdition;  // Replace 'index' with the index of the material you want to replace
        mats[1] = _wireframeEdition;
        _sphereGlobal.GetComponent<MeshRenderer>().materials = mats;
        HideEditButton();
        ShowReturnButton();
    }

    public void enableManipulator()
    {
        _sphereGlobal.GetComponent<ObjectManipulator>().enabled = true;
    }

    public void disableManipulator()
    {
        _sphereGlobal.GetComponent<ObjectManipulator>().enabled = false;
    }

    public void OnClickReturn()
    {
        stateMachineDirection.ChangeState(new StateDirectionSelected(stateMachineDirection));
        ShowEditButton();
        HideReturnButton();
    }

    public void HideEditButton()
    {
        editButton.SetActive(false);
    }
    public void ShowEditButton()
    {
        editButton.SetActive(true);
    }
    public void HideReturnButton()
    {
        returnButton.SetActive(false);
    }

    public void ShowReturnButton()
    {
        returnButton.SetActive(true);
    }

}

