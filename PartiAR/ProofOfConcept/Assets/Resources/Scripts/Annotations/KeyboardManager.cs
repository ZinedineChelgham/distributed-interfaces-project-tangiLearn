using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class KeyboardManager : MonoBehaviour
{
    UnityEngine.TouchScreenKeyboard keyboard;
    public static string keyboardText = "";

    public bool isToolTip = true;

    public bool validate = false;
    public bool cancel = false;
    public bool done = false;


    private TextMeshPro TextMesh;
    public TextMeshPro Preview;
    private SelectionController selectionManager;

    private void Start()
    {
        selectionManager = GameObject.FindWithTag(StringResources.TAG_SELECTION_CONTROLLER).GetComponent<SelectionController>();
    }

    public void validateButton()
    {
        validate = true;
        Debug.Log("VALIDATE CLICKED");

    }

    public void cancelButton()
    {
        cancel = true;
        Debug.Log("CANCEL CLICKED");

    }
    public void OpenKeyboard()
    {
        keyboard = TouchScreenKeyboard.Open("", TouchScreenKeyboardType.Default, false, false, false, false);
        Preview.transform.parent.gameObject.SetActive(true);
    }
    void Update()
    {
        if(keyboard != null)
        {
            keyboardText = keyboard.text;
            Preview.text = keyboardText;

            if (validate)
            {
                if (isToolTip)
                {
                    if (!string.IsNullOrEmpty(keyboardText))
                    {
                        TextMesh = selectionManager.currentlySelected.transform.Find("ContentParent").transform.Find("Label").GetComponent<TextMeshPro>();
                        TextMesh.text = keyboardText;
                    }                    
                    Preview.transform.parent.gameObject.SetActive(false);                    
                    reinitialization();

                }
                else
                {
                    done = true;
                }                
            }

            if (cancel)
            {                
               
                if (isToolTip)
                {                    
                    Preview.transform.parent.gameObject.SetActive(false);                    
                    reinitialization();

                } else
                {
                    /*keyboard.text = "DefaultName";
                    keyboardText = keyboard.text;
                    Preview.text = keyboardText;*/
                    Preview.transform.parent.gameObject.SetActive(false);
                    reinitialization();
                }               
         
            }

            if (done)
            {
                Debug.Log("KM DONE");
                //Preview.transform.parent.gameObject.SetActive(false);
            }

        }
    }
    
    public void reinitialization()
    {
        validate = false;
        cancel = false;
        done = false;
    }
}