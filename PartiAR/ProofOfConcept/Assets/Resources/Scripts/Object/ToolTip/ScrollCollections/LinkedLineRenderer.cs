using Microsoft.MixedReality.Toolkit.UI;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LinkedLineRenderer : MonoBehaviour
{
    public GameObject objectLink;
    public GameObject menulink;
    public GameObject buttonLink;
    public LineRenderer lineRenderer;
    public bool hasBeenClicked = false;
    private bool hasBeenInitialized;
    // Start is called before the first frame update
    void Start()
    {
    }

    private void OnEnable()
    {
        lineRenderer = gameObject.AddComponent<LineRenderer>();
        lineRenderer.widthCurve = AnimationCurve.Linear(0, .006f, 1, .006f);
        lineRenderer.positionCount = 0;
    }

    // Update is called once per frame
    void Update()
    {
        if((buttonLink == null || objectLink == null) && hasBeenInitialized)
        {
            Destroy(gameObject);
        }
        lineRenderer.enabled = menulink.activeInHierarchy;
        if (hasBeenClicked)
        {
            if (objectLink.tag == "ObjectAnnotation") {
                lineRenderer.SetPosition(0, objectLink.transform.GetChild(0).position);
            }
            else
            {
                lineRenderer.SetPosition(0, objectLink.transform.position);
            }
            lineRenderer.SetPosition(1, menulink.transform.position);
        }
    }

    public void initializedButton(GameObject button)
    {
        buttonLink = button;
        hasBeenInitialized = true;
    }

    public void OnClick()
    {
        {
            if (hasBeenClicked == false)
            {
                lineRenderer.positionCount = 2;
                lineRenderer.SetPosition(0, objectLink.transform.position);
                lineRenderer.SetPosition(1, menulink.transform.position);
                hasBeenClicked = true;
            }
            else
            {
                hasBeenClicked = false;
                lineRenderer.positionCount = 0;
            }
        }
    }
}
