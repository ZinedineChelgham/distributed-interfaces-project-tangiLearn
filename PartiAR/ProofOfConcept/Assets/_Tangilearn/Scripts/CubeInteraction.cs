using UnityEngine;
using UnityEngine.EventSystems;



public class CubeInteraction : MonoBehaviour 
{
    public void ChangeCubeColor()
    {
        this.GetComponent<Renderer>().material.color = Color.red;
    }
}
