using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//Class used to display the menu annotation depending of the proximity of the user
public class ProximityDisplay : MonoBehaviour
{
    public float triggerDistance = 1.5f; // d�finir la distance � laquelle l'objet doit s'afficher
    public GameObject targetObject; // l'objet que vous voulez montrer/cacher

    private bool wasDisabledByUser = false;
    private bool userInTriggerDistance = false;

    void Update()
    {
        float currentDistance = Vector3.Distance(Camera.main.transform.position, transform.position);
        bool isInTriggerDistance = currentDistance < triggerDistance;

        // Si l'utilisateur entre dans la zone d�clenchante
        if (isInTriggerDistance && !userInTriggerDistance && !wasDisabledByUser)
        {
            targetObject.SetActive(true);
        }
        // Si l'utilisateur sort de la zone d�clenchante
        else if (!isInTriggerDistance && userInTriggerDistance)
        {
            targetObject.SetActive(false);
            wasDisabledByUser = false;
        }

        userInTriggerDistance = isInTriggerDistance;
    }

    public void DisableObjectByUser()
    {
        // Cette fonction doit �tre appel�e quand l'utilisateur d�sactive l'objet manuellement
        targetObject.SetActive(false);
        wasDisabledByUser = true;
    }
}