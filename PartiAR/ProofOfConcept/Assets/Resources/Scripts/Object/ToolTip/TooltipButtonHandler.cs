using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TooltipButtonHandler : MonoBehaviour
{
    public GameObject linkObjectMenu;
    public GameObject selectionMenu;
    public GameObject importObjectMenu;
    public GameObject saveImportFileMenu;
    public GameObject visualizeObjectMenu;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void onClickLink()
    {
        linkObjectMenu.SetActive(!linkObjectMenu.activeSelf);
    }

    public void onClickVisualize()
    {
        visualizeObjectMenu.SetActive(!visualizeObjectMenu.activeSelf);
    }

    public void onClickImport()
    {
        if(selectionMenu.activeSelf)
        {
            selectionMenu.SetActive(false);
            importObjectMenu.SetActive(false);
            saveImportFileMenu.SetActive(false);
        }
        else{

            if(importObjectMenu.activeSelf)
            {
                importObjectMenu.SetActive(false);
                saveImportFileMenu.SetActive(false);
                selectionMenu.SetActive(false);
            }
            else
            {
                importObjectMenu.SetActive(false);
                saveImportFileMenu.SetActive(false);
                selectionMenu.SetActive(true);
            }
           
        }
    }
}
