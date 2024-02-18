using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;

public struct Gesture
{
    public GestureType Type { get; }
    public Handedness Hand { get; }
    public Vector3 Position { get;}
    
    public Quaternion Rotation { get;}

    public Gesture(GestureType type, Handedness hand, Vector3 position, Quaternion rotation)
    {
        Type = type;
        Hand = hand;
        Position = position;
        Rotation = rotation;
    }

    public override string ToString()
    {
        return $"Type: {Type}, Hand: {Hand}, Position: {Position}, Rotation: {Rotation}";
    }
}