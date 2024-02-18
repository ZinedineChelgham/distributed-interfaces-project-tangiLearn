using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using UnityEngine.Windows.WebCam;

public class ScreenshotManager : MonoBehaviour
{
    public string fileName = "Screenshot.png";
    private byte[] bytes;
    KeyboardManager KM;
    public GameObject MixedRealityKeyboardPreview;
    public GameObject Tooltip;
    private Texture2D texture;
    public GameObject EnterName;
    public GameObject Success;
    public GameObject Error;
    public GameObject SameNameFileError;
    public GameObject VoidContent;
    int fileNumber = 0;
    PhotoCapture photoCaptureObject = null;
    Texture2D targetTexture = null;

    private void Start()
    {
        KM = GetComponent<KeyboardManager>();
    }

    public void TakeScreenshot()
    {
        Resolution cameraResolution = PhotoCapture.SupportedResolutions.OrderByDescending((res) => res.width * res.height).First();
        targetTexture = new Texture2D(cameraResolution.width, cameraResolution.height);

        PhotoCapture.CreateAsync(true, delegate (PhotoCapture captureObject) {
            photoCaptureObject = captureObject;
            CameraParameters cameraParameters = new CameraParameters();
            cameraParameters.hologramOpacity = 1.0f;
            cameraParameters.cameraResolutionWidth = cameraResolution.width;
            cameraParameters.cameraResolutionHeight = cameraResolution.height;
            cameraParameters.pixelFormat = CapturePixelFormat.BGRA32;
            photoCaptureObject.StartPhotoModeAsync(cameraParameters, delegate (PhotoCapture.PhotoCaptureResult result) {
                photoCaptureObject.TakePhotoAsync(OnCapturedPhotoToMemory);
            });
        });
    }

    void OnCapturedPhotoToMemory(PhotoCapture.PhotoCaptureResult result, PhotoCaptureFrame photoCaptureFrame)
    {
        photoCaptureFrame.UploadImageDataToTexture(targetTexture);
        photoCaptureObject.StopPhotoModeAsync(OnStoppedPhotoMode);
        byte[] bytes = targetTexture.EncodeToPNG();
        string filename = "photo" + FileManager.fileNumberPhoto + ".png";
        FileManager.fileNumberPhoto++;

        try
        {
            if (FileManager.WriteToFile("Photo/" + filename, bytes, Tooltip.GetComponent<SceneObject>(), true))
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

    void OnStoppedPhotoMode(PhotoCapture.PhotoCaptureResult result)
    {
        photoCaptureObject.Dispose();
        photoCaptureObject = null;
    }

    private void registerFile()
    {
        Debug.Log("called from register file");
        //name the File
        string filename = "";
        // Dispose of the texture to free up memory
        Destroy(texture);


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
            }
            else
            {
                filename = KM.Preview.text.EndsWith(".png") ? KM.Preview.text : (KM.Preview.text + ".png");
                try
                {
                    if (FileManager.WriteToFile("Photo/" + filename, bytes, Tooltip.GetComponent<SceneObject>()))
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


    private IEnumerator reset() //attendre avant de tout fermer
    {
        yield return new WaitForSeconds(1);
        MixedRealityKeyboardPreview.SetActive(false);
        EnterNameSet(true);
    }

    private void Update()
    {
        if (KM.done)
        {
            registerFile();
            KM.reinitialization();
        }
    }

}