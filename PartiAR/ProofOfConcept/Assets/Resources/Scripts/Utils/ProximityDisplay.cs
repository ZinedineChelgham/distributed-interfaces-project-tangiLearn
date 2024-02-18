using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//Class used to display the menu annotation depending of the proximity of the user
public class ProximityDisplay : MonoBehaviour
{
    public float triggerDistance = 1.5f; // définir la distance à laquelle l'objet doit s'afficher
    public GameObject targetObject; // l'objet que vous voulez montrer/cacher

    private bool wasDisabledByUser = false;
    private bool userInTriggerDistance = false;

    void Update()
    {
        float currentDistance = Vector3.Distance(Camera.main.transform.position, transform.position);
        bool isInTriggerDistance = currentDistance < triggerDistance;

        // Si l'utilisateur entre dans la zone déclenchante
        if (isInTriggerDistance && !userInTriggerDistance && !wasDisabledByUser)
        {
            targetObject.SetActive(true);
        }
        // Si l'utilisateur sort de la zone déclenchante
        else if (!isInTriggerDistance && userInTriggerDistance)
        {
            targetObject.SetActive(false);
            wasDisabledByUser = false;
        }

        userInTriggerDistance = isInTriggerDistance;
    }

    public void DisableObjectByUser()
    {
        // Cette fonction doit être appelée quand l'utilisateur désactive l'objet manuellement
        targetObject.SetActive(false);
        wasDisabledByUser = true;
    }
}