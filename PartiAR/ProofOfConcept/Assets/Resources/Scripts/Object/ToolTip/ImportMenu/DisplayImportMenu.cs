using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.MixedReality.Toolkit.UI;
using Microsoft.MixedReality.Toolkit.Utilities;
using UnityEngine;
using UnityEngine.UI;       
using UnityEngine.Video;

/* -------------------------------------------------- */
/* GESTION DE L'AFFICHAGE DU MENU D'IMPORT DE FICHIER */
/* -------------------------------------------------- */

public class DisplayImportMenu : MonoBehaviour
{

    public GameObject importMenu;           // menu d'import de fichier
    public GameObject saveImportFileMenu;   // onglet de sauvegarde en bas du menu d'import (visualisation + sauvegarde)

    private void OnDisable()
    {
        transform.Find(StringResources.CONTAINER).localPosition = new Vector3(0, 0, 0);
    }

    private void Start()
    {
        transform.Find(StringResources.CONTAINER).localPosition = new Vector3(0, 0, 0);
    }

    /* ---------------------------------------------- */
    // Apparition du menu d'import
    //    active = true : apparition du menu
    //    active = false : disparition du menu
    /* ---------------------------------------------- */
    public void ImportMenuSetActive(bool active)
    {
        importMenu.SetActive(active);
        if(active == true){   // Si on veut ouvrir le menu 
            setModeImport("Select"); // ouverture du menu en mode select par défaut
            GameObject.Find("GridCollectionImport").GetComponent<ImportFileCollection>().displayImportFiles();
        } 
        if(active == false){  // Si on veut fermer le menu
            saveImportFileMenu.SetActive(false);
        }
    }

    /* ---------------------------------------------- */
    // Affichage de l'onglet de sauvegarde
    //    active = true : apparition de l'onglet
    //    active = false : disparition de l'onglet
    /* ---------------------------------------------- */
    public void saveImportFileMenuSetActive(bool active){
        saveImportFileMenu.SetActive(active);
    }

    /* ----------------------- */
    /* Setter du mode d'import */
    /* ----------------------- */
    public void setModeImport(string mode){
        GameObject.Find("GridCollectionImport").GetComponent<ImportFileCollection>().ModeImport = mode;
        GameObject.Find("GridCollectionImport").GetComponent<ImportFileCollection>().displayImportFiles();
    }

    /* ------------------------------- */
    /* Setter du mode de visualisation */
    /* ------------------------------- */
    public void setModeView(string mode){
        GameObject.Find("GridCollectionImport").GetComponent<ImportFileCollection>().ModeView = mode;
        GameObject.Find("GridCollectionImport").GetComponent<ImportFileCollection>().displayImportFiles();
    }


}