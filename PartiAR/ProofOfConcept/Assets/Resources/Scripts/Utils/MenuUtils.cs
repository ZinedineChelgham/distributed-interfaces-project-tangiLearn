using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class MenuUtils
{

    public static IEnumerator WaitForUpdateGridCollection(GameObject gridObjectCollection)
    {
        yield return null;
        gridObjectCollection.GetComponent<GridObjectCollection>().UpdateCollection();
    }

    public static IEnumerator WaitForScrollingCollection(GameObject ScrollingObjectCollection)
    {
        yield return new WaitForSeconds(0.5f);
        ScrollingObjectCollection.GetComponent<ScrollingObjectCollection>().UpdateContent();
    }
}
