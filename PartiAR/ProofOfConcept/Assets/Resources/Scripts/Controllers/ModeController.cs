using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using UnityEngine;

public class ModeController : MonoBehaviour
{
    public Mode actualMode;
    public delegate void ModeChangedHandler(Mode mode);
    public event ModeChangedHandler OnModeChanged;
    // Start is called before the first frame update
    void Start()
    {
        actualMode = Mode.Edition;
    }

    public void SetNewMode(Mode mode)
    {
        actualMode = mode;
        UpdateConstraintMode();
        OnModeChanged?.Invoke(mode);
    }


    public void UpdateConstraintMode()
    {
        switch (actualMode)
        {
            case Mode.Edition:
                CanMoveObject(true);
                CanMoveToolTip(true);
                break;
            case Mode.Visualization:
                CanMoveObject(false);
                CanMoveToolTip(false);
                break;
            default:
                Debug.LogError("Cannot find this mode: " + actualMode);
                break;
        }
    }


    //public void UpdateConstraintMode()
    //{
    //    switch (actualMode)
    //    {
    //        case Mode.Catalog:
    //            CanMoveObject(true);
    //            CanMoveToolTip(false);
    //            CanMovePillar(false);
    //            break;
    //        case Mode.Annotation:
    //            CanMoveObject(false);
    //            CanMoveToolTip(true);
    //            CanMovePillar(false);
    //            break;
    //        case Mode.Visualization:
    //            CanMoveObject(false);
    //            CanMoveToolTip(false);
    //            CanMovePillar(false);
    //            break;
    //        case Mode.Build:
    //            CanMoveObject(false);
    //            CanMoveToolTip(false);
    //            CanMovePillar(true);
    //            break;
    //        case Mode.AddObject:
    //            CanMoveObject(false);
    //            CanMoveToolTip(false);
    //            CanMovePillar(false);
    //            break;
    //        default:
    //            Debug.LogError("Cannot find this mode: " + actualMode);
    //            break;
    //    }
    //}

    private void CanMoveObject(bool boolean)
    {
        GameObject[] objectAnnotation = GameObject.FindGameObjectsWithTag(StringResources.TAG_OBJECT_ANNOTATION);
        foreach(GameObject obj in objectAnnotation)
        {
            Transform box = obj.transform.Find(StringResources.OBJECT_BOX);
            box.GetComponent<ObjectManipulator>().enabled = boolean;
            box.GetComponent<BoundsControl>().enabled = boolean;
            obj.transform.Find(StringResources.OBJECT_ANNOTATION_MENU).gameObject.SetActive(false);
        }
    }

    private void CanMoveToolTip(bool boolean)
    {
        GameObject[] tooltips = GameObject.FindGameObjectsWithTag(StringResources.TAG_TOOLTIP);
        foreach (GameObject tooltip in tooltips)
        {
            //Stop manipulating the tooltip
            Transform tooltipTransform = tooltip.transform;
            tooltipTransform.GetComponentInChildren<BoxCollider>().enabled = boolean;
            // (de)activate the sphere of the tooltip
            GameObject sphere = tooltipTransform.GetChild(1).gameObject;
            sphere.GetComponent<ManipulationHandler>().enabled = boolean;
         //   sphere.SetActive(boolean); 
            //(de)activate the link between the sphere and the text of the tooltip
         //   tooltip.GetComponent<MixedRealityLineRenderer>().enabled = boolean; 
            //(de)activate tooltip menus
            GameObject pivot = tooltipTransform.GetChild(2).gameObject; //retrieve the pivot part
            try
            {
                pivot.GetComponent<Selection>().DeselectToolTip(); //deactivate the menu
            }
            catch { }
        }
    }

    private void CanMovePillar(bool canMove)
    {
        GameObject[] pillars = GameObject.FindGameObjectsWithTag(StringResources.TAG_PILLAR);
        foreach (var pillar in pillars)
        {
            Transform pillarT = pillar.transform;
            //pillar.transform.GetComponent<BoxCollider>().enabled = canMove;
            pillarT.GetComponent<ObjectManipulator>().enabled = canMove;
            pillarT.GetComponent<BoundsControl>().enabled = canMove;
        }
    }


}
