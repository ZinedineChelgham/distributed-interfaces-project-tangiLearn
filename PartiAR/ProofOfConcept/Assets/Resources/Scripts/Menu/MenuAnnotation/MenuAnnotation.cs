using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;
using UnityEngine.Windows.WebCam;

public class MenuAnnotation : MonoBehaviour
{
    [SerializeField]
    TooltipsFollower tooltipsFollower;
    [SerializeField]
    GameObject prefabButton;
    [SerializeField]
    GameObject _gridCollectionCategory;
    [SerializeField]
    GameObject _scrollCollectionCategory;
    private Dictionary<string, GameObject> buttons = new Dictionary<string, GameObject>();
    [SerializeField]
    GameObject videoAndPhotoView;
    [SerializeField]
    GameObject textAndAudioView;
    public AudioSource previousAudioSource;    // AudioSource du fichier audio précédemment joué
    public string previousSelectedPath;        // Chemin du fichier précédemment selectionné

    [SerializeField]
    GameObject menuDisplay;
    [SerializeField]
    GameObject buttonDisplay;
    [SerializeField]
    GameObject _buttonFollowMe;
    RealObjectManager _realObjectManager;

    [SerializeField]
    public Material _materialPhoto;
    [SerializeField]
    public Material _materialVideo;
    [SerializeField]
    public Material _materialText;
    [SerializeField]
    public Material _materialAudio;
    [SerializeField]
    public Material _materialOntology;

    [SerializeField]
    public Material _materialPhotoSelected;
    [SerializeField]
    public Material _materialVideoSelected;
    [SerializeField]
    public Material _materialTextSelected;
    [SerializeField]
    public Material _materialAudioSelected;
    [SerializeField]
    public Material _materialOntologySelected;

    [SerializeField]
    RealObject _realObject;

    [SerializeField]
    GameObject deleteObjectButton;
    [SerializeField]
    GameObject deleteAnnotationButtonFileView;
    [SerializeField]
    GameObject deleteAnnotationButtonVideoView;

    [SerializeField]
    GameObject videoObject;

    private Dialog _dialogRealObject;

    private GameObject previousSelectedButton; // Ajoutez ceci en haut de votre classe

    StateMachineMenuAnnotation stateMachineMenuAnnotation;
    MenuAnnotationHolder _menuAnnotationHolder;
    ProximityDisplay proximityDisplay;
    bool hover = false;
    ModeController _modeController;
    QRCodeSetOrigin qrcodeSetOrigin;

    [SerializeField]
    GameObject tooltips;

    [SerializeField]
    GameObject virtualObjects;
    bool notFirstSelection = false;

    // Start is called before the first frame update
    void Start()
    {
        _modeController = GameObject.Find("ModeController").GetComponent<ModeController>();
        _modeController.OnModeChanged += OnModeControllerChanged;
        tooltipsFollower.FilePathAdded += FilePathAddedHandler;
        tooltipsFollower.FilePathRemoved += FilePathRemovedHandler;
        _realObject._ontology.RemoveEvent += _ontology_RemoveEvent;
        _realObject._ontology.AddEvent += _ontology_AddEvent;
        _realObjectManager = GameObject.Find("ObjectController").GetComponent<RealObjectManager>();
        _realObjectManager.OnRealObjectDeselected += _realObjectManager_OnRealObjectDeselected;
        _realObjectManager.OnRealObjectSelected += _realObjectManager_OnRealObjectSelected;
        _menuAnnotationHolder = GameObject.Find("MenuAnnotationHolder").GetComponent<MenuAnnotationHolder>();
        proximityDisplay = GetComponent<ProximityDisplay>();
        qrcodeSetOrigin = GameObject.Find("QRCodesManager").GetComponent<QRCodeSetOrigin>();

        //Initialise la state machine (elle sert à passer en mode libre, attaché à l'objet ou follow user)
        stateMachineMenuAnnotation = new StateMachineMenuAnnotation();
        stateMachineMenuAnnotation.proximityDisplay = proximityDisplay;
        stateMachineMenuAnnotation._menu = gameObject;
        stateMachineMenuAnnotation._buttonFollowMe = _buttonFollowMe;
        stateMachineMenuAnnotation._realObjectManager = _realObjectManager;
        stateMachineMenuAnnotation.realObject = _realObject;
        stateMachineMenuAnnotation._menuAnnotationHolder = _menuAnnotationHolder;
        stateMachineMenuAnnotation._currentObjectSelectedCollider = _realObject.transform.GetChild(0).GetComponent<BoxCollider>();
    }


