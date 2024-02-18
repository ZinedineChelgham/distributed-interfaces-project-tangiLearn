using Microsoft.MixedReality.Toolkit.Utilities;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InitHandsPreference : MonoBehaviour
{
    [SerializeField]
    GameObject gestureController;
    [SerializeField]
    GameObject handButton;
    [SerializeField]
    GameObject stateController;
    [SerializeField]
    GameObject menuAnnotationHolder;
    [SerializeField]
    GameObject QRCodeManager;
    public bool qrcode;

    //If the user chose the right hand, we init the right hand as the dominant hand
    public void OnClickRight() {
        HandsPreference.SetHandPreference(Handedness.Right, Handedness.Left, Handedness.Right);
        StartApplication();
        Destroy(gameObject);
    }

    //If the user chose the right hand, we init the left hand as the dominant hand
    public void OnClickLeft()
    {
        HandsPreference.SetHandPreference(Handedness.Left, Handedness.Right, Handedness.Left);
        StartApplication();
        Destroy(gameObject);
    }

    //We start the full application by activating some components after the user chose his dominant hand
    public void StartApplication()
    {
        stateController.SetActive(true);
        gestureController.SetActive(true);
        handButton.SetActive(true);
        menuAnnotationHolder.SetActive(true);
        Debug.Log("QRCODE " + qrcode);
        if (qrcode)
        {
            QRCodeManager.SetActive(true);
        }
    }
}
