using Microsoft.MixedReality.Toolkit.UI;
using UnityEngine;

public class Arrow : MonoBehaviour
{
    public GameObject ArrowObject;
    public GameObject rotationSphere;
    public GameObject bigSphere; // La grande sphère.
    public GameObject ancreArrow;
    public GameObject menu;

    private ObjectManipulator manipulator;
    private bool isBeingManipulated = false;

    // Définir un décalage pour éloigner la rotationSphere de la pointe de la flèche.
    private float offsetDistance = 0.02f;

    // Add LineRenderer
    [SerializeField]
    private LineRenderer lineRenderer1;
    [SerializeField]
    private LineRenderer lineRenderer2;
    public float lineLength = 40.0f; // You can adjust this for how far you want the line to go.
    public float menuOffset = 0.5f;  // Distance to stop and start the line around the menu

    public delegate void ArrowDeleteHandler(Arrow arrow);
    public event ArrowDeleteHandler OnArrowDelete;

    void Start()
    {
        manipulator = rotationSphere.GetComponent<ObjectManipulator>();

        // Ajouter les méthodes aux événements.
        manipulator.OnManipulationStarted.AddListener((data) => isBeingManipulated = true);
        manipulator.OnManipulationEnded.AddListener((data) => isBeingManipulated = false);

        // Init LineRenderer
        InitLineRenderer(lineRenderer1);
        InitLineRenderer(lineRenderer2);
        ChangeRotationSphereColor(Color.yellow);
    }

    void Update()
    {
        if (isBeingManipulated)
        {
            if(!menu.activeSelf) {
                OnTouchRotationSphere();
            }
            // Déplacer la rotationSphere pour qu'elle reste sur la surface de la grande sphère et ajouter le décalage.
            Vector3 direction = (rotationSphere.transform.position - bigSphere.transform.position).normalized;
            rotationSphere.transform.position = bigSphere.transform.position + direction * (bigSphere.transform.localScale.x / 2 + offsetDistance);

            // Faire pivoter la flèche.
            ancreArrow.transform.LookAt(rotationSphere.transform.position);
        }

        // Get menu width
        BoxCollider menuCollider = menu.transform.GetChild(0).GetComponent<BoxCollider>();
        if (menuCollider == null)
        {
            Debug.LogError("No BoxCollider component found on the Menu GameObject.");
            return;
        }

        // Calculate the diagonal of the menu (assuming it's a box)
        float menuWidth = menuCollider.size.x;
        float menuHeight = menuCollider.size.y;
        float menuDepth = menuCollider.size.z;

        float menuDiagonal = Mathf.Sqrt(menuWidth * menuWidth + menuHeight * menuHeight + menuDepth * menuDepth);

        // Calculate offsets
        float beforeMenuOffset = menuDiagonal;
        float afterMenuOffset = menuDiagonal;

        // Update LineRenderer
        Vector3 arrowToMenuDirection = (menu.transform.position - ArrowObject.transform.position).normalized;
        Vector3 arrowToSphereDirection = (rotationSphere.transform.position - ArrowObject.transform.position).normalized;

        lineRenderer1.SetPosition(0, ArrowObject.transform.position); // The start of the first line is the position of the arrow.
        lineRenderer1.SetPosition(1, menu.transform.position - arrowToMenuDirection * beforeMenuOffset); // The end of the first line is just before the menu.
        lineRenderer2.SetPosition(0, menu.transform.position + arrowToMenuDirection * afterMenuOffset); // The start of the second line is just after the menu.
        lineRenderer2.SetPosition(1, ArrowObject.transform.position + arrowToSphereDirection * 2 * lineLength); // The end of the second line is in the direction of the rotationSphere extended by lineLength

    }

    public void RotateToTouch(Vector3 targetObjectPosition)
    {
        // Calculer la direction de la cible par rapport à la source

        // Calculer la nouvelle rotation vers la cible
        ancreArrow.transform.LookAt(targetObjectPosition);
        Vector3 direction = (targetObjectPosition - bigSphere.transform.position).normalized;
        rotationSphere.transform.position = bigSphere.transform.position + direction * (bigSphere.transform.localScale.x / 2 + offsetDistance);
    }

    public void OnTouchRotationSphere()
    {
        Debug.Log("ARROW ROTATION SPHERE TOUCHED");
        if (!menu.activeSelf)
        {
            RotationSphereSelected();
        }
        else
        {
            RotationSphereUnselected();
        }
    }

    public void RotationSphereUnselected()
    {
        menu.SetActive(false);
        lineRenderer1.enabled = false;
        lineRenderer2.enabled = false;
        ChangeRotationSphereColor(Color.blue);
    }

    public void RotationSphereSelected()
    {
        menu.SetActive(true);
        lineRenderer1.enabled = true;
        lineRenderer2.enabled = true;
        ChangeRotationSphereColor(Color.red);
    }

    private void InitLineRenderer(LineRenderer lr)
    {
        Material lineMaterial = Resources.Load<Material>("Materials/TransparentLinesMaterial");
        lr.material = lineMaterial;
        lr.startWidth = 0.01f; // You can adjust this for the line width.
        lr.endWidth = 0.01f;
        lr.startColor = Color.red;
        lr.endColor = Color.red;
        lr.positionCount = 2; // For a simple line, we only need 2 points.
    }

    public void ChangeRotationSphereColor(Color newColor)
    {
        Renderer renderer = rotationSphere.GetComponent<Renderer>();
        if (renderer != null)
        {
            renderer.material.color = newColor;
        }
        else
        {
            Debug.LogError("No Renderer component found on the RotationSphere GameObject.");
        }
    }

    public void OnClickDelete()
    {
        OnArrowDelete?.Invoke(this);
    }

    public void OnGlobalVisualisationMode()
    {

    }
}