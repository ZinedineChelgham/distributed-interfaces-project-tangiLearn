using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TooltipsFollower : MonoBehaviour
{

    public GameObject box;
    LineRenderer lr;
    public MenuAnnotation menuAnnotation;

    public List<string> filepathList = new List<string>();

    //Définition des délégués pour les événements
    public delegate void FilePathEventHandler(string filePath);

    //Définition des événements
    public event FilePathEventHandler FilePathAdded;
    public event FilePathEventHandler FilePathRemoved;


    public void AddToPathList(string filePath)
    {
        filepathList.Add(filePath);
        menuAnnotation?.FilePathAddedHandler(filePath);
    }

    public void RemoveToPathList(string filePath)
    {
        filepathList.Remove(filePath);
        menuAnnotation?.FilePathRemovedHandler(filePath);
    }

    public void Start()
    {
        lr = gameObject.AddComponent<LineRenderer>();
        lr.positionCount = 2;
        lr.widthCurve = AnimationCurve.Linear(0, .006f, 1, .006f);
        lr.SetPosition(0, new Vector3(0, 0, 0));
        lr.SetPosition(1, new Vector3(0, 0, 0));
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectSelected += OnRealObjectSelected;
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectDeselected += OnRealObjectDeselected;
    }

    private void OnRealObjectSelected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if(e.SelectedRealObject == transform.parent.GetComponent<RealObject>())
        {
            gameObject.SetActive(true);
        }
    }

    private void OnRealObjectDeselected(object sender, RealObjectManager.RealObjectEventArgs e)
    {
        if (e.SelectedRealObject == transform.parent.GetComponent<RealObject>())
        {
            gameObject.SetActive(false);
        }
    }

    private void OnDestroy()
    {
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectSelected -= OnRealObjectSelected;
        GameObject.Find("ObjectController").GetComponent<RealObjectManager>().OnRealObjectDeselected -= OnRealObjectDeselected;
    }

    public void SetObjectToFollow(GameObject toFollow)
    {
        this.box = toFollow;
    }

    void Update()
    {
        transform.position = new Vector3(box.transform.position.x, box.transform.position.y, box.transform.position.z);
        if (StringResources.highlightAnnotation)
        {
            lr.SetPosition(0, gameObject.transform.position);
            lr.SetPosition(1, new Vector3(gameObject.transform.position.x, Camera.main.transform.position.y, gameObject.transform.position.z));
        }
        else
        {
            lr.SetPosition(0, new Vector3(0, 0, 0));
            lr.SetPosition(1, new Vector3(0, 0, 0));
        }
    }
}
