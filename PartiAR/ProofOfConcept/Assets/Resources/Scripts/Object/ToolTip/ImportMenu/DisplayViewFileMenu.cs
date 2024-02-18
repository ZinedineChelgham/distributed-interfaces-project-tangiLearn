using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;
using UnityEngine.UI;   
using UnityEngine.Video;
using System.IO;
using System.Collections;
using System.Collections.Generic;

/* -------------------------------------------------------- */
/* GESTION DE L'ONGLET DE SELECTION DES FICHIERS A IMPORTER */
/* -------------------------------------------------------- */

public class DisplayViewFileMenu : MonoBehaviour
{

    public GameObject importfilecollection; // collection des fichiers à importer
    public GameObject confirmationText;     // Texte de confirmation d'import
    public GameObject alreadyImportedText;  // Texte de notification si le fichier est déjà importé
    public GameObject selectAFileText;      // Texte "Select a File"

    /* ---------------------------------------------------- */
    /* Si on clique sur la loupe pour visualiser le fichier */
    /* ---------------------------------------------------- */
    public void viewFile(){
        selectAFileText.SetActive(false); // on désactive l'affichage du texte "Select a File"
        importfilecollection.GetComponent<ImportFileCollection>().ModeImport = "View";
        importfilecollection.GetComponent<ImportFileCollection>().displayImportFiles();
    }

    /* --------------------------------------------------- */
    /* Si on clique sur le bouton pour importer le fichier */
    /* --------------------------------------------------- */
    public void importFile(){
        string filepath = importfilecollection.GetComponent<ImportFileCollection>().selectedPath;
        GameObject tooltip = transform.parent.parent.gameObject;
        List<string> fp = tooltip.GetComponent<SceneObject>().filepathList;
        if (!fp.Contains(filepath))
        {
            fp.Add(filepath);
            confirmationText.SetActive(true);
            StartCoroutine(waitBeforeDisableConfirmationText());
        }
        else{
            alreadyImportedText.SetActive(true);
            StartCoroutine(waitBeforeDisableAlreadyImportedText());
        }
    }

    /* -------------------------------------------------------------- */
    /* Permet d'attendre avant de désactiver le texte de confirmation */
    /* -------------------------------------------------------------- */
    private IEnumerator waitBeforeDisableConfirmationText(){
        yield return new WaitForSeconds(3);
        confirmationText.SetActive(false);
    }

    /* ------------------------------------------------------------------------------------ */
    /* Permet d'attendre avant de désactiver la notification si le fichier est déjà importé */
    /* ------------------------------------------------------------------------------------ */
    private IEnumerator waitBeforeDisableAlreadyImportedText(){
        yield return new WaitForSeconds(3);
        alreadyImportedText.SetActive(false);
    }


}