using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;
using UnityEngine.UI;   
using UnityEngine.Video;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System;
using static Microsoft.MixedReality.Toolkit.Utilities.ClippingPrimitive;

/* ------------------------------------------------------------------------- */
/* GESTION DE L'AFFICHAGE DE LA LISTE D'ANNOTATIONS ET DE LEUR VISUALISATION */
/* ------------------------------------------------------------------------- */

public class AnnotationCollection : Collection
{
    public List<string> annotations = new List<string>();  // Liste des annotations à afficher
    public string selectedPath;                            // Chemin de l'annotation sélectionnée    
    public GameObject returnButton;                        // Bouton de retour
    public GameObject annotationViewMenu;                  // Menu de visualisation des annotations
    public bool shouldReload;                              // Booléen pour savoir si on reload le menu 
    public GameObject tooltip;                             // Tooltip de l'objet annoté
    public GameObject selectAFileText;                     // Texte "Select a File"



    /* --- VARIABLES POUR LA GESTION DES PLAYERS AUDIO ET VIDEO --- */
    public AudioSource previousAudioSource;    // AudioSource du fichier audio précédemment joué
    public string previousSelectedPath;        // Chemin du fichier précédemment selectionné

    /* --- VARIABLES POUR SUPPRIMER UNE ANNOTATION --- */
    public GameObject deleteAnnotationMenu;    // Menu de suppression d'annotation
    public GameObject deleteButton;            // Bouton de suppression d'annotation
    public GameObject cancelButton;            // Bouton d'annulation de suppression d'annotation
    public GameObject confirmButton;           // Bouton de confirmation de suppression d'annotation
    public GameObject textDeleteAnnotation;    // Question de confirmation de suppression de l'annotation
    public GameObject confirmationText;        // Texte de confirmation de suppression de l'annotation


    public void Start(){
        shouldReload = true;
        OnEnable();
    }

    

    public void OnEnable(){
        previousAudioSource = null;
        previousSelectedPath = "";
        AddNewButtons();
        returnButton.SetActive(false);
    }


