using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using Microsoft.MixedReality.Toolkit.UI;

public class Selection : MonoBehaviour
{
    public SelectionController selectionController;
    public GameObject Menu;
    public GameObject SelectionImportFile;
    public GameObject ImportFileMenu;
    public GameObject SaveImportFileMenu;
    public GameObject VisualizeAnnotation;
    public GameObject LinkAnnotation;



    public void Start()
    {
        selectionController = GameObject.FindWithTag(StringResources.TAG_SELECTION_CONTROLLER).GetComponent<SelectionController>();
    }
    // Update is called once per frame
    void Update()
    {
        if(GetComponent<Interactable>().IsTargeted)
        {
            if (selectionController.currentlySelected != null)
            {
                selectionController.currentlySelected.GetComponent<Interactable>().IsTargeted = false;
            }
            selectionController.currentlySelected = this.gameObject;
        }
        
        if(selectionController.currentlySelected == this.gameObject)
        {
            Menu.SetActive(true);
        }
        else
        {
            Menu.SetActive(false);
            LinkAnnotation.SetActive(false);
            if (!VisualizeAnnotation.activeSelf)
            {
                VisualizeAnnotation.SetActive(false);
            }
            if (SelectionImportFile.activeSelf) 
            {
                SelectionImportFile.SetActive(false);
                ImportFileMenu.SetActive(false);
                SaveImportFileMenu.SetActive(false); 
            }
            else
            {

                if (ImportFileMenu.activeSelf)
                {
                    ImportFileMenu.SetActive(false);
                    SaveImportFileMenu.SetActive(false);
                    SelectionImportFile.SetActive(false);
                }

            }
        }
    }

    public void DeselectToolTip()
    {
        selectionController.currentlySelected = null;
    }
}
