using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.Utilities;
using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.UI;
using TMPro;
using System;
using Microsoft.MixedReality.Toolkit.Utilities.Solvers;

public class HandButtonHandler : MonoBehaviour
{
    [SerializeField]
    private GameObject audioButton;     
    [SerializeField]
    private GameObject videoButton;   
    [SerializeField]
    private GameObject photoButton;    
    [SerializeField]
    private GameObject textButton;      
    [SerializeField]
    private GameObject ontologyButton;
    [SerializeField]
    private GameObject linkButton;
    [SerializeField]
    private GameObject deselectButton;

    [SerializeField]
    private GameObject cubeButton;
    [SerializeField]
    private GameObject tooltipButton;
    [SerializeField]
    private GameObject virtualObjectButton;
    [SerializeField]
    private GameObject annotationsButton;
    [SerializeField]
    private GameObject directionButton;
    [SerializeField]
    private GameObject parameterButton;
    [SerializeField]
    private GameObject confirmButton;


    [SerializeField]
    private GameObject editionButton;
    [SerializeField]
    private GameObject visualisationButton;
    [SerializeField]
    private GameObject saveButton;

    [SerializeField]
    private GameObject buttonsRealObject;
    [SerializeField]
    private GameObject buttonsGlobal;
    [SerializeField]
    private GameObject buttonsParameter;
    [SerializeField]
    private GameObject buttonReturnParameter;

    public GameObject cylindreVirtualObject;
    private bool isPalmUp;

    [SerializeField]
    Material materialbuttonPressed;
    [SerializeField]
    Material materialdefaultButton;
    [SerializeField]
    Material materialbuttonDeselect;
    [SerializeField]
    Material materialbuttonDisabled;
    [SerializeField]
    Material materialbuttonEffectActif;

    RealObjectManager _realObjectManager;
    IMixedRealityHandJointService handJointService;
    public float lastPressedTime = -Mathf.Infinity;

    HandPageType pageType = HandPageType.Global;
    public bool inLinkMode;
    private HandleStateMode stateController;
    ModeController _modeController;

    void Start()
    {
        stateController = GameObject.Find("StateController").GetComponent<HandleStateMode>();
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>();
        _realObjectManager.OnRealObjectSelected += HandleRealObjectSelected;
        _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        InitializeHands();
        RegisterButtonEvent(audioButton);
        RegisterButtonEvent(videoButton);
        RegisterButtonEvent(photoButton);
        RegisterButtonEvent(textButton);
        RegisterButtonEvent(ontologyButton);
        RegisterButtonEvent(linkButton);
        RegisterButtonEvent(deselectButton);
        RegisterButtonEvent(cubeButton);
        RegisterButtonEvent(tooltipButton);
        RegisterButtonEvent(virtualObjectButton);
        RegisterButtonEvent(annotationsButton);
        RegisterButtonEvent(directionButton);
        RegisterButtonEvent(editionButton);
        RegisterButtonEvent(visualisationButton);
        RegisterButtonEvent(saveButton);
        RegisterButtonEvent(parameterButton);
        UpdateMaterialButtonsGlobal();
    }

    //Init all hand tracker used for all buttons with the hand preference of the user
    public void InitializeHands()
    {
        audioButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        videoButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        photoButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        textButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        ontologyButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        linkButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        deselectButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;

        cubeButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        tooltipButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        virtualObjectButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        annotationsButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        directionButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        parameterButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;

        editionButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        visualisationButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        saveButton.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
        buttonReturnParameter.transform.parent.GetComponent<SolverHandler>().TrackedHandness = HandsPreference.handInvokeMenuHand;
    }

