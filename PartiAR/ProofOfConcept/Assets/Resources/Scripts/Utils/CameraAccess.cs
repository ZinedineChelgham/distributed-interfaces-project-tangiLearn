using UnityEngine;
using UnityEngine.Windows.WebCam;
using System.IO;
using System.Linq;
using System.Collections;
using UnityEngine.UI;

public class CameraAccess : MonoBehaviour
{
    PhotoCapture photoCaptureObject = null;
    Texture2D targetTexture = null;

    void Start()
    {
         targetTexture = new Texture2D(1280, 720);
    }

    public void TakePhoto(string pathPhoto)
    {
        TakePhotoCoroutine(pathPhoto);
    }

    public void TakePhotoCoroutine(string pathPhoto, bool isPhotoObject = false)
    {
        PhotoCapture.CreateAsync(true, delegate (PhotoCapture captureObject) {
            photoCaptureObject = captureObject;
            CameraParameters cameraParameters = new CameraParameters();
            cameraParameters.hologramOpacity = 1f; // 0 = transparent, 1 = opaque - Use this to hide or show holograms in the photo
            cameraParameters.cameraResolutionWidth = targetTexture.width;
            cameraParameters.cameraResolutionHeight = targetTexture.height;
            cameraParameters.pixelFormat = CapturePixelFormat.BGRA32;

            photoCaptureObject.StartPhotoModeAsync(cameraParameters, delegate (PhotoCapture.PhotoCaptureResult result) {
                photoCaptureObject.TakePhotoAsync(delegate (PhotoCapture.PhotoCaptureResult result_, PhotoCaptureFrame photoCaptureFrame) {
                    photoCaptureFrame.UploadImageDataToTexture(targetTexture);

                    byte[] bytes = targetTexture.EncodeToPNG();
                    string path = Path.Combine(Application.persistentDataPath + "/Saves/Photo/", pathPhoto);
                    FileManager.WriteToFile("Photo/" + pathPhoto, bytes, null, true);
                    photoCaptureObject.StopPhotoModeAsync(OnStoppedPhotoMode);
                });
            });
        });
    }

    void OnStoppedPhotoMode(PhotoCapture.PhotoCaptureResult result)
    {
        photoCaptureObject.Dispose();
        photoCaptureObject = null;
    }

}