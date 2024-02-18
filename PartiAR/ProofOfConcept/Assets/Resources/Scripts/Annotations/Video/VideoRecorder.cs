using UnityEngine;
using System.Collections;
using System.Linq;
using UnityEngine.Windows.WebCam;
using UnityEngine.Video;
using System;
using Microsoft.MixedReality.Toolkit.UI;
using TMPro;

public class VideoRecorder : MonoBehaviour
{
    private bool isRecording = false;

    private bool waiting = false;
    private KeyboardManager KM;
    public GameObject MixedRealityKeyboardPreview;
    public GameObject Tooltip;
    public GameObject EnterName;
    public GameObject Success;
    public GameObject Error;
    public GameObject SameNameFileError;
    public GameObject VoidContent;


    public string filename = "";
    public string filepath= "";

    int fileNumber = 0;


    VideoCapture m_VideoCapture = null;

    public VideoPlayer videoPlayer;

    private void Start()
    {
        KM = GetComponent<KeyboardManager>();
    }

    public void StartStopRecording()
    {
        if (!isRecording)
        {
            //KM.isToolTip = false;
            //MixedRealityKeyboardPreview.SetActive(true);
            //KM.OpenKeyboard();
            filename = "video" + FileManager.fileNumberVideo + ".mp4";
            FileManager.fileNumberVideo++;
            filepath = System.IO.Path.Combine(Application.persistentDataPath + "/Saves/Video/", filename);
            filepath = filepath.Replace("/", @"\");
            MixedRealityKeyboardPreview.SetActive(false);
            EnterNameSet(true);
            StartVideoCaptureTest();
        }
        else
        {
            gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("videoRecording");
            transform.GetComponentInChildren<TextMeshPro>().text = "Vidéo";
            m_VideoCapture.StopRecordingAsync(OnStoppedRecordingVideo);
        }
    }
void StartVideoCaptureTest()
    {
        isRecording = true;
        gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("squareRecord");
        transform.GetComponentInChildren<TextMeshPro>().text = "Stop";
        Resolution cameraResolution = VideoCapture.SupportedResolutions.OrderByDescending((res) => res.width * res.height).First();
        Debug.Log(cameraResolution);

        float cameraFramerate = VideoCapture.GetSupportedFrameRatesForResolution(cameraResolution).OrderByDescending((fps) => fps).First();
        Debug.Log(cameraFramerate);

        VideoCapture.CreateAsync(false, delegate (VideoCapture videoCapture)
        {
            if (videoCapture != null)
            {
                m_VideoCapture = videoCapture;
                Debug.Log("Created VideoCapture Instance!");

                CameraParameters cameraParameters = new CameraParameters();
                cameraParameters.hologramOpacity = 1.0f;
                cameraParameters.frameRate = cameraFramerate;
                cameraParameters.cameraResolutionWidth = cameraResolution.width;
                cameraParameters.cameraResolutionHeight = cameraResolution.height;
                cameraParameters.pixelFormat = CapturePixelFormat.BGRA32;

                m_VideoCapture.StartVideoModeAsync(cameraParameters,
                    VideoCapture.AudioState.ApplicationAndMicAudio,
                    OnStartedVideoCaptureMode);
            }
            else
            {
                gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("videoRecording");
                transform.GetChild(4).GetChild(0).GetComponent<TextMeshPro>().text = "Record";
                Debug.LogError("Failed to create VideoCapture Instance!");
            }
        });
    }

    void OnStartedVideoCaptureMode(VideoCapture.VideoCaptureResult result)
    {
        Debug.Log("Started Video Capture Mode!");
        m_VideoCapture.StartRecordingAsync(filepath, OnStartedRecordingVideo);
    }

    void OnStoppedVideoCaptureMode(VideoCapture.VideoCaptureResult result)
    {
        isRecording = false;
    }

    void OnStartedRecordingVideo(VideoCapture.VideoCaptureResult result)
    {
        Debug.Log("Started Recording Video!");
    }

    void OnStoppedRecordingVideo(VideoCapture.VideoCaptureResult result)
    {
        Debug.Log("Stopped Recording Video!");
        m_VideoCapture.StopVideoModeAsync(OnStoppedVideoCaptureMode);
        gameObject.GetComponent<ButtonConfigHelper>().SetQuadIconByName("videoRecording");
        KM.reinitialization();

        SceneObject SO = Tooltip.GetComponent<SceneObject>();
        SO.AddToPathList(filepath);

        filename = "";
        filepath = "";
    }


    private void registerFile() {

        if (KM.cancel)
        {
            MixedRealityKeyboardPreview.SetActive(false);
            EnterNameSet(true);
            KM.reinitialization();
        }

        if (KM.validate)
        {

            if (string.IsNullOrEmpty(KM.Preview.text))
            {
                VoidContentSet(true);
                KM.reinitialization();
                /*string timeStamp = Time.time.ToString().Replace(".", "").Replace(":", "");
                this.filename = string.Format("TestVideo_{0}.mp4", timeStamp);*/
            }
            else
            {
                filename = KM.Preview.text.EndsWith(".mp4") ? KM.Preview.text : (KM.Preview.text + ".mp4");

                filepath = System.IO.Path.Combine(Application.persistentDataPath + "/Saves/Video/", filename);
                filepath = filepath.Replace("/", @"\");

                if (Array.Exists(FileManager.RetrieveVideoFiles(), element => element == filepath)) //fichier du même nom existe
                {
                    SameFileNameSet(true);
                    KM.reinitialization();
                }
                else
                {
                    MixedRealityKeyboardPreview.SetActive(false);
                    EnterNameSet(true);
                    StartVideoCaptureTest();
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
        //if (!isRecording)
        //{
        //    if (KM.done)
        //    {
        //        registerFile();
        //    }
        //}
    }
}