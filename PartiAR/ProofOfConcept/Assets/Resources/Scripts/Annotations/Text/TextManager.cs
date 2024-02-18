using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TextManager : MonoBehaviour
{
    private KeyboardManager KM;
    public GameObject MixedRealityKeyboardPreview;
    public string filename;
    public string content;
    public GameObject Tooltip;
    public bool writeContent = true;
    public GameObject EnterName;
    public GameObject EnterContent;
    public GameObject Success;
    public GameObject Error;
    public GameObject SameNameFileError;
    public GameObject VoidContent;
    int fileNumber = 0;



    // Start is called before the first frame update
    void Start()
    {
        KM = GetComponent<KeyboardManager>();
    }

    private void registerFile()
    {
        string filename = "";

        if (KM.cancel)
        {
            MixedRealityKeyboardPreview.SetActive(false);
            EnterContentSet(true);
            //KM.reinitialization();

        }

        if (KM.validate)
        {
            if (string.IsNullOrEmpty(KM.Preview.text))
            {
                VoidContentSet(true);
                //KM.reinitialization();
                /*string timeStamp = Time.time.ToString().Replace(".", "").Replace(":", "");
                filename = string.Format("myText_{0}.txt", timeStamp);*/
            }
            else
            {
                filename = KM.Preview.text.EndsWith(".txt") ? KM.Preview.text : (KM.Preview.text + ".txt");

                try
                {

                    if (FileManager.WriteToFile(filename, content, Tooltip.GetComponent<SceneObject>()))
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

    public void startWriting()
    {
        writeContent = true;
        KM.OpenKeyboard();
    }

    private void write()
    {

        if (KM.cancel)
        {
            MixedRealityKeyboardPreview.SetActive(false);
            EnterContentSet(true);
            KM.reinitialization();

        }

        if (KM.validate)
        {
            //if (string.IsNullOrEmpty(KM.Preview.text))
            //{
            //    VoidContentSet(true);
            //    KM.reinitialization();
            //}

            //else
            //{
                content = KM.Preview.text;

                writeContent = false;

                MixedRealityKeyboardPreview.SetActive(false);
                EnterNameSet(true);
                KM.reinitialization();
               // KM.OpenKeyboard();
            //}
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
    private void EnterContentSet(bool b)
    {
        Success.SetActive(false);
        Error.SetActive(false);
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        EnterContent.SetActive(b);
    }

    private void EnterNameSet(bool b)
    {
        Success.SetActive(false);
        Error.SetActive(false);
        VoidContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterContent.SetActive(false);
        EnterName.SetActive(b);
    }

    private void VoidContentSet(bool b)
    {
        Success.SetActive(false);
        Error.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        EnterContent.SetActive(false);
        VoidContent.SetActive(b);

    }

    private void SuccesSet(bool b)
    {
        Error.SetActive(false);
        VoidContent.SetActive(false);
        EnterContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        Success.SetActive(b);
    }

    private void ErrorSet(bool b)
    {
        VoidContent.SetActive(false);
        EnterContent.SetActive(false);
        SameNameFileError.SetActive(false);
        EnterName.SetActive(false);
        Success.SetActive(false);
        Error.SetActive(true);
    }

    private IEnumerator reset() //attendre avant de tout fermer
    {
        yield return new WaitForSeconds(1);
        MixedRealityKeyboardPreview.SetActive(false);
        EnterContentSet(true);
    }


    void Update()
    {
        if (writeContent)
        {
            if (KM.done)
            {
                write();
                string file = "text" + FileManager.fileNumberText + ".txt";
                FileManager.fileNumberText++;
                try
                {
                    if (FileManager.WriteToFile(file, content, Tooltip.GetComponent<SceneObject>()))
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
                KM.reinitialization();
            }
        } else
        {
            

            //if (KM.done)
            //{
            //    registerFile();
            //    KM.reinitialization();
            //}
        }
    }
}
