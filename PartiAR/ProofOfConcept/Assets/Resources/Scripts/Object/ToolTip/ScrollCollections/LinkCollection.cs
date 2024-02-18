using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;
using UnityEngine.UI;   
using UnityEngine.Video;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using Microsoft.MixedReality.Toolkit.UI.BoundsControl;
using System.Security.Cryptography;
using Microsoft.MixedReality.Toolkit.Rendering;

/* -------------------------------------------------------- */
/* GESTION DE L'AFFICHAGE DE LA LISTE POUR LIER DEUX OBJETS */
/* -------------------------------------------------------- */

public class LinkCollection : Collection
{
    public List<SceneObject> objs;         // Liste des objets à afficher
    public string selectedObject;                          // Objet selectionné     
    public GameObject objectViewMenu;                      // Menu de visualisation des objets
    public bool shouldReload;                              // Booléen pour savoir si on reload le menu 
    public GameObject tooltip;                             // Tooltip de l'objet annoté
    public GameObject sceneViewControllerObject;


   /* --- VARIABLES POUR LE LIEN --- */
    public GameObject linkMenu;              // Menu de lien 
    public GameObject linkButton;            // Bouton de lien
    public GameObject cancelButton;          // Bouton d'annulation
    public GameObject confirmButton;         // Bouton de confirmation 
    public GameObject textLinkObject;        // Question de confirmation 
    public GameObject confirmationText;      // Texte de confirmation après avoir fait le lien
    public LineRenderer lineRenderer;        // Ligne de lien entre deux objets
    public List<SceneObject> objectsLinked = new List<SceneObject>();
    public LinkedLineRenderer lastLineRendererClicked;
    public MaterialInstance lastMaterialModified;
    public Material materialLine;


    public void Start(){
        // shouldReload = true;
       // OnEnable();
        Debug.Log("START LINKCOLLECTION");
    }

    

    public void OnEnable(){
        sceneViewControllerObject = GameObject.Find("SceneViewController");
        AddNewButtons();
    }

    public void OnDisable()
    {
    }


    /* --------------------------------------------- */
    /* --- AFFICHAGE DE LA COLLECTION DES OBJETS --- */
    /* --------------------------------------------- */
    protected override void AddNewButtons(){

        // Supprimer les anciens boutons
        foreach (Transform child in transform)
        {
            if (child.gameObject.name != "ButtonPrefab")
            {
                Destroy(child.gameObject);
            }
        }


        // TODO --> Récupérer la liste de string à afficher
        List<SceneObject> objs = new List<SceneObject>();
        foreach(RealObject realObject in GameObject.Find("ObjectController").GetComponent<RealObjectManager>()._realObjects)
        {
            objs.Add(realObject.GetComponent<SceneObject>());
        }
        objs.AddRange(sceneViewControllerObject.GetComponent<SceneViewController>().objects);
        //  objectsToLink.Remove(transform.root.GetComponent<SceneObject>());



        if (objs.Count == 0){ // Si il n'y a pas d'objet
            GameObject obj = Instantiate(buttonPrefab, transform);
            obj.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = "No objects yet.";
        }

        else{ // Si il y a des objets
  
        Debug.Log("SIZE DE LA LISTE " + objs.Count);
        foreach(SceneObject sceneObject in objs){
            Debug.Log("INSTANCIE BUTTON");
            GameObject obj = Instantiate(buttonPrefab, transform);
            GameObject LinkedLineHolder = new GameObject();
            LinkedLineRenderer linkedLineRenderer = LinkedLineHolder.AddComponent<LinkedLineRenderer>();
            linkedLineRenderer.initializedButton(obj);
            linkedLineRenderer.objectLink = sceneObject.gameObject;
            linkedLineRenderer.menulink = gameObject;
            obj.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = sceneObject.nameObject;//sceneObject.my_id.ToString(); // On affiche le nom de l'objet
            obj.transform.localPosition = new Vector3(obj.transform.localPosition.x, obj.transform.localPosition.y, 0);
            linkedLineRenderer.lineRenderer.material = materialLine;
            linkedLineRenderer.lineRenderer.startColor = Color.blue;
            linkedLineRenderer.lineRenderer.endColor = Color.blue;
            if (objectsLinked.Contains(sceneObject) && !linkedLineRenderer.hasBeenClicked)
            {
                    MaterialInstance materialInstance = obj.transform.GetChild(0).GetChild(2).GetChild(0).GetComponent<MaterialInstance>();
                    materialInstance.Material.color = Color.blue;
                    linkedLineRenderer.OnClick();
            }
            obj.GetComponentInChildren<ButtonConfigHelper>().OnClick.AddListener(() =>
            {
                /* --- GESTION DES LIENS --- */
                linkedLineRenderer.OnClick();
                MaterialInstance materialInstance = obj.transform.GetChild(0).GetChild(2).GetChild(0).GetComponent<MaterialInstance>();
                if (lastLineRendererClicked != null)
                {
                    lastLineRendererClicked.lineRenderer.startColor = Color.blue;
                    lastLineRendererClicked.lineRenderer.endColor = Color.blue;
                    lastMaterialModified.Material.color = lastLineRendererClicked.hasBeenClicked ? Color.blue : Color.black;
                }
                if (linkedLineRenderer.hasBeenClicked)
                {
                    objectsLinked.Add(sceneObject);
                    materialInstance.Material.color = Color.yellow;
                } else
                {
                    objectsLinked.Remove(sceneObject);
                    materialInstance.Material.color = Color.black;
                } 
                lastMaterialModified = materialInstance;
                lastLineRendererClicked = linkedLineRenderer;
                lastLineRendererClicked.lineRenderer.startColor = Color.yellow;
                lastLineRendererClicked.lineRenderer.endColor = Color.yellow;
                // On affiche le menu du bas
                linkMenu.SetActive(true);
                linkButton.SetActive(true);

                linkButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                {
                    // On affiche la confirmation
                    linkButton.SetActive(false);
                    cancelButton.SetActive(true);
                    confirmButton.SetActive(true);
                    textLinkObject.SetActive(true);

                    cancelButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                    {
                        // On cache la confirmation
                        linkButton.SetActive(true);
                        cancelButton.SetActive(false);
                        confirmButton.SetActive(false);
                        textLinkObject.SetActive(false);
                    });

                    confirmButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                    {
                        
                        // TODO --> Effectuer une action pour lier les deux objets



                        // On cache la confirmation
                        linkMenu.SetActive(false);
                        cancelButton.SetActive(false);
                        confirmButton.SetActive(false);
                        textLinkObject.SetActive(false);

                        // On reload le menu
                        confirmationText.SetActive(true);
                        StartCoroutine(waitBeforeDisableConfirmationText());
                    });

                });


            
        });

