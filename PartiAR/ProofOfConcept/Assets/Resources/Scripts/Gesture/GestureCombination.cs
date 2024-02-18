using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;

public struct GestureCombination
{
    public Gesture FirstGesture { get; }
    public Gesture SecondGesture { get; }

    public GestureCombination(Gesture firstGesture, Gesture secondGesture)
    {
        FirstGesture = firstGesture;
        SecondGesture = secondGesture;
    }
}