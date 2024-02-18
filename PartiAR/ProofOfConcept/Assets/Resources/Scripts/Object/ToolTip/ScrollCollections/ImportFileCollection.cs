using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;
using UnityEngine.UI;   
using UnityEngine.Video;
using System.IO;
using System.Collections;


/* -------------------------------------------------------- */
/* GESTION DE L'AFFICHAGE DE LA COLLECTION DU MENU D'IMPORT */
/* -------------------------------------------------------- */

public class ImportFileCollection : Collection
{

    public string ModeImport;                        // Page dans laquelle on est : Text, Video, Audio, Photo, All (pour tous les fichiers), View (pour la vue du fichier) 
    public string ModeView;                          // Mode de vue du fichier : Text, Video, Audio, Photo (ie. le type de fichier qu'on veut visualiser)
    public GameObject returnButton;                  // Bouton de retour en haut à droite du menu d'import 
    public GameObject saveImportFileMenu;            // Onglet de sauvegarde en bas du menu d'import
    public string selectedPath;                      // Chemin courant selectionné (ie. le chemin du fichier qu'on a selectionné)
    public string contentFile;                       // Contenu du fichier courant selectionné
    public ButtonConfigHelper currentSelectedButton; // Bouton courant selectionné dans la collection (chaque nom de fichier correspond à un bouton dans la collection)
    public GameObject selectAFileText;               // "Select a file"

    /* --- VARIABLES POUR LA GESTION DES PLAYERS AUDIO ET VIDEO --- */

    public AudioSource previousAudioSource;    // AudioSource du fichier audio précédemment joué
    public string previousSelectedPath;        // Chemin du fichier précédemment selectionné
    public bool isPlaying;                     // Indique si un fichier audio ou vidéo est en train d'être joué


    /* ---------------------------------------------------------------------- */
    /* --- REFRESH DES PLAYERS AUDIO ET VIDEO A CHAQUE CHANGEMENT DE PAGE --- */
    /* ---------------------------------------------------------------------- */
    public void OnEnable(){
        stopMusicAndVideo();
        isPlaying = false;
        previousAudioSource = null;
        previousSelectedPath = "";
    }

