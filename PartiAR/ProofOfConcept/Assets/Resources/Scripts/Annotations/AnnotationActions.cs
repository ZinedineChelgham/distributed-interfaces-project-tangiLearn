using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using Microsoft.MixedReality.Toolkit.Utilities.Solvers;
using UnityEngine;

public class AnnotationActions : MonoBehaviour
{
    public GameObject objet;

    private GameObject box;
    private float fac = 0.2f;
    private float plus = 0.05f;

    void Start()
    {
        ActivateMenu(true);
        box = objet.transform.GetChild(0).gameObject;
    }

    public void ActivateMenu(bool activate)
    {
        if (activate)
        {
            GameObject.Find("ObjectController").GetComponent<VirtualObjectManager>().Select(transform.parent.gameObject);
        }
        gameObject.SetActive(activate);
    }

    public void DeleteObjectAnnotation() //supprimer l'objet
    {
        GameObject.Find(StringResources.TAG_SCENE_VIEW_CONTROLLER).GetComponent<SceneViewController>().objects.Remove(objet.GetComponent<SceneObject>());
        Destroy(objet);
    }

    public void Update()
    {
        if(box == null)
        {
            box = transform.parent.GetChild(0).gameObject;
        }
        float scaleZ = fac * box.transform.localScale.z;
        float MeshZ = scaleZ * box.GetComponentInChildren<MeshFilter>().mesh.bounds.size.z / 2;
        float factorZ = Mathf.Abs(Vector3.Dot(objet.transform.forward, Camera.main.transform.forward));

        float scaleY = fac * box.transform.localScale.y;
        float MeshY = scaleY * box.GetComponentInChildren<MeshFilter>().mesh.bounds.size.y / 2;
        float factorY = Mathf.Abs(Vector3.Dot(objet.transform.up, Camera.main.transform.forward));

        float scaleX = fac * box.transform.localScale.x;
        float MeshX = scaleX * box.GetComponentInChildren<MeshFilter>().mesh.bounds.size.x / 2;
        float factorX = Mathf.Abs(Vector3.Dot(objet.transform.right, Camera.main.transform.forward));

        GetComponent<Orbital>().LocalOffset = new Vector3(0, -0.1f, MeshZ * factorZ + MeshY * factorY + MeshX * factorX + plus);
    }

}
