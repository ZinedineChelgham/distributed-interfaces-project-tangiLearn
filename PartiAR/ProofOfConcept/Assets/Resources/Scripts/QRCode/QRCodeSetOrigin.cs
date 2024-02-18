using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine;
using Microsoft.MixedReality.SampleQRCodes;
using QRCodesVisualizer = Microsoft.MixedReality.SampleQRCodes.QRCodesVisualizer;
using System;
using Microsoft.MixedReality.Toolkit.UI;
using System.CodeDom;

//Used to set the origin of the application, the user has to scan a QRCode that will be the origin of the application
public class QRCodeSetOrigin : MonoBehaviour
{
    private long applicationStart;
    private QRCodesVisualizer qrCodeVisualizer;
    private bool originHasBeenInitialized = false;
    public GameObject objectHolder;
    public GameObject virtualObjectHolder;
    public GameObject DialogPrefab;
    private Dialog dialogInitializeOrigin;
    public GameObject leftHandMenu;
    public GameObject qrCode;
    public long timeLoad;

    struct ActionData
    {
        public enum Type
        {
            Added,
            Updated,
            Removed
        };
        public Type type;
        public Microsoft.MixedReality.QR.QRCode qrCode;

        public ActionData(Type type, Microsoft.MixedReality.QR.QRCode qRCode) : this()
        {
            this.type = type;
            qrCode = qRCode;
        }
    }

    private Queue<ActionData> pendingActions = new Queue<ActionData>();
    // Start is called before the first frame update
    void Start()
    {
        dialogInitializeOrigin = Dialog.Open(DialogPrefab, DialogButtonType.None, "Scan the QRCode", "Please scan the relevant QRCode that marks the starting point of the application in order to begin using it.", false);
        qrCodeVisualizer = gameObject.GetComponent<QRCodesVisualizer>();
        QRCodesManager.Instance.QRCodeUpdated += Instance_QRCodeUpdated;
    }

    // Update is called once per frame
    void Update()
    {
        DateTime currentTime = DateTime.UtcNow;
        long currentMillisecond = ((DateTimeOffset)currentTime).ToUnixTimeSeconds();
        if (currentMillisecond - applicationStart > 5 && !originHasBeenInitialized)
        {
            HandleEvents();
        }
    }

    //Handle the event when a QRCode is updated
    //We initialize the origin of the application with the first QRCode that has been scanned (updated)
    //We do this because the hololens keep in memory past QRCode (add event), so we look at the updated event instead.
    private void HandleEvents()
    {
        lock (pendingActions)
        {
            while (pendingActions.Count > 0)
            {
                qrCode = qrCodeVisualizer.qrCodesObjectsList[qrCodeVisualizer.updatedQR];
                if (qrCode.transform.localPosition != Vector3.zero)
                {
                    var action = pendingActions.Dequeue();
                    if (action.type == ActionData.Type.Updated)
                    {
                        GameObject.Find("SceneViewController").GetComponent<SceneViewController>().qrCodes = new List<SceneObject>();
                        GameObject.Find("SceneViewController").GetComponent<SceneViewController>().qrCodes.Add(qrCode.AddComponent<SceneObject>());
                        objectHolder.transform.position = qrCode.transform.localPosition;
                        objectHolder.transform.rotation = qrCode.transform.localRotation;
                        virtualObjectHolder.transform.position = qrCode.transform.localPosition;
                        virtualObjectHolder.transform.rotation = qrCode.transform.localRotation;
                        Debug.Log("QRCODE POSITION " + qrCode.transform.position);
                        string pathFile = qrCode.GetComponent<QRCode>().CodeText + ".dat";
                        Debug.Log(pathFile);
                        GameObject.Find("SceneViewController").GetComponent<SceneViewController>().saveFilePath = pathFile;
                        originHasBeenInitialized = true;
                        dialogInitializeOrigin.DismissDialog();
                        qrCode.transform.GetChild(0).gameObject.SetActive(true);
                        DateTime currentTime = DateTime.UtcNow;
                        timeLoad = ((DateTimeOffset)currentTime).ToUnixTimeMilliseconds();
                        GameObject.Find("SceneViewController").GetComponent<SceneViewController>().LoadJsonData();
                        // gameObject.GetComponent<QRCodesManager>().StopQRTracking();
                        StartCoroutine(deplaceObjectHolder());
                    }
                }
            }
        }
    }

    //Position the object holder at the position of the QRCode (used to save and load)
    public IEnumerator deplaceObjectHolder()
    {
        yield return new WaitForSeconds(2.5f);
        objectHolder.transform.position = qrCode.transform.localPosition;
        objectHolder.transform.rotation = qrCode.transform.localRotation;
        virtualObjectHolder.transform.position = qrCode.transform.localPosition;
        virtualObjectHolder.transform.rotation = qrCode.transform.localRotation;
    }

    private void Instance_QRCodeUpdated(object sender, QRCodeEventArgs<Microsoft.MixedReality.QR.QRCode> e)
    {
        Debug.Log("QRInstantiate Instance_QRCodeUpdated");
        lock (pendingActions)
        {
            pendingActions.Enqueue(new ActionData(ActionData.Type.Updated, e.Data));
        }
    }

    
}