    /* ---------------------------------------------------------- */
    /* --- AFFICHAGE DE LA COLLECTION DES FICHIERS A IMPORTER --- */
    /* ---------------------------------------------------------- */
    protected override void AddNewButtons(){
   
        /* -------------------------------------------- */
        /* --- RECUPERATION DE LA LISTE DE FICHIERS --- */
        /* -------------------------------------------- */

        string[] fileEntriesText   = getFiles("Text");   // Liste des fichiers textes
        string[] filesEntriesVideo = getFiles("Video");  // Liste des fichiers vidéos
        string[] filesEntriesAudio = getFiles("Audio");  // Liste des fichiers audios
        string[] filesEntriesPhoto = getFiles("Photo");  // Liste des fichiers photos

        // Tous les fichiers = concaténation des listes de fichiers
        string[] allFilesEntries = new string[fileEntriesText.Length + filesEntriesVideo.Length + filesEntriesAudio.Length + filesEntriesPhoto.Length];
        fileEntriesText.CopyTo(allFilesEntries, 0);
        filesEntriesVideo.CopyTo(allFilesEntries, fileEntriesText.Length);
        filesEntriesAudio.CopyTo(allFilesEntries, fileEntriesText.Length + filesEntriesVideo.Length);
        filesEntriesPhoto.CopyTo(allFilesEntries, fileEntriesText.Length + filesEntriesVideo.Length + filesEntriesAudio.Length);

        string[] currentEntries = new string[allFilesEntries.Length];  // Liste des fichiers à afficher selon le mode d'import

        /* ------------------------------------------------------------------------------ */
        /* --- MISE A JOUR DE LA LISTE DE FICHIER A AFFICHER EN FONCTION DU MODE D'IMPORT */ 
        /* ------------------------------------------------------------------------------ */

        if(ModeImport=="Text"){
            currentEntries = fileEntriesText;
            hideIcons();
        }
        else if(ModeImport=="Video"){
            currentEntries = filesEntriesVideo;
            hideIcons();
        }
        else if(ModeImport=="Audio"){
            currentEntries = filesEntriesAudio;
            hideIcons();
        }
        else if(ModeImport=="Photo"){
            currentEntries = filesEntriesPhoto;
            hideIcons();
        }
        else if(ModeImport=="All"){
            currentEntries = allFilesEntries;
            hideIcons();
        }
        else if (ModeImport=="View"){

            if(ModeView == "Text"){
                contentFile = "Contenu du fichier : \n" + File.ReadAllText(selectedPath);
                hideIcons();
                saveImportFileMenu.SetActive(false);
            }

            else if (ModeView == "Photo"){
               
                hideIcons();
                saveImportFileMenu.SetActive(false);
            }

            else if (ModeView == "Audio"){
                currentEntries = filesEntriesAudio;
                hideIcons();
            }
        }

        /* ----------------------------------------------- */
        /* --- NETTOYAGE DE L'ANCIENNE LISTE DE FICHIER -- */
        /* ----------------------------------------------- */
        foreach (Transform child in transform)
        {
            Destroy(child.gameObject);
        }

        /* ----------------------------------------------- */
        /* --- AFFICHAGE DE LA NOUVELLE LISTE DE FICHIER - */
        /* ----------------------------------------------- */

        /* --- SI AUCUN FICHIER N'EST DISPONIBLE POUR LA CATEGORIE SELECTIONEE --- */
        if(currentEntries.Length == 0 && ModeImport!="View" ){  
            GameObject importFileButton = Instantiate(buttonPrefab, transform);
            ButtonConfigHelper buttonConfigHelper = importFileButton.transform.GetComponentInChildren<ButtonConfigHelper>();
            buttonConfigHelper.MainLabelText = "No file available";
            GetComponent<GridObjectCollection>().UpdateCollection();
        }

        /* --- SI ON VEUT VOIR LE CONTENU D'UN FICHIER --- */
        else if(ModeImport == "View"){

            clearImportFiles();

            if(ModeView == "Text"){  // AFFICHAGE DU CONTENU D'UN FICHIER TEXTE
                GameObject importFileButton = Instantiate(viewPrefab, transform);
                importFileButton.transform.GetComponentInChildren<RawImage>().gameObject.SetActive(false);     
                ButtonConfigHelper buttonConfigHelper = importFileButton.transform.GetComponentInChildren<ButtonConfigHelper>();
                buttonConfigHelper.MainLabelText = contentFile;
                importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);

            }

            if (ModeView == "Photo"){ // AFFICHAGE D'UNE PHOTO 
                GameObject importFileButton = Instantiate(imageViewPrefab, transform);
                GameObject image = GameObject.Find("UIButtonSpriteIconImage").gameObject;  
                                          
                FileManager.LoadPhoto(selectedPath, image.GetComponent<SpriteRenderer>()); // Chargement de la photo

                importFileButton.transform.GetComponentInChildren<RawImage>().gameObject.SetActive(false);     
                importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);
            }

