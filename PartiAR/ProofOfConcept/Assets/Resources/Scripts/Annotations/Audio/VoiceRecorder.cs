using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Windows;
using TMPro;
using Microsoft.MixedReality.Toolkit.UI;

public class VoiceRecorder : MonoBehaviour
{
    private AudioSource audioSource;
    private bool isRecording = false;
    public int MAX_RECORDING_LENGTH = 30;
    private KeyboardManager KM;
    public GameObject MixedRealityKeyboardPreview;
    public GameObject Tooltip;
    //private bool hasStopped = false;

    public GameObject EnterName;
    public GameObject Success;
    public GameObject Error;
    public GameObject SameNameFileError;
    public GameObject VoidContent;

    private byte[] wavData;
    int fileNumber = 0;


    void Start()
    {
        audioSource = GetComponent<AudioSource>();
        KM = GetComponent<KeyboardManager>();
    }

    public void StartStopRecording()
    {
        if (!isRecording)
        {
            Debug.Log("Start Recording Audio");
            StartRecording();
        }
        else
        {
            StopRecording();
        }
    }

    private void StartRecording()
    {
        isRecording = true;
        gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("squareRecord");
        transform.GetComponentInChildren<TextMeshPro>().text = "Stop";
        audioSource.clip = Microphone.Start(null, false, MAX_RECORDING_LENGTH, 44100);
    }

    private void StopRecording()
    {
        isRecording = false;
        gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("microphoneTER");
        transform.GetComponentInChildren<TextMeshPro>().text = "Audio";
        Microphone.End(null);        
        Debug.Log("Stop Recording Audio");
        //MixedRealityKeyboardPreview.SetActive(true);
        //KM.isToolTip = false;
        wavData = WavUtility.FromAudioClip(audioSource.clip); // Encode the audio clip into a WAV format
                                                              //KM.OpenKeyboard();

        string fileName = "audio" + FileManager.fileNumberAudio +  ".wav";
        FileManager.fileNumberAudio++;

        //on enregistre le fichier si un autre fichier du même nom n'existe pas 
        try
        {
            if (FileManager.WriteToFile("Audio/" + fileName, wavData, Tooltip.GetComponent<SceneObject>(), true))
            {
                SuccesSet(true);
            }
            else
            {
                ErrorSet(true);
            }
            StartCoroutine(reset());
        }
        catch (SameNameException)
        {
            SameFileNameSet(true);
        }
    }

    private void registerFile() {


        //name the File
        string filename = "";

        if (KM.cancel)
        {
            MixedRealityKeyboardPreview.SetActive(false);
            EnterNameSet(true);
        }

        if (KM.validate)
        {
            if (string.IsNullOrEmpty(KM.Preview.text))
            {

                VoidContentSet(true);
              
            } else { 

                filename = KM.Preview.text.EndsWith(".wav") ? KM.Preview.text : (KM.Preview.text + ".wav");

                //on enregistre le fichier si un autre fichier du même nom n'existe pas 
                try
                {
                    if (FileManager.WriteToFile("Audio/" + filename, wavData, Tooltip.GetComponent<SceneObject>()))
                    {
                        SuccesSet(true);
                    }
                    else
                    {
                        ErrorSet(true);
                    }
                    StartCoroutine(reset());
                }
                catch (SameNameException)
                {
                    SameFileNameSet(true);
                }
            }
        }
    }

    private void SameFileNameSet(bool b)
    {
        EnterName.SetActive(false);
        Success.SetActive(false);
        Error.SetActive(false);
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(b);
    }

    private void EnterNameSet(bool b)
    {
        Success.SetActive(false);
        Error.SetActive(false);
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(b);
    }

    private void VoidContentSet(bool b)
    {
        Success.SetActive(false);
        Error.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        VoidContent.SetActive(b);

    }

    private void SuccesSet(bool b)
    {
        Error.SetActive(false);
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        Success.SetActive(b);
    }

    private void ErrorSet(bool b)
    {
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        Success.SetActive(false);
        Error.SetActive(true);
    }

    private IEnumerator reset() 
    {
        yield return new WaitForSeconds(1);
        MixedRealityKeyboardPreview.SetActive(false);
        EnterNameSet(true);
    }

    private void Update()
    {
       
       //if (KM.done) {
       //     registerFile();
       //     KM.reinitialization();//si on veut re enregistrer un fichier plus tard, il faut re-initialiser les champs du KeyboardManager                
       //}
    }

}
