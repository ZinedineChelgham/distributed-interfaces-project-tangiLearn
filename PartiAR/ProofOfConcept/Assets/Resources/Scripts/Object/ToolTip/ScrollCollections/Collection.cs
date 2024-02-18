using Microsoft.MixedReality.Toolkit.UI;
using UnityEngine;

public abstract class Collection : MonoBehaviour
{

    public GameObject buttonPrefab;                             // Button prefab à afficher dans une collection
    public GameObject viewPrefab;                               // Text and audio view
    public GameObject imageViewPrefab;                          // image view
    public GameObject videoViewPrefab;                          // Video view
    public ScrollingObjectCollection scrollingObjectCollection; // Collection de boutons
    
    void OnEnable()
    {
        AddNewButtons();
        scrollingObjectCollection.UpdateContent();
    }
    
    protected abstract void AddNewButtons();
}
