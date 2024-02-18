using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class HighlightAnnotation : MonoBehaviour
{
    public GameObject labelText;
    TextMeshPro textMesh;
    // Start is called before the first frame update
    void Start()
    {
        textMesh = labelText.GetComponent<TextMeshPro>();
    }

    // Update is called once per frame
    void Update()
    {
        if (StringResources.highlightAnnotation)
        {
            textMesh.color = Color.yellow;
        }
        else
        {
            textMesh.color = Color.white;
        }
    }
}