    /* -------------------------------------------------- */
    /* --- AFFICHAGE DE LA COLLECTION DES ANNOTATIONS --- */
    /* -------------------------------------------------- */
    protected override void AddNewButtons(){

        // Supprimer les anciens boutons

        foreach (Transform child in transform)
        {
        if(child.gameObject.name != "ButtonPrefab"){
            Destroy(child.gameObject);
        }
        }


        List<string> fp = tooltip.GetComponent<SceneObject>().filepathList;
        annotations = fp;        

        if(annotations.Count == 0){ // Si il n'y a pas d'annotation
            GameObject annotation = Instantiate(buttonPrefab, transform);
            annotation.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = "No annotation yet.";
        }

        else{ // Si il y a des annotations
  
        foreach(string str in annotations){
            

            GameObject annotation = Instantiate(buttonPrefab, transform);
            annotation.GetComponentInChildren<ButtonConfigHelper>().OnClick.AddListener(() =>
            {

                /* --- GESTION DE LA SUPPRESSION D'ANNOTATION --- */

                // On affiche le menu de suppression
                deleteAnnotationMenu.SetActive(true);
                deleteButton.SetActive(true);

                deleteButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                {
                    // On affiche la confirmation
                    deleteButton.SetActive(false);
                    cancelButton.SetActive(true);
                    confirmButton.SetActive(true);
                    textDeleteAnnotation.SetActive(true);

                    cancelButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                    {
                        // On cache la confirmation
                        deleteButton.SetActive(true);
                        cancelButton.SetActive(false);
                        confirmButton.SetActive(false);
                        textDeleteAnnotation.SetActive(false);
                    });

                    confirmButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
                    {
                        // On supprime l'annotation
                        tooltip.GetComponent<SceneObject>().RemoveToPathList(selectedPath);

                        // On cache la confirmation
                        deleteAnnotationMenu.SetActive(false);
                        cancelButton.SetActive(false);
                        confirmButton.SetActive(false);
                        textDeleteAnnotation.SetActive(false);

                        // On reload le menu
                        backToList();
                        confirmationText.SetActive(true);
                        StartCoroutine(waitBeforeDisableConfirmationText());
                    });

                });

                /* --- GESTION DE LA VISUALISATION D'ANNOTATION --- */

                selectedPath = str.Replace("\\", "/"); // On remplace les \ par des / pour éviter les problèmes de chemin

                // Supprimer les anciens boutons
                foreach (Transform child in transform)
                {
                    if(child.gameObject.name != "ButtonPrefab"){
                        Destroy(child.gameObject);
                    }
                }

                // Afficher le bouton de retour
                returnButton.SetActive(true);

                // Supprimer le texte "Select a File"
                selectAFileText.SetActive(false);


                // Afficher le fichier
                if(str.Contains(".png") || str.Contains(".jpg") || str.Contains(".jpeg")){ // Si c'est une image
                    Debug.Log("Fichier image");
                    GameObject importFileButton = Instantiate(videoViewPrefab, transform);
                    GameObject image = GameObject.Find("UIButtonSpriteIconImage").gameObject;
                    // Get the path to the persistent data location
                    var path = Path.Combine(Application.persistentDataPath + "/Saves/", selectedPath);

                    byte[] result;

                    try
                    {
                        result = File.ReadAllBytes(path);
                        Debug.Log("Successfully opened " + path);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"Failed to read from {path} with exception {e}");
                        result = null;
                    }
                    GameObject video = GameObject.Find("VideoScreen").gameObject;
                    RawImage rawImage = video.GetComponent<RawImage>();
                    Texture2D texture = new Texture2D(2, 2);
                    texture.LoadImage(result);
                    rawImage.texture = texture;
          //          FileManager.LoadPhoto(selectedPath, image.GetComponent<SpriteRenderer>()); // Chargement de la photo
          //          importFileButton.transform.GetComponentInChildren<RawImage>().gameObject.SetActive(false);     
                    importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);

                }
                else if(str.Contains(".mp4")){ // Si c'est une vidéo
                    Debug.Log("Fichier vidéo");    
                    GameObject importFileButton = Instantiate(videoViewPrefab, transform);

                    GameObject image = GameObject.Find("UIButtonSpriteIconImage").gameObject;  
                    
                    VideoPlayer videoPlayer = GetComponent<VideoPlayer>();

                    FileManager.LoadVideo(selectedPath, videoPlayer);

                    GameObject video = GameObject.Find("VideoScreen").gameObject;
                    RawImage rawImage = video.GetComponent<RawImage>();
                    videoPlayer.targetTexture = new RenderTexture(1920, 1080, 0);
                    rawImage.texture = videoPlayer.targetTexture;
                            
                    videoPlayer.Play();                 

                    importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);                
                }
                else if(str.Contains(".wav") || str.Contains(".mp3")){ // Si c'est un audio
                    Debug.Log("Fichier audio");  

                    GameObject importFileButton = Instantiate(viewPrefab, transform);

                    ButtonConfigHelper buttonConfigHelper = importFileButton.transform.GetComponentInChildren<ButtonConfigHelper>();

                    AudioSource audioSource = GetComponent<AudioSource>();

                    if(previousSelectedPath != selectedPath){
                        
                        if (FileManager.LoadFromFileBytes(selectedPath, out byte[] audio))
                        {
                            var audioClip = WavUtility.ToAudioClip(audio);



                            if (audioClip.loadState == AudioDataLoadState.Loaded)
                            {
                                audioSource.clip = audioClip;
                        };
                        }
                    }

                    previousSelectedPath = selectedPath;
                    previousAudioSource = audioSource;
                    
                    buttonConfigHelper.MainLabelText = selectedPath + " is playing.";
                    previousAudioSource.Play();                  
                    
                    importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);                    
                }
                else{ // Si c'est un fichier texte
                    Debug.Log("Fichier texte");
                    stopMusicAndVideo();
                    GameObject importFileButton = Instantiate(viewPrefab, transform);
                    importFileButton.transform.GetComponentInChildren<RawImage>().gameObject.SetActive(false);     
                    ButtonConfigHelper buttonConfigHelper = importFileButton.transform.GetComponentInChildren<ButtonConfigHelper>();
                    buttonConfigHelper.MainLabelText = "Contenu du fichier : \n" + File.ReadAllText(selectedPath);
                    importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);
                }
            });

            string nameFile = str.Substring(str.LastIndexOf("/") + 1); // On récupère le nom du fichier
            annotation.transform.GetComponentInChildren<ButtonConfigHelper>().MainLabelText = nameFile; // On affiche le nom du fichier
        }

        StartCoroutine(waitAFrame()); // On attend une frame avant de mettre à jour la collection
        StartCoroutine(waitAFrameForScrolling());  // On attend une frame avant de mettre à jour le scroll de la collection

        if(shouldReload){
            shouldReload = false;
            annotationViewMenu.SetActive(false);
            waitHalfASecond();
            annotationViewMenu.SetActive(true);
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




/* --------------------------------------------------------------------- */
/* Permet d'arreter la musique ou la video qui est en train d'être jouée */
/* --------------------------------------------------------------------- */
public void stopMusicAndVideo(){
    AudioSource audioSource = GetComponent<AudioSource>();
    VideoPlayer videoPlayer = GetComponent<VideoPlayer>();
    if(audioSource.isPlaying == true){
        audioSource.Stop();
    }
    if(videoPlayer.isPlaying == true){
        videoPlayer.Stop();
    }
}

/* ------------------------------------------------------ */
/* Fonction permettant de revenir en arrière dans le menu */
/* ------------------------------------------------------ */
public void backToList(){
    // Supprimer les anciens boutons
    foreach (Transform child in transform)
        {
        if(child.gameObject.name != "ButtonPrefab"){
            Destroy(child.gameObject);
        }
    }

    // Afficher le texte "Select a File"
    selectAFileText.SetActive(true);

    stopMusicAndVideo();
    shouldReload = true;

    AddNewButtons();
    returnButton.SetActive(false);
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

    stopMusicAndVideo();
    shouldReload = true;
    annotationViewMenu.SetActive(false);
}

/* ----------------------------------------------------------- */
/* Fonction permettant de mettre à jour le contenu de la liste */
/* ----------------------------------------------------------- */
public void setAnnotationsList(List<string> annotations){
    this.annotations = annotations;
}
    


}