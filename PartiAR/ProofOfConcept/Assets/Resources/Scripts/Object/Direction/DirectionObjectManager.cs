using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DirectionObjectManager : MonoBehaviour
{
    public List<string> directionsPossible = new List<string>();
    [SerializeField]
    GameObject directionHolder;
    [SerializeField]
    GameObject directionObjectPrefab;
    [SerializeField]
    float distanceFromPlayer = 1f; // Distance à laquelle placer l'objet devant le joueur.
    Camera mainCamera; // Référence à la caméra du joueur.
    // Start is called before the first frame update
    void Start()
    {
        mainCamera = Camera.main;
        directionsPossible.Add("Batiment A");
        directionsPossible.Add("Batiment B");
        directionsPossible.Add("Batiment C");
        directionsPossible.Add("Batiment D");
        directionsPossible.Add("Batiment E");
        directionsPossible.Add("Batiment F");
        directionsPossible.Add("Inria");
        directionsPossible.Add("Secretariat");
    }

    public GameObject AddDirectionObject()
    {
        // Calcul de la position devant le joueur.
        Vector3 positionInFrontOfPlayer = mainCamera.transform.position + mainCamera.transform.forward * distanceFromPlayer;
        // Instanciation de l'objet à cette position.
        GameObject newDirectionObject = Instantiate(directionObjectPrefab, positionInFrontOfPlayer, Quaternion.identity);
        newDirectionObject.transform.SetParent(directionHolder.transform);
        return newDirectionObject;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