    //When a real object has just been selected, we change the page to annotation page
    private void HandleRealObjectSelected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        Debug.Log("OBJECT SELECTED");
        pageType = HandPageType.Annotation;
        if(isPalmUp)
        {
            ShowButtonsRealObjects();
        }
    }

    //When the user click on the confirm button of the global page, we confirm the selected real object
    public void OnConfirmButton()
    {
        Debug.Log("IS SELECTED " + _realObjectManager.selectedRealObject);
        if(_realObjectManager.selectedRealObject != null)
        {
            if(!_realObjectManager.selectedRealObject.transformConfirmed)
            {
                _realObjectManager.selectedRealObject.EndTransform();
            }
        }
    }

    void Update()
    {
        //If Mode Visualization, we show the parameter page and hide the return button (stuck in parameter page)
        if (_modeController.actualMode == Mode.Visualization)
        {
            if (pageType != HandPageType.Parameter && isPalmUp)
            {
                ShowButtonsParameter();
            }
            return;
        }
        //If no selected real object or it's in a transform mode, we change the page to global page and disable the annotation button
        if (_realObjectManager.selectedRealObject == null || !_realObjectManager.selectedRealObject.transformConfirmed)
        {
            if (pageType == HandPageType.Annotation)
            {
                if(isPalmUp)
                {
                    ShowButtonsGlobal();
                }
                pageType = HandPageType.Global;
            }
            if (annotationsButton.GetComponent<BoxCollider>().enabled)
            {
                ChangeMaterialToDisabled(annotationsButton);
                annotationsButton.GetComponent<BoxCollider>().enabled = false;
            }
        }
        //Else we enable the annotation button
        else
        {
            if (!annotationsButton.GetComponent<BoxCollider>().enabled)
            {
                annotationsButton.GetComponent<BoxCollider>().enabled = true;
                ChangeMaterialToDefault(annotationsButton);
            }
        }

        //Depending on the context, if the confirm button is needed we show it else we hide it
        if (_realObjectManager.selectedRealObject != null 
            && !_realObjectManager.selectedRealObject.transformConfirmed
            && pageType == HandPageType.Global)
        {
            confirmButton.SetActive(true); 
        } else
        {
            confirmButton.SetActive(false);
        }
    }


    //We register to the event of the button to know when it's pressed
    private void RegisterButtonEvent(GameObject button)
    {
        var buttonHandler = button.GetComponent<ButtonHand>();
        if (buttonHandler != null)
        {
            buttonHandler.ButtonActionTriggered += HandleButtonAction;
        }
    }

    //We handle the button pressed event
    private void HandleButtonAction(ButtonAction action)
    {
        //Used to avoid double click or click another button by mistake, we wait 0.5s between each click
        lastPressedTime = Time.time;
    }

    //Handle the press on the Switch Mode button in the parameter page
    public void OnClickSwitchMode()
    {
        ModeController _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        if (_modeController.actualMode == Mode.Edition)
        {
            buttonReturnParameter.SetActive(false);
            Debug.Log("MODE VISUALISATION");
            _modeController.SetNewMode(Mode.Visualization);
            editionButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("crayon-icon");
            editionButton.GetComponentInChildren<TextMeshPro>().text = "Mode Edition";
        }
        else
        {
            buttonReturnParameter.SetActive(true);
            Debug.Log("MODE EDITION");
            _modeController.SetNewMode(Mode.Edition);
            editionButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("eye");
            editionButton.GetComponentInChildren<TextMeshPro>().text = "Mode Visualisation";
        }
    }

    //On Palm Up we show the current page;
    public void OnPalmUpStart()
    {
        isPalmUp = true;
        Debug.Log("PALM UP");
        if (pageType == HandPageType.Global)
        {
            ShowButtonsGlobal();
        }
        else if (pageType == HandPageType.Annotation)
        {
            ShowButtonsRealObjects();
        }
        else
        {
            ShowButtonsParameter();
        }
    }

    //On Palm Up ended we hide all the page
    public void OnPalmUpEnd()
    {
        isPalmUp = false;
        Debug.Log("PALM UP END");
        HideButtons();
    }

    //Stop the link mode if it's active
    public void StopLinkMode()
    {
        if(inLinkMode)
        {
            OnClickLink();
        }
    }

    //Handle the press on the Link button
    public void OnClickLink()
    {
        inLinkMode = !inLinkMode;
        if(inLinkMode)
        {
            _realObjectManager.selectedRealObject.GetComponent<LinkObject>().ShowLink();
            linkButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("stopLink2");
            linkButton.GetComponentInChildren<TextMeshPro>().text = "Stop Link";
        } else
        {
            _realObjectManager.selectedRealObject.GetComponent<LinkObject>().HideLink();
            linkButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("link");
            linkButton.GetComponentInChildren<TextMeshPro>().text = "Link";
        }
    }

    //Handle the press on the return button
    public void OnClickDeselect()
    {
        if (inLinkMode)
        {
            StopLinkMode();
        }
        ShowButtonsGlobal();
    }

    //Handle the press on the virtual button of the global page
    public void OnClickVirtualObject()
    {
        GameObject.Find("StateController").GetComponent<HandleStateMode>().changeInvokeObject("virtualObject");
        ChangeMaterialToDefault(cubeButton);
        ChangeMaterialToDefault(tooltipButton);
        ChangeMaterialToDefault(directionButton);
    }

    //Handle the press on the cube button of the global page
    public void OnClickCube()
    {
        GameObject.Find("StateController").GetComponent<HandleStateMode>().changeInvokeObject("cube");
        ChangeMaterialToDefault(directionButton);
        ChangeMaterialToDefault(tooltipButton);
        ChangeMaterialToDefault(virtualObjectButton);
    }

    //If another real object is invoked and we are in link mode, we stop the link mode
    public void OnObjectInvoked()
    {
        if(inLinkMode)
        {
            OnClickLink();
        }
    }

    //Handle the press on the Direction button of the global page
    public void OnClickDirection()
    {
        GameObject.Find("StateController").GetComponent<HandleStateMode>().changeInvokeObject("direction");
        ChangeMaterialToDefault(cubeButton);
        ChangeMaterialToDefault(tooltipButton);
        ChangeMaterialToDefault(virtualObjectButton);
    }

    //Handle the press on the Tooltip button of the global page
    public void OnClickTooltip()
    {
        GameObject.Find("StateController").GetComponent<HandleStateMode>().changeInvokeObject("tooltip");
        ChangeMaterialToDefault(directionButton);
        ChangeMaterialToDefault(cubeButton);
        ChangeMaterialToDefault(virtualObjectButton);
    }

    //Show the global page
    public void ShowButtonsGlobal()
    {
        pageType = HandPageType.Global;
        buttonsGlobal.SetActive(true);
        buttonsRealObject.SetActive(false);
        buttonsParameter.SetActive(false);
        UpdateMaterialButtonsGlobal();
    }

    //Show the parameter page
    public void ShowButtonsParameter()
    {
        pageType = HandPageType.Parameter;
        buttonsGlobal.SetActive(false);
        buttonsRealObject.SetActive(false);
        buttonsParameter.SetActive(true);
        UpdateMaterialButtonsParameter();
    }

    //Show the annotation page
    public void ShowButtonsRealObjects()
    {
        pageType = HandPageType.Annotation;
        buttonsGlobal.SetActive(false);
        buttonsRealObject.SetActive(true);
        buttonsParameter.SetActive(false);
        UpdateMaterialButtonsRealObject();
    }

    //Hide all the pages
    public void HideButtons()
    {
        Debug.Log("HIDES BUTTONS");
        buttonsRealObject.SetActive(false);
        buttonsGlobal.SetActive(false);
        buttonsParameter.SetActive(false);
    }

    //Change the material of the button pressed to the pressed material
    public void OnButtonPressed(GameObject gameObject)
    {
        ChangeMaterialToPressed(gameObject);
    }

    //Change the material of the button released to the pressed material
    public void OnButtonReleased(GameObject gameObject)
    {
        StartCoroutine(DelayedRelease(gameObject));
    }


    private IEnumerator DelayedRelease(GameObject gameObject)
    {
        yield return new WaitForSeconds(0.25f);  // Attendre 0.5 secondes
        ChangeMaterialToDefault(gameObject);
    }

    //Change the material of the parameter buttons to the default material
    private void UpdateMaterialButtonsParameter()
    {
        ChangeMaterialToDefault(editionButton);
        ChangeMaterialToDefault(visualisationButton);
        ChangeMaterialToDefault(saveButton);
    }

    //Change the material of the annotation buttons to the default material
    public void UpdateMaterialButtonsRealObject()
    {
        ChangeMaterialToDefault(audioButton);
        ChangeMaterialToDefault(videoButton);
        ChangeMaterialToDefault(photoButton);
        ChangeMaterialToDefault(textButton);
        ChangeMaterialToDefault(ontologyButton);
        ChangeMaterialToDefault(linkButton);
        ChangeMaterialToDefault(deselectButton);
    }

    //Change the material of the global buttons to the default material
    private void UpdateMaterialButtonsGlobal()
    {
        ChangeMaterialToDefault(cubeButton);
        ChangeMaterialToDefault(directionButton);
        ChangeMaterialToDefault(tooltipButton);
        ChangeMaterialToDefault(visualisationButton);
        ChangeMaterialToDefault(annotationsButton);
        ChangeMaterialToDefault(parameterButton);
        ChangeMaterialToDefault(confirmButton);
    }

    // Méthode pour changer le matériau du bouton à l'état pressé
    public void ChangeMaterialToPressed(GameObject gameObject)
    {
        MeshRenderer mesh = gameObject.GetComponentInChildren<MeshRenderer>();
        Material[] mats = mesh.materials;
        mats[0] = materialbuttonPressed;
        mesh.materials = mats;
    }

    // Méthode pour changer le matériau du bouton à l'état par défaut ou "deselected" ou selected
    public void ChangeMaterialToDefault(GameObject gameObject)
    {
        ButtonAction buttonName = gameObject.GetComponent<ButtonHand>().buttonAction;
        Material releaseMaterial;
        if(buttonName == ButtonAction.Direction && stateController.modeStateMachine.objectToInvoke == "direction")
        {
            releaseMaterial = materialbuttonEffectActif;
        } else if(buttonName == ButtonAction.Cube && stateController.modeStateMachine.objectToInvoke == "cube")
        {
            releaseMaterial = materialbuttonEffectActif;
        } else if(buttonName == ButtonAction.Tooltip && stateController.modeStateMachine.objectToInvoke == "tooltip")
        {
            releaseMaterial = materialbuttonEffectActif;
        } else if(buttonName == ButtonAction.VirtualObjects && stateController.modeStateMachine.objectToInvoke == "virtualObject")
        {
            releaseMaterial = materialbuttonEffectActif;
        }
        else if (buttonName == ButtonAction.Annotations && (_realObjectManager.selectedRealObject == null || !_realObjectManager.selectedRealObject.transformConfirmed))
        {
            releaseMaterial = materialbuttonDisabled;
        } else if (buttonName == ButtonAction.Deselect)
        {
            releaseMaterial = materialbuttonDeselect;
        } else
        {
            releaseMaterial = materialdefaultButton; 
        }
        MeshRenderer mesh = gameObject.GetComponentInChildren<MeshRenderer>();
        Material[] mats = mesh.materials;
        mats[0] = releaseMaterial;
        mesh.materials = mats;
    }

    public void ChangeMaterialToEffectActive(GameObject gameObject)
    {
        MeshRenderer mesh = gameObject.GetComponentInChildren<MeshRenderer>();
        Material[] mats = mesh.materials;
        mats[0] = materialbuttonEffectActif;
        mesh.materials = mats;
    }

    public void ChangeMaterialToDisabled(GameObject gameObject)
    {
        MeshRenderer mesh = gameObject.GetComponentInChildren<MeshRenderer>();
        Material[] mats = mesh.materials;
        mats[0] = materialbuttonDisabled;
        mesh.materials = mats;
    }


    //Handle the press on the ontology button of the annotation page
    public void OnClickButtonOntology()
    {
        GameObject cylinderObject = _realObjectManager.selectedRealObject._cylinderObject;

        if (handJointService != null)
        {
            // Obtenez la position de la jointure de la paume de la main droite.
            Transform palmRight = handJointService.RequestJointTransform(TrackedHandJoint.Palm, HandsPreference.handInvokeMenuHand);

            if (palmRight != null)
            {
                // Placez le cylindre à la position de la paume.
                cylinderObject.transform.position = palmRight.position;
                // Activez l'objet cylindre s'il n'est pas déjà actif.
                cylinderObject.SetActive(true);
            }
        }
    }
}