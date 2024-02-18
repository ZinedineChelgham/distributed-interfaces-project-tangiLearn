using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Microsoft.MixedReality.Toolkit.Utilities;

public static class HandsPreference 
{
    public static Handedness handInvokeObject;
    public static Handedness handInvokeMenuHand;
    public static Handedness handInvokeMenuAnnotation;


    public static void SetHandPreference(Handedness handInvokeObject, Handedness handInvokeMenuHand, Handedness handInvokeMenuAnnotation)
    {
        HandsPreference.handInvokeObject = handInvokeObject;
        HandsPreference.handInvokeMenuHand = handInvokeMenuHand;
        HandsPreference.handInvokeMenuAnnotation = handInvokeMenuAnnotation;
    }
}