        StartCoroutine(waitAFrame()); // On attend une frame avant de mettre à jour la collection
        StartCoroutine(waitAFrameForScrolling());  // On attend une frame avant de mettre à jour le scroll de la collection

        if(shouldReload){
            shouldReload = false;
            objectViewMenu.SetActive(false);
            waitHalfASecond();
            objectViewMenu.SetActive(true);
        }
       }
     }
    }
               


/* ----------------------------------------------------------------- */
/*  Permet d'attendre une frame avant de mettre à jour la collection */
/* ----------------------------------------------------------------- */
private IEnumerator waitAFrame(){
    yield return null;
    GetComponent<GridObjectCollection>().UpdateCollection(); // On met à jour la liste des fichiers
}
/* ----------------------------- */
/*  Permet d'attendre 0.5 second */
/* ----------------------------- */
private IEnumerator waitHalfASecond(){
    yield return new WaitForSeconds(0.5f);
}

/* -------------------------------------------------- */
/*  Permet d'attendre pour le scroll de la collection */
/* -------------------------------------------------- */
private IEnumerator waitAFrameForScrolling(){
    yield return new WaitForSeconds(0.5f);
    scrollingObjectCollection.UpdateContent();
}

 /* -------------------------------------------------------------- */
/* Permet d'attendre avant de désactiver le texte de confirmation */
/* -------------------------------------------------------------- */
private IEnumerator waitBeforeDisableConfirmationText(){
    yield return new WaitForSeconds(3);
    confirmationText.SetActive(false);
}

/* ------------------------------------- */
/* Fonction permettant de fermer le menu */
/* ------------------------------------- */
public void closeMenu(){
    foreach (Transform child in transform)
        {
        if(child.gameObject.name != "ButtonPrefab"){
            Destroy(child.gameObject);
        }
    }

    shouldReload = true;
    objectViewMenu.SetActive(false);
}

/* ----------------------------------------------------------- */
/* Fonction permettant de mettre à jour le contenu de la liste */
/* ----------------------------------------------------------- */
public void setObjsList(List<SceneObject> objs){
    this.objs = objs;
}
    


}