            if (ModeView == "Audio"){ // PLAY / STOP D'UN FICHIER AUDIO

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
                        isPlaying = false;
                    }
                }

                previousSelectedPath = selectedPath;
                previousAudioSource = audioSource;
                
                if(!isPlaying){ // Si le fichier audio n'est pas en train de jouer --> play
                    buttonConfigHelper.MainLabelText = selectedPath + " is playing.";
                    previousAudioSource.Play();
                    isPlaying = true;
                }
                else{ // Si le fichier audio est en train de jouer --> stop
                    buttonConfigHelper.MainLabelText = selectedPath + " stopped playing.";
                    previousAudioSource.Stop();
                    isPlaying = false;
                }
                
                importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);     
               
            }
            
            if (ModeView == "Video"){  // PLAY / STOP D'UN FICHIER VIDEO
                GameObject importFileButton = Instantiate(videoViewPrefab, transform);

                GameObject image = GameObject.Find("UIButtonSpriteIconImage").gameObject;  
                
                VideoPlayer videoPlayer = GetComponent<VideoPlayer>();

                FileManager.LoadVideo(selectedPath, videoPlayer);

                GameObject video = GameObject.Find("VideoScreen").gameObject;
                RawImage rawImage = video.GetComponent<RawImage>();
                videoPlayer.targetTexture = new RenderTexture(1920, 1080, 0);
                rawImage.texture = videoPlayer.targetTexture;
                           

                if(isPlaying == false){ // Si le fichier vidéo n'est pas en train de jouer --> play
                    videoPlayer.Play();
                    isPlaying = true;
                }
                else{ // Si le fichier vidéo est en train de jouer --> stop
                    videoPlayer.Stop();
                    isPlaying = false;
                }

                importFileButton.transform.localPosition = new Vector3(0.01f,-0.05f, 0);

            }

        }

        /* --- SI ON VEUT VOIR LA LISTE DES FICHIERS D'UN TYPE --- */
        else{

            foreach (string file in currentEntries) // Pour chaque fichier de la liste
            {
                GameObject importFileButton = Instantiate(buttonPrefab, transform); // On crée un bouton
                importFileButton.transform.GetComponentInChildren<RawImage>().gameObject.SetActive(false);     

                string filename = Path.GetFileName(file.Replace("\\", "/"));
                ButtonConfigHelper buttonConfigHelper = importFileButton.transform.GetComponentInChildren<ButtonConfigHelper>();
                buttonConfigHelper.MainLabelText = filename; // Le contenu du bouton = le nom du fichier
               
                // On écoute si le bouton est cliqué
                buttonConfigHelper.OnClick.AddListener(() =>
                    {

                        selectedPath = file.Replace("\\", "/");
                        setModeView(selectedPath);  // On détermine le type de fichier
                        
                        if(buttonConfigHelper != currentSelectedButton){ // Si le bouton n'est pas déjà sélectionné --> on met à jour l'onglet de sauvegarde

                            ButtonConfigHelper bt = saveImportFileMenu.transform.GetComponentsInChildren<ButtonConfigHelper>()[0];
                            if((ModeView=="Audio") || (ModeView=="Video")){  // Si c'est un fichier audio ou vidéo
                                setIconPlay(bt);  // On affiche un bouton "Play"
                            }
                            else{
                                setIconVisualize(bt); // On affiche un bouton "Visualiser" (la loupe)
                            }
                            currentSelectedButton = buttonConfigHelper; 
                        }

                        saveImportFileMenu.SetActive(true); // On affiche l'onglet de sauvegarde


                        if((ModeView=="Audio") || (ModeView=="Video")){ // Si on est en mode audio ou video, on écoute si le bouton "Play" 
                                                                        // est cliqué pour l'updater en "Pause" et démarrer ou arreter la musique

                            ButtonConfigHelper bt = saveImportFileMenu.transform.GetComponentsInChildren<ButtonConfigHelper>()[0];
                            bt.OnClick.AddListener(() => { PlayStop(bt); });
                        }

                    });

                    StartCoroutine(waitAFrame());
                    StartCoroutine(waitAFrameForScrolling());

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

    /* -------------------------------------------------- */
    /*  Permet d'attendre pour le scroll de la collection */
    /* -------------------------------------------------- */
    private IEnumerator waitAFrameForScrolling(){
        yield return new WaitForSeconds(0.5f);
        scrollingObjectCollection.UpdateContent();
    }

    /* ---------------------------------- */
    /* Affiche la collection de fichiers  */
    /* ---------------------------------- */
    public void displayImportFiles(){
        AddNewButtons();
    }

    /* ------------------------- */
    /* Cache le bouton de retour */
    /* ------------------------- */
    public void hideIcons(){
        returnButton.SetActive(true);
    }

    /* ----------------------------------------------------- */
    /* Affiche le bouton de retour et l'onglet de sauvagarde */
    /* ----------------------------------------------------- */
    public void showIcons(){
        returnButton.SetActive(false);
        saveImportFileMenu.SetActive(false);
    }

    /* --------------------------------- */
    /*   Vide la collection de fichiers  */
    /* --------------------------------- */
    public void clearImportFiles(){
        foreach (Transform child in transform)
        {
            Destroy(child.gameObject);
        }
    }

    /* ------------------------------------------------ */
    /*  Determine le type d'un fichier selon son chemin */
    /* ------------------------------------------------ */
    public void setModeView(string file){
        if(file.Contains(".txt")){
            ModeView = "Text";
        }
        else if(file.Contains(".mp4")){
            ModeView = "Video";
        }
        else if(file.Contains(".wav") || file.Contains(".mp3")){
            ModeView = "Audio";
        }
        else if(file.Contains(".png") || file.Contains(".jpeg") || file.Contains(".jpg")){
            ModeView = "Photo";
        }
    }

    /* ----------------------------------------- */
    /*  Assigne l'icon de "Stop" au bouton Play */
    /* ----------------------------------------- */
    public void setIconStop(ButtonConfigHelper bt){
        bt.MainLabelText = "Stop";
        Texture2D quad = Resources.Load<Texture2D>("Catalog/GeneralIcons/stop");
        bt.SetQuadIcon(quad);
    }

    /* ---------------------------------------- */
    /*  Assigne l'icon de "Play" au bouton Play */
    /* ---------------------------------------- */
    public void setIconPlay(ButtonConfigHelper bt){
        bt.MainLabelText = "Play";
        Texture2D quad = Resources.Load<Texture2D>("Catalog/GeneralIcons/play");
        bt.SetQuadIcon(quad);
    }

    /* ---------------------------------------------------- */
    /* Assigne l'icon de "Loupe" au bouton de visualisation */
    /* ---------------------------------------------------- */
    public void setIconVisualize(ButtonConfigHelper bt){
        bt.MainLabelText = "Visualize";
        Texture2D quad =  Resources.Load<Texture2D>("Catalog/GeneralIcons/visualize");
        bt.SetQuadIcon(quad);
    }

    /* ------------------------------------------------- */
    /* Change le bouton "Play" en "Stop" et inversement */
    /* ------------------------------------------------- */
    public void PlayStop(ButtonConfigHelper bt){
        if((bt.MainLabelText == "Stop") || (bt.MainLabelText == "Visualize")){
            setIconPlay(bt);
        }
        else{
            setIconStop(bt);
        }
    }

    /* --------------------------------------------------------------------- */
    /* Permet d'arreter la musique ou la video qui est en train d'être jouée */
    /* --------------------------------------------------------------------- */
    public void stopMusicAndVideo(){
        AudioSource audioSource = GetComponent<AudioSource>();
        VideoPlayer videoPlayer = GetComponent<VideoPlayer>();
        selectAFileText.SetActive(true); // on affiche le texte "Select a File" à nouveau
        if(audioSource.isPlaying == true){
            audioSource.Stop();
        }
        if(videoPlayer.isPlaying == true){
            videoPlayer.Stop();
        }
    }

    /* ---------------------------------------------------------------------------- */
    // Renvoi la liste des fichiers d'un dossier selon le type passé en paramètre
    //   type = "Text", "Audio", "Video" ou "Photo" 
    /* ---------------------------------------------------------------------------- */
    public string[] getFiles(string type){

        /* --- TEXT --- */
        if (type == "Text"){
            return FileManager.RetrieveTextFiles();
        }

        /* --- VIDEO --- */
        else if (type == "Video"){
            return FileManager.RetrieveVideoFiles();
        }
        
        /* --- AUDIO --- */
        else if(type == "Audio"){
            return FileManager.RetrieveAudioFiles();
        }
        
        /* --- PHOTO --- */
        else if(type == "Photo"){
            return FileManager.RetrievePhotoFiles();
        }


        return new string[0]; // Si aucun type n'est trouvé, on renvoi un tableau vide
    

    }




        

}