    // When ontology is added, add the ontology to the menu
    private void _ontology_AddEvent(object sender, ObjectOntology.OntologyChangedEventArgs e)
    {
        AddOntology(e.Key, e.Value);
    }

    // Depending on the mode, the menu will be displayed differently (delete button will appear or not)
    private void OnModeControllerChanged(Mode mode)
    {


        if(mode == Mode.Edition)
        {
            deleteAnnotationButtonVideoView.SetActive(true);
            deleteAnnotationButtonFileView.SetActive(true);
            deleteObjectButton.SetActive(true);
            deleteAnnotationButtonFileView.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
            deleteAnnotationButtonVideoView.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
            deleteObjectButton.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
        } else if (mode == Mode.Visualization)
        {
           deleteObjectButton.SetActive(false);
            deleteAnnotationButtonVideoView.SetActive(false);
            deleteAnnotationButtonFileView.SetActive(false);
            deleteAnnotationButtonFileView.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
            deleteAnnotationButtonVideoView.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
            deleteObjectButton.transform.parent.GetComponent<GridObjectCollection>().UpdateCollection();
        }
    }

    // When an real object is selected, the menu will be displayed if it's the first selection
    private void _realObjectManager_OnRealObjectSelected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if (e.SelectedRealObject != null && e.SelectedRealObject == _realObject)
        {
            if (notFirstSelection)
            {
                OnClickDisplay();
            }
            notFirstSelection = true;
        }
    }

    // When an real object is deselected, the menu will be closed
    private void _realObjectManager_OnRealObjectDeselected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if (e.SelectedRealObject != null && e.SelectedRealObject == _realObject)
        {
            OnClickCloseMenuAnnotation();
        }
    }

    // When an ontology is removed, remove the ontology from the menu
    private void _ontology_RemoveEvent(object sender, ObjectOntology.OntologyChangedEventArgs e)
    {
        // Here we'll assume that the OntologyChangedEventArgs contains
        // the category and value of the ontology that's being removed.
        string categoryToRemove = e.Key;
        string valueToRemove = e.Value;

        // Search for the button associated with this ontology in the buttons dictionary.
        foreach (var button in buttons)
        {
            ButtonData buttonData = button.Value.GetComponent<ButtonData>();
            if (buttonData.fileType == FileType.Ontology &&
                buttonData.ontologyCategory == categoryToRemove &&
                buttonData.ontologyValue == valueToRemove)
            {
                string filePath = button.Key;
                if (filePath == previousSelectedPath)
                {
                    OnClickCloseCurrentView();
                }
                // Vérifier si le bouton existe
                if (buttons.ContainsKey(filePath))
                {
                    // Supprimer le bouton
                    GameObject buttonToRemove = buttons[filePath];
                    Destroy(buttonToRemove);
                    // Supprimer du dictionnaire
                    buttons.Remove(filePath);
                    UpdateGridAndScrollCollection();
                }
                break;
            }
        }
    }

    // When the user start manipulating the menu this function is called (it's used to transition to the "Free" state)
    // Object using this : TitleBar of the MenuAnnotation
    public void OnMenuManipulatorStarted()
    {
        _menuAnnotationHolder.setCurrentObject(_realObject, this);
        stateMachineMenuAnnotation.OnManipulatorMenuStarted();
    }

    // When the user stop manipulating the menu this function is called 
    // Object using this : TitleBar of the MenuAnnotation
    public void OnMenuManipulatorEnded()
    {
        stateMachineMenuAnnotation.OnManipulatorMenuEnded();
    }

    // When the user make a "OnPalmUp" gesture with the hand who invoke the menu annotation, this function is called by MenuAnnotationHolder.
    // Normally, it will make the menu annotation go to the hand of the user and switch the state to StateMenuAnnotationFree.
    public void OnPalmUp()
    {
        if(buttonDisplay.activeSelf == true)
        {
            OnClickDisplay();
        }
        stateMachineMenuAnnotation.OnPalmUp();
    }

    void OnDestroy()
    {
        tooltipsFollower.FilePathAdded -= FilePathAddedHandler;
        tooltipsFollower.FilePathRemoved -= FilePathRemovedHandler;
    }

    // Update is called once per frame
    void Update()
    {
        //If the real object selected is the real object of this menu annotation, we update the state machine
        if (_realObjectManager.selectedRealObject == _realObject)
        {
            stateMachineMenuAnnotation.UpdateCurrentState();
        }
        //If the real object haven't been confirmed (box in green), we don't display the menu annotation
        if (_realObject.transformConfirmed == false)
        {
            OnClickCloseCurrentView();
            menuDisplay.SetActive(false);
            buttonDisplay.SetActive(false);
            return;
        }
        //If the menu is displayed we hide the display button, or the contrary.
        if (menuDisplay.activeSelf == true)
        {
            buttonDisplay.SetActive(false);
        }
        else
        {
            buttonDisplay.SetActive(true);
        }
    }

    //File type of annotation possible
    public enum FileType
    {
        Photo,
        Video,
        Text,
        Audio,
        Ontology
    }

    public class ButtonData : MonoBehaviour
    {
        public string filePath;
        public MeshRenderer ButtonMeshRenderer; // New property added
        public FileType fileType;
        public string ontologyCategory;
        public string ontologyValue;
        public bool clicked;
    }

    //If an ontology is added, we add an asssociated button to the menu annotation
    public void AddOntology(string categoryOntology, string valueOntology)
    {
        string displayValue = valueOntology;
        DateTime currentTime = DateTime.UtcNow;
        long time = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
        if (time - qrcodeSetOrigin.timeLoad > 4000)
        {
            OnClickDisplay();
        }
        // Créer un nouveau bouton
        GameObject newButton = Instantiate(prefabButton, _gridCollectionCategory.transform);

        // Ajouter et configurer les données du bouton
        ButtonData buttonData = newButton.AddComponent<ButtonData>();
        buttonData.filePath = displayValue;
        buttonData.fileType = FileType.Ontology;
        buttonData.ontologyCategory = categoryOntology;
        buttonData.ontologyValue = valueOntology;
        buttonData.ButtonMeshRenderer = newButton.transform.GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
        // Configurer le texte du bouton selon le type d'extension du fichier
        string fileName = System.IO.Path.GetFileNameWithoutExtension(displayValue);
        newButton.GetComponentInChildren<TextMeshPro>().text = fileName;
        newButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
        {
            OnClickButton(displayValue, newButton); // Passer le GameObject du bouton actuel à la fonction OnClickButton
        });
        MeshRenderer meshRendererButton = buttonData.ButtonMeshRenderer;
        Material[] mats = meshRendererButton.materials;
        newButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("Ontology");
        mats[0] = _materialOntology;
        StartCoroutine(changeMaterialCoroutine(mats, meshRendererButton));
        // Ajouter le bouton au dictionnaire
        buttons.Add(displayValue, newButton);
        UpdateGridAndScrollCollection();
    }

    //When the user click on the button Follow me in the Titlebar of the menu annotation, we call this function
    //It makes the menu annotation follow the user or make it free, depending on the previous state.
    //Object using this : FollowMe in the TitleBar of the MenuAnnotation
    public void OnClickFollowMe()
    {
        _menuAnnotationHolder.setCurrentObject(_realObject, this);
        stateMachineMenuAnnotation.OnClickFollow();
    }

    //When the user add a new annotation that is not an ontology, we call this function
    //It will create the associated button and add it to the menu annotation
    public void FilePathAddedHandler(string filePath)
    {
        // Créer un nouveau bouton
        if(qrcodeSetOrigin == null)
        {
            qrcodeSetOrigin = GameObject.Find("QRCodesManager").GetComponent<QRCodeSetOrigin>();
        }
        GameObject newButton = Instantiate(prefabButton, _gridCollectionCategory.transform);
        DateTime currentTime = DateTime.UtcNow;
        long time = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
        if (time - qrcodeSetOrigin.timeLoad > 5000)
        {
            OnClickDisplay();
        }
        // Ajouter et configurer les données du bouton
        ButtonData buttonData = newButton.AddComponent<ButtonData>();
        buttonData.filePath = filePath;
        buttonData.ButtonMeshRenderer = newButton.transform.GetChild(2).GetChild(0).GetComponent<MeshRenderer>();
        // Configurer le texte du bouton selon le type d'extension du fichier
        string fileName = System.IO.Path.GetFileNameWithoutExtension(filePath);
        newButton.GetComponentInChildren<TextMeshPro>().text = fileName;
        string extension = System.IO.Path.GetExtension(filePath);
        newButton.GetComponent<ButtonConfigHelper>().OnClick.AddListener(() =>
        {
            OnClickButton(filePath, newButton); // Passer le GameObject du bouton actuel à la fonction OnClickButton
        });
        MeshRenderer meshRendererButton = buttonData.ButtonMeshRenderer;
        Material[] mats = meshRendererButton.materials;
        switch (extension)
        {
            case ".wav":
            case ".mp3":
                buttonData.fileType = FileType.Audio;
                newButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("microphoneTER");
                mats[0] = _materialAudio;
                break;
            case ".mp4":
            case ".avi":
                buttonData.fileType = FileType.Video;
                newButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("video");
                mats[0] = _materialVideo;
                break;
            case ".txt":
            case ".docx":
                buttonData.fileType = FileType.Text;
                newButton.GetComponent<ButtonConfigHelper>().SetQuadIconByName("text");
                mats[0] = _materialText;
                break;
            case ".png":
            case ".jpg":
            case ".jpeg":
                buttonData.fileType = FileType.Photo;
                mats[0] = _materialPhoto;
                break;
            default:
                break;
        }
        StartCoroutine(changeMaterialCoroutine(mats, meshRendererButton));
        if (time - qrcodeSetOrigin.timeLoad > 4000)
        {
            StartCoroutine(clickOnButton(newButton.GetComponent<ButtonConfigHelper>()));
        }
        // Ajouter le bouton au dictionnaire
        buttons.Add(filePath, newButton);
        UpdateGridAndScrollCollection();
    }

    //Used to display the annotation when it has just been added.
    private IEnumerator clickOnButton(ButtonConfigHelper button)
    {
        yield return new WaitForEndOfFrame();
        button.OnClick.Invoke();
    }

    private IEnumerator changeMaterialCoroutine(Material[] mats, MeshRenderer mesh)
    {
        yield return new WaitForEndOfFrame();
        if (mesh != null)
        {
            mesh.materials = mats;
        }
    }

    //When the user click on the button to delete object button, we call this function.
    //Object using this : Delete in TitleBar of MenuAnnotation
    public void OnClickDeleteObject()
    {
        gameObject.SetActive(false);
        GameObject dialogPrefab = Resources.Load("Prefabs/Menus/DialogSmall") as GameObject;
        if (_dialogRealObject == null)
        {
            _dialogRealObject = Dialog.Open(dialogPrefab, DialogButtonType.Yes | DialogButtonType.No, "Delete Object", "Are you sure you want to delete this object ?", true);
            _dialogRealObject.OnClosed += OnClosedDialogEvent;
        }
    }

    //Dialog used when we click on the delete object button
    //When the dialog is closed, we delete the object if the user clicked on yes
    private void OnClosedDialogEvent(DialogResult obj)
    {
        if (obj.Result == DialogButtonType.Yes)
        {
            _realObject.DeleteMe();
        }
        else
        {
            gameObject.SetActive(true);
        }
    }

    //Close the menu annotation
    public void OnClickCloseMenuAnnotation()
    {
        OnClickCloseCurrentView();
        // Fermer le menu
        menuDisplay.SetActive(false);
        buttonDisplay.SetActive(true);
        stateMachineMenuAnnotation.ChangeState(new StateMenuAnnotationFollowObject(stateMachineMenuAnnotation));
    }

    //Close the annotation view
    public void OnClickCloseCurrentView()
    {
        stopMusicAndVideo();
        // Fermer toutes les vues au début
        videoAndPhotoView.SetActive(false);
        textAndAudioView.SetActive(false);
        // Arrêter la musique et la vidéo
       // SetButtonMaterial(previousSelectedButton, previousSelectedPath, false);
        previousSelectedPath = null;
    }

    //Delete the annotation
    public void OnClickDelete()
    {
        FilePathRemovedHandler(previousSelectedPath);
        OnClickCloseCurrentView();
    }

    //Remove the annotation from the menu annotation
    public void FilePathRemovedHandler(string filePath)
    {
        if(filePath == previousSelectedPath)
        {
            OnClickCloseCurrentView();
        }
        // Vérifier si le bouton existe
        if (buttons.ContainsKey(filePath))
        {
            // Supprimer le bouton
            GameObject buttonToRemove = buttons[filePath];
            ButtonData buttonData = buttonToRemove.GetComponent<ButtonData>();
            if(buttonData.fileType == FileType.Ontology)
            {
                _realObject.RemoveOntologyButtonClicked(buttonData.ontologyCategory, buttonData.ontologyValue);
            }
            Destroy(buttonToRemove);

            // Supprimer du dictionnaire
            buttons.Remove(filePath);
            UpdateGridAndScrollCollection();
        }
    }

    public static IEnumerator WaitForScrollingCollection(GameObject ScrollingObjectCollection)
    {
        yield return null; 
        ScrollingObjectCollection.GetComponent<ScrollingObjectCollection>().UpdateContent();
    }

    private void UpdateGridAndScrollCollection()
    {
        StartCoroutine(MenuUtils.WaitForUpdateGridCollection(_gridCollectionCategory));
        StartCoroutine(WaitForScrollingCollection(_scrollCollectionCategory));
    }

    //Handle the click on the button annotation to then display it (depending on the type of the file for example)
    public void OnClickButton(string filePath, GameObject currentButton, bool isHover = false)
    {
        // Fermer toutes les vues au début
        videoAndPhotoView.SetActive(false);
        textAndAudioView.SetActive(false);

        // Si le même bouton est cliqué à nouveau
        if (previousSelectedPath == filePath)
        {
            // Réinitialiser le chemin du fichier précédemment sélectionné
            previousSelectedPath = null;
            SetButtonMaterial(previousSelectedButton, filePath, false); // Mettre le matériel du bouton en non sélectionné
            previousSelectedButton = null; // Réinitialiser le bouton précédemment sélectionné
            return; // Quitter la méthode
        }

        if (previousSelectedButton != null)
        {
            SetButtonMaterial(previousSelectedButton, previousSelectedPath, false); // Mettre le matériel du bouton précédemment sélectionné en non sélectionné
        }

        // Mettre à jour le bouton précédemment sélectionné et le chemin du fichier
        previousSelectedButton = currentButton;
        previousSelectedPath = filePath; // Mettre à jour le chemin du fichier précédemment sélectionné
        SetButtonMaterial(previousSelectedButton, filePath, true); // Mettre le matériel du bouton actuel en sélectionné

        // Arrêter la musique et la vidéo
        stopMusicAndVideo();
        Debug.Log("click button " + filePath);
        // Afficher le fichier
        if (filePath.Contains(".png") || filePath.Contains(".jpg") || filePath.Contains(".jpeg"))
        { // Si c'est une image
            videoAndPhotoView.SetActive(true);
            StartCoroutine(loadImage(filePath));
        }
        else if (filePath.Contains(".mp4"))
        { // Si c'est une vidéo
            Debug.Log("Fichier vidéo");
            videoAndPhotoView.SetActive(true);

            VideoPlayer videoPlayer = GetComponent<VideoPlayer>();

            FileManager.LoadVideo(filePath, videoPlayer);
            RawImage rawImage = videoObject.GetComponent<RawImage>();
            videoPlayer.targetTexture = new RenderTexture(1920, 1080, 0);
            rawImage.texture = videoPlayer.targetTexture;

            videoPlayer.Play();     
        }
        else if (filePath.Contains(".wav") || filePath.Contains(".mp3"))
        { // Si c'est un audio
            Debug.Log("Fichier audio");
            textAndAudioView.SetActive(true);
            ButtonConfigHelper buttonConfigHelper = textAndAudioView.transform.GetComponentInChildren<ButtonConfigHelper>();

            AudioSource audioSource = GetComponent<AudioSource>();
            if (FileManager.LoadFromFileBytes(filePath, out byte[] audio))
            {
                var audioClip = WavUtility.ToAudioClip(audio);



                if (audioClip.loadState == AudioDataLoadState.Loaded)
                {
                    audioSource.clip = audioClip;
                };
            }
            

            previousSelectedPath = filePath;
            previousAudioSource = audioSource;

            TextMeshPro textMesh = textAndAudioView.transform.GetComponentInChildren<TextMeshPro>();
            if (textMesh != null)
            {
                textMesh.text = filePath + " is playing.";
            }
            previousAudioSource.Play();
        }
        else if(filePath.Contains(".txt"))
        { // Si c'est un fichier texte
            textAndAudioView.SetActive(true);
            Debug.Log("Fichier texte");
            stopMusicAndVideo();
            TextMeshPro textMesh = textAndAudioView.transform.GetComponentInChildren<TextMeshPro>();
            if (textMesh != null)
            {
                textMesh.text = "Contenu du fichier : \n" + File.ReadAllText(filePath);
            }
            textAndAudioView.transform.GetComponentInChildren<RawImage>()?.gameObject.SetActive(false);
        }
        else
        {
            // Si c'est une ontology
            textAndAudioView.SetActive(true);
            Debug.Log("Fichier Ontology");
            stopMusicAndVideo();
            ButtonConfigHelper buttonConfigHelper = textAndAudioView.transform.GetComponentInChildren<ButtonConfigHelper>();
            buttonConfigHelper.MainLabelText = "Contenu de l'ontology : \n" + filePath;
            textAndAudioView.transform.GetComponentInChildren<RawImage>()?.gameObject.SetActive(false);
        }
    }

    //Used to load an image in the annotation view.
    public IEnumerator loadImage(string filePath)
    {
        yield return new WaitForSeconds(0.1f);
        // Get the path to the persistent data location

        byte[] result;

        try
        {
            result = File.ReadAllBytes(filePath);
            Debug.Log("Successfully opened " + filePath);
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {filePath} with exception {e}");
            result = null;
        }
        RawImage rawImage = videoObject.GetComponent<RawImage>();
        Texture2D texture = new Texture2D(1280,720);
        texture.LoadImage(result);
        rawImage.texture = texture;
    }

    //When the user click on the display button, display the menu annotation
    public void OnClickDisplay()
    {
        menuDisplay.SetActive(true);
        // Itère sur tous les boutons dans le dictionnaire
        foreach (var buttonEntry in buttons)
        {
            // Met à jour la couleur de chaque bouton pour correspondre à son état de non-sélection
            SetButtonMaterial(buttonEntry.Value, buttonEntry.Key, false);
        }
    }

    //Stop music and video playing
    public void stopMusicAndVideo()
    {
        AudioSource audioSource = GetComponent<AudioSource>();
        VideoPlayer videoPlayer = GetComponent<VideoPlayer>();
        if (audioSource.isPlaying == true)
        {
            audioSource.Stop();
        }
        if (videoPlayer.isPlaying == true)
        {
            videoPlayer.Stop();
        }
    }

    //Set the material of the button depending of the file type
    private void SetButtonMaterial(GameObject button, string filePath, bool isSelected)
    {
        if (button == null)
        {
            return;
        }
        ButtonData buttonData = button.GetComponent<ButtonData>();
        Material[] mats = buttonData.ButtonMeshRenderer.materials;

        string extension = System.IO.Path.GetExtension(filePath);

        if (isSelected)
        {
            switch (extension)
            {
                case ".wav":
                case ".mp3":
                    mats[0] = _materialAudioSelected;
                    break;
                case ".mp4":
                case ".avi":
                    mats[0] = _materialVideoSelected;
                    break;
                case ".txt":
                case ".docx":
                    mats[0] = _materialTextSelected;
                    break;
                case ".png":
                case ".jpg":
                case ".jpeg":
                    mats[0] = _materialPhotoSelected;
                    break;
                default:
                    mats[0] = _materialOntologySelected;
                    break;
            }
        }
        else
        {
            switch (extension)
            {
                case ".wav":
                case ".mp3":
                    mats[0] = _materialAudio;
                    break;
                case ".mp4":
                case ".avi":
                    mats[0] = _materialVideo;
                    break;
                case ".txt":
                case ".docx":
                    mats[0] = _materialText;
                    break;
                case ".png":
                case ".jpg":
                case ".jpeg":
                    mats[0] = _materialPhoto;
                    break;
                default:
                    mats[0] = _materialOntology;
                    break;
            }
        }

        StartCoroutine(changeMaterialCoroutine(mats, buttonData.ButtonMeshRenderer));
    }
}
