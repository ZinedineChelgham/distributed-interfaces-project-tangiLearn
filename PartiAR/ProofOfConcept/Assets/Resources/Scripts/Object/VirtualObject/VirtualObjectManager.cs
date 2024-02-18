using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

public class VirtualObjectManager : MonoBehaviour
{
    GameObject _currentVirtualObjectSelected;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    //If the user select another virtual object, we deselect the previous one (hide the menu)
    public void Select(GameObject virtualObject)
    {
        if (_currentVirtualObjectSelected != null)
        {
            _currentVirtualObjectSelected.transform.GetChild(1).GetComponent<AnnotationActions>().ActivateMenu(false);
        }
        _currentVirtualObjectSelected = virtualObject;